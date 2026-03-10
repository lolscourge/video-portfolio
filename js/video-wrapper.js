// Video wrapper loading functionality
window.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.video-wrapper');

  wrappers.forEach(wrapper => {
    const liteYT = wrapper.querySelector('lite-youtube');
    setTimeout(() => {
      wrapper.classList.add('loaded');
    }, 1000);
  });

  // Inject close button styles
  const style = document.createElement('style');
  style.textContent = `
    lite-youtube { position: relative; }
    .lyt-close {
      display: none;
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 100;
      background: rgba(0, 0, 0, 0.65);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 14px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .lyt-close:hover { background: rgba(0, 0, 0, 0.9); }
    lite-youtube.lyt-activated .lyt-close { display: flex; }
  `;
  document.head.appendChild(style);

  // Add a close button to every lite-youtube
  document.querySelectorAll('lite-youtube').forEach(el => {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lyt-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Stop video');
    el.appendChild(closeBtn);

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const iframe = el.querySelector('iframe');
      if (iframe) iframe.remove();
      el.classList.remove('lyt-activated');
    });
  });
});
