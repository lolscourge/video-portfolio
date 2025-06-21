// Dynamic Page Meta System
// Automatically sets page titles and meta tags based on current page

function setPageMeta() {
  const currentPath = window.location.pathname;
  
  // Default values
  let title = 'Harry Wade | Video Editor';
  let description = 'Professional video editor specializing in motion design, sound design, and animation.';
  
  // Set specific titles and descriptions based on page
  if (currentPath === '/' || currentPath === '/index.html') {
    title = 'Harry Wade | Video Editor';
    description = 'Professional video editor specializing in motion design, sound design, and animation.';
  } else if (currentPath.includes('/cv/')) {
    title = 'CV | Harry Wade';
    description = 'Professional experience and skills of Harry Wade, video editor and motion designer.';
  } else if (currentPath.includes('/contact/')) {
    title = 'Contact | Harry Wade';
    description = 'Get in touch with Harry Wade for video editing, motion design, and animation projects.';
  } else if (currentPath.includes('/client/')) {
    // Extract client name from path
    const pathParts = currentPath.split('/');
    const clientName = pathParts[pathParts.length - 2]; // Get the client folder name
    
    if (clientName) {
      // Format client name for display
      const formattedName = clientName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      title = `${formattedName} | Harry Wade`;
      description = `Video editing work for ${formattedName} by Harry Wade.`;
    }
  }
  
  // Update page title
  document.title = title;
  
  // Update meta description if it exists, or create it
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;
  
  // Update Open Graph tags if they exist, or create them
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = title;
  
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescription);
  }
  ogDescription.content = description;
  
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.content = window.location.href;
}

// Initialize page meta when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setPageMeta);
} else {
  setPageMeta();
} 