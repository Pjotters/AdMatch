// AdMatch Advertentie Widget (voor developers)
// Gebruik: plaats dit script op je eigen site, configureer apiKey/secret en opties

(function() {
  // Configuratie: vul je eigen key/secret in (of via data-attribuut)
  const apiKey = window.ADMATCH_API_KEY || 'VUL_HIER_JE_API_KEY_IN';
  const secret = window.ADMATCH_API_SECRET || 'VUL_HIER_JE_SECRET_IN';
  const apiUrl = window.ADMATCH_API_URL || 'https://jouw-backend-url/api/admatch/ads';
  const target = document.getElementById('admatch-widget') || document.body;
  const audience = window.ADMATCH_AUDIENCE || '';
  const subject = window.ADMATCH_SUBJECT || '';

  function renderAd(ad) {
    const div = document.createElement('div');
    div.className = 'admatch-ad';
    div.style = 'background:#182a47;color:#f6f8fb;margin:1em 0;padding:1em;border-radius:8px;max-width:400px;box-shadow:0 2px 8px #0001;';
    if (ad.fileUrl) {
      if (ad.fileUrl.match(/\\.(mp4|webm)$/)) {
        div.innerHTML += `<video src="${ad.fileUrl}" controls style="max-width:100%;border-radius:6px;"></video>`;
      } else {
        div.innerHTML += `<img src="${ad.fileUrl}" alt="advertentie" style="max-width:100%;border-radius:6px;"/>`;
      }
    }
    if (ad.text) div.innerHTML += `<div style="margin-top:0.7em;">${ad.text}</div>`;
    if (ad.website) div.innerHTML += `<div><a href="${ad.website}" target="_blank" style="color:#3ea6ff;">Bekijk website</a></div>`;
    target.appendChild(div);
  }

  // Ophalen van advertenties
  fetch(apiUrl + `?audience=${encodeURIComponent(audience)}&subject=${encodeURIComponent(subject)}`,
    { headers: { 'X-API-KEY': apiKey, 'X-API-SECRET': secret } })
    .then(r => r.json())
    .then(data => {
      if (!data.ads || !data.ads.length) {
        target.innerHTML = '<div style="color:#b8b8d1;">Geen advertenties beschikbaar.</div>';
        return;
      }
      // Toon maximaal 1 advertentie (random)
      const ad = data.ads[Math.floor(Math.random()*data.ads.length)];
      renderAd(ad);
    })
    .catch(() => {
      target.innerHTML = '<div style="color:#ff5252;">Kan advertenties niet laden.</div>';
    });
})();
