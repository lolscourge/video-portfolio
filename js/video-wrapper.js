// Video wrapper loading functionality
window.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.video-wrapper');

  wrappers.forEach(wrapper => {
    const liteYT = wrapper.querySelector('lite-youtube');
    setTimeout(() => {
      wrapper.classList.add('loaded');
    }, 1000);
  });

  // Click outside any playing lite-youtube to stop it
  document.addEventListener('click', (e) => {
    if (!e.target.closest('lite-youtube')) {
      document.querySelectorAll('lite-youtube.lyt-activated').forEach(el => {
        const iframe = el.querySelector('iframe');
        if (iframe) iframe.remove();
        el.classList.remove('lyt-activated');
      });
    }
  });
});
