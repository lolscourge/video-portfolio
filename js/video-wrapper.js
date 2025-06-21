// Video wrapper loading functionality
window.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.video-wrapper');

  wrappers.forEach(wrapper => {
    const liteYT = wrapper.querySelector('lite-youtube');
    
    // The lite-youtube component loads the iframe internally,
    // so we listen for the iframe load event inside the shadow DOM.
    // Since this isn't trivial, fallback to setting loaded after a delay.
    
    setTimeout(() => {
      wrapper.classList.add('loaded');
    }, 1000);
  });
}); 