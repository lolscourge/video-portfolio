// Site Components Loader
// Loads all dynamic site components in the correct order

// Load navigation first (needed for all pages)
const navigationScript = document.createElement('script');
navigationScript.src = getScriptPath('navigation.js');
document.head.appendChild(navigationScript);

// Load mobile nav visibility controller
const mobileNavScript = document.createElement('script');
mobileNavScript.src = getScriptPath('mobile-nav.js');
document.head.appendChild(mobileNavScript);

// Load page meta system
const pageMetaScript = document.createElement('script');
pageMetaScript.src = getScriptPath('page-meta.js');
document.head.appendChild(pageMetaScript);

// Load footer system
const footerScript = document.createElement('script');
footerScript.src = getScriptPath('footer.js');
document.head.appendChild(footerScript);

// Helper function to get the correct script path based on current page
function getScriptPath(scriptName) {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/' || currentPath === '/index.html') {
    return `js/${scriptName}`;
  } else if (currentPath.includes('/cv/') || currentPath.includes('/contact/')) {
    return `../js/${scriptName}`;
  } else if (currentPath.includes('/client/')) {
    return `../../js/${scriptName}`;
  }
  
  // Fallback
  return `js/${scriptName}`;
} 