window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

var COOKIE_KEY = 'tier-cookies';

function readConsent() {
  try {
    var raw = localStorage.getItem(COOKIE_KEY);
    if (raw === 'granted' || raw === 'denied') return raw;
  } catch (err) {}
  return null;
}

gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());

if (readConsent() === 'granted') {
  gtag('consent', 'update', { analytics_storage: 'granted' });
}

gtag('config', 'G-90BT2P55DJ', { anonymize_ip: true });

window.tierAnalytics = {
  key: COOKIE_KEY,
  get: readConsent,
  set: function (value) {
    var next = value === 'granted' ? 'granted' : 'denied';
    try { localStorage.setItem(COOKIE_KEY, next); } catch (err) {}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: next === 'granted' ? 'granted' : 'denied'
      });
    }
    window.dispatchEvent(new CustomEvent('tier:cookies', { detail: { analytics: next } }));
    return next;
  },
  track: function (name, params) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params || {});
  }
};
