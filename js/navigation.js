// Dynamic Navigation System
// Automatically generates the correct navigation based on current page path

function createNavigation() {
  const currentPath = window.location.pathname;
  
  // Determine the current page type
  const isHomePage = currentPath === '/' || currentPath === '/index.html';
  const isCVPage = currentPath.includes('/cv/');
  const isContactPage = currentPath.includes('/contact/');
  const isClientPage = currentPath.includes('/client/');
  
  // Create navigation links based on current page
  let navLinks = '';
  
  if (isHomePage) {
    navLinks = `
      <a href="./">Work</a>
      <a href="cv/">CV</a>
      <a href="contact/">Contact</a>
    `;
  } else if (isCVPage) {
    navLinks = `
      <a href="../">Work</a>
      <a href="./">CV</a>
      <a href="../contact/">Contact</a>
    `;
  } else if (isContactPage) {
    navLinks = `
      <a href="../">Work</a>
      <a href="../cv/">CV</a>
      <a href="./">Contact</a>
    `;
  } else if (isClientPage) {
    navLinks = `
      <a href="../../">Work</a>
      <a href="../../cv/">CV</a>
      <a href="../../contact/">Contact</a>
    `;
  }

  const isMobile = window.innerWidth <= 768;
  const logoText = isMobile
    ? 'Harry Wade | Video Editor'
    : 'Harry Wade | Video Editor | Motion Design | Sound Design | Animation';
  
  // Create the complete header HTML
  const headerHTML = `
    <div class="nav-left">
      ${navLinks}
    </div>
    <div class="logo-wrapper">
      <div class="logo">${logoText}</div>
    </div>
  `;
  
  // Create mobile bottom navigation HTML
  const mobileNavHTML = `
    <div class="mobile-nav">
      ${navLinks}
    </div>
  `;
  
  // Find the header element and replace its content
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = headerHTML;
  }
  
  // Add mobile navigation to body if it doesn't exist
  let mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = mobileNavHTML;
    document.body.appendChild(mobileNav);
  } else {
    mobileNav.innerHTML = mobileNavHTML;
  }
}

function updateLogoOnResize() {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  const isMobile = window.innerWidth <= 768;
  const newLogoText = isMobile
    ? 'Harry Wade | Video Editor'
    : 'Harry Wade | Video Editor | Motion Design | Sound Design | Animation';
  
  if (logo.textContent !== newLogoText) {
    logo.textContent = newLogoText;
  }
}

// Initialize navigation when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createNavigation);
} else {
  createNavigation();
}

window.addEventListener('resize', updateLogoOnResize); 