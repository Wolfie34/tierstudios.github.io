(function () {
  var STORAGE_KEY = 'tier-lang';

  var T = {
    en: {
      'nav.assets': 'Assets',
      'nav.games': 'Games',
      'nav.team': 'Team',
      'nav.contact': 'Contact',
      'common.view': 'View',
      'common.menu': 'Menu',
      'common.comingSoon': 'Coming Soon',
      'common.learnMore': 'Learn More',
      'common.changelog': 'Changelog',
      'common.scroll': 'Scroll',
      'common.cdDays': 'Days',
      'common.cdHrs': 'Hrs',
      'common.cdMin': 'Min',
      'common.cdSec': 'Sec',
      'common.linkedin': 'LinkedIn',
      'hero.sub1': 'Game Development · Publishing',
      'hero.sub2': 'Unity Tools',
      'hero.slogan1': 'Independent studio — we develop games, publish titles, and ship Unity assets for production.',
      'hero.slogan2': 'From prototype to launch. Tools and titles, built in-house.',
      'index.games.title': 'Games',
      'index.games.kicker': 'Debut Title',
      'index.games.upStatus': 'Reveal coming soon',
      'index.games.upDebut': 'Our first world',
      'index.featured.title': 'Featured Assets',
      'index.featured.kicker': 'Unity Tools',
      'index.games.eyebrow': 'Tier Game Project',
      'index.games.status': 'In Development',
      'index.games.releaseLabel': 'Release',
      'index.games.releaseValue': 'To be announced',
      'index.games.promoTitle': 'Our First Game',
      'index.games.teaserTitle': 'Awaiting Transmission',
      'index.games.teaserDesc': 'Details will surface when the time is right.',
      'index.games.teaserAria': 'Games — In Development',
      'index.games.promoDesc': 'A studio-led title in active development — built on the same pipeline we use for publishing and Unity tooling.',
      'asset.layerForge.desc': 'Layer-based image & texture editor inside Unity. Real-time brushes, effects, and one-click workflow.',
      'asset.goatIcon.desc': 'Create game-ready 2D icons from 3D prefabs in seconds. Batch export and animation capture.',
      'asset.uiParticle.desc': 'Native Canvas VFX with no sorting issues. Mobile optimized, easy setup, built-in sound support.',
      'assets.title': 'Assets',
      'assets.desc': 'Production-ready Unity tools built to remove friction from your workflow.',
      'assets.campaign.kicker': 'Campaigns',
      'assets.campaign.title': 'Don\'t miss our campaigns',
      'assets.campaign.desc': 'Follow Tier Studios on the Unity Asset Store for seasonal sales and launch discounts.',
      'assets.campaign.cta': 'Follow on Asset Store',
      'games.title': 'Games',
      'games.upcoming': 'Upcoming',
      'games.desc': 'An independent game studio — we develop original titles, handle publishing, and build Unity tools alongside our games.',
      'games.flagship': 'Flagship Title',
      'games.projectTitle': 'Tier Game Project',
      'games.projectDesc': 'Our first game is in active development — a studio-led project built on the same pipeline we use for publishing and Unity tooling.',
      'games.devLines': '> initializing tier_game_project...\n> loading render pipeline...\n> compiling gameplay systems...\n> binding input maps — ok\n> loading audio buses...\n> shader variants: 142 compiled\n> physics world — synced\n> syncing studio assets — ok\n> navmesh bake queued\n> ai behavior trees loaded\n> playtest build: internal\n> telemetry handshake — active\n> encrypting build manifest...\n> release channel: pending\n> status flag check...',
      'games.devStatus': 'IN DEVELOPMENT',
      'games.panelAria': 'In Development',
      'team.title': 'Team',
      'team.kicker': 'The Core',
      'team.desc': 'The people behind the tools — focused, independent, and production-driven.',
      'team.founder': 'Founder',
      'team.cofounder': 'Co-Founder',
      'team.join.title': 'Ready to Make the Next Big Hit?',
      'team.join.desc': 'Join our team and create games played by millions worldwide.',
      'team.join.btn': 'Join Our Team',
      'team.join.aria': 'Join the team',
      'team.thanks': 'We extend our thanks to RestPlay and our sister company The Steelwing Entertainment for their support.',
      'contact.title': 'Contact',
      'contact.desc': 'If there\'s something you want to tell us, <span class="dim">we\'re here.</span>',
      'contact.hqSub': 'Our Headquarters',
      'contact.location': 'Antalya / Türkiye',
      'contact.studioDesc': 'Independent studio — Unity assets, original game development, and publishing.',
      'contact.unityAssets': 'Unity Assets',
      'contact.unityAssetsDesc': 'Production tools on the Asset Store',
      'contact.gameDev': 'Game Development',
      'contact.gameDevDesc': 'Original titles in active development',
      'contact.publishing': 'Publishing',
      'contact.publishingDesc': 'From prototype to release',
      'contact.formTitle': 'Send us a message',
      'contact.formDesc': 'Have a question about our assets or want to discuss a partnership? Drop us a line.',
      'contact.name': 'Your Name',
      'contact.email': 'Your Email',
      'contact.subject': 'Subject',
      'contact.message': 'Your Message',
      'contact.send': 'Send Message',
      'contact.success': 'Your message has been sent successfully.',
      'contact.businessEmail': 'Business Email',
      'contact.supportEmail': 'Support Email',
      'contact.discord': 'Discord Community',
      'contact.discordDesc': 'Join the conversation',
      'contact.linkedin': 'LinkedIn',
      'contact.linkedinDesc': 'Connect with us',
      'contact.error': 'An error occurred. Please try again later.',
      'contact.errorSend': 'An error occurred while sending the message.',
      'title.index': 'Tier Studios — Game Development, Publishing & Unity Tools',
      'title.assets': 'Assets — Tier Studios',
      'title.games': 'Games — Tier Studios',
      'title.team': 'Team — Tier Studios',
      'title.contact': 'Contact — Tier Studios',
      'title.layerForge': 'Layer Forge Studio — Tier Studios',
      'title.goatIcon': 'Goat Icon Studio — Tier Studios',
      'title.uiParticle': 'UI Particle System — Tier Studios',
      'title.layerForgeDocs': 'Layer Forge Studio — Documentation — Tier Studios',
      'title.uiParticleDocs': 'UI Particle System — API Docs — Tier Studios',
      'title.notFound': 'Page Not Found — Tier Studios',
      '404.label': '404',
      '404.title': 'Page not found',
      '404.desc': 'The page you are looking for does not exist or has been moved.',
      '404.btn': 'Back to Home',
      'footer.shortcutsAria': 'Site shortcuts',
      'footer.explore': 'Explore',
      'footer.tools': 'Unity Tools',
      'footer.resources': 'Resources',
      'footer.home': 'Home',
      'footer.layerForgeDocs': 'Layer Forge Docs',
      'footer.uiParticleDocs': 'UI Particle Docs',
      'footer.assetStore': 'Unity Asset Store',
      'footer.discord': 'Discord Community'
    },
    tr: {
      'nav.assets': 'Varlıklar',
      'nav.games': 'Oyunlar',
      'nav.team': 'Ekip',
      'nav.contact': 'İletişim',
      'common.view': 'Görüntüle',
      'common.menu': 'Menü',
      'common.comingSoon': 'Yakında',
      'common.learnMore': 'Daha Fazla Bilgi',
      'common.changelog': 'Değişiklik Günlüğü',
      'common.scroll': 'Kaydır',
      'common.cdDays': 'Gün',
      'common.cdHrs': 'Saat',
      'common.cdMin': 'Dk',
      'common.cdSec': 'Sn',
      'common.linkedin': 'LinkedIn',
      'hero.sub1': 'Oyun Geliştirme · Yayıncılık',
      'hero.sub2': 'Unity Araçları',
      'hero.slogan1': 'Bağımsız bir stüdyoyuz — oyun geliştiriyor, yapım dağıtıyor ve üretim için Unity varlıkları sunuyoruz.',
      'hero.slogan2': 'Prototipten lansmana. Araçlar ve oyunlar, stüdyo içinde geliştiriliyor.',
      'index.games.title': 'Oyunlar',
      'index.games.kicker': 'İlk Oyun',
      'index.games.upStatus': 'Yakında duyurulacak',
      'index.games.upDebut': 'İlk dünyamız',
      'index.featured.title': 'Öne Çıkan Varlıklar',
      'index.featured.kicker': 'Unity Araçları',
      'index.games.eyebrow': 'Tier Game Project',
      'index.games.status': 'Geliştirmede',
      'index.games.releaseLabel': 'Çıkış',
      'index.games.releaseValue': 'Duyurulacak',
      'index.games.promoTitle': 'İlk Oyunumuz',
      'index.games.teaserTitle': 'Yayın Bekleniyor',
      'index.games.teaserDesc': 'Doğru zaman geldiğinde paylaşacağız.',
      'index.games.teaserAria': 'Oyunlar — Geliştiriliyor',
      'index.games.promoDesc': 'Aktif geliştirmede olan bir stüdyo oyunu — yayıncılık ve Unity araçları için kullandığımız aynı pipeline üzerinde inşa edildi.',
      'asset.layerForge.desc': 'Unity içinde katman tabanlı görsel ve doku editörü. Gerçek zamanlı fırçalar, efektler ve tek tıkla iş akışı.',
      'asset.goatIcon.desc': '3D prefab\'lardan saniyeler içinde oyuna hazır 2D ikonlar oluşturun. Toplu dışa aktarma ve animasyon yakalama.',
      'asset.uiParticle.desc': 'Sıralama sorunu olmayan yerel Canvas VFX. Mobil optimize, kolay kurulum, yerleşik ses desteği.',
      'assets.title': 'Varlıklar',
      'assets.desc': 'İş akışınızdaki sürtünmeyi azaltmak için üretime hazır Unity araçları.',
      'assets.campaign.kicker': 'Kampanyalar',
      'assets.campaign.title': 'Kampanyaları kaçırmayın',
      'assets.campaign.desc': 'Sezonluk indirimler ve lansman fırsatları için bizi Unity Asset Store\'da takip edin.',
      'assets.campaign.cta': 'Asset Store\'da Takip Et',
      'games.title': 'Oyunlar',
      'games.upcoming': 'Yakında',
      'games.desc': 'Bağımsız bir oyun stüdyosuyuz — özgün oyunlar geliştiriyor, yayıncılık yapıyor ve oyunlarımızın yanında Unity araçları üretiyoruz.',
      'games.flagship': 'Amiral Gemisi',
      'games.projectTitle': 'Tier Game Project',
      'games.projectDesc': 'İlk oyunumuz aktif geliştirmede — yayıncılık ve Unity araçları için kullandığımız aynı pipeline üzerinde inşa edilen bir stüdyo projesi.',
      'games.devLines': '> tier_game_project başlatılıyor...\n> render pipeline yükleniyor...\n> oynanış sistemleri derleniyor...\n> input haritaları bağlanıyor — tamam\n> ses busları yükleniyor...\n> shader varyantları: 142 derlendi\n> fizik dünyası — senkronize\n> stüdyo varlıkları senkronize — tamam\n> navmesh bake kuyruğa alındı\n> ai davranış ağaçları yüklendi\n> playtest build: dahili\n> telemetri el sıkışması — aktif\n> build manifest şifreleniyor...\n> yayın kanalı: beklemede\n> durum bayrağı kontrol ediliyor...',
      'games.devStatus': 'GELİŞTİRİLMEDE',
      'games.panelAria': 'Geliştiriliyor',
      'team.title': 'Ekip',
      'team.kicker': 'Çekirdek Ekip',
      'team.desc': 'Araçların arkasındaki insanlar — odaklı, bağımsız ve üretim odaklı.',
      'team.founder': 'Kurucu',
      'team.cofounder': 'Kurucu Ortak',
      'team.join.title': 'Bir Sonraki Büyük Hit Oyunu Yapmaya Hazır mısın?',
      'team.join.desc': 'Ekibimize katılın ve dünya çapında milyonlarca kişi tarafından oynanan oyunlar yaratın.',
      'team.join.btn': 'Ekibimize Katılın',
      'team.join.aria': 'Ekibe katılın',
      'team.thanks': 'Destekleri için RestPlay\'e ve kardeş firmamız olan The Steelwing Entertainment\'a teşekkürlerimizi sunarız.',
      'contact.title': 'İletişim',
      'contact.desc': 'Bize söylemek istediğiniz bir şey varsa, <span class="dim">buradayız.</span>',
      'contact.hqSub': 'Merkez Ofisimiz',
      'contact.location': 'Antalya / Türkiye',
      'contact.studioDesc': 'Bağımsız stüdyo — Unity varlıkları, özgün oyun geliştirme ve yayıncılık.',
      'contact.unityAssets': 'Unity Varlıkları',
      'contact.unityAssetsDesc': 'Asset Store\'da üretim araçları',
      'contact.gameDev': 'Oyun Geliştirme',
      'contact.gameDevDesc': 'Aktif geliştirmedeki özgün oyunlar',
      'contact.publishing': 'Yayıncılık',
      'contact.publishingDesc': 'Prototipten yayına',
      'contact.formTitle': 'Bize mesaj gönderin',
      'contact.formDesc': 'Varlıklarımız hakkında bir sorunuz mu var veya bir ortaklık mı konuşmak istiyorsunuz? Bize yazın.',
      'contact.name': 'Adınız',
      'contact.email': 'E-posta Adresiniz',
      'contact.subject': 'Konu',
      'contact.message': 'Mesajınız',
      'contact.send': 'Mesaj Gönder',
      'contact.success': 'Mesajınız başarıyla gönderildi.',
      'contact.businessEmail': 'İş E-postası',
      'contact.supportEmail': 'Destek E-postası',
      'contact.discord': 'Discord Topluluğu',
      'contact.discordDesc': 'Sohbete katılın',
      'contact.linkedin': 'LinkedIn',
      'contact.linkedinDesc': 'Bizimle bağlantı kurun',
      'contact.error': 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      'contact.errorSend': 'Mesaj gönderilirken bir hata oluştu.',
      'title.index': 'Tier Studios — Oyun Geliştirme, Yayıncılık ve Unity Araçları',
      'title.assets': 'Varlıklar — Tier Studios',
      'title.games': 'Oyunlar — Tier Studios',
      'title.team': 'Ekip — Tier Studios',
      'title.contact': 'İletişim — Tier Studios',
      'title.layerForge': 'Layer Forge Studio — Tier Studios',
      'title.goatIcon': 'Goat Icon Studio — Tier Studios',
      'title.uiParticle': 'UI Particle System — Tier Studios',
      'title.layerForgeDocs': 'Layer Forge Studio — Dokümantasyon — Tier Studios',
      'title.uiParticleDocs': 'UI Particle System — API Dokümantasyonu — Tier Studios',
      'title.notFound': 'Sayfa Bulunamadı — Tier Studios',
      '404.label': '404',
      '404.title': 'Sayfa bulunamadı',
      '404.desc': 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
      '404.btn': 'Ana Sayfaya Dön',
      'footer.shortcutsAria': 'Site kısayolları',
      'footer.explore': 'Keşfet',
      'footer.tools': 'Unity Araçları',
      'footer.resources': 'Kaynaklar',
      'footer.home': 'Ana Sayfa',
      'footer.layerForgeDocs': 'Layer Forge Dokümantasyon',
      'footer.uiParticleDocs': 'UI Particle Dokümantasyon',
      'footer.assetStore': 'Unity Asset Store',
      'footer.discord': 'Discord Topluluğu'
    }
  };

  var NAV_MAP = {
    'assets.html': 'nav.assets',
    'games.html': 'nav.games',
    'team.html': 'nav.team',
    'contact.html': 'nav.contact'
  };

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'tr' || saved === 'en') return saved;
    return 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyLang(lang);
    updateSwitcher(lang);
    window.dispatchEvent(new CustomEvent('tier:lang', { detail: { lang: lang } }));
  }

  function t(lang, key) {
    var pack = T[lang] || T.en;
    return pack[key] != null ? pack[key] : (T.en[key] || key);
  }

  function tagNavLinks() {
    document.querySelectorAll('#nav .nav-links .nav-link').forEach(function (a) {
      var href = a.getAttribute('href');
      if (NAV_MAP[href] && !a.dataset.i18n) a.dataset.i18n = NAV_MAP[href];
    });
  }

  function applyLang(lang) {
    tagNavLinks();

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(lang, el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(lang, el.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(lang, el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(lang, el.dataset.i18nAria));
    });

    var menuBtn = document.getElementById('mobileNavBtn');
    if (menuBtn) menuBtn.setAttribute('aria-label', t(lang, 'common.menu'));

    var page = document.body && document.body.dataset.page;
    if (page) {
      var titleKey = 'title.' + page;
      if (T[lang][titleKey]) document.title = T[lang][titleKey];
    }
  }

  function mountLangSwitcher() {
    var navRight = document.querySelector('#nav .nav-right');
    if (!navRight || document.getElementById('navLang')) return;

    var wrap = document.createElement('div');
    wrap.className = 'nav-lang';
    wrap.id = 'navLang';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Language');

    var indicator = document.createElement('span');
    indicator.className = 'nav-lang-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    wrap.appendChild(indicator);

    ['en', 'tr'].forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-lang-btn';
      btn.dataset.lang = code;
      btn.textContent = code.toUpperCase();
      btn.setAttribute('aria-pressed', 'false');
      wrap.appendChild(btn);
    });

    var navLinks = navRight.querySelector('.nav-links');
    navRight.insertBefore(wrap, navLinks);

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.nav-lang-btn');
      if (!btn) return;
      setLang(btn.dataset.lang);
    });

    window.addEventListener('resize', updateLangIndicator);
  }

  function updateLangIndicator() {
    var wrap = document.getElementById('navLang');
    if (!wrap) return;
    var indicator = wrap.querySelector('.nav-lang-indicator');
    var active = wrap.querySelector('.nav-lang-btn.is-active');
    if (!indicator || !active) {
      if (indicator) indicator.style.opacity = '0';
      return;
    }
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.height = active.offsetHeight + 'px';
    indicator.style.transform = 'translate3d(' + active.offsetLeft + 'px,' + active.offsetTop + 'px,0)';
    indicator.style.opacity = '1';
  }

  function updateSwitcher(lang) {
    var wrap = document.getElementById('navLang');
    document.querySelectorAll('.nav-lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (wrap) wrap.setAttribute('aria-label', lang === 'tr' ? 'Dil' : 'Language');
    requestAnimationFrame(updateLangIndicator);
  }

  window.tierI18n = {
    getLang: getLang,
    setLang: setLang,
    applyLang: function () { applyLang(getLang()); },
    t: function (key) { return t(getLang(), key); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    mountLangSwitcher();
    var lang = getLang();
    document.documentElement.lang = lang;
    applyLang(lang);
    updateSwitcher(lang);
  });
})();
