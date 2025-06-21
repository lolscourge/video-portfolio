// Mobile Navigation Visibility Controller
// Shows navbar background when it's likely to be used

function initMobileNavVisibility() {
  const mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav) return;

  // Show mobile nav on mobile-sized windows (including desktop resized)
  function updateMobileNavVisibility() {
    if (window.innerWidth > 768) {
      mobileNav.style.display = 'none';
      return false; // Don't initialize functionality
    } else {
      mobileNav.style.display = 'flex';
      return true; // Initialize functionality
    }
  }

  // Check if we should initialize the functionality
  if (!updateMobileNavVisibility()) {
    return;
  }

  let scrollTimeout;
  let inactivityTimeout;

  function checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
    
    // Show navbar when:
    // 1. User is near the bottom of the page (last 15%)
    // 2. User is at the very top (first 3%)
    // 3. User has scrolled down more than 200px
    const shouldShow = scrollPercentage > 0.85 || scrollPercentage < 0.03 || scrollTop > 200;
    
    if (shouldShow) {
      mobileNav.classList.remove('nav-hidden');
    } else {
      mobileNav.classList.add('nav-hidden');
    }
  }

  function hideNavbarAfterInactivity() {
    // Hide navbar after 2 seconds of inactivity
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      mobileNav.classList.add('nav-hidden');
    }, 2000);
  }

  function handleScroll() {
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Show navbar immediately when scrolling
    mobileNav.classList.remove('nav-hidden');
    
    // Hide navbar after scrolling stops (1.5 seconds delay)
    scrollTimeout = setTimeout(() => {
      checkScrollPosition();
    }, 1500);
  }

  function handleTouchStart() {
    // Show navbar when user touches the screen (likely to use nav)
    mobileNav.classList.remove('nav-hidden');
    hideNavbarAfterInactivity();
  }

  function handleTouchEnd() {
    // Hide navbar after touch ends (unless near bottom/top)
    setTimeout(() => {
      checkScrollPosition();
    }, 1000);
  }

  function handleMouseMove() {
    // Show navbar when mouse moves (likely to use nav)
    mobileNav.classList.remove('nav-hidden');
    hideNavbarAfterInactivity();
  }

  function handleMouseLeave() {
    // Hide navbar when mouse leaves the window
    setTimeout(() => {
      checkScrollPosition();
    }, 500);
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  
  // Initial check
  checkScrollPosition();
  
  // Start inactivity timer
  hideNavbarAfterInactivity();
}

// Global resize handler
function handleResize() {
  const mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav) return;

  if (window.innerWidth > 768) {
    // Hide mobile nav on desktop
    mobileNav.style.display = 'none';
    mobileNav.classList.add('nav-hidden');
  } else {
    // Show mobile nav on mobile-sized windows and re-initialize
    mobileNav.style.display = 'flex';
    initMobileNavVisibility();
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNavVisibility();
    window.addEventListener('resize', handleResize, { passive: true });
  });
} else {
  initMobileNavVisibility();
  window.addEventListener('resize', handleResize, { passive: true });
} 