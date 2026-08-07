/**
 * Keep Chaos leaderboard proxy — Cloudflare Worker
 * Secrets: STEAM_API_KEY
 * Vars: STEAM_APP_ID
 * Optional vars: LB_SOLO, LB_DUO, LB_TRIO, LB_SQUAD (name or numeric lid)
 *
 * Deploy: paste this into the Worker editor (or wrangler deploy).
 * URL: https://api.tierstudios.com/leaderboard
 */

const BOARD_KEYS = ['solo', 'duo', 'trio', 'squad'];
const ALLOW_ORIGIN = 'https://tierstudios.com';

function corsHeaders(origin) {
  const ok =
    !origin ||
    origin === ALLOW_ORIGIN ||
    origin === 'https://www.tierstudios.com' ||
    /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin || ALLOW_ORIGIN : ALLOW_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      ...corsHeaders(origin),
    },
  });
}

async function steamGet(base, path, params, key) {
  const url = new URL(`${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`);
  url.searchParams.set('key', key);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Steam ${path} ${res.status}: ${text.slice(0, 240)}`);
  }
  return res.json();
}

/** Publisher WebAPI host — required for ISteamLeaderboards */
function partnerGet(path, params, key) {
  return steamGet('https://partner.steam-api.com', path, params, key);
}

/** Public WebAPI host — GetPlayerSummaries */
function publicGet(path, params, key) {
  return steamGet('https://api.steampowered.com', path, params, key);
}

function normalizeBoards(data) {
  const list =
    (data && data.response && data.response.leaderboards) ||
    (data && data.leaderboards) ||
    (Array.isArray(data) ? data : []);
  return list.map((b) => ({
    id: Number(b.id != null ? b.id : b.leaderboardid),
    name: String(b.name || b.leaderboardName || ''),
  })).filter((b) => b.id && b.name);
}

async function listLeaderboards(env) {
  const data = await partnerGet(
    'ISteamLeaderboards/GetLeaderboardsForGame/v2/',
    { appid: env.STEAM_APP_ID },
    env.STEAM_API_KEY
  );
  return normalizeBoards(data);
}

function isNoiseBoard(name) {
  const n = String(name || '').toLowerCase();
  return n.includes('audit') || n.includes('test') || n.includes('debug') || n.includes('temp');
}

function scoreBoardName(name, key) {
  const n = String(name || '').toLowerCase().trim();
  const k = String(key || '').toLowerCase();
  if (!n || isNoiseBoard(n)) return -1;
  if (n === k) return 100;
  if (n === `keepchaos_${k}`) return 95;
  if (n === `keep_chaos_${k}`) return 94;
  if (n === `keepchaos${k}`) return 93;
  if (n.endsWith(`_${k}`)) return 80;
  if (n.startsWith(`${k}_`) || n.startsWith(`${k} `)) return 70;
  if (n.includes(k)) return 40;
  return -1;
}

function resolveLid(boards, key, env) {
  const override = env[`LB_${key.toUpperCase()}`];
  if (override != null && String(override).trim() !== '') {
    const raw = String(override).trim();
    if (/^\d+$/.test(raw)) return Number(raw);
    const byName = boards.find(
      (b) => String(b.name || '').toLowerCase() === raw.toLowerCase()
    );
    if (byName) return Number(byName.id);
  }

  let best = null;
  let bestScore = -1;
  for (const b of boards) {
    const s = scoreBoardName(b.name, key);
    if (s > bestScore) {
      bestScore = s;
      best = b;
    }
  }
  return best && bestScore > 0 ? Number(best.id) : null;
}

function normalizeEntries(data) {
  const info =
    (data && data.leaderboardEntryInformation) ||
    (data && data.response && data.response.leaderboardEntryInformation) ||
    data;
  const entries =
    (info && info.leaderboardEntries) ||
    (info && info.entries) ||
    (data && data.entries) ||
    [];
  return Array.isArray(entries) ? entries : [];
}

async function fetchEntries(env, lid) {
  const data = await partnerGet(
    'ISteamLeaderboards/GetLeaderboardEntries/v1/',
    {
      appid: env.STEAM_APP_ID,
      leaderboardid: lid,
      datarequest: 'RequestGlobal',
      rangestart: 0,
      rangeend: 99,
    },
    env.STEAM_API_KEY
  );
  return normalizeEntries(data);
}

async function fetchPlayers(env, steamIds) {
  const unique = [...new Set(steamIds.filter(Boolean))];
  const map = new Map();
  for (let i = 0; i < unique.length; i += 100) {
    const chunk = unique.slice(i, i + 100);
    if (!chunk.length) continue;
    const data = await publicGet(
      'ISteamUser/GetPlayerSummaries/v2/',
      { steamids: chunk.join(',') },
      env.STEAM_API_KEY
    );
    const players = (data && data.response && data.response.players) || [];
    for (const p of players) {
      map.set(String(p.steamid), {
        name: p.personaname || 'Player',
        avatar: p.avatarfull || p.avatarmedium || p.avatar || null,
        steamid: String(p.steamid),
      });
    }
  }
  return map;
}

function mapBoard(entries, players) {
  return entries.map((e, i) => {
    const sid = String(e.steamID || e.steamid || '');
    const profile = players.get(sid);
    return {
      rank: Number(e.rank) || i + 1,
      score: Number(e.score) || 0,
      players: [
        profile || {
          name: sid ? `Steam ${sid.slice(-4)}` : 'Player',
          steamid: sid || undefined,
        },
      ],
    };
  });
}

async function buildLeaderboard(env) {
  const boardsMeta = await listLeaderboards(env);
  const lids = {};
  for (const key of BOARD_KEYS) {
    lids[key] = resolveLid(boardsMeta, key, env);
  }

  const boards = { solo: [], duo: [], trio: [], squad: [] };
  const allIds = [];

  for (const key of BOARD_KEYS) {
    const lid = lids[key];
    if (!lid) continue;
    const entries = await fetchEntries(env, lid);
    boards[key] = entries;
    for (const e of entries) {
      const sid = String(e.steamID || e.steamid || '');
      if (sid) allIds.push(sid);
    }
  }

  const players = await fetchPlayers(env, allIds);
  for (const key of BOARD_KEYS) {
    boards[key] = mapBoard(boards[key], players);
  }

  const now = new Date();
  return {
    game: 'Keep Chaos',
    updated: now.toISOString().slice(0, 10),
    demo: false,
    source: 'steam',
    appId: String(env.STEAM_APP_ID),
    cycleHours: 150,
    cycleAnchor: now.toISOString(),
    refreshHours: 1,
    refreshAnchor: now.toISOString(),
    boards,
    meta: {
      discovered: boardsMeta.map((b) => ({ id: b.id, name: b.name })),
      resolved: lids,
    },
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'GET') {
      return json({ error: 'method_not_allowed' }, 405, origin);
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/health') {
      return json(
        {
          ok: true,
          hasKey: Boolean(env.STEAM_API_KEY),
          appId: env.STEAM_APP_ID || null,
        },
        200,
        origin
      );
    }

    if (path !== '/' && path !== '/leaderboard') {
      return json({ error: 'not_found' }, 404, origin);
    }

    if (!env.STEAM_API_KEY || !env.STEAM_APP_ID) {
      return json(
        { error: 'missing_env', need: ['STEAM_API_KEY', 'STEAM_APP_ID'] },
        500,
        origin
      );
    }

    try {
      const payload = await buildLeaderboard(env);
      return json(payload, 200, origin);
    } catch (err) {
      return json(
        {
          error: 'steam_fetch_failed',
          message: String(err && err.message ? err.message : err),
        },
        502,
        origin
      );
    }
  },
};
