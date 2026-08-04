(function () {
  var STORAGE_KEY = 'tier-lang';

  var T = {
    en: {
      'nav.assets': 'Assets',
      'nav.games': 'Games',
      'nav.keepChaos': 'Keep Chaos',
      'nav.team': 'Team',
      'nav.contact': 'Contact',
      'common.view': 'View',
      'common.menu': 'Menu',
      'common.comingSoon': 'Coming Soon',
      'common.learnMore': 'Learn More',
      'common.changelog': 'Changelog',
      'common.scroll': 'Scroll',
      'common.scrollAria': 'Scroll to content',
      'common.cdDays': 'Days',
      'common.cdHrs': 'Hrs',
      'common.cdMin': 'Min',
      'common.cdSec': 'Sec',
      'common.linkedin': 'LinkedIn',
      'common.unityAsset': 'Unity Asset',
      'common.skipToContent': 'Skip to content',
      'hero.sub1': 'Game Development · Publishing',
      'hero.sub2': 'Online Co-op Games',
      'hero.slogan1': 'Independent game studio · we craft original games and publish titles from prototype to launch.',
      'hero.slogan2': 'Home of Keep Chaos · a survivor-like online co-op bullet heaven.',
      'index.games.title': 'Games',
      'index.games.upStatus': 'Reveal coming soon',
      'index.games.upDebut': 'Our first world',
      'index.featured.title': 'Featured Assets',
      'index.featured.viewAll': 'View all assets',
      'index.featured.bestSeller': 'Best Seller',
      'index.pillars.kicker': 'What we do',
      'index.pillars.lead': 'Original games and publishing.',
      'index.pillars.develop.title': 'Develop',
      'index.pillars.develop.desc': 'Original titles in active development · studio-led worlds built on our own pipeline.',
      'index.pillars.publish.title': 'Publish',
      'index.pillars.publish.desc': 'From prototype to launch · production discipline across every release we ship.',
      'index.pillars.build.title': 'Build Tools',
      'index.pillars.build.desc': 'Unity Asset Store tools that remove friction from real production workflows.',
      'index.cta.kicker': 'Stay in the loop',
      'index.cta.title': 'Join our Discord',
      'index.cta.desc': 'For more about Keep Chaos · builds, behind-the-scenes, and early news from the team.',
      'index.cta.btn': 'Join Discord',
      'index.games.status': 'On Steam',
      'index.games.steamSoon': 'Wishlist on Steam',
      'index.games.releaseLabel': 'Release',
      'index.games.releaseValue': 'To be announced',
      'index.games.promoTitle': 'Keep Chaos',
      'index.games.teaserTitle': 'Keep Chaos',
      'index.games.teaserDesc': 'Our debut title · more transmissions incoming.',
      'index.games.teaserAria': 'Keep Chaos · On Steam',
      'index.games.promoDesc': 'A studio-led title in active development · built on the same pipeline we use for publishing and Unity tooling.',
      'index.games.tagline': 'Draw your swords, let spells fill the air · the Middle Ages have never been this chaotic!',
      'index.games.genres': 'TPS · Survivor-like · Bullet Heaven · Online Co-op',
      'index.games.more': 'More about Keep Chaos',
      'index.featured.layerForgeRating': '5.0 · Asset Store',
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
      'games.desc': 'An independent game studio · we develop original titles and handle publishing. Flagship: Keep Chaos.',
      'games.flagship': 'Flagship Title',
      'games.projectTitle': 'Tier Game Project',
      'games.projectDesc': 'Our first game is in active development · a studio-led project built for Steam.',
      'games.kc.tagline': 'Draw your swords, let spells fill the air · the Middle Ages have never been this chaotic!',
      'games.kc.positioning': 'A 3D TPS survivor-like / bullet heaven with online co-op — for fans of Vampire Survivors and Megabonk.',
      'games.kc.p1': 'Keep Chaos is a fast-paced low-poly 3D TPS survivor-like bullet heaven rogue-lite · where death and pure fun walk the same line. Play solo or stand shoulder to shoulder with friends in local or online co-op (PvE) for up to 4 players, fight enemy swarms that barely fit the screen, and drown the kingdom in chaos!',
      'games.kc.p2': 'Before the fight, find the hero that fits you. Pick a class, each with its own skills and playstyle: hold the frontline with a massive mace, rain arrows across the screen, or set everything ablaze with magic.',
      'games.kc.featuresTitle': 'Key Features',
      'games.kc.f1': '<strong>Third-Person (TPS) Bullet Heaven:</strong> Survivor-like horde action through a third-person camera. Slip through hundreds of rushing enemies, dodge attacks, and survive!',
      'games.kc.f2': '<strong>Solo or 4-Player Online Co-op (PvE):</strong> Write your own legend alone, or build a squad with friends on the same couch (Local) or online and race from castle to castle.',
      'games.kc.f3': '<strong>Classes &amp; Team Synergy:</strong> Mix different classes into unstoppable combinations. Each class skill can change the fate of the team.',
      'games.kc.f4': '<strong>Rogue-Lite Progression:</strong> Discover new spells, weapons, and passive upgrades every run. Even when you fall, use your loot to power up characters and start the next run ready.',
      'games.kc.f5': '<strong>Charming Low-Poly Medieval World:</strong> Enjoy fluid action in a colorful, dynamic, and merciless Middle Ages atmosphere.',
      'games.kc.cta': 'Gear up, gather your friends, and try to keep chaos under control · or surrender to it completely!',
      'games.devLines': '> initializing tier_game_project...\n> loading render pipeline...\n> compiling gameplay systems...\n> binding input maps · ok\n> loading audio buses...\n> shader variants: 142 compiled\n> physics world · synced\n> syncing studio assets · ok\n> navmesh bake queued\n> ai behavior trees loaded\n> playtest build: internal\n> telemetry handshake · active\n> encrypting build manifest...\n> release channel: pending\n> status flag check...',
      'games.devStatus': 'ON STEAM',
      'games.panelAria': 'On Steam',
      'games.audioAria': 'Game page music',
      'games.audioMute': 'Mute music',
      'games.audioUnmute': 'Unmute music',
      'games.audioVolume': 'Volume',
      'games.shots.kicker': 'Screenshots',
      'games.shots.title': 'Keep Chaos',
      'games.shots.desc': 'Low-poly chaos from active builds · combat, co-op, and the night forest.',
      'games.steam.kicker': 'Steam',
      'games.steam.title': 'Wishlist on Steam',
      'games.steam.desc': 'Keep Chaos is coming to Steam. Wishlist will open soon — be ready when chaos drops.',
      'games.steam.btn': 'Wishlist on Steam',
      'games.steam.btnSoon': 'Coming soon to Steam',
      'games.steam.btnSoonAria': 'Steam wishlist coming soon',
      'games.discord.kicker': 'Community',
      'games.discord.title': 'Join our Discord',
      'games.discord.desc': 'For more about Keep Chaos · builds, behind-the-scenes, and early news from the team.',
      'games.discord.btn': 'Join Discord',
      'games.press.kicker': 'Press',
      'games.press.title': 'Press Kit',
      'games.press.desc': 'Logos, key art, and studio facts for coverage, creators, and partners.',
      'games.press.factTitle': 'Title',
      'games.press.factGenre': 'Genre',
      'games.press.factGenreVal': 'TPS · Survivor-like · Bullet Heaven · Rogue-Lite',
      'games.press.factPlatform': 'Platform',
      'games.press.factStudio': 'Developer / Publisher',
      'games.press.factStatus': 'Status',
      'games.press.dlStudioLogo': 'Tier Studios logo',
      'games.press.dlLogo': 'Keep Chaos logo',
      'games.press.dlKeyArt': 'Key art',
      'games.press.download': 'Download',
      'games.press.toneWhite': 'White',
      'games.press.toneBlack': 'Black',
      'games.press.toneAria': 'Logo color',
      'games.press.visual1': 'Visual 1',
      'games.press.visual2': 'Visual 2',
      'games.press.variantAria': 'Key art variant',
      'games.press.viewStudioLogoAria': 'View Tier Studios logo',
      'games.press.viewLogoAria': 'View Keep Chaos logo',
      'games.press.viewKeyArtAria': 'View key art',
      'games.press.closeAria': 'Close preview',
      'games.press.contact': 'Press contact · info@tierstudios.com',
      'games.press.contactAria': 'Go to contact page',
      'games.faq.kicker': 'FAQ',
      'games.faq.title': 'Keep Chaos questions',
      'games.faq.q1': 'What genre is Keep Chaos?',
      'games.faq.a1': 'Keep Chaos is a 3D TPS survivor-like / bullet heaven rogue-lite with dense enemy hordes, class builds, and third-person action.',
      'games.faq.q2': 'Is Keep Chaos like Vampire Survivors or Megabonk?',
      'games.faq.a2': 'Yes in spirit: it sits in the survivor-like / bullet heaven family fans of Vampire Survivors and Megabonk know, delivered as third-person low-poly chaos.',
      'games.faq.q3': 'Does Keep Chaos have online co-op?',
      'games.faq.a3': 'Yes. Play solo or team up in up to 4-player local and online co-op PvE — built for the online survivor-like / bullet heaven niche.',
      'games.faq.q4': 'Where can I wishlist Keep Chaos?',
      'games.faq.a4': 'Keep Chaos is coming to Steam (PC). Wishlist from this page and join Discord for builds and early news.',
      'games.stats.kicker': 'Statistics',
      'games.stats.title': 'Leaderboard',
      'games.stats.desc': 'Keep Chaos · global top 100. Climb the board and claim the keep.',
      'games.stats.back': '← Back to Keep Chaos',
      'games.stats.tabSolo': 'Solo',
      'games.stats.tabDuo': 'Duo',
      'games.stats.tabTrio': 'Trio',
      'games.stats.tabSquad': 'Squad',
      'games.stats.loading': 'Loading…',
      'games.stats.empty': 'The board is empty for now · top scores will appear here when runs start counting.',
      'games.stats.demo': 'Demo data · live Steam scores coming soon',
      'games.stats.resetIn': 'Next reset',
      'games.stats.refreshIn': 'Next refresh',
      'games.stats.cta.kicker': 'Compete',
      'games.stats.cta.title': 'Top 100',
      'games.stats.cta.desc': 'See who holds the keep · live leaderboard for Keep Chaos.',
      'games.stats.cta.btn': 'View leaderboard',
      'games.stats.discordDesc': 'Share runs, compare scores, and chase the top 100 with the community.',
      'team.title': 'Team',
      'team.kicker': 'The Core',
      'team.desc': 'The people behind the tools · focused, independent, and production-driven.',
      'team.founder': 'Founder',
      'team.cofounder': 'Co-Founder',
      'team.join.title': 'Ready to Make the Next Big Hit?',
      'team.join.desc': 'Join our team and create games played by millions worldwide.',
      'team.join.btn': 'Join Our Team',
      'team.join.aria': 'Join the team',
      'team.thanks': 'We extend our thanks to RestPlay and our sister company The Steelwing Entertainment for their support.',
      'contact.title': 'Contact',
      'contact.desc': 'If there\'s something you want to tell us, <span class="dim">we\'re here.</span> Ran into an issue or bug with our assets or games? Email us.',
      'contact.hqSub': 'Our Headquarters',
      'contact.location': 'Antalya / Türkiye',
      'contact.studioDesc': 'Independent studio · Unity assets, original game development, and publishing.',
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
      'title.index': 'Tier Studios · Keep Chaos · Independent Game Studio',
      'title.assets': 'Assets · Tier Studios',
      'title.games': 'Keep Chaos · Online Co-op Survivor-Like Bullet Hell | Tier Studios',
      'title.team': 'Team · Tier Studios',
      'title.contact': 'Contact · Tier Studios',
      'title.layerForge': 'Layer Forge Studio · Tier Studios',
      'title.goatIcon': 'Goat Icon Studio · Tier Studios',
      'title.uiParticle': 'UI Particle System · Tier Studios',
      'title.layerForgeDocs': 'Layer Forge Studio · Documentation · Tier Studios',
      'title.uiParticleDocs': 'UI Particle System · API Docs · Tier Studios',
      'title.notFound': 'Page Not Found · Tier Studios',
      '404.label': '404 · Signal Lost',
      '404.title': 'Frequency not found',
      '404.desc': 'This channel doesn\'t exist or was moved. Return to base or explore our worlds.',
      '404.btn': 'Back to Home',
      '404.games': 'Games',
      '404.assets': 'Assets',
      'footer.shortcutsAria': 'Site shortcuts',
      'footer.explore': 'Explore',
      'footer.games': 'Games',
      'footer.tools': 'Unity Tools',
      'footer.resources': 'Resources',
      'footer.home': 'Home',
      'footer.leaderboard': 'Leaderboard',
      'footer.layerForgeDocs': 'Layer Forge Docs',
      'footer.uiParticleDocs': 'UI Particle Docs',
      'footer.assetStore': 'Unity Asset Store',
      'footer.discord': 'Discord Community'
    },
    tr: {
      'nav.assets': 'Varlıklar',
      'nav.games': 'Oyunlar',
      'nav.keepChaos': 'Keep Chaos',
      'nav.team': 'Ekip',
      'nav.contact': 'İletişim',
      'common.view': 'Görüntüle',
      'common.menu': 'Menü',
      'common.comingSoon': 'Yakında',
      'common.learnMore': 'Daha Fazla Bilgi',
      'common.changelog': 'Değişiklik Günlüğü',
      'common.scroll': 'Kaydır',
      'common.scrollAria': 'İçeriğe kaydır',
      'common.cdDays': 'Gün',
      'common.cdHrs': 'Saat',
      'common.cdMin': 'Dk',
      'common.cdSec': 'Sn',
      'common.linkedin': 'LinkedIn',
      'common.unityAsset': 'Unity Asset',
      'common.skipToContent': 'İçeriğe geç',
      'hero.sub1': 'Oyun Geliştirme · Yayıncılık',
      'hero.sub2': 'Online Koop Oyunlar',
      'hero.slogan1': 'Bağımsız bir oyun stüdyosuyuz · özgün oyunlar geliştiriyor ve lansmana kadar yayıncılık yapıyoruz.',
      'hero.slogan2': 'Keep Chaos\'un evi · online koop survivor-like / bullet heaven.',
      'index.games.title': 'Oyunlar',
      'index.games.upStatus': 'Yakında duyurulacak',
      'index.games.upDebut': 'İlk dünyamız',
      'index.featured.title': 'Öne Çıkan Varlıklar',
      'index.featured.viewAll': 'Tüm varlıkları gör',
      'index.featured.bestSeller': 'En Çok Satan',
      'index.pillars.kicker': 'Ne yapıyoruz',
      'index.pillars.lead': 'Özgün oyunlar ve yayıncılık.',
      'index.pillars.develop.title': 'Geliştir',
      'index.pillars.develop.desc': 'Aktif geliştirmedeki özgün oyunlar · kendi pipeline\'ımız üzerinde inşa edilen stüdyo dünyaları.',
      'index.pillars.publish.title': 'Yayınla',
      'index.pillars.publish.desc': 'Prototipten lansmana · çıkardığımız her projede üretim disiplini.',
      'index.pillars.build.title': 'Araç Üret',
      'index.pillars.build.desc': 'Gerçek üretim akışlarından sürtünmeyi kaldıran Unity Asset Store araçları.',
      'index.cta.kicker': 'Gelişmelerden haberdar ol',
      'index.cta.title': 'Discord\'a katıl',
      'index.cta.desc': 'Oyunla ilgili daha fazlası için · Keep Chaos build\'leri, kulistekiler ve erken haberler doğrudan ekipten.',
      'index.cta.btn': 'Discord\'a Katıl',
      'index.games.status': 'Steam\'de',
      'index.games.steamSoon': 'Steam\'de Wishlist',
      'index.games.releaseLabel': 'Çıkış',
      'index.games.releaseValue': 'Duyurulacak',
      'index.games.promoTitle': 'Keep Chaos',
      'index.games.teaserTitle': 'Keep Chaos',
      'index.games.teaserDesc': 'İlk oyunumuz · yeni sinyaller yolda.',
      'index.games.teaserAria': 'Keep Chaos · Steam\'de',
      'index.games.promoDesc': 'Aktif geliştirmede olan bir stüdyo oyunu · yayıncılık ve Unity araçları için kullandığımız aynı pipeline üzerinde inşa edildi.',
      'index.games.tagline': 'Kılıçlar çekilsin, büyüler havada uçuşsun; Orta Çağ hiç bu kadar kaotik olmamıştı!',
      'index.games.genres': 'TPS · Survivor-like · Bullet Heaven · Online Koop',
      'index.games.more': 'Keep Chaos hakkında daha fazla',
      'index.featured.layerForgeRating': '5.0 · Asset Store',
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
      'games.desc': 'Bağımsız bir oyun stüdyosuyuz · özgün oyunlar geliştiriyor ve yayıncılık yapıyoruz. Amiral gemimiz: Keep Chaos.',
      'games.flagship': 'Amiral Gemisi',
      'games.projectTitle': 'Tier Game Project',
      'games.projectDesc': 'İlk oyunumuz aktif geliştirmede · Steam için inşa edilen bir stüdyo projesi.',
      'games.kc.tagline': 'Kılıçlar çekilsin, büyüler havada uçuşsun; Orta Çağ hiç bu kadar kaotik olmamıştı!',
      'games.kc.positioning': 'Online koop destekli 3D TPS survivor-like / bullet heaven — Vampire Survivors ve Megabonk sevenler için.',
      'games.kc.p1': 'Keep Chaos, ucunda ölümün ve katıksız eğlencenin olduğu hızlı tempolu, Low-Poly 3D grafiklere sahip bir TPS survivor-like / bullet heaven rogue-lite oyunudur. İster tek başına ister 4 kişiye kadar yerel veya çevrim içi kooperatif (PvE) modda arkadaşlarınla omuz omuza ver, ekrana sığmayan düşman sürüleriyle savaş ve krallığı baştan aşağı kaosa boğ!',
      'games.kc.p2': 'Savaşa girmeden önce kendine uygun kahramanı bul. Her biri kendine has becerilere ve oyun tarzına sahip farklı sınıflardan birini seç: İster devasa bir gürzle cephenin en önünde barikat ol, ister oklarınla ekranı dolduran mermi yağmurları yağdır ya da büyülerinle ortalığı ateşe ver.',
      'games.kc.featuresTitle': 'Öne Çıkan Özellikler',
      'games.kc.f1': '<strong>Omuz Üstü (TPS) Bullet Heaven:</strong> Survivor-like sürüsü aksiyonunu 3. şahıs kamera ile yaşa. Üzerine akın eden yüzlerce düşmanın arasından sıyrıl, saldırılardan kaç ve hayatta kal!',
      'games.kc.f2': '<strong>Solo veya 4 Kişilik Online Koop (PvE):</strong> İster tek başına destan yaz, ister arkadaşlarınla aynı koltukta (Yerel) veya internet üzerinden (Çevrim İçi) ekibini kurup kaleden kaleye koş.',
      'games.kc.f3': '<strong>Farklı Sınıf &amp; Takım Sinerjisi:</strong> Farklı sınıfları bir araya getirerek durdurulamaz kombinasyonlar oluştur. Her sınıfın yetenekleri, takımın kaderini değiştirebilir.',
      'games.kc.f4': '<strong>Rogue-Lite İlerleme:</strong> Her denemede yeni büyüler, silahlar ve pasif geliştirmeler keşfet. Ölsen bile elde ettiğin ganimetlerle karakterlerini güçlendirip bir sonraki tura daha hazır başla.',
      'games.kc.f5': '<strong>Sevimli ve Canlı Low-Poly Orta Çağ Dünyası:</strong> Renkli, dinamik ve bir o kadar da acımasız bir Orta Çağ atmosferinde akıcı aksiyonun tadını çıkar.',
      'games.kc.cta': 'Silahını kuşan, arkadaşlarını topla ve kaosu kontrol altında tutmaya çalış — ya da tamamen teslim ol!',
      'games.devLines': '> tier_game_project başlatılıyor...\n> render pipeline yükleniyor...\n> oynanış sistemleri derleniyor...\n> input haritaları bağlanıyor · tamam\n> ses busları yükleniyor...\n> shader varyantları: 142 derlendi\n> fizik dünyası · senkronize\n> stüdyo varlıkları senkronize · tamam\n> navmesh bake kuyruğa alındı\n> ai davranış ağaçları yüklendi\n> playtest build: dahili\n> telemetri el sıkışması · aktif\n> build manifest şifreleniyor...\n> yayın kanalı: beklemede\n> durum bayrağı kontrol ediliyor...',
      'games.devStatus': 'STEAM\'DE',
      'games.panelAria': 'Steam\'de',
      'games.audioAria': 'Oyun sayfası müziği',
      'games.audioMute': 'Müziği kapat',
      'games.audioUnmute': 'Müziği aç',
      'games.audioVolume': 'Ses seviyesi',
      'games.shots.kicker': 'Ekran görüntüleri',
      'games.shots.title': 'Keep Chaos',
      'games.shots.desc': 'Aktif build\'lerden low-poly kaos · savaş, koop ve gece ormanı.',
      'games.steam.kicker': 'Steam',
      'games.steam.title': 'Steam\'de Wishlist',
      'games.steam.desc': 'Keep Chaos yakında Steam\'de. Wishlist açılınca burada olacak — kaos düşmeden hazır ol.',
      'games.steam.btn': 'Steam\'de Wishlist',
      'games.steam.btnSoon': 'Çok yakında Steam\'de',
      'games.steam.btnSoonAria': 'Steam wishlist yakında',
      'games.discord.kicker': 'Topluluk',
      'games.discord.title': 'Discord\'a katıl',
      'games.discord.desc': 'Oyunla ilgili daha fazlası için · Keep Chaos build\'leri, kulistekiler ve erken haberler doğrudan ekipten.',
      'games.discord.btn': 'Discord\'a Katıl',
      'games.press.kicker': 'Basın',
      'games.press.title': 'Press Kit',
      'games.press.desc': 'Haber, içerik üreticisi ve partnerler için logo, key art ve stüdyo bilgileri.',
      'games.press.factTitle': 'Oyun',
      'games.press.factGenre': 'Tür',
      'games.press.factGenreVal': 'TPS · Survivor-like · Bullet Heaven · Rogue-Lite',
      'games.press.factPlatform': 'Platform',
      'games.press.factStudio': 'Geliştirici / Yayıncı',
      'games.press.factStatus': 'Durum',
      'games.press.dlStudioLogo': 'Tier Studios logo',
      'games.press.dlLogo': 'Keep Chaos logo',
      'games.press.dlKeyArt': 'Key art',
      'games.press.download': 'İndir',
      'games.press.toneWhite': 'Beyaz',
      'games.press.toneBlack': 'Siyah',
      'games.press.toneAria': 'Logo rengi',
      'games.press.visual1': 'Görsel 1',
      'games.press.visual2': 'Görsel 2',
      'games.press.variantAria': 'Key art seçimi',
      'games.press.viewStudioLogoAria': 'Tier Studios logosunu görüntüle',
      'games.press.viewLogoAria': 'Keep Chaos logosunu görüntüle',
      'games.press.viewKeyArtAria': 'Key art görüntüle',
      'games.press.closeAria': 'Önizlemeyi kapat',
      'games.press.contact': 'Basın iletişimi · info@tierstudios.com',
      'games.press.contactAria': 'İletişim sayfasına git',
      'games.faq.kicker': 'SSS',
      'games.faq.title': 'Keep Chaos soruları',
      'games.faq.q1': 'Keep Chaos hangi tür?',
      'games.faq.a1': 'Keep Chaos; yoğun düşman sürüleri, sınıf build\'leri ve üçüncü şahıs aksiyonu olan 3D TPS survivor-like / bullet heaven rogue-lite bir oyundur.',
      'games.faq.q2': 'Keep Chaos, Vampire Survivors veya Megabonk gibi mi?',
      'games.faq.a2': 'Ruh olarak evet: Vampire Survivors ve Megabonk sevenlerin bildiği survivor-like / bullet heaven ailesinde; low-poly üçüncü şahıs kaos olarak.',
      'games.faq.q3': 'Keep Chaos\'ta online koop var mı?',
      'games.faq.a3': 'Evet. Solo veya en fazla 4 kişilik yerel ve çevrim içi koop PvE — online survivor-like / bullet heaven nişi için tasarlandı.',
      'games.faq.q4': 'Keep Chaos\'u nereden wishlist\'e eklerim?',
      'games.faq.a4': 'Keep Chaos Steam\'e (PC) geliyor. Bu sayfadan wishlist\'e ekle; build ve erken haberler için Discord\'a katıl.',
      'games.stats.kicker': 'İstatistikler',
      'games.stats.title': 'Sıralama',
      'games.stats.desc': 'Keep Chaos · küresel ilk 100. Tahtaya tırman, kaleyi ele geçir.',
      'games.stats.back': '← Keep Chaos\'a dön',
      'games.stats.tabSolo': 'Solo',
      'games.stats.tabDuo': 'Duo',
      'games.stats.tabTrio': 'Trio',
      'games.stats.tabSquad': 'Squad',
      'games.stats.loading': 'Yükleniyor…',
      'games.stats.empty': 'Tahta şimdilik boş · koşular sayılmaya başlayınca ilk skorlar burada görünecek.',
      'games.stats.demo': 'Demo veri · canlı Steam skorları yakında',
      'games.stats.resetIn': 'Sıradaki sıfırlama',
      'games.stats.refreshIn': 'Liste yenileme',
      'games.stats.cta.kicker': 'Yarış',
      'games.stats.cta.title': 'İlk 100',
      'games.stats.cta.desc': 'Kaleyi kim tutuyor · Keep Chaos canlı sıralaması.',
      'games.stats.cta.btn': 'Sıralamayı gör',
      'games.stats.discordDesc': 'Koşularını paylaş, skorları kıyasla ve toplulukla ilk 100\'ü kovala.',
      'team.title': 'Ekip',
      'team.kicker': 'Çekirdek Ekip',
      'team.desc': 'Araçların arkasındaki insanlar · odaklı, bağımsız ve üretim odaklı.',
      'team.founder': 'Kurucu',
      'team.cofounder': 'Kurucu Ortak',
      'team.join.title': 'Bir Sonraki Büyük Hit Oyunu Yapmaya Hazır mısın?',
      'team.join.desc': 'Ekibimize katılın ve dünya çapında milyonlarca kişi tarafından oynanan oyunlar yaratın.',
      'team.join.btn': 'Ekibimize Katılın',
      'team.join.aria': 'Ekibe katılın',
      'team.thanks': 'Destekleri için RestPlay\'e ve kardeş firmamız olan The Steelwing Entertainment\'a teşekkürlerimizi sunarız.',
      'contact.title': 'İletişim',
      'contact.desc': 'Bize söylemek istediğiniz bir şey varsa, <span class="dim">buradayız.</span> Assetlerimizde veya yaptığımız oyunlarda bir sorun ya da bug ile karşılaşırsanız bize e-posta gönderin.',
      'contact.hqSub': 'Merkez Ofisimiz',
      'contact.location': 'Antalya / Türkiye',
      'contact.studioDesc': 'Bağımsız stüdyo · Unity varlıkları, özgün oyun geliştirme ve yayıncılık.',
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
      'title.index': 'Tier Studios · Keep Chaos · Bağımsız Oyun Stüdyosu',
      'title.assets': 'Varlıklar · Tier Studios',
      'title.games': 'Keep Chaos · Online Koop Survivor-Like Bullet Hell | Tier Studios',
      'title.team': 'Ekip · Tier Studios',
      'title.contact': 'İletişim · Tier Studios',
      'title.layerForge': 'Layer Forge Studio · Tier Studios',
      'title.goatIcon': 'Goat Icon Studio · Tier Studios',
      'title.uiParticle': 'UI Particle System · Tier Studios',
      'title.layerForgeDocs': 'Layer Forge Studio · Dokümantasyon · Tier Studios',
      'title.uiParticleDocs': 'UI Particle System · API Dokümantasyonu · Tier Studios',
      'title.notFound': 'Sayfa Bulunamadı · Tier Studios',
      '404.label': '404 · Sinyal Kayboldu',
      '404.title': 'Frekans bulunamadı',
      '404.desc': 'Bu kanal mevcut değil veya taşınmış. Üsse dön veya dünyalarımızı keşfet.',
      '404.btn': 'Ana Sayfaya Dön',
      '404.games': 'Oyunlar',
      '404.assets': 'Varlıklar',
      'footer.shortcutsAria': 'Site kısayolları',
      'footer.explore': 'Keşfet',
      'footer.games': 'Oyunlar',
      'footer.tools': 'Unity Araçları',
      'footer.resources': 'Kaynaklar',
      'footer.home': 'Ana Sayfa',
      'footer.leaderboard': 'Sıralama',
      'footer.layerForgeDocs': 'Layer Forge Dokümantasyon',
      'footer.uiParticleDocs': 'UI Particle Dokümantasyon',
      'footer.assetStore': 'Unity Asset Store',
      'footer.discord': 'Discord Topluluğu'
    }
  };

  var NAV_MAP = {
    '/tools': 'nav.assets',
    '/games': 'nav.games',
    '/team': 'nav.team',
    '/contact': 'nav.contact',
    tools: 'nav.assets',
    games: 'nav.games',
    team: 'nav.team',
    contact: 'nav.contact'
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
    if (pack[key] != null) return pack[key];
    if (T.en[key] != null) return T.en[key];
    return null;
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
      var val = t(lang, el.dataset.i18n);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = t(lang, el.dataset.i18nHtml);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = t(lang, el.dataset.i18nPlaceholder);
      if (val != null) el.placeholder = val;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var val = t(lang, el.dataset.i18nAria);
      if (val != null) el.setAttribute('aria-label', val);
    });

    var menuBtn = document.getElementById('mobileNavBtn');
    if (menuBtn) {
      var menuLabel = t(lang, 'common.menu');
      if (menuLabel != null) menuBtn.setAttribute('aria-label', menuLabel);
    }

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
    requestAnimationFrame(function () {
      requestAnimationFrame(updateLangIndicator);
    });
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
