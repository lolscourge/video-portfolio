// Dynamic Footer System
// Adds a consistent footer to all pages

function createFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerHTML = `
    <footer>
      <p>&copy; ${currentYear} Harry Wade. All rights reserved.</p>
    </footer>
  `;
  
  // Add footer to the end of the body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Initialize footer when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFooter);
} else {
  createFooter();
} 