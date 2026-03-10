window.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.video-wrapper');
  wrappers.forEach(wrapper => {
    setTimeout(() => wrapper.classList.add('loaded'), 1000);
  });

  // Hide the YouTube play button overlay while the video is active
  const style = document.createElement('style');
  style.textContent = `
    lite-youtube.lyt-activated .lty-playbtn { display: none; }
    lite-youtube.lyt-activated iframe { pointer-events: all; }
  `;
  document.head.appendChild(style);

  function resetVideo(el) {
    const iframe = el.querySelector('iframe');
    if (iframe) iframe.remove();
    el.classList.remove('lyt-activated');
    delete el.dataset.hasPlayed;
  }

  // When lite-youtube activates, patch the iframe src to enable the JS API
  document.querySelectorAll('lite-youtube').forEach(el => {
    new MutationObserver(() => {
      if (!el.classList.contains('lyt-activated')) return;
      const iframe = el.querySelector('iframe');
      if (!iframe || iframe.dataset.apiEnabled) return;
      const url = new URL(iframe.src);
      url.searchParams.set('enablejsapi', '1');
      iframe.src = url.toString();
      iframe.dataset.apiEnabled = '1';
    }).observe(el, { attributes: true, attributeFilter: ['class'] });
  });

  // Listen for YouTube player state changes via postMessage
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://www.youtube.com') return;
    try {
      const data = JSON.parse(e.data);
      if (data.event !== 'onStateChange') return;

      const el = [...document.querySelectorAll('lite-youtube.lyt-activated')].find(el => {
        const iframe = el.querySelector('iframe');
        return iframe && iframe.contentWindow === e.source;
      });
      if (!el) return;

      if (data.info === 1) {
        // Playing — mark so we don't reset on the initial pre-autoplay pause
        el.dataset.hasPlayed = '1';
      } else if ((data.info === 2 || data.info === 0) && el.dataset.hasPlayed) {
        // Paused or ended after having played — back to thumbnail
        resetVideo(el);
      }
    } catch (err) {}
  });
});
