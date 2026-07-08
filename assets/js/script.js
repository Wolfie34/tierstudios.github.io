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

  (function assetBadges() {
    document.querySelectorAll('.game-item.has-img .gi-body').forEach(function (body) {
      if (body.querySelector('.gi-badge')) return;
      var badge = document.createElement('span');
      badge.className = 'label gi-badge';
      badge.setAttribute('data-i18n', 'common.unityAsset');
      body.insertBefore(badge, body.firstChild);
    });
    if (window.tierI18n && window.tierI18n.applyLang) window.tierI18n.applyLang();
  })();

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

  (function footerShortcuts() {
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
            '<li><a href="index.html" data-cursor="hover" data-i18n="footer.home">Home</a></li>' +
            '<li><a href="assets.html" data-cursor="hover" data-i18n="nav.assets">Assets</a></li>' +
            '<li><a href="games.html" data-cursor="hover" data-i18n="nav.games">Games</a></li>' +
            '<li><a href="team.html" data-cursor="hover" data-i18n="nav.team">Team</a></li>' +
            '<li><a href="contact.html" data-cursor="hover" data-i18n="nav.contact">Contact</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.tools">Unity Tools</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="layer-forge-studio.html" data-cursor="hover">Layer Forge Studio</a></li>' +
            '<li><a href="goat-icon-studio.html" data-cursor="hover">Goat Icon Studio</a></li>' +
            '<li><a href="ui-particle-system.html" data-cursor="hover">UI Particle System</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-shortcuts-group">' +
          '<span class="label footer-shortcuts-label" data-i18n="footer.resources">Resources</span>' +
          '<ul class="footer-shortcuts-list">' +
            '<li><a href="layer-forge-docs.html" data-cursor="hover" data-i18n="footer.layerForgeDocs">Layer Forge Docs</a></li>' +
            '<li><a href="ui-particle-docs.html" data-cursor="hover" data-i18n="footer.uiParticleDocs">UI Particle Docs</a></li>' +
            '<li><a href="https://assetstore.unity.com/publishers/124104" target="_blank" rel="noopener" data-cursor="hover" data-i18n="footer.assetStore">Unity Asset Store</a></li>' +
            '<li><a href="https://discord.gg/ESvwrchUwA" target="_blank" rel="noopener" data-cursor="hover" data-i18n="footer.discord">Discord Community</a></li>' +
          '</ul>' +
        '</div>';

      title.insertAdjacentElement('afterend', nav);
    });

    if (window.tierI18n && window.tierI18n.applyLang) {
      window.tierI18n.applyLang();
    }
  })();

  (function navActiveRoute() {
    var path = window.location.pathname.split('/').pop();
    if (!path || path === '') path = 'index.html';
    var assetPages = [
      'goat-icon-studio.html',
      'layer-forge-studio.html',
      'ui-particle-system.html',
      'layer-forge-docs.html',
      'ui-particle-docs.html'
    ];
    var href = {
      'assets.html': 'assets.html',
      'games.html': 'games.html',
      'team.html': 'team.html',
      'contact.html': 'contact.html'
    }[path];
    if (assetPages.indexOf(path) !== -1) href = 'assets.html';
    if (!href) return;
    document.querySelectorAll('#nav .nav-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === href);
    });
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
      var raf;
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
        raf = requestAnimationFrame(parallax);
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

      raf = requestAnimationFrame(parallax);
    }

    Promise.all([
      fetch('assets/img/logo.svg').then(function (res) {
        if (!res.ok) throw new Error('logo.svg not found');
        return res.text();
      }),
      fetch('assets/img/logo-outline.svg').then(function (res) {
        if (!res.ok) throw new Error('logo-outline.svg not found');
        return res.text();
      })
    ])
      .then(function (results) {
        mountBackground(
          prepareMarkSvg(results[0], 'fill'),
          prepareMarkSvg(results[1], 'outline')
        );
      })
      .catch(function () {});
  })();

  (function contactMap() {
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

    fetch('assets/img/world-map.svg')
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
  })();

  (function heroStrokeDraw() {
    var g = document.querySelector('.hero-stroke-glyphs');
    if (!g || typeof opentype === 'undefined') return;
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
      if (err) return;
      var ns = 'http://www.w3.org/2000/svg';
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
  })();

  (function heroParticles() {
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
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(build, 200);
    });
  })();

  /* Copyright year */
  var cpEl = document.getElementById('copyright');
  if (cpEl) cpEl.textContent = '\u00a9 ' + new Date().getFullYear() + ' Tier Studios';

  /* Scroll reveals */
  (function reveals() {
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
  })();

  /* Games page — terminal code sequence */
  (function gameDevTerminal() {
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
      return window.tierI18n ? window.tierI18n.t('games.devStatus') : 'IN DEVELOPMENT';
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
      if (!window.tierI18n) return [];
      return window.tierI18n.t('games.devLines').split('\n').filter(Boolean);
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

    window.addEventListener('tier:lang', function () {
      if (panel.classList.contains('in')) run();
    });
  })();

  /* Nav solidify on scroll */
  (function navSolid() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 24); };
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

      indicator.style.width = (rect.width + padX * 2) + 'px';
      indicator.style.height = (rect.height + padY * 2) + 'px';
      indicator.style.transform = 'translate3d(' + (rect.left - parentRect.left - padX) + 'px,' + (rect.top - parentRect.top - padY) + 'px,0)';
      indicator.style.opacity = '1';
    }

    function showActive() {
      var active = navLinks.querySelector('.nav-link.active');
      if (active && isDesktop()) moveTo(active);
      else indicator.style.opacity = '0';
      navLinks.classList.remove('is-hovering');
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
    showActive();
  })();

  /* Hero fade on scroll */
  (function heroParallax() {
    var inner = document.getElementById('heroInner');
    if (!inner) return;
    var raf;
    var update = function () {
      var y = window.scrollY;
      var fade = Math.max(0, 1 - y / 480);
      inner.style.opacity = String(fade);
      inner.style.transform = 'translate3d(0,' + (y * 0.14) + 'px,0)';
    };
    window.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

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

  /* Code highlighting & copy (docs pages) */
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

  // Faint teal tint across every page.
  var glowInner = '150, 210, 202';
  var glowMid = '70, 150, 143';
  var keyTint = '170, 220, 212';

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
