document.addEventListener('DOMContentLoaded', function () {
  (function tierMarkBackground() {
    if (document.querySelector('.tier-bg')) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var orbitConfigs = [
      { top: '8%', right: '4%', width: 82, depth: 0.55, phase: 0, amp: 16 },
      { top: '18%', left: '3%', width: 70, depth: 0.48, phase: 1.1, amp: 14 },
      { top: '32%', right: '10%', width: 64, depth: 0.42, phase: 2.3, amp: 12 },
      { bottom: '20%', right: '6%', width: 74, depth: 0.5, phase: 3.5, amp: 15 },
      { bottom: '8%', left: '5%', width: 86, depth: 0.44, phase: 4.7, amp: 16 },
      { top: '46%', left: '9%', width: 58, depth: 0.38, phase: 0.6, amp: 11 },
      { top: '56%', right: '14%', width: 62, depth: 0.34, phase: 1.9, amp: 12 },
      { bottom: '34%', left: '18%', width: 54, depth: 0.3, phase: 2.8, amp: 10 },
      { top: '68%', right: '22%', width: 52, depth: 0.26, phase: 4.1, amp: 9 }
    ];

    function prepareMarkSvg(svgText) {
      var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      var svg = doc.documentElement;
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('aria-hidden', 'true');
      var paths = svg.querySelectorAll('path');
      if (paths.length >= 2) {
        paths[0].setAttribute('class', 'tier-mark-bottom');
        paths[1].setAttribute('class', 'tier-mark-top');
      }
      paths.forEach(function (p) {
        p.setAttribute('fill', 'currentColor');
      });
      return svg.outerHTML;
    }

    function mountBackground(markSvg) {
      var root = document.createElement('div');
      root.className = 'tier-bg';
      root.setAttribute('aria-hidden', 'true');

      orbitConfigs.forEach(function (cfg) {
        var el = document.createElement('div');
        el.className = 'tier-bg-orbit';
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
      });

      document.body.insertBefore(root, document.body.firstChild);

      if (reduced) return;

      var orbitNodes = root.querySelectorAll('.tier-bg-orbit');
      var raf;
      var px = 0;
      var py = 0;
      var tx = 0;
      var ty = 0;

      function parallax() {
        var t = Date.now() * 0.001;
        tx += (px - tx) * 0.09;
        ty += (py - ty) * 0.09;
        orbitNodes.forEach(function (node) {
          var depth = parseFloat(node.dataset.depth) || 0.3;
          var phase = parseFloat(node.dataset.phase) || 0;
          var amp = parseFloat(node.dataset.amp) || 10;
          var idleX = Math.sin(t * 0.55 + phase) * amp;
          var idleY = Math.cos(t * 0.48 + phase * 1.3) * amp;
          var rot = Math.sin(t * 0.35 + phase) * 3.5;
          var mx = tx * depth + idleX;
          var my = ty * depth + idleY;
          node.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) rotate(' + rot + 'deg)';
        });
        root.style.setProperty('--tier-scroll', window.scrollY + 'px');
        raf = requestAnimationFrame(parallax);
      }

      window.addEventListener('mousemove', function (e) {
        px = (e.clientX / window.innerWidth - 0.5) * 56;
        py = (e.clientY / window.innerHeight - 0.5) * 44;
      }, { passive: true });

      window.addEventListener('scroll', function () {
        root.style.setProperty('--tier-scroll', window.scrollY + 'px');
      }, { passive: true });

      raf = requestAnimationFrame(parallax);
    }

    fetch('assets/img/logo.svg')
      .then(function (res) {
        if (!res.ok) throw new Error('logo.svg not found');
        return res.text();
      })
      .then(function (svgText) {
        mountBackground(prepareMarkSvg(svgText));
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

        var stage = mount.closest('.contact-map-stage');
        if (!stage || reduced) return;
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
      })
      .catch(function () {});
  })();

  (function heroStrokeDraw() {
    var g = document.querySelector('.hero-stroke-glyphs');
    if (!g || typeof opentype === 'undefined') return;
    var TEXT = 'TIER STUDIOS';
    var SIZE = 96;
    var BASE = 88;
    var DUR = 1800;
    var FONT = 'https://fonts.gstatic.com/s/archivo/v25/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTnTRp8A.ttf';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    opentype.load(FONT, function (err, font) {
      if (err) return;
      var ns = 'http://www.w3.org/2000/svg';
      var w = 0;
      TEXT.split('').forEach(function (c) { w += font.getAdvanceWidth(c, SIZE); });
      var x = (1200 - w) / 2;
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
      var n = Math.min(140, Math.max(50, Math.floor(w * h / 5500)));
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

  /* Release countdown */
  (function releaseCountdown() {
    var root = document.getElementById('releaseCountdown');
    if (!root) return;
    var target = new Date(root.dataset.release || '');
    if (isNaN(target.getTime())) {
      target = new Date();
      target.setMonth(target.getMonth() + 1);
    }
    var units = {
      days: root.querySelector('[data-unit="days"]'),
      hours: root.querySelector('[data-unit="hours"]'),
      minutes: root.querySelector('[data-unit="minutes"]'),
      seconds: root.querySelector('[data-unit="seconds"]')
    };
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      var diff = target.getTime() - Date.now();
      if (diff < 0) diff = 0;
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60); s -= m * 60;
      if (units.days) units.days.textContent = pad(d);
      if (units.hours) units.hours.textContent = pad(h);
      if (units.minutes) units.minutes.textContent = pad(m);
      if (units.seconds) units.seconds.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* Scroll reveals */
  (function reveals() {
    var els = document.querySelectorAll('.reveal');
    els.forEach(function (el) {
      if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay + 'ms');
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* Nav solidify on scroll */
  (function navSolid() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* Hero fade on scroll */
  (function heroParallax() {
    var inner = document.getElementById('heroInner');
    if (!inner) return;
    var raf;
    var update = function () {
      var fade = Math.max(0, 1 - window.scrollY / 500);
      inner.style.opacity = fade;
    };
    window.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* Mobile nav */
  (function mobileNav() {
    var btn = document.getElementById('mobileNavBtn');
    var links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
      links.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        btn.classList.remove('active');
        links.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  })();

  /* Code highlighting & copy (docs pages) */
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  var codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function (codeBlock) {
    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains('gemini-code-container')) return;

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
      '<span style="color:var(--fg-dim);margin-left:10px;font-weight:500;letter-spacing:0.1em;">' + langName + '</span>' +
      '</div>' +
      '<button class="gemini-copy-btn" type="button"><i class="fas fa-copy"></i> Copy</button>';

    pre.className = 'gemini-code-content';
    pre.removeAttribute('style');
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(header);
    container.appendChild(pre);

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
