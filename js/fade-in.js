// Start fade-in animation immediately on DOM ready
function startFadeInAnimation() {
  const main = document.querySelector('main');
  if (main) {
    main.style.animation = 'fadeInUp 0.8s cubic-bezier(.4,0,.2,1) 0.2s forwards';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startFadeInAnimation);
} else {
  startFadeInAnimation();
} 