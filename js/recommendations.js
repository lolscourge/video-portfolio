// Add "You might like" section with random recommendations
function addRecommendations() {
  // Define all projects from the homepage
  const projects = [
    {
      title: 'Team Jesser',
      image: '/images/team-jesser-grid-image.png',
      link: '/client/teamjesser/',
      tags: 'Youtuber • Challenge Content • Sports • 2025'
    },
    {
      title: 'Clickbaited',
      image: '/images/clickbaited.jpg',
      link: '/client/clickbaited/',
      tags: 'Editorial • Podcast • 2025'
    },
    {
      title: 'Fall Damage',
      image: '/images/fall-damage-grid-image.png',
      link: '/client/fall damage/',
      tags: 'Editorial • Commercial • Shorts • 2025'
    },
    {
      title: 'Dexerto',
      image: '/images/dexerto-grid-image.jpeg',
      link: '/client/dexerto/',
      tags: 'Commercial • Editorial • Shorts • 2025'
    },
    {
      title: 'Reverse Sweep',
      image: '/images/reverse-sweep-grid-image.png',
      link: '/client/reversesweep/',
      tags: 'Editorial • Podcast • Shorts • 2024'
    },
    {
      title: 'The Jungle',
      image: '/images/the-jungle-grid-image.png',
      link: '/client/the jungle/',
      tags: 'Editorial • Podcast • 2023'
    },
    {
      title: 'NoahJ456',
      image: '/images/noahj-grid-image.jpg',
      link: '/client/noahj456/',
      tags: 'Social Media • Influencer • 2022'
    },
    {
      title: 'MattHDGamer',
      image: '/images/matthdgamer-grid-image.png',
      link: '/client/matthdgamer/',
      tags: 'Social Media • Influencer • 2022'
    },
    {
      title: 'Betway x NiP',
      image: '/images/betwayxnip-grid-image.png',
      link: '/client/betway/',
      tags: 'Commercial • Production • Hosting • Event • 2021'
    }
  ];

  // Get current page path to exclude it from recommendations
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').filter(segment => segment).pop();
  
  // Filter out current page from recommendations
  const availableProjects = projects.filter(project => {
    const projectPath = project.link.split('/').filter(segment => segment).pop();
    return projectPath !== currentPage;
  });
  
  // Get 3 random projects
  const shuffled = availableProjects.sort(() => 0.5 - Math.random());
  const selectedProjects = shuffled.slice(0, 3);

  // Create recommendations section
  const recommendationsSection = document.createElement('section');
  recommendationsSection.className = 'recommendations-section';
  recommendationsSection.innerHTML = `
    <h1>You might like</h1>
    <div class="grid">
      ${selectedProjects.map(project => `
        <div class="grid-item">
          <a href="${project.link}">
            <img src="${project.image}" alt="${project.title}" />
            <div class="overlay">
              <h2>${project.title}</h2>
              <p>${project.tags}</p>
            </div>
          </a>
        </div>
      `).join('')}
    </div>
  `;

  // Add to main element
  const main = document.querySelector('main');
  main.appendChild(recommendationsSection);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addRecommendations);
} else {
  addRecommendations();
} 