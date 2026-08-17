(function tierScrollTopLock() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function pinTop() {
    if (window.location.hash) return;
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }

  window.tierPinTop = pinTop;
  pinTop();
  document.addEventListener('DOMContentLoaded', pinTop);
  window.addEventListener('load', pinTop);
  window.addEventListener('pageshow', function () {
    pinTop();
  });
  document.addEventListener('pointerdown', function () {
    document.documentElement.classList.add('tier-smooth');
  }, { once: true, passive: true });
})();

(function tierPageLifecycle() {
  var cleanups = [];
  window.tierOnPageLeave = function (fn) {
    if (typeof fn === 'function') cleanups.push(fn);
  };
  window.tierTeardownPage = function () {
    if (window.tierParkGamesVideo) window.tierParkGamesVideo();
    var fns = cleanups.splice(0, cleanups.length);
    for (var i = 0; i < fns.length; i++) {
      try { fns[i](); } catch (err) {}
    }
    document.querySelectorAll('audio, video').forEach(function (media) {
      if (media.id === 'gamesVideoWarm') return;
      try { media.pause(); } catch (err) {}
    });
    document.body.classList.remove('is-press-lightbox-open');
  };
})();

(function gamesVideoWarm() {
  var SRC = '/assets/video/keep-chaos.mp4?v=20260802a';
  var POSTER = '/assets/img/game/keep-chaos-banner.png';

  function park(video) {
    if (!video) return;
    try { video.pause(); } catch (err) {}
    video.className = 'games-video-warm';
    video.id = 'gamesVideoWarm';
    if (video.parentNode !== document.body) document.body.appendChild(video);
  }

  function create() {
    var video = document.createElement('video');
    video.id = 'gamesVideoWarm';
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('poster', POSTER);
    video.src = SRC;
    park(video);
    try { video.load(); } catch (err) {}
    return video;
  }

  function get() {
    return document.getElementById('gamesVideoWarm') || create();
  }

  function mount() {
    var banner = document.querySelector('.games-video-banner');
    if (!banner) return get();
    var video = get();
    var slot = banner.querySelector('video.games-video-banner-video, video.games-video-warm');
    video.className = 'games-video-banner-media games-video-banner-video';
    video.id = 'gamesVideoWarm';
    video.setAttribute('poster', POSTER);
    if (slot && slot !== video) slot.replaceWith(video);
    else if (video.parentNode !== banner) {
      var shade = banner.querySelector('.games-video-banner-shade');
      banner.insertBefore(video, shade || banner.firstChild);
    }
    return video;
  }

  window.tierWarmGamesVideo = get;
  window.tierMountGamesVideo = mount;
  window.tierParkGamesVideo = function () {
    park(document.getElementById('gamesVideoWarm'));
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  (function skipToContent() {
    var target = document.querySelector('main') || document.getElementById('outer-wrapper');
    if (!target) return;
    if (!target.id) target.id = 'main-content';
    if (document.querySelector('.skip-link')) return;
    var link = document.createElement('a');
    link.className = 'skip-link';
    link.href = '#' + target.id;
    link.textContent = 'Skip to content';
    link.setAttribute('data-i18n', 'common.skipToContent');
    document.body.insertBefore(link, document.body.firstChild);
    if (window.tierI18n && window.tierI18n.applyLang) window.tierI18n.applyLang();
  })();

  function assetBadges() {
    document.querySelectorAll('.game-item.has-img .gi-body').forEach(function (body) {
      if (body.querySelector('.gi-badge')) return;
      var badge = document.createElement('span');
      badge.className = 'label gi-badge';
      badge.setAttribute('data-i18n', 'common.unityAsset');
      body.insertBefore(badge, body.firstChild);
    });
    if (window.tierI18n && window.tierI18n.applyLang) window.tierI18n.applyLang();
  }

  (function tierAnalyticsEvents() {
    if (!window.tierAnalytics) return;

    window.addEventListener('tier:lang', function (e) {
      window.tierAnalytics.track('language_change', { language: e.detail && e.detail.lang });
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin === window.location.origin && !link.hasAttribute('data-analytics')) return;
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      var label = link.getAttribute('data-analytics-label')
        || (link.textContent && link.textContent.trim().slice(0, 48))
        || url.hostname;
      window.tierAnalytics.track('outbound_click', {
        link_url: link.href,
        link_text: label
      });
    });
  })();

  function footerShortcuts() {
    document.querySelectorAll('.footer .footer-center').forEach(function (center) {
      if (center.querySelector('.footer-shortcuts')) return;

      var title = center.querySelector('.footer-title');
      if (!title) return;

      var nav = document.createElement('nav');
      nav.className = 'footer-shortcuts reveal reveal-fade';
      nav.setAttribute('data-i18n-aria', 'footer.shortcutsAria');
      nav.innerHTML =
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.explore">Explore</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="/" data-cursor="hover" data-i18n="footer.home">Home</a></li>' +
            '<li><a href="/tools" data-cursor="hover" data-i18n="nav.assets">Assets</a></li>' +
            '<li><a href="/news" data-cursor="hover" data-i18n="nav.news">News</a></li>' +
            '<li><a href="/team" data-cursor="hover" data-i18n="nav.team">Team</a></li>' +
            '<li><a href="/contact" data-cursor="hover" data-i18n="nav.contact">Contact</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.games">Games</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="/games" data-cursor="hover" data-i18n="nav.keepChaos">Keep Chaos</a></li>' +
            '<li><span class="footer-soon" aria-disabled="true"><span data-i18n="footer.leaderboard">Leaderboard</span> · <span data-i18n="common.comingSoon">Coming soon</span></span></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.tools">Unity Tools</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="/layer-forge-studio" data-cursor="hover">Layer Forge Studio</a></li>' +
            '<li><a href="/goat-icon-studio" data-cursor="hover">Goat Icon Studio</a></li>' +
            '<li><a href="/ui-particle-system" data-cursor="hover">UI Particle System</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.resources">Resources</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="/layer-forge-docs" data-cursor="hover" data-i18n="footer.layerForgeDocs">Layer Forge Docs</a></li>' +
            '<li><a href="/ui-particle-docs" data-cursor="hover" data-i18n="footer.uiParticleDocs">UI Particle Docs</a></li>' +
            '<li><a href="https://assetstore.unity.com/publishers/124104" target="_blank" rel="noopener" data-cursor="hover" data-i18n="footer.assetStore">Unity Asset Store</a></li>' +
            '<li><a href="https://discord.gg/keepchaos" target="_blank" rel="noopener" data-cursor="hover" data-i18n="footer.discord">Discord Community</a></li>' +
            '<li><a href="/press" data-cursor="hover" data-i18n="footer.pressKit">Press Kit</a></li>' +
            '<li><a href="/privacy" data-cursor="hover" data-i18n="footer.privacy">Privacy</a></li>' +
            '<li><a href="/cookies" data-cursor="hover" data-i18n="footer.cookies">Cookie Policy</a></li>' +
            '<li><button type="button" class="footer-text-btn" data-cookie-settings data-cursor="hover" data-i18n="footer.cookieSettings">Cookie Settings</button></li>' +
          '</ul>' +
        '</div>';

      title.insertAdjacentElement('afterend', nav);
    });

    if (window.tierI18n && window.tierI18n.mountLangSwitcher) {
      window.tierI18n.mountLangSwitcher();
    }
    if (window.tierI18n && window.tierI18n.applyLang) {
      window.tierI18n.applyLang();
    }
  }

  function navActiveRoute() {
    var raw = (window.location.pathname || '/').replace(/\/+$/, '');
    var seg = raw.split('/').filter(Boolean);
    var key = seg.length ? seg[0] : '';
    var hrefMap = {
      tools: '/tools',
      games: '/games',
      news: '/news',
      team: '/team',
      contact: '/contact',
      'layer-forge-studio': '/tools',
      'goat-icon-studio': '/tools',
      'ui-particle-system': '/tools',
      'layer-forge-docs': '/tools',
      'ui-particle-docs': '/tools'
    };
    var href = hrefMap[key];
    document.querySelectorAll('#nav .nav-link').forEach(function (a) {
      var link = (a.getAttribute('href') || '').replace(/\/+$/, '');
      a.classList.toggle('active', !!href && link === href);
    });
  }

  function contactMap() {
    var mount = document.querySelector('.contact-map-mount');
    if (!mount) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ns = 'http://www.w3.org/2000/svg';

    function prepareWorldSvg(svgText) {
      var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      var svg = doc.documentElement;
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('class', 'world-map-svg');

      var paths = [];
      svg.querySelectorAll('path').forEach(function (p) {
        if (p.closest('mask')) return;
        p.classList.add('map-land');
        paths.push(p);
      });

      var pinX = (30.7133 + 180) / 360 * 784;
      var pinY = (90 - 36.8969) / 180 * 401;
      var pinG = doc.createElementNS(ns, 'g');
      pinG.setAttribute('class', 'map-pin');
      pinG.setAttribute('transform', 'translate(' + pinX.toFixed(1) + ', ' + pinY.toFixed(1) + ')');
      pinG.innerHTML =
        '<circle class="map-pulse map-pulse--2" r="6"/>' +
        '<circle class="map-pulse" r="6"/>' +
        '<circle class="map-pin-core" r="2.8"/>';
      svg.appendChild(pinG);

      return { html: svg.outerHTML, paths: paths };
    }

    fetch('/assets/img/world-map.svg')
      .then(function (res) {
        if (!res.ok) throw new Error('world-map.svg not found');
        return res.text();
      })
      .then(function (svgText) {
        var prepared = prepareWorldSvg(svgText);
        mount.innerHTML = prepared.html;

        if (!reduced) {
          prepared.paths.forEach(function (p, i) {
            if (!p.getTotalLength) return;
            var len = p.getTotalLength();
            if (!len) return;
            p.style.strokeDasharray = len;
            p.style.strokeDashoffset = len;
            p.animate(
              [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
              {
                duration: 2200,
                delay: Math.min(i * 60, 1200),
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
              }
            );
          });
        }

        if (!reduced && window.innerWidth >= 768) {
          var stage = mount.closest('.contact-map-stage');
          if (stage) {
            stage.addEventListener('mousemove', function (e) {
              var rect = stage.getBoundingClientRect();
              var nx = (e.clientX - rect.left) / rect.width - 0.5;
              var ny = (e.clientY - rect.top) / rect.height - 0.5;
              mount.style.setProperty('--map-mx', (nx * 12) + 'px');
              mount.style.setProperty('--map-my', (ny * 8) + 'px');
            }, { passive: true });
            stage.addEventListener('mouseleave', function () {
              mount.style.setProperty('--map-mx', '0px');
              mount.style.setProperty('--map-my', '0px');
            });
          }
        }
      })
      .catch(function () {});
  }

  function heroStrokeDraw() {
    var g = document.querySelector('.hero-stroke-glyphs');
    if (!g) return;
    function draw() {
      if (!g.isConnected || typeof opentype === 'undefined') return;
    var TEXT = 'TIER STUDIOS';
    function heroSize() {
      var vw = window.innerWidth || 1200;
      if (vw < 380) return 68;
      if (vw < 520) return 82;
      if (vw < 768) return 94;
      if (vw < 1024) return 100;
      return 104;
    }
    var SIZE = heroSize();
    var BASE = SIZE * 0.917;
    var DUR = 1800;
    var FONT = 'https://fonts.gstatic.com/s/archivo/v25/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTnTRp8A.ttf';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    opentype.load(FONT, function (err, font) {
      if (err || !g.isConnected) return;
      var ns = 'http://www.w3.org/2000/svg';
      g.innerHTML = '';
      var x = 0;
      TEXT.split('').forEach(function (c) {
        var path = font.getPath(c, x, BASE, SIZE);
        var el = document.createElementNS(ns, 'path');
        el.setAttribute('d', path.toPathData());
        el.setAttribute('class', 'hero-stroke-path');
        g.appendChild(el);
        var len = el.getTotalLength();
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = reduced ? 0 : len;
        if (!reduced) {
          el.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
            duration: DUR, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards'
          });
        }
        x += font.getAdvanceWidth(c, SIZE);
      });

      var bbox = g.getBBox();
      var svg = g.closest('svg');
      var padX = 10;
      var padY = 8;
      if (svg) {
        svg.setAttribute(
          'viewBox',
          (bbox.x - padX) + ' ' + (bbox.y - padY) + ' ' + (bbox.width + padX * 2) + ' ' + (bbox.height + padY * 2)
        );
      }
    });
    }
    if (typeof opentype !== 'undefined') {
      draw();
      return;
    }
    if (window.__tierOpentypeLoading) {
      window.addEventListener('tier:opentype', draw, { once: true });
      return;
    }
    window.__tierOpentypeLoading = true;
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js';
    script.onload = function () {
      window.dispatchEvent(new Event('tier:opentype'));
      draw();
    };
    document.head.appendChild(script);
  }

  function heroParticles() {
    var layer = document.querySelector('.hero-panel-particles');
    var panel = document.querySelector('.hero-title-panel');
    if (!layer || !panel) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function build() {
      layer.innerHTML = '';
      var w = panel.offsetWidth;
      var h = panel.offsetHeight;
      if (!w || !h) return;
      var n = Math.min(window.innerWidth < 900 ? 64 : 180, Math.max(window.innerWidth < 900 ? 36 : 70, Math.floor(w * h / (window.innerWidth < 900 ? 8000 : 4800))));
      for (var i = 0; i < n; i++) {
        var p = document.createElement('span');
        p.className = 'hero-particle-dot';
        var s = Math.random() > 0.75 ? 3 : 2;
        p.style.width = s + 'px';
        p.style.height = s + 'px';
        p.style.left = (Math.random() * 100) + '%';
        p.style.top = (Math.random() * 100) + '%';
        if (!reduced) {
          p.style.setProperty('--delay', (Math.random() * 3) + 's');
          p.style.setProperty('--dur', (2 + Math.random() * 2.5) + 's');
        }
        layer.appendChild(p);
      }
    }
    build();
    requestAnimationFrame(function () { requestAnimationFrame(build); });
    var t;
    var onResize = function () {
      clearTimeout(t);
      t = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);
    window.tierOnPageLeave(function () {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    });
  }

  function copyrightYear() {
    var cpEl = document.getElementById('copyright');
    if (cpEl) cpEl.textContent = '\u00a9 ' + new Date().getFullYear() + ' Tier Studios';
  }

  function reveals() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-stagger]').forEach(function (wrap) {
      var step = parseInt(wrap.dataset.stagger, 10) || 100;
      Array.prototype.forEach.call(wrap.children, function (el, i) {
        el.classList.add('reveal');
        var extra = parseInt(el.dataset.delay, 10) || 0;
        el.style.setProperty('--d', (i * step + extra) + 'ms');
      });
    });

    var els = document.querySelectorAll('.reveal');
    els.forEach(function (el) {
      if (!el.style.getPropertyValue('--d') && el.dataset.delay) {
        el.style.setProperty('--d', el.dataset.delay + 'ms');
      }
    });

    if (reduced) {
      els.forEach(function (el) {
        el.classList.add('in');
        var head = el.closest('.section-head');
        if (head) head.classList.add('is-in');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('in');
        var head = el.closest('.section-head');
        if (head) head.classList.add('is-in');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        var head = en.target.closest('.section-head');
        if (head) head.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) { io.observe(el); });
    window.tierOnPageLeave(function () { io.disconnect(); });
  }

  /* Games page — terminal code sequence */
  function gameDevTerminal() {
    var panel = document.getElementById('gameDevPanel');
    if (!panel) return;

    var codeEl = panel.querySelector('.game-dev-code code');
    var finale = panel.querySelector('.game-dev-finale');
    var statusEl = panel.querySelector('.game-dev-status');
    if (!codeEl || !finale || !statusEl) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var timer = null;
    var running = false;
    var SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#%&@░▒▓█▄▀■□ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function randomSymbol() {
      return SCRAMBLE_CHARS.charAt(Math.floor(Math.random() * SCRAMBLE_CHARS.length));
    }

    function getStatusText() {
      return (window.tierI18n && window.tierI18n.t('games.devStatus')) || 'IN DEVELOPMENT';
    }

    function reset() {
      if (timer) clearTimeout(timer);
      timer = null;
      running = false;
      codeEl.textContent = '';
      statusEl.textContent = '';
      statusEl.classList.remove('is-scrambling');
      finale.classList.remove('is-visible');
    }

    function getLines() {
      if (!window.tierI18n || !window.tierI18n.t) return [];
      var raw = window.tierI18n.t('games.devLines');
      return raw ? raw.split('\n').filter(Boolean) : [];
    }

    function render(lines, index, partial) {
      var html = '';
      var i;

      for (i = 0; i < index; i++) {
        html += '<span class="game-dev-line">' + escapeHtml(lines[i]) + '</span>';
      }

      if (index < lines.length) {
        html += '<span class="game-dev-line game-dev-line--active">' +
          escapeHtml(partial) +
          '<span class="game-dev-cursor" aria-hidden="true"></span></span>';
      }

      codeEl.innerHTML = html;
      codeEl.scrollTop = codeEl.scrollHeight;
    }

    function scrambleStatus(done) {
      var target = getStatusText();
      var locked = 0;
      var ticks = 0;
      var maxTicks = target.length * 4 + 12;

      statusEl.classList.add('is-scrambling');
      panel.setAttribute('aria-label', target);

      function frame() {
        if (!running) return;

        var output = '';
        var i;

        for (i = 0; i < target.length; i++) {
          if (target.charAt(i) === ' ') {
            output += ' ';
            continue;
          }
          output += i < locked ? target.charAt(i) : randomSymbol();
        }

        statusEl.textContent = output;
        ticks++;

        if (ticks % 2 === 0 && locked < target.length) {
          do {
            locked++;
          } while (locked < target.length && target.charAt(locked) === ' ');
        }

        if (locked >= target.length || ticks >= maxTicks) {
          statusEl.textContent = target;
          statusEl.classList.remove('is-scrambling');
          if (done) done();
          return;
        }

        timer = setTimeout(frame, 42 + Math.random() * 28);
      }

      frame();
    }

    function showFinale() {
      timer = setTimeout(function () {
        requestAnimationFrame(function () {
          finale.classList.add('is-visible');
          scrambleStatus();
        });
      }, 320);
    }

    function run() {
      if (!panel.classList.contains('in')) return;

      reset();
      var lines = getLines();
      if (!lines.length) return;

      if (reduced.matches) {
        codeEl.textContent = lines.join('\n');
        statusEl.textContent = getStatusText();
        panel.setAttribute('aria-label', getStatusText());
        finale.classList.add('is-visible');
        return;
      }

      running = true;
      var lineIndex = 0;
      var charIndex = 0;

      function step() {
        if (!running) return;

        if (lineIndex >= lines.length) {
          codeEl.innerHTML = lines.map(function (line) {
            return '<span class="game-dev-line">' + escapeHtml(line) + '</span>';
          }).join('');
          showFinale();
          return;
        }

        var line = lines[lineIndex];

        if (charIndex < line.length) {
          render(lines, lineIndex, line.slice(0, charIndex + 1));
          charIndex++;
          timer = setTimeout(step, 14 + Math.random() * 14);
          return;
        }

        lineIndex++;
        charIndex = 0;
        render(lines, lineIndex, '');
        timer = setTimeout(step, 180 + Math.random() * 120);
      }

      step();
    }

    var mo = new MutationObserver(function () {
      if (panel.classList.contains('in')) run();
    });
    mo.observe(panel, { attributes: true, attributeFilter: ['class'] });

    if (panel.classList.contains('in')) run();

    var onLang = function () {
      if (panel.classList.contains('in')) run();
    };
    window.addEventListener('tier:lang', onLang);
    window.tierOnPageLeave(function () {
      running = false;
      if (timer) window.clearTimeout(timer);
      mo.disconnect();
      window.removeEventListener('tier:lang', onLang);
    });
  }

  /* Nav solidify + hide on scroll down */
  (function navSolid() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var lastY = window.scrollY;
    var hidden = false;

    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle('solid', y > 24);

      var menuOpen = document.body.classList.contains('menu-open');
      if (menuOpen || y < 80) {
        hidden = false;
      } else if (y > lastY + 6) {
        hidden = true;
      } else if (y < lastY - 4) {
        hidden = false;
      }

      nav.classList.toggle('is-hidden', hidden);
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* Desktop nav sliding indicator */
  (function navIndicator() {
    var navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    var links = navLinks.querySelectorAll('.nav-link');
    if (!links.length) return;

    var indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    navLinks.appendChild(indicator);

    var padX = 8;
    var padY = 2;
    var mqDesktop = window.matchMedia('(min-width: 901px)');

    function isDesktop() {
      return mqDesktop.matches;
    }

    function moveTo(link) {
      if (!link || !isDesktop()) {
        indicator.style.opacity = '0';
        navLinks.classList.remove('is-hovering');
        return;
      }

      var parentRect = navLinks.getBoundingClientRect();
      var rect = link.getBoundingClientRect();
      var left = rect.left - parentRect.left - padX;
      var top = rect.top - parentRect.top - padY;
      var width = rect.width + padX * 2;
      var height = rect.height + padY * 2;
      var maxW = navLinks.clientWidth;
      var maxH = navLinks.clientHeight;

      if (left < 0) {
        width += left;
        left = 0;
      }
      if (top < 0) {
        height += top;
        top = 0;
      }
      if (left + width > maxW) width = Math.max(0, maxW - left);
      if (top + height > maxH) height = Math.max(0, maxH - top);

      indicator.style.width = width + 'px';
      indicator.style.height = height + 'px';
      indicator.style.transform = 'translate3d(' + left + 'px,' + top + 'px,0)';
      indicator.style.opacity = '1';
    }

    function showActive() {
      var active = navLinks.querySelector('.nav-link.active');
      if (active && isDesktop()) moveTo(active);
      else indicator.style.opacity = '0';
      navLinks.classList.remove('is-hovering');
    }

    function refreshIndicator() {
      requestAnimationFrame(function () {
        requestAnimationFrame(showActive);
      });
    }

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        if (!isDesktop()) return;
        navLinks.classList.add('is-hovering');
        moveTo(link);
      });

      link.addEventListener('focus', function () {
        if (!isDesktop()) return;
        navLinks.classList.add('is-hovering');
        moveTo(link);
      });
    });

    navLinks.addEventListener('mouseleave', showActive);

    navLinks.addEventListener('focusout', function (e) {
      if (!navLinks.contains(e.relatedTarget)) showActive();
    });

    mqDesktop.addEventListener('change', showActive);
    window.addEventListener('resize', showActive);
    window.addEventListener('load', showActive);
    window.addEventListener('tier:lang', refreshIndicator);
    refreshIndicator();
  })();

  /* Hero fade on scroll */
  function heroParallax() {
    var inner = document.getElementById('heroInner');
    if (!inner) return;
    var raf;
    var update = function () {
      var y = window.scrollY;
      var fade = Math.max(0, 1 - y / 480);
      inner.style.opacity = String(fade);
      inner.style.transform = 'translate3d(0,' + (y * 0.14) + 'px,0)';
    };
    var onScroll = function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    window.tierOnPageLeave(function () {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    });
  }

  /* Mobile nav */
  (function mobileNav() {
    var nav = document.getElementById('nav');
    var btn = document.getElementById('mobileNavBtn');
    var links = document.getElementById('navLinks');
    if (!btn || !links) return;

    var navRight = btn.parentElement;
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-mobile-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    function isMobileNav() {
      return window.matchMedia('(max-width: 900px)').matches;
    }

    function dockLinks() {
      if (isMobileNav()) {
        if (links.parentElement !== document.body) {
          document.body.appendChild(links);
        }
      } else {
        closeMenu();
        if (navRight && links.parentElement !== navRight) {
          navRight.insertBefore(links, btn);
        }
      }
    }

    function closeMenu() {
      btn.classList.remove('active');
      links.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (nav) nav.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      if (!isMobileNav()) return;
      dockLinks();
      btn.classList.add('active');
      links.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('menu-open');
      if (nav) nav.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'navLinks');
    btn.setAttribute('type', 'button');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (links.classList.contains('active')) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', dockLinks);
    dockLinks();
  })();

  function docsCode() {
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  var codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function (codeBlock) {
    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains('gemini-code-container')) return;

    var isGameDev = pre.classList.contains('game-dev-code');
    var container = document.createElement('div');
    container.className = 'gemini-code-container';

    var header = document.createElement('div');
    header.className = 'gemini-code-header';

    var langClass = codeBlock.className.match(/language-(\w+)/);
    var langName = langClass ? langClass[1].toUpperCase() : 'CODE';
    if (langName === 'CSHARP') langName = 'C#';

    header.innerHTML =
      '<div style="display:flex;align-items:center;">' +
      '<span style="display:inline-block;width:10px;height:10px;background:#ff5f56;border-radius:50%;margin-right:6px;"></span>' +
      '<span style="display:inline-block;width:10px;height:10px;background:#ffbd2e;border-radius:50%;margin-right:6px;"></span>' +
      '<span style="display:inline-block;width:10px;height:10px;background:#27c93f;border-radius:50%;"></span>' +
      '<span style="color:var(--fg-dim);margin-left:10px;font-weight:500;letter-spacing:0.1em;">' +
      (isGameDev ? 'tier_game_project' : langName) +
      '</span></div>' +
      (isGameDev ? '' : '<button class="gemini-copy-btn" type="button"><i class="fas fa-copy"></i> Copy</button>');

    pre.className = isGameDev ? 'game-dev-code gemini-code-content' : 'gemini-code-content';
    pre.removeAttribute('style');
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(header);
    container.appendChild(pre);

    if (isGameDev) return;

    var copyBtn = header.querySelector('.gemini-copy-btn');
    copyBtn.addEventListener('click', function () {
      var codeText = codeBlock.innerText || codeBlock.textContent;
      var successEffect = function () {
        var originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(function () { copyBtn.innerHTML = originalHTML; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(successEffect).catch(function () {
          var textArea = document.createElement('textarea');
          textArea.value = codeText;
          textArea.style.position = 'fixed';
          document.body.appendChild(textArea);
          textArea.select();
          try { document.execCommand('copy'); successEffect(); } catch (err) {}
          document.body.removeChild(textArea);
        });
      }
    });
  });
  }

  function primeGamesBanner() {
    var banner = document.querySelector('.games-video-banner');
    if (!banner) return;
    var video = window.tierMountGamesVideo ? window.tierMountGamesVideo() : banner.querySelector('.games-video-banner-video');
    if (!video) return;

    var settled = false;
    var finish = function () {
      if (settled) return;
      settled = true;
      video.classList.add('is-ready');
    };

    var tryPlay = function () {
      var play = video.play();
      if (play && typeof play.then === 'function') {
        play.then(function () {
          if (!video.paused) finish();
        }).catch(function () {});
      }
    };

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    video.addEventListener('playing', finish, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });
    video.addEventListener('error', finish, { once: true });

    tryPlay();
    if (video.readyState >= 2) tryPlay();
    if (video.readyState >= 3 && !video.paused) finish();
  }

  function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form || form.dataset.tierBound === '1') return;
    form.dataset.tierBound = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var successMessage = document.getElementById('success-message');
      var errorMessage = document.getElementById('error-message');
      if (errorMessage) errorMessage.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }
      fetch('https://formspree.io/f/xgvkbywq', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (successMessage) successMessage.style.display = 'block';
          if (errorMessage) errorMessage.style.display = 'none';
          if (window.tierAnalytics) {
            window.tierAnalytics.track('contact_form_submit', { form_name: 'contact' });
          }
          setTimeout(function () {
            if (successMessage) successMessage.style.display = 'none';
          }, 5000);
        } else if (errorMessage) {
          errorMessage.textContent = window.tierI18n ? window.tierI18n.t('contact.error') : 'An error occurred. Please try again later.';
          errorMessage.style.display = 'block';
        }
      }).catch(function () {
        if (errorMessage) {
          errorMessage.textContent = window.tierI18n ? window.tierI18n.t('contact.errorSend') : 'An error occurred while sending the message.';
          errorMessage.style.display = 'block';
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
        }
      });
    });
  }

  function bootPage() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    if (path === '/games' && window.location.hash === '#press') {
      window.location.replace('/press');
      return;
    }
    assetBadges();
    footerShortcuts();
    navActiveRoute();
    contactMap();
    copyrightYear();
    heroStrokeDraw();
    heroParticles();
    reveals();
    gameDevTerminal();
    heroParallax();
    contactForm();
    docsCode();
    if (window.tierInitGamesMedia) window.tierInitGamesMedia();
    if (window.tierInitGamesPress) window.tierInitGamesPress();
    if (window.tierInitGamesLb) window.tierInitGamesLb();
    if (window.tierInitNews) window.tierInitNews();
    if (window.tierI18n && window.tierI18n.applyLang) window.tierI18n.applyLang();
    primeGamesBanner();
  }

  window.tierBootPage = bootPage;
  bootPage();
});

(function tierAmbience() {
  if (!document.body || document.querySelector('.tier-ambience-canvas')) return;
  if (document.documentElement.getAttribute('data-theme') === 'light') return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)').matches;
  var canvas = document.createElement('canvas');
  canvas.className = 'tier-ambience-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  // Soft purple ambience across every page.
  var glowInner = '180, 140, 255';
  var glowMid = '100, 60, 180';
  var keyTint = '190, 160, 255';

  var blobs = [
    { ax: 0.52, ay: 0.18, rx: 0.52, ry: 0.38, phase: 0, speed: 0.055, alpha: 0.055 },
    { ax: 0.82, ay: 0.48, rx: 0.42, ry: 0.46, phase: 2.4, speed: 0.042, alpha: 0.036 },
    { ax: 0.18, ay: 0.58, rx: 0.44, ry: 0.4, phase: 4.1, speed: 0.048, alpha: 0.032 },
    { ax: 0.48, ay: 0.82, rx: 0.48, ry: 0.34, phase: 1.2, speed: 0.038, alpha: 0.028 },
    { ax: 0.62, ay: 0.38, rx: 0.28, ry: 0.26, phase: 3.6, speed: 0.062, alpha: 0.024 }
  ];

  if (narrow) blobs = blobs.slice(0, 3);

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function blobAt(blob, t, w, h) {
    var drift = reduced ? 0 : t;
    return {
      x: (blob.ax + Math.sin(drift * blob.speed + blob.phase) * 0.09) * w,
      y: (blob.ay + Math.cos(drift * blob.speed * 0.82 + blob.phase * 1.15) * 0.07) * h,
      rx: blob.rx * w * (1 + Math.sin(drift * 0.12 + blob.phase) * 0.06),
      ry: blob.ry * h * (1 + Math.cos(drift * 0.1 + blob.phase) * 0.05)
    };
  }

  function paint() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var t = Date.now() * 0.001;

    ctx.fillStyle = '#070707';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach(function (blob) {
      var p = blobAt(blob, t, w, h);
      var radius = Math.max(p.rx, p.ry);
      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      grad.addColorStop(0, 'rgba(' + glowInner + ', ' + blob.alpha + ')');
      grad.addColorStop(0.42, 'rgba(' + glowMid + ', ' + (blob.alpha * 0.28) + ')');
      grad.addColorStop(1, 'rgba(' + glowInner + ', 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';

    var keyLight = ctx.createRadialGradient(w * 0.5, h * 0.08, 0, w * 0.5, h * 0.42, w * 0.72);
    keyLight.addColorStop(0, 'rgba(' + keyTint + ', 0.038)');
    keyLight.addColorStop(0.45, 'rgba(' + keyTint + ', 0.012)');
    keyLight.addColorStop(1, 'rgba(' + keyTint + ', 0)');
    ctx.fillStyle = keyLight;
    ctx.fillRect(0, 0, w, h);

    var vignette = ctx.createRadialGradient(w * 0.5, h * 0.4, w * 0.12, w * 0.5, h * 0.4, w * 0.82);
    vignette.addColorStop(0, 'rgba(7, 7, 7, 0)');
    vignette.addColorStop(0.65, 'rgba(7, 7, 7, 0.22)');
    vignette.addColorStop(1, 'rgba(7, 7, 7, 0.72)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(paint);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(paint);
})();

(function tierMarkBackground() {
  if (document.querySelector('.tier-bg')) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)').matches;
  var fillConfigs = [
    { top: '8%', right: '4%', width: 102, depth: 0.55, phase: 0, amp: 16 },
    { top: '18%', left: '3%', width: 88, depth: 0.48, phase: 1.1, amp: 14 },
    { top: '32%', right: '10%', width: 80, depth: 0.42, phase: 2.3, amp: 12 },
    { bottom: '20%', right: '6%', width: 92, depth: 0.5, phase: 3.5, amp: 15 },
    { bottom: '8%', left: '5%', width: 108, depth: 0.44, phase: 4.7, amp: 16 },
    { top: '46%', left: '9%', width: 72, depth: 0.38, phase: 0.6, amp: 11 },
    { top: '56%', right: '14%', width: 78, depth: 0.34, phase: 1.9, amp: 12 },
    { bottom: '34%', left: '18%', width: 68, depth: 0.3, phase: 2.8, amp: 10 },
    { top: '68%', right: '22%', width: 65, depth: 0.26, phase: 4.1, amp: 9 }
  ];
  var outlineConfigs = [
    { top: '11%', right: '11%', width: 55, depth: 0.6, phase: 0.35, amp: 10 },
    { top: '21%', left: '9%', width: 48, depth: 0.52, phase: 1.55, amp: 9 },
    { top: '35%', right: '16%', width: 42, depth: 0.46, phase: 2.65, amp: 8 },
    { bottom: '23%', right: '12%', width: 50, depth: 0.54, phase: 3.75, amp: 9 },
    { bottom: '11%', left: '10%', width: 58, depth: 0.48, phase: 4.95, amp: 10 },
    { top: '49%', left: '13%', width: 40, depth: 0.42, phase: 0.95, amp: 8 },
    { top: '59%', right: '19%', width: 38, depth: 0.38, phase: 2.15, amp: 7 },
    { bottom: '37%', left: '23%', width: 35, depth: 0.34, phase: 3.25, amp: 7 },
    { top: '71%', right: '27%', width: 32, depth: 0.3, phase: 4.45, amp: 6 }
  ];

  function tagMarkPaths(svg, variant) {
    var paths = svg.querySelectorAll('path');
    if (paths.length >= 2) {
      paths[0].setAttribute('class', 'tier-mark-bottom');
      paths[1].setAttribute('class', 'tier-mark-top');
    }
    paths.forEach(function (p) {
      if (variant === 'outline') {
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', 'currentColor');
        if (!p.getAttribute('stroke-width')) p.setAttribute('stroke-width', '16');
        p.setAttribute('stroke-linejoin', 'round');
        p.setAttribute('stroke-linecap', 'round');
      } else {
        p.setAttribute('fill', 'currentColor');
        p.removeAttribute('stroke');
        p.removeAttribute('stroke-width');
      }
    });
    return svg.outerHTML;
  }

  function prepareMarkSvg(svgText, variant) {
    var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    var svg = doc.documentElement;
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('aria-hidden', 'true');
    return tagMarkPaths(svg, variant || 'fill');
  }

  function mountOrbit(root, cfg, markSvg, variant) {
    var el = document.createElement('div');
    el.className = 'tier-bg-orbit tier-bg-orbit--' + variant;
    el.style.width = cfg.width + 'px';
    if (cfg.top) el.style.top = cfg.top;
    if (cfg.bottom) el.style.bottom = cfg.bottom;
    if (cfg.left) el.style.left = cfg.left;
    if (cfg.right) el.style.right = cfg.right;
    el.dataset.depth = cfg.depth;
    el.dataset.phase = cfg.phase;
    el.dataset.amp = cfg.amp;
    el.innerHTML = markSvg;
    root.appendChild(el);
  }

  function mountBackground(fillSvg, outlineSvg) {
    var root = document.createElement('div');
    root.className = 'tier-bg';
    root.setAttribute('aria-hidden', 'true');

    var fills = narrow ? fillConfigs.slice(0, 3) : fillConfigs;
    var outlines = narrow ? outlineConfigs.slice(0, 2) : outlineConfigs;

    fills.forEach(function (cfg) {
      mountOrbit(root, cfg, fillSvg, 'fill');
    });
    outlines.forEach(function (cfg) {
      mountOrbit(root, cfg, outlineSvg, 'outline');
    });

    document.body.insertBefore(root, document.body.firstChild);

    if (reduced) return;

    var orbitNodes = root.querySelectorAll('.tier-bg-orbit');
    var px = 0;
    var py = 0;
    var tx = 0;
    var ty = 0;
    var coarse = window.matchMedia('(pointer: coarse)').matches;

    function parallax() {
      var t = Date.now() * 0.001;
      tx += (px - tx) * 0.09;
      ty += (py - ty) * 0.09;
      orbitNodes.forEach(function (node) {
        var depth = parseFloat(node.dataset.depth) || 0.3;
        var phase = parseFloat(node.dataset.phase) || 0;
        var amp = narrow ? (parseFloat(node.dataset.amp) || 10) * 0.6 : (parseFloat(node.dataset.amp) || 10);
        var idleX = Math.sin(t * 0.55 + phase) * amp;
        var idleY = Math.cos(t * 0.48 + phase * 1.3) * amp;
        var rot = Math.sin(t * 0.35 + phase) * (narrow ? 2 : 3.5);
        var mx = tx * depth + idleX;
        var my = ty * depth + idleY;
        node.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) rotate(' + rot + 'deg)';
      });
      root.style.setProperty('--tier-scroll', window.scrollY + 'px');
      requestAnimationFrame(parallax);
    }

    if (!coarse && !narrow) {
      window.addEventListener('mousemove', function (e) {
        px = (e.clientX / window.innerWidth - 0.5) * 56;
        py = (e.clientY / window.innerHeight - 0.5) * 44;
      }, { passive: true });
    }

    window.addEventListener('scroll', function () {
      root.style.setProperty('--tier-scroll', window.scrollY + 'px');
    }, { passive: true });

    requestAnimationFrame(parallax);
  }

  Promise.all([
    fetch('/assets/img/logo.svg').then(function (res) {
      if (!res.ok) throw new Error('logo.svg not found');
      return res.text();
    }),
    fetch('/assets/img/logo-outline.svg').then(function (res) {
      if (!res.ok) throw new Error('logo-outline.svg not found');
      return res.text();
    })
  ]).then(function (results) {
    mountBackground(
      prepareMarkSvg(results[0], 'fill'),
      prepareMarkSvg(results[1], 'outline')
    );
  }).catch(function () {});
})();

/* Games page gallery */
window.tierInitGamesMedia = function () {
  if (!document.body || !document.body.classList.contains('games-page')) return;

  (function gallery() {
    var root = document.getElementById('gamesGallery');
    var main = document.getElementById('gamesGalleryMain');
    var thumbsWrap = root && root.querySelector('.games-gallery-thumbs');
    var progressBar = document.getElementById('gamesGalleryProgress');
    if (!root || !main || !thumbsWrap) return;

    var candidates = [
      { src: '/assets/img/game/keep-chaos-ss-1.png', alt: 'Keep Chaos — nighttime forest combat with wolf-hooded hero', label: 'Screenshot 1' },
      { src: '/assets/img/game/keep-chaos-ss-2.png', alt: 'Keep Chaos — swarm combat around a stone pillar', label: 'Screenshot 2' },
      { src: '/assets/img/game/keep-chaos-ss-3.png', alt: 'Keep Chaos — co-op bullet hell with damage numbers', label: 'Screenshot 3' },
      { src: '/assets/img/game/keep-chaos-ss-4.png', alt: 'Keep Chaos — ability ring and magenta dash trail', label: 'Screenshot 4' },
      { src: '/assets/img/game/keep-chaos-ss-5.png', alt: 'Keep Chaos — fighting ghosts with AOE circles', label: 'Screenshot 5' },
      { src: '/assets/img/game/keep-chaos-ss-6.png', alt: 'Keep Chaos — Wishlist now on Steam', label: 'Wishlist' }
    ];
    var AUTO_MS = 5000;
    var autoTimer = null;
    var activeIndex = 0;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function probe(item) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.onload = function () { resolve(item); };
        img.onerror = function () { resolve(null); };
        img.src = item.src;
      });
    }

    function thumbs() {
      return thumbsWrap.querySelectorAll('.games-gallery-thumb');
    }

    function resetProgress() {
      if (!progressBar) return;
      progressBar.classList.remove('is-running');
      progressBar.style.removeProperty('--auto-ms');
      void progressBar.offsetWidth;
    }

    function restartProgress() {
      if (!progressBar) return;
      resetProgress();
      if (reduced || document.hidden || thumbs().length < 2) return;
      progressBar.style.setProperty('--auto-ms', AUTO_MS + 'ms');
      progressBar.classList.add('is-running');
    }

    function setActive(btn, index) {
      if (!btn || !btn.dataset.src) return;
      var stage = root.querySelector('.games-gallery-stage');
      var list = thumbs();
      if (typeof index === 'number') activeIndex = index;
      else {
        for (var i = 0; i < list.length; i++) {
          if (list[i] === btn) { activeIndex = i; break; }
        }
      }
      list.forEach(function (el) {
        var on = el === btn;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (stage) stage.classList.add('is-switching');
      window.setTimeout(function () {
        main.src = btn.dataset.src;
        main.alt = btn.dataset.alt || 'Keep Chaos';
        if (stage) stage.classList.remove('is-switching');
      }, 160);
    }

    function nextSlide() {
      var list = thumbs();
      if (list.length < 2) return;
      var next = (activeIndex + 1) % list.length;
      setActive(list[next], next);
      restartProgress();
    }

    function stopAuto() {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
      resetProgress();
    }

    function startAuto() {
      stopAuto();
      if (reduced || document.hidden || thumbs().length < 2) return;
      restartProgress();
      autoTimer = window.setInterval(nextSlide, AUTO_MS);
    }

    function render(items) {
      if (!items.length) return;
      thumbsWrap.innerHTML = '';
      items.forEach(function (item, index) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'games-gallery-thumb' + (index === 0 ? ' is-active' : '');
        btn.setAttribute('role', 'listitem');
        btn.setAttribute('data-cursor', 'hover');
        btn.dataset.src = item.src;
        btn.dataset.alt = item.alt;
        btn.setAttribute('aria-label', item.label);
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
        btn.innerHTML = '<img src="' + item.src + '" alt="" loading="lazy" />';
        btn.addEventListener('click', function () {
          setActive(btn, index);
          startAuto();
        });
        thumbsWrap.appendChild(btn);
      });
      activeIndex = 0;
      main.src = items[0].src;
      main.alt = items[0].alt;
      startAuto();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAuto();
      else startAuto();
    });

    Promise.all(candidates.map(probe)).then(function (results) {
      var seen = {};
      var items = results.filter(function (item) {
        if (!item || seen[item.src]) return false;
        seen[item.src] = true;
        return true;
      });
      render(items);
    });

    window.tierOnPageLeave(function () {
      stopAuto();
    });
  })();
};

/* Press kit previews (/press) */
window.tierInitGamesPress = function () {
  var section = document.querySelector('.games-press');
  var root = section && section.querySelector('.games-press-media');
  var lightbox = document.getElementById('gamesPressLightbox');
  if (!root || !lightbox) return;
  var zipBtn = section.querySelector('[data-press-zip]');
  var zipLabel = zipBtn && zipBtn.querySelector('[data-i18n="games.press.downloadAll"]');

  var imgEl = document.getElementById('gamesPressLightboxImg');
  var titleEl = document.getElementById('gamesPressLightboxTitle');
  var sizeEl = document.getElementById('gamesPressLightboxSize');
  var dlEl = document.getElementById('gamesPressLightboxDl');
  var openBtn = null;
  var imageCache = {};

  function t(key, fallback) {
    return (window.tierI18n && window.tierI18n.t(key)) || fallback;
  }

  function toneLabel(tone) {
    return tone === 'black' ? 'Black' : 'White';
  }

  function currentFormat(preview) {
    return (preview && preview.getAttribute('data-press-format') === 'svg') ? 'svg' : 'png';
  }

  function fileNameFor(base, tone, format) {
    var ext = format === 'svg' ? '.svg' : '.png';
    return base + '-' + toneLabel(tone) + ext;
  }

  function logoSizeText(preview, format) {
    if (format === 'svg') return preview.getAttribute('data-press-size-svg') || 'Vector · SVG';
    return preview.getAttribute('data-press-size') || '1024 × 1024 · PNG';
  }

  function syncLogoUi(asset) {
    var preview = asset.querySelector('.games-press-preview');
    var dl = asset.querySelector('.games-press-asset-dl');
    var capSize = asset.querySelector('.games-press-asset-size');
    var base = preview && preview.getAttribute('data-press-filename');
    if (!preview || !base) return;
    var tone = preview.getAttribute('data-press-color') || 'white';
    var format = currentFormat(preview);
    var name = fileNameFor(base, tone, format);
    var size = logoSizeText(preview, format);
    if (dl) dl.setAttribute('download', name);
    if (capSize) capSize.textContent = size;
    if (openBtn === preview) {
      if (sizeEl) {
        sizeEl.textContent = size;
        sizeEl.hidden = !size;
      }
      if (dlEl) dlEl.setAttribute('download', name);
    }
  }

  function variantFileName(base, variant) {
    return base + '-' + variant + '.png';
  }

  function setAssetVariant(asset, variant) {
    var preview = asset.querySelector('.games-press-preview');
    var img = preview && preview.querySelector('.games-press-preview-img');
    var dl = asset.querySelector('.games-press-asset-dl');
    var base = preview && preview.getAttribute('data-press-filename');
    var src = preview && preview.getAttribute('data-press-src-' + variant);
    if (!preview || !src || !base) return;

    preview.setAttribute('data-press-variant', variant);
    preview.setAttribute('data-press-src', src);
    if (img) img.src = src;

    asset.querySelectorAll('[data-press-variant]').forEach(function (btn) {
      if (!btn.classList.contains('games-press-tone')) return;
      var active = btn.getAttribute('data-press-variant') === variant;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (dl) {
      dl.href = src;
      dl.setAttribute('download', variantFileName(base, variant));
    }

    if (openBtn === preview && imgEl) {
      imgEl.src = src;
      imgEl.classList.remove('is-tone-black');
      if (dlEl) {
        dlEl.href = src;
        dlEl.setAttribute('download', variantFileName(base, variant));
        dlEl.removeAttribute('data-press-colored-dl');
      }
    }
  }

  function loadImage(src) {
    if (imageCache[src]) return imageCache[src];
    imageCache[src] = new Promise(function (resolve, reject) {
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
    return imageCache[src];
  }

  function recolorLogo(img, tone) {
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    if (!canvas.width || !canvas.height) return null;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = data.data;
    var target = tone === 'black' ? 0 : 255;
    var opaque = 0;
    var transish = 0;
    for (var i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 24) transish += 1;
      else opaque += 1;
    }
    var knockOutBg = opaque > transish;
    for (i = 0; i < pixels.length; i += 4) {
      var a = pixels[i + 3];
      var lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      pixels[i] = target;
      pixels[i + 1] = target;
      pixels[i + 2] = target;
      if (knockOutBg) {
        var punched = Math.max(0, Math.min(255, (lum - 18) * (255 / 210)));
        pixels[i + 3] = Math.round(punched * (a / 255));
      } else {
        pixels[i + 3] = a;
      }
    }
    ctx.putImageData(data, 0, 0);
    return canvas;
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function downloadCanvas(canvas, filename) {
    return new Promise(function (resolve) {
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          if (!blob) {
            resolve(false);
            return;
          }
          downloadBlob(blob, filename);
          resolve(true);
        }, 'image/png');
        return;
      }
      var a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      resolve(true);
    });
  }

  var textCache = {};

  function fetchText(url) {
    if (textCache[url]) return textCache[url];
    textCache[url] = fetch(url).then(function (res) {
      if (!res.ok) throw new Error('fetch');
      return res.text();
    });
    return textCache[url];
  }

  function recolorSvgText(svgText, tone) {
    var color = tone === 'black' ? '#000000' : '#FFFFFF';
    return svgText
      .replace(/fill="white"/gi, 'fill="' + color + '"')
      .replace(/fill="#fff(?:fff)?"/gi, 'fill="' + color + '"');
  }

  function revokePreviewUrl(preview) {
    var url = preview.getAttribute('data-press-preview-url');
    if (!url) return;
    URL.revokeObjectURL(url);
    preview.removeAttribute('data-press-preview-url');
  }

  function applyTonePreview(preview, tone) {
    var img = preview.querySelector('.games-press-preview-img');
    var src = preview.getAttribute('data-press-src');
    if (!img || !src) return Promise.resolve(null);

    revokePreviewUrl(preview);
    img.src = src;
    img.style.filter = tone === 'black' ? 'brightness(0)' : 'none';
    return Promise.resolve(src);
  }

  function setAssetTone(asset, tone) {
    var preview = asset.querySelector('.games-press-preview');
    var base = preview && preview.getAttribute('data-press-filename');
    if (!preview || !base) return;

    preview.setAttribute('data-press-color', tone);
    preview.classList.toggle('is-tone-white', tone === 'white');
    preview.classList.toggle('is-tone-black', tone === 'black');

    asset.querySelectorAll('[data-press-tone]').forEach(function (btn) {
      var active = btn.getAttribute('data-press-tone') === tone;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    syncLogoUi(asset);

    applyTonePreview(preview, tone).then(function (url) {
      if (openBtn !== preview || !imgEl) return;
      if (url) {
        imgEl.src = url;
        imgEl.style.filter = tone === 'black' ? 'brightness(0)' : 'none';
      }
      imgEl.classList.toggle('is-on-light', tone === 'black');
      imgEl.classList.remove('is-tone-black');
      syncLogoUi(asset);
    });
  }

  function setAssetFormat(asset, format) {
    var preview = asset.querySelector('.games-press-preview');
    if (!preview) return;
    if (format === 'svg' && !preview.getAttribute('data-press-svg')) format = 'png';
    if (format !== 'svg' && format !== 'png') return;
    preview.setAttribute('data-press-format', format);
    asset.querySelectorAll('[data-press-format]').forEach(function (btn) {
      if (!btn.classList.contains('games-press-tone')) return;
      var active = btn.getAttribute('data-press-format') === format;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    syncLogoUi(asset);
  }

  function close() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('is-press-lightbox-open');
    if (imgEl) {
      imgEl.removeAttribute('src');
      imgEl.alt = '';
      imgEl.style.filter = 'none';
      imgEl.classList.remove('is-tone-black');
      imgEl.classList.remove('is-on-light');
    }
    if (openBtn) {
      openBtn.focus();
      openBtn = null;
    }
  }

  function openFrom(btn) {
    var src = btn.getAttribute('data-press-src');
    if (!src || !imgEl || !dlEl || !titleEl) return;
    var titleKey = btn.getAttribute('data-press-title-key') || '';
    var fallbackTitle =
      titleKey === 'games.press.dlStudioLogo' ? 'Tier Studios logo' :
      titleKey === 'games.press.dlLogo' ? 'Keep Chaos logo' :
      'Key art';
    var title = t(titleKey, fallbackTitle);
    var tone = btn.getAttribute('data-press-color') || 'white';
    var variant = btn.getAttribute('data-press-variant') || '';
    var base = btn.getAttribute('data-press-filename') || '';
    var colorable = !!btn.closest('[data-press-colorable]');
    var variantable = !!btn.closest('[data-press-variantable]');
    var downloadHref = btn.getAttribute('data-press-download') || src;
    var filename = '';
    var size = btn.getAttribute('data-press-size') || '';
    if (colorable && base) {
      filename = fileNameFor(base, tone, currentFormat(btn));
      size = logoSizeText(btn, currentFormat(btn));
    } else if (variantable && base && variant) filename = variantFileName(base, variant);
    else if (base && base.indexOf('.png') !== -1) filename = base;

    openBtn = btn;
    titleEl.textContent = title;
    if (sizeEl) {
      sizeEl.textContent = size;
      sizeEl.hidden = !size;
    }
    imgEl.src = src;
    imgEl.alt = title;
    imgEl.style.filter = (colorable && tone === 'black') ? 'brightness(0)' : 'none';
    imgEl.classList.remove('is-tone-black');
    imgEl.classList.toggle('is-on-light', colorable && tone === 'black');
    dlEl.href = downloadHref;
    if (filename) dlEl.setAttribute('download', filename);
    else dlEl.removeAttribute('download');
    dlEl.textContent = t('games.press.download', 'Download');
    dlEl.toggleAttribute('data-press-colored-dl', colorable);

    lightbox.hidden = false;
    document.body.classList.add('is-press-lightbox-open');
    var closeBtn = lightbox.querySelector('[data-press-close].games-press-lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  function handleColoredDownload(link, asset) {
    var preview = asset.querySelector('.games-press-preview');
    if (!preview) return false;
    var src = preview.getAttribute('data-press-src');
    var svgSrc = preview.getAttribute('data-press-svg');
    var base = preview.getAttribute('data-press-filename');
    var tone = preview.getAttribute('data-press-color') || 'white';
    var format = currentFormat(preview);
    if (!src || !base) return false;

    link.setAttribute('aria-busy', 'true');
    var job = (format === 'svg' && svgSrc)
      ? fetchText(svgSrc).then(function (text) {
          downloadBlob(
            new Blob([recolorSvgText(text, tone)], { type: 'image/svg+xml;charset=utf-8' }),
            fileNameFor(base, tone, 'svg')
          );
          return true;
        })
      : loadImage(src).then(function (img) {
          var canvas = recolorLogo(img, tone);
          if (!canvas) return false;
          return downloadCanvas(canvas, fileNameFor(base, tone, 'png'));
        });

    job.catch(function () {
      return false;
    }).then(function (ok) {
      link.removeAttribute('aria-busy');
      if (!ok) {
        var a = document.createElement('a');
        a.href = src;
        a.download = fileNameFor(base, tone, 'png');
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
    return true;
  }

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function u16(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255]);
  }

  function u32(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
  }

  function concatBytes(parts) {
    var len = 0;
    var i;
    for (i = 0; i < parts.length; i++) len += parts[i].length;
    var out = new Uint8Array(len);
    var offset = 0;
    for (i = 0; i < parts.length; i++) {
      out.set(parts[i], offset);
      offset += parts[i].length;
    }
    return out;
  }

  function zipStore(files) {
    var encoder = new TextEncoder();
    var locals = [];
    var centrals = [];
    var offset = 0;
    for (var i = 0; i < files.length; i++) {
      var name = encoder.encode(files[i].name);
      var data = files[i].data;
      var crc = crc32(data);
      var size = data.length;
      var local = concatBytes([
        u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(crc), u32(size), u32(size), u16(name.length), u16(0), name, data
      ]);
      var central = concatBytes([
        u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(crc), u32(size), u32(size), u16(name.length), u16(0), u16(0), u16(0),
        u16(0), u32(0), u32(offset), name
      ]);
      locals.push(local);
      centrals.push(central);
      offset += local.length;
    }
    var centralDir = concatBytes(centrals);
    var eocd = concatBytes([
      u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
      u32(centralDir.length), u32(offset), u16(0)
    ]);
    return concatBytes(locals.concat([centralDir, eocd]));
  }

  function canvasToBytes(canvas) {
    return new Promise(function (resolve, reject) {
      if (!canvas || !canvas.toBlob) {
        reject(new Error('canvas'));
        return;
      }
      canvas.toBlob(function (blob) {
        if (!blob) {
          reject(new Error('blob'));
          return;
        }
        blob.arrayBuffer().then(function (buf) {
          resolve(new Uint8Array(buf));
        }).catch(reject);
      }, 'image/png');
    });
  }

  function fetchBytes(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('fetch');
      return res.arrayBuffer();
    }).then(function (buf) {
      return new Uint8Array(buf);
    });
  }

  function logoToneBytes(src, tone) {
    return loadImage(src).then(function (img) {
      var canvas = recolorLogo(img, tone);
      if (!canvas) throw new Error('recolor');
      return canvasToBytes(canvas);
    });
  }

  function pressKitReadme() {
    var text =
      'TIER STUDIOS — PRESS KIT\n' +
      'https://tierstudios.com/press\n\n' +
      'Keep Chaos\n' +
      'Genre: TPS · Survivor-like · Bullet Heaven · Rogue-Lite\n' +
      'Platform: Steam (PC)\n' +
      'Store: https://store.steampowered.com/app/3791920/Keep_Chaos/\n' +
      'Trailer: https://www.youtube.com/watch?v=VDieXeRXhK0\n' +
      'Developer / Publisher: Tier Studios\n' +
      'Press: info@tierstudios.com\n\n' +
      'Included\n' +
      'logos/\n' +
      '  TierStudios-Logo-White.png\n' +
      '  TierStudios-Logo-White.svg\n' +
      '  TierStudios-Logo-Black.png\n' +
      '  TierStudios-Logo-Black.svg\n' +
      '  KeepChaos-Logo-White.png\n' +
      '  KeepChaos-Logo-White.svg\n' +
      '  KeepChaos-Logo-Black.png\n' +
      '  KeepChaos-Logo-Black.svg\n' +
      'key-art/\n' +
      '  KeepChaos-KeyArt-1.png\n' +
      '  KeepChaos-KeyArt-2.png\n\n' +
      'Usage\n' +
      'Keep logos intact. Do not stretch, recolor, or add effects.\n' +
      'Use the white logo on dark backgrounds and the black logo on light backgrounds.\n';
    return new TextEncoder().encode(text);
  }

  function setZipBusy(busy) {
    if (!zipBtn) return;
    zipBtn.disabled = !!busy;
    zipBtn.setAttribute('aria-busy', busy ? 'true' : 'false');
    if (!zipLabel) return;
    zipLabel.textContent = busy
      ? t('games.press.downloadAllBusy', 'Preparing zip…')
      : t('games.press.downloadAll', 'Download all (.zip)');
  }

  function formatBytes(bytes) {
    if (!bytes || bytes < 1) return '';
    if (bytes >= 1024 * 1024) {
      var mb = bytes / (1024 * 1024);
      var rounded = mb >= 10 ? mb.toFixed(0) : mb.toFixed(1).replace(/\.0$/, '');
      return rounded + ' MB';
    }
    return Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  function setZipSizeLabel(bytes) {
    var el = section.querySelector('[data-press-zip-size]');
    if (!el || !bytes) return;
    el.textContent = ' · ' + formatBytes(bytes);
  }

  function downloadZipBytes(bytes, filename) {
    var blob = new Blob([bytes], { type: 'application/zip' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function buildPressZip() {
    var jobs = [
      Promise.resolve({ name: 'README.txt', data: pressKitReadme() })
    ];

    root.querySelectorAll('[data-press-colorable]').forEach(function (asset) {
      var preview = asset.querySelector('.games-press-preview');
      var src = preview && preview.getAttribute('data-press-src');
      var svgSrc = preview && preview.getAttribute('data-press-svg');
      var base = preview && preview.getAttribute('data-press-filename');
      if (!src || !base) return;
      jobs.push(logoToneBytes(src, 'white').then(function (data) {
        return { name: 'logos/' + fileNameFor(base, 'white', 'png'), data: data };
      }));
      jobs.push(logoToneBytes(src, 'black').then(function (data) {
        return { name: 'logos/' + fileNameFor(base, 'black', 'png'), data: data };
      }));
      if (!svgSrc) return;
      jobs.push(fetchText(svgSrc).then(function (text) {
        return {
          name: 'logos/' + fileNameFor(base, 'white', 'svg'),
          data: new TextEncoder().encode(recolorSvgText(text, 'white'))
        };
      }));
      jobs.push(fetchText(svgSrc).then(function (text) {
        return {
          name: 'logos/' + fileNameFor(base, 'black', 'svg'),
          data: new TextEncoder().encode(recolorSvgText(text, 'black'))
        };
      }));
    });

    root.querySelectorAll('[data-press-variantable]').forEach(function (asset) {
      var preview = asset.querySelector('.games-press-preview');
      var base = preview && preview.getAttribute('data-press-filename');
      if (!preview || !base) return;
      for (var n = 1; n <= 9; n++) {
        var src = preview.getAttribute('data-press-src-' + n);
        if (!src) continue;
        (function (fileSrc, fileName) {
          jobs.push(fetchBytes(fileSrc).then(function (data) {
            return { name: fileName, data: data };
          }));
        })(src, 'key-art/' + variantFileName(base, String(n)));
      }
    });

    return Promise.all(jobs).then(function (files) {
      return zipStore(files);
    });
  }

  root.addEventListener('click', function (e) {
    var variantBtn = e.target.closest('[data-press-variant].games-press-tone');
    if (variantBtn && root.contains(variantBtn)) {
      e.preventDefault();
      var variantAsset = variantBtn.closest('[data-press-variantable]');
      var variant = variantBtn.getAttribute('data-press-variant');
      if (variantAsset && variant) setAssetVariant(variantAsset, variant);
      return;
    }

    var formatBtn = e.target.closest('[data-press-format].games-press-tone');
    if (formatBtn && root.contains(formatBtn)) {
      e.preventDefault();
      var formatAsset = formatBtn.closest('[data-press-colorable]');
      var format = formatBtn.getAttribute('data-press-format');
      if (formatAsset && format) setAssetFormat(formatAsset, format);
      return;
    }

    var toneBtn = e.target.closest('[data-press-tone]');
    if (toneBtn && root.contains(toneBtn)) {
      e.preventDefault();
      var asset = toneBtn.closest('[data-press-colorable]');
      var tone = toneBtn.getAttribute('data-press-tone');
      if (asset && tone) setAssetTone(asset, tone);
      return;
    }

    var dl = e.target.closest('.games-press-asset-dl');
    if (dl && root.contains(dl)) {
      var coloredAsset = dl.closest('[data-press-colorable]');
      if (coloredAsset) {
        e.preventDefault();
        handleColoredDownload(dl, coloredAsset);
        return;
      }
    }

    var btn = e.target.closest('.games-press-preview');
    if (!btn || !root.contains(btn)) return;
    openFrom(btn);
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target.closest('[data-press-close]')) {
      close();
      return;
    }
    if (e.target.closest('#gamesPressLightboxDl') && openBtn) {
      var asset = openBtn.closest('[data-press-colorable]');
      if (asset) {
        e.preventDefault();
        handleColoredDownload(dlEl, asset);
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  root.querySelectorAll('[data-press-colorable]').forEach(function (asset) {
    setAssetTone(asset, 'white');
    setAssetFormat(asset, currentFormat(asset.querySelector('.games-press-preview')));
  });

  if (zipBtn) {
    zipBtn.addEventListener('click', function () {
      if (zipBtn.disabled) return;
      setZipBusy(true);
      buildPressZip().then(function (bytes) {
        setZipSizeLabel(bytes.length);
        downloadZipBytes(bytes, 'TierStudios-PressKit.zip');
      }).catch(function () {
        window.alert(t('games.press.downloadAllError', 'Could not build the zip. Try again.'));
      }).then(function () {
        setZipBusy(false);
      });
    });
  }

  (function initPressPlayer() {
    var player = section.querySelector('[data-press-player]');
    if (!player) return;
    var video = player.querySelector('video');
    var bigPlay = player.querySelector('[data-press-play-big]');
    var playBtn = player.querySelector('[data-press-play]');
    var muteBtn = player.querySelector('[data-press-mute]');
    var fsBtn = player.querySelector('[data-press-fs]');
    var progress = player.querySelector('[data-press-progress]');
    var volume = player.querySelector('[data-press-volume]');
    var timeEl = player.querySelector('[data-press-time]');
    if (!video) return;

    video.volume = 0.85;
    video.muted = false;

    function icon(el, name) {
      if (!el) return;
      el.innerHTML = '<i class="fas fa-' + name + '" aria-hidden="true"></i>';
    }

    function fmtTime(s) {
      s = Math.max(0, Math.floor(s || 0));
      var m = Math.floor(s / 60);
      var r = s % 60;
      return m + ':' + (r < 10 ? '0' : '') + r;
    }

    function paintRange(el, pct) {
      if (!el) return;
      var p = Math.max(0, Math.min(100, pct));
      el.style.background =
        'linear-gradient(to right, #d7c9f2 ' + p + '%, rgba(255,255,255,0.16) ' + p + '%)';
    }

    function syncPlay() {
      var playing = !video.paused && !video.ended;
      player.classList.toggle('is-playing', playing);
      icon(playBtn, playing ? 'pause' : 'play');
      if (bigPlay) {
        bigPlay.setAttribute('aria-label', playing ? 'Pause' : t('games.press.viewTrailerAria', 'Play trailer'));
        icon(bigPlay, 'play');
      }
    }

    function syncTime() {
      var dur = video.duration;
      var cur = video.currentTime || 0;
      if (timeEl) {
        timeEl.textContent = isFinite(dur) && dur > 0 ? fmtTime(cur) + ' / ' + fmtTime(dur) : fmtTime(cur);
      }
      if (progress && isFinite(dur) && dur > 0 && progress !== document.activeElement) {
        progress.value = String(Math.round((cur / dur) * 1000));
        paintRange(progress, (cur / dur) * 100);
      }
    }

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    }

    function toggleMute() {
      video.muted = !video.muted;
      if (!video.muted && video.volume === 0) video.volume = 0.85;
      icon(muteBtn, video.muted || video.volume === 0 ? 'volume-xmark' : (video.volume < 0.4 ? 'volume-low' : 'volume-high'));
      if (volume) {
        volume.value = String(Math.round((video.muted ? 0 : video.volume) * 100));
        paintRange(volume, video.muted ? 0 : video.volume * 100);
      }
    }

    playBtn && playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePlay();
    });
    bigPlay && bigPlay.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePlay();
    });
    video.addEventListener('click', function () {
      togglePlay();
    });
    muteBtn && muteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMute();
    });
    fsBtn && fsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var node = player;
      if (!document.fullscreenElement) {
        if (node.requestFullscreen) node.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
    progress && progress.addEventListener('input', function () {
      if (!isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = (Number(progress.value) / 1000) * video.duration;
      paintRange(progress, Number(progress.value) / 10);
    });
    volume && volume.addEventListener('input', function () {
      var v = Number(volume.value) / 100;
      video.volume = v;
      video.muted = v === 0;
      paintRange(volume, v * 100);
      icon(muteBtn, video.muted || v === 0 ? 'volume-xmark' : (v < 0.4 ? 'volume-low' : 'volume-high'));
    });

    video.addEventListener('play', syncPlay);
    video.addEventListener('pause', syncPlay);
    video.addEventListener('ended', function () {
      player.classList.remove('is-playing');
      syncPlay();
    });
    video.addEventListener('timeupdate', syncTime);
    video.addEventListener('loadedmetadata', syncTime);
    video.addEventListener('volumechange', function () {
      if (!volume || volume === document.activeElement) return;
      volume.value = String(Math.round((video.muted ? 0 : video.volume) * 100));
      paintRange(volume, video.muted ? 0 : video.volume * 100);
    });

    paintRange(progress, 0);
    paintRange(volume, 85);
    syncPlay();
  })();
};

window.tierInitNews = function () {
  var root = document.querySelector('.news-feed');
  if (!root) return;

  var filters = root.querySelectorAll('[data-news-filter]');
  var cards = root.querySelectorAll('[data-news-type]');
  var empty = root.querySelector('[data-news-empty]');
  if (!filters.length || !cards.length) return;

  function applyFilter(type) {
    var visible = 0;
    cards.forEach(function (card) {
      var show = type === 'all' || card.getAttribute('data-news-type') === type;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-news-filter') || 'all';
      filters.forEach(function (other) {
        var active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      applyFilter(type);
    });
  });

  applyFilter('all');
};

/* Keep Chaos leaderboard (/games/stats) */
window.tierInitGamesLb = function () {
  if (!document.body || !document.body.classList.contains('games-stats-page')) return;

  var listEl = document.getElementById('gamesLbList');
  var emptyEl = document.getElementById('gamesLbEmpty');
  var demoEl = document.getElementById('gamesLbDemo');
  var podiumEl = document.getElementById('gamesLbPodium');
  var timerValueEl = document.getElementById('gamesLbTimerValue');
  var refreshValueEl = document.getElementById('gamesLbRefreshValue');
  var tabs = document.querySelectorAll('.games-lb-tab');
  if (!listEl || !tabs.length) return;

  var NAME_CYCLE_MS = 3000;
  var DEFAULT_CYCLE_HOURS = 150;
  var DEFAULT_REFRESH_HOURS = 24;
  var data = null;
  var activeBoard = 'squad';
  var nameTimer = null;
  var nameTick = 0;
  var countdownTimer = null;
  var lastCycleIndex = -1;
  var lastRefreshIndex = -1;
  var cycleMs = DEFAULT_CYCLE_HOURS * 60 * 60 * 1000;
  var cycleAnchorMs = Date.now();
  var refreshMs = DEFAULT_REFRESH_HOURS * 60 * 60 * 1000;
  var refreshAnchorMs = Date.now();
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var loading = false;

  var AVATAR_HUES = [18, 210, 32, 280, 145, 0, 190, 55, 320, 95];

  function t(key, fallback) {
    return (window.tierI18n && window.tierI18n.t(key)) || fallback;
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatScore(n) {
    var num = Number(n);
    if (!isFinite(num)) return '—';
    return Math.round(num).toLocaleString('en-US');
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function formatCountdown(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    return h + ':' + pad2(m) + ':' + pad2(s);
  }

  function hueFor(name, index) {
    var s = String(name || '');
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 1)) % 360;
    return AVATAR_HUES[index % AVATAR_HUES.length] != null ? AVATAR_HUES[index % AVATAR_HUES.length] : h;
  }

  function initial(name) {
    var s = String(name || '?').trim();
    return (s.charAt(0) || '?').toUpperCase();
  }

  function syncCycleFromData(json) {
    var hours = Number(json && json.cycleHours);
    if (!isFinite(hours) || hours <= 0) hours = DEFAULT_CYCLE_HOURS;
    cycleMs = hours * 60 * 60 * 1000;
    var anchor = json && json.cycleAnchor ? Date.parse(json.cycleAnchor) : NaN;
    cycleAnchorMs = isFinite(anchor) ? anchor : Date.now();

    var refreshHours = Number(json && json.refreshHours);
    if (!isFinite(refreshHours) || refreshHours <= 0) refreshHours = DEFAULT_REFRESH_HOURS;
    refreshMs = refreshHours * 60 * 60 * 1000;
    var refreshAnchor = json && json.refreshAnchor ? Date.parse(json.refreshAnchor) : NaN;
    refreshAnchorMs = isFinite(refreshAnchor) ? refreshAnchor : cycleAnchorMs;
  }

  function cycleState(now) {
    var elapsed = Math.max(0, now - cycleAnchorMs);
    var index = Math.floor(elapsed / cycleMs);
    var into = elapsed % cycleMs;
    var remaining = into === 0 && elapsed > 0 ? 0 : (cycleMs - into);
    if (elapsed === 0) remaining = cycleMs;
    return { index: index, remaining: remaining };
  }

  function refreshState(now) {
    var elapsed = Math.max(0, now - refreshAnchorMs);
    var index = Math.floor(elapsed / refreshMs);
    var into = elapsed % refreshMs;
    var remaining = into === 0 && elapsed > 0 ? 0 : (refreshMs - into);
    if (elapsed === 0) remaining = refreshMs;
    return { index: index, remaining: remaining };
  }

  function updateCountdown() {
    var now = Date.now();
    var state = cycleState(now);
    var refresh = refreshState(now);

    if (timerValueEl) {
      timerValueEl.textContent = formatCountdown(state.remaining);
      timerValueEl.setAttribute('datetime', new Date(now + state.remaining).toISOString());
    }
    if (refreshValueEl) {
      refreshValueEl.textContent = formatCountdown(refresh.remaining);
      refreshValueEl.setAttribute('datetime', new Date(now + refresh.remaining).toISOString());
    }

    var shouldReload = false;
    if (lastCycleIndex >= 0 && state.index !== lastCycleIndex) shouldReload = true;
    if (lastRefreshIndex >= 0 && refresh.index !== lastRefreshIndex) shouldReload = true;
    lastCycleIndex = state.index;
    lastRefreshIndex = refresh.index;
    if (shouldReload) loadBoard(true);
  }

  function stopNameCycle() {
    if (nameTimer) {
      window.clearInterval(nameTimer);
      nameTimer = null;
    }
  }

  function syncVisibleNames() {
    document.querySelectorAll('.games-lb-row, .games-lb-podium-card').forEach(function (row) {
      var raw = row.getAttribute('data-names') || '';
      var names = raw ? raw.split('\u001f') : [];
      if (!names.length) return;
      var idx = names.length > 1 ? (nameTick % names.length) : 0;
      var nameEl = row.querySelector('.games-lb-name, .games-lb-podium-name');
      if (nameEl) nameEl.textContent = names[idx];
      row.querySelectorAll('.games-lb-avatar').forEach(function (av, i) {
        av.classList.toggle('is-focus', names.length > 1 && i === idx);
      });
    });
  }

  function startNameCycle() {
    stopNameCycle();
    nameTick = 0;
    syncVisibleNames();
    if (reduced) return;
    var needsCycle = false;
    document.querySelectorAll('.games-lb-row, .games-lb-podium-card').forEach(function (row) {
      var raw = row.getAttribute('data-names') || '';
      if (raw.split('\u001f').length > 1) needsCycle = true;
    });
    if (!needsCycle) return;
    nameTimer = window.setInterval(function () {
      nameTick += 1;
      syncVisibleNames();
    }, NAME_CYCLE_MS);
  }

  function playerBits(row, i) {
    var rank = row.rank != null ? Number(row.rank) : (i + 1);
    var players = Array.isArray(row.players) ? row.players : [];
    if (!players.length && row.name) players = [{ name: row.name }];
    var names = players.map(function (p) { return (p && p.name) || '—'; });
    var avatars = players.map(function (p, pi) {
      var name = (p && p.name) || '?';
      var src = p && p.avatar;
      if (src) {
        return '<span class="games-lb-avatar" title="' + escapeHtml(name) + '">' +
          '<img src="' + escapeHtml(src) + '" alt="" loading="lazy" /></span>';
      }
      return '<span class="games-lb-avatar games-lb-avatar--initial" title="' + escapeHtml(name) + '" style="--av-hue:' + hueFor(name, pi) + '">' +
        escapeHtml(initial(name)) + '</span>';
    }).join('');
    return { rank: rank, players: players, names: names, avatars: avatars };
  }

  function renderPodium(entries) {
    if (!podiumEl) return;
    var top = entries.slice(0, 3);
    if (top.length < 1) {
      podiumEl.hidden = true;
      podiumEl.innerHTML = '';
      return;
    }

    var byRank = { 1: null, 2: null, 3: null };
    top.forEach(function (row, i) {
      var bits = playerBits(row, i);
      byRank[bits.rank] = { row: row, bits: bits };
    });

    // Visual order: 2 | 1 | 3
    var order = [2, 1, 3];
    var html = order.map(function (rank, orderIndex) {
      var item = byRank[rank];
      if (!item) return '';
      var bits = item.bits;
      var tone = rank === 1 ? 'is-gold' : rank === 2 ? 'is-silver' : 'is-bronze';
      return (
        '<article class="games-lb-podium-card ' + tone + '" style="--podium-i:' + orderIndex + '" data-names="' + escapeHtml(bits.names.join('\u001f')) + '">' +
          '<div class="games-lb-podium-avatars" aria-hidden="true">' + bits.avatars + '</div>' +
          '<p class="games-lb-podium-name">' + escapeHtml(bits.names[0] || '—') + '</p>' +
          '<p class="games-lb-podium-score">' + escapeHtml(formatScore(item.row.score)) + '</p>' +
          '<div class="games-lb-podium-stand">' +
            (rank === 1 ? '<span class="games-lb-podium-rays" aria-hidden="true"></span>' : '') +
            '<span class="games-lb-podium-rank">' + escapeHtml(rank) + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    podiumEl.classList.remove('is-ready');
    podiumEl.innerHTML = html;
    podiumEl.hidden = !html;
    if (html) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          podiumEl.classList.add('is-ready');
        });
      });
    }
  }

  function renderBoard(key) {
    activeBoard = key;
    var entries = (data && data.boards && data.boards[key]) || [];
    entries = entries.slice().sort(function (a, b) {
      return (Number(a.rank) || 999) - (Number(b.rank) || 999);
    }).slice(0, 100);

    tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-board') === key;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    if (!entries.length) {
      stopNameCycle();
      listEl.innerHTML = '';
      listEl.hidden = true;
      if (podiumEl) {
        podiumEl.hidden = true;
        podiumEl.innerHTML = '';
        podiumEl.classList.remove('is-ready');
      }
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    listEl.hidden = false;
    if (emptyEl) emptyEl.hidden = true;
    renderPodium(entries);

    listEl.innerHTML = entries.map(function (row, i) {
      var bits = playerBits(row, i);
      var tone = bits.rank === 1 ? ' is-gold' : bits.rank === 2 ? ' is-silver' : bits.rank === 3 ? ' is-bronze' : '';
      return (
        '<li class="games-lb-row' + tone + '" data-names="' + escapeHtml(bits.names.join('\u001f')) + '">' +
          '<span class="games-lb-rank">' + escapeHtml(bits.rank) + '</span>' +
          '<div class="games-lb-avatars" aria-hidden="true">' + bits.avatars + '</div>' +
          '<span class="games-lb-name">' + escapeHtml(bits.names[0] || '—') + '</span>' +
          '<span class="games-lb-score">' + escapeHtml(formatScore(row.score)) + '</span>' +
        '</li>'
      );
    }).join('');

    startNameCycle();
  }

  function startCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 1000);
  }

  function fetchLeaderboardJson() {
    var liveUrl = 'https://api.tierstudios.com/leaderboard';
    var demoUrl = '/assets/data/keep-chaos-leaderboard.json?v=' + Date.now();
    return fetch(liveUrl, { credentials: 'omit' })
      .then(function (res) {
        if (!res.ok) return Promise.reject(new Error('live_' + res.status));
        return res.json().then(function (json) {
          if (!json || !json.boards) return Promise.reject(new Error('live_shape'));
          return json;
        });
      })
      .catch(function () {
        return fetch(demoUrl).then(function (res) {
          if (!res.ok) return Promise.reject(new Error('demo_' + res.status));
          return res.json();
        });
      });
  }

  function loadBoard(isReset) {
    if (loading) return;
    loading = true;
    fetchLeaderboardJson()
      .then(function (json) {
        data = json;
        syncCycleFromData(json);
        if (demoEl) demoEl.hidden = !json.demo;
        renderBoard(activeBoard);
        if (isReset) {
          var now = Date.now();
          lastCycleIndex = cycleState(now).index;
          lastRefreshIndex = refreshState(now).index;
        }
        startCountdown();
      })
      .catch(function () {
        if (!data) {
          listEl.innerHTML = '';
          listEl.hidden = true;
          if (emptyEl) {
            emptyEl.hidden = false;
            emptyEl.textContent = t('games.stats.empty', 'The board is empty for now · top scores will appear here when runs start counting.');
          }
        }
        startCountdown();
      })
      .then(function () { loading = false; });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-board');
      if (!key || key === activeBoard) return;
      renderBoard(key);
    });
  });

  var onVisibility = function () {
    if (document.hidden) {
      stopNameCycle();
    } else {
      startNameCycle();
      updateCountdown();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  loadBoard(false);

  window.tierOnPageLeave(function () {
    stopNameCycle();
    if (countdownTimer) window.clearInterval(countdownTimer);
    document.removeEventListener('visibilitychange', onVisibility);
  });
};

(function tierCookies() {
  function hasChoice() {
    var v = window.tierAnalytics && window.tierAnalytics.get();
    return v === 'granted' || v === 'denied';
  }

  function mount() {
    if (!document.getElementById('tierCookieUi')) {
      var ui = document.createElement('div');
      ui.id = 'tierCookieUi';
      ui.hidden = true;
      ui.innerHTML =
        '<div class="cookie-overlay" data-cookie-close></div>' +
        '<div class="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookiePanelTitle">' +
          '<button type="button" class="cookie-panel-close" data-cookie-close data-cursor="hover" data-i18n-aria="cookies.panel.close" aria-label="Close">&times;</button>' +
          '<h2 class="cookie-panel-title" id="cookiePanelTitle" data-i18n="cookies.panel.title">Cookie Settings</h2>' +
          '<p class="cookie-panel-desc" data-i18n="cookies.panel.desc">Choose what this site may store besides what it needs to run.</p>' +
          '<div class="cookie-row">' +
            '<div class="cookie-row-copy">' +
              '<span class="cookie-row-name" data-i18n="cookies.panel.necessary">Necessary</span>' +
              '<span class="cookie-row-help" data-i18n="cookies.panel.necessaryDesc">Language and your cookie choice. Always on.</span>' +
            '</div>' +
            '<span class="cookie-switch is-locked" aria-hidden="true"></span>' +
          '</div>' +
          '<label class="cookie-row" for="cookieAnalytics">' +
            '<div class="cookie-row-copy">' +
              '<span class="cookie-row-name" data-i18n="cookies.panel.analytics">Analytics</span>' +
              '<span class="cookie-row-help" data-i18n="cookies.panel.analyticsDesc">Google Analytics · pages visited, only if you allow it.</span>' +
            '</div>' +
            '<input id="cookieAnalytics" class="cookie-switch-input" type="checkbox" />' +
            '<span class="cookie-switch" aria-hidden="true"></span>' +
          '</label>' +
          '<div class="cookie-actions">' +
            '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-reject data-cursor="hover" data-i18n="cookies.panel.reject">Reject analytics</button>' +
            '<button type="button" class="cookie-btn" data-cookie-save data-cursor="hover" data-i18n="cookies.panel.save">Save</button>' +
          '</div>' +
          '<a class="cookie-policy-link" href="/cookies" data-cursor="hover" data-i18n="cookies.panel.policy">Cookie policy</a>' +
        '</div>';
      document.body.appendChild(ui);
    }

    if (!document.getElementById('tierCookieBar')) {
      var bar = document.createElement('div');
      bar.id = 'tierCookieBar';
      bar.className = 'cookie-bar';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-labelledby', 'cookieBarText');
      bar.hidden = true;
      bar.innerHTML =
        '<p class="cookie-bar-text" id="cookieBarText" data-i18n="cookies.bar.text">Necessary storage is always on. Analytics only if you allow it.</p>' +
        '<div class="cookie-bar-actions">' +
          '<a class="cookie-bar-link" href="/cookies" data-cursor="hover" data-i18n="cookies.panel.policy">Cookie policy</a>' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-settings data-cursor="hover" data-i18n="footer.cookieSettings">Cookie Settings</button>' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-reject data-cursor="hover" data-i18n="cookies.bar.reject">Reject</button>' +
          '<button type="button" class="cookie-btn" data-cookie-accept data-cursor="hover" data-i18n="cookies.bar.accept">Accept</button>' +
        '</div>';
      document.body.appendChild(bar);
    }

    if (window.tierI18n && window.tierI18n.applyLang) window.tierI18n.applyLang();
    syncBar();
  }

  function syncToggle() {
    var input = document.getElementById('cookieAnalytics');
    if (!input) return;
    var granted = window.tierAnalytics && window.tierAnalytics.get() === 'granted';
    input.checked = granted;
  }

  function syncBar() {
    var bar = document.getElementById('tierCookieBar');
    var ui = document.getElementById('tierCookieUi');
    var show = !hasChoice() && (!ui || ui.hidden);
    if (bar) bar.hidden = !show;
    document.body.classList.toggle('has-cookie-bar', !!show);
  }

  function open() {
    mount();
    syncToggle();
    var ui = document.getElementById('tierCookieUi');
    if (!ui) return;
    ui.hidden = false;
    document.body.classList.add('is-cookie-open');
    syncBar();
    var closeBtn = ui.querySelector('[data-cookie-close].cookie-panel-close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    var ui = document.getElementById('tierCookieUi');
    if (ui) ui.hidden = true;
    document.body.classList.remove('is-cookie-open');
    syncBar();
  }

  function setConsent(value) {
    if (window.tierAnalytics && window.tierAnalytics.set) window.tierAnalytics.set(value);
    syncToggle();
    close();
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) {
      e.preventDefault();
      open();
      return;
    }
    if (e.target.closest('[data-cookie-accept]')) {
      setConsent('granted');
      return;
    }
    if (e.target.closest('[data-cookie-reject]')) {
      setConsent('denied');
      return;
    }
    var ui = document.getElementById('tierCookieUi');
    if (!ui || ui.hidden) return;
    if (e.target.closest('[data-cookie-close]')) {
      close();
      return;
    }
    if (e.target.closest('[data-cookie-save]')) {
      var input = document.getElementById('cookieAnalytics');
      setConsent(input && input.checked ? 'granted' : 'denied');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.tierOpenCookieSettings = open;
})();

(function tierInstantNav() {
  var CORE = {
    '/': 1,
    '/tools': 1,
    '/games': 1,
    '/news': 1,
    '/team': 1,
    '/contact': 1,
    '/games/stats': 1,
    '/press': 1,
    '/privacy': 1,
    '/cookies': 1
  };
  var cache = {};
  var pending = {};
  var current = '';
  var navigating = false;

  function normPath(path) {
    path = String(path || '/').replace(/index\.html$/i, '');
    path = path.replace(/\/+$/, '') || '/';
    return path;
  }

  function samePage(url) {
    return normPath(url.pathname) === current && !url.hash;
  }

  function isCore(url) {
    if (url.origin !== location.origin) return false;
    return !!CORE[normPath(url.pathname)];
  }

  function parseDoc(html) {
    return new DOMParser().parseFromString(html, 'text/html');
  }

  function isPersistent(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.tagName === 'SCRIPT') return true;
    if (el.id === 'nav' || el.id === 'navLinks') return true;
    if (el.id === 'tierCookieUi' || el.id === 'tierCookieBar') return true;
    if (el.classList.contains('skip-link')) return true;
    if (el.classList.contains('tier-ambience-canvas')) return true;
    if (el.classList.contains('tier-bg')) return true;
    if (el.classList.contains('nav-mobile-backdrop')) return true;
    if (el.id === 'gamesVideoWarm' || el.classList.contains('games-video-warm')) return true;
    return false;
  }

  function snapshot(doc) {
    var nodes = [];
    var child = doc.body.firstElementChild;
    while (child) {
      if (!isPersistent(child)) nodes.push(child.cloneNode(true));
      child = child.nextElementSibling;
    }
    return {
      title: doc.title,
      bodyClass: doc.body.className,
      page: doc.body.getAttribute('data-page') || '',
      nodes: nodes
    };
  }

  function closeMobileNav() {
    var btn = document.getElementById('mobileNavBtn');
    var links = document.getElementById('navLinks');
    var backdrop = document.querySelector('.nav-mobile-backdrop');
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
    if (links) links.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
    var nav = document.getElementById('nav');
    if (nav) nav.classList.remove('menu-open');
  }

  function applyPage(page, url) {
    if (window.tierTeardownPage) window.tierTeardownPage();

    var body = document.body;
    var doomed = [];
    Array.prototype.forEach.call(body.children, function (el) {
      if (!isPersistent(el)) doomed.push(el);
    });
    doomed.forEach(function (el) { el.remove(); });

    body.className = page.bodyClass;
    if (page.page) body.setAttribute('data-page', page.page);
    else body.removeAttribute('data-page');

    var firstScript = null;
    Array.prototype.forEach.call(body.children, function (el) {
      if (!firstScript && el.tagName === 'SCRIPT') firstScript = el;
    });

    page.nodes.forEach(function (node) {
      var imported = document.importNode(node, true);
      if (imported.tagName === 'SCRIPT') return;
      body.insertBefore(imported, firstScript);
    });
    document.title = page.title;

    var nav = document.getElementById('nav');
    if (nav) {
      nav.classList.remove('is-hidden');
      nav.classList.toggle('solid', window.scrollY > 24);
    }

    current = normPath(url.pathname);
    if (window.tierPinTop) window.tierPinTop();
    else window.scrollTo(0, 0);

    if (url.hash) {
      var id = decodeURIComponent(url.hash.slice(1));
      var target = id && document.getElementById(id);
      if (target) target.scrollIntoView();
    }

    if (window.tierBootPage) window.tierBootPage();

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: url.href,
        page_path: url.pathname
      });
    }
  }

  function load(url) {
    var key = normPath(url.pathname);
    if (cache[key]) return Promise.resolve(cache[key]);
    if (pending[key]) return pending[key];
    pending[key] = fetch(url.pathname, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('nav');
        return res.text();
      })
      .then(function (html) {
        var page = snapshot(parseDoc(html));
        cache[key] = page;
        delete pending[key];
        if (key === '/games') {
          var poster = new Image();
          poster.src = '/assets/img/game/keep-chaos-banner.png';
          if (window.tierWarmGamesVideo) window.tierWarmGamesVideo();
        }
        return page;
      })
      .catch(function (err) {
        delete pending[key];
        throw err;
      });
    return pending[key];
  }

  function go(href, push) {
    var url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      location.href = href;
      return;
    }
    if (!isCore(url)) {
      location.href = url.href;
      return;
    }
    if (navigating) return;
    if (samePage(url)) {
      closeMobileNav();
      if (window.tierPinTop) window.tierPinTop();
      else window.scrollTo(0, 0);
      return;
    }
    navigating = true;
    closeMobileNav();
    if (normPath(url.pathname) === '/games' && window.tierWarmGamesVideo) {
      window.tierWarmGamesVideo();
    }
    load(url).then(function (page) {
      if (push !== false) history.pushState({ tierNav: true }, '', url.pathname + url.search + url.hash);
      applyPage(page, url);
    }).catch(function () {
      location.href = url.href;
    }).then(function () {
      navigating = false;
    });
  }

  function prefetch(path) {
    var url;
    try { url = new URL(path, location.href); } catch (err) { return; }
    if (!isCore(url) || cache[normPath(url.pathname)] || pending[normPath(url.pathname)]) return;
    load(url).catch(function () {});
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (err) { return; }
    if (!isCore(url)) return;
    e.preventDefault();
    go(url.href, true);
  }, true);

  document.addEventListener('mouseover', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (err) { return; }
    prefetch(url.pathname);
    if (isCore(url) && normPath(url.pathname) === '/games' && window.tierWarmGamesVideo) {
      window.tierWarmGamesVideo();
    }
  }, true);

  window.addEventListener('popstate', function () {
    var url = new URL(location.href);
    if (!isCore(url)) {
      location.reload();
      return;
    }
    load(url).then(function (page) {
      applyPage(page, url);
    }).catch(function () {
      location.reload();
    });
  });

  current = normPath(location.pathname);
  prefetch(current);
  Object.keys(CORE).forEach(function (path) {
    if (path !== current) prefetch(path);
  });
})();
