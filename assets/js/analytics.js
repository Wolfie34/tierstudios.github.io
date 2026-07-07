window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-90BT2P55DJ');

window.tierAnalytics = {
  track: function (name, params) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params || {});
  }
};
