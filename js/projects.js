// ===================================
// PROJECTS - Filtering & Display
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Project Data
  const projects = [
    {
      id: 1,
      title: 'Fayda SDK',
      description: 'A minimalist, secure-by-default Node.js SDK for integrating with Ethiopia\'s National ID (Fayda) via the MOSIP eSignet OIDC platform.',
      image: 'assets/images/project-fayda.jpg',
      tags: ['TypeScript', 'Node.js', 'OIDC', 'Security'],
      category: 'open-source',
      github: 'https://github.com/melaku-tilahun/fayda-sdk',
      demo: 'https://www.npmjs.com/package/fayda-sdk',
      featured: true
    },
    {
      id: 2,
      title: 'ClariMind',
      description: 'A data analysis platform that processes raw data from PDFs, Excel, Word docs, and other formats to perform data analysis, annotation, cleaning, structuring, and comprehensive analysis.',
      image: 'assets/images/placeholder.jpg',
      tags: ['Python', 'Data Analysis', 'ML', 'PDF Processing'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Agri-Chain-ET',
      description: 'A minimal proof-of-concept blockchain dApp combining static web frontend with Solidity smart contracts (Hardhat) and Supabase. Users can create agricultural batches, write on-chain hashes for integrity, store JSON off-chain, generate QR codes, and trace batch history.',
      image: 'assets/images/placeholder.jpg',
      tags: ['Solidity', 'Web3', 'Supabase', 'Hardhat'],
      category: 'tools',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Polio Awareness Chatbot',
      description: 'An AI chatbot developed to support public health education and awareness initiatives for polio prevention.',
      image: 'assets/images/placeholder.jpg',
      tags: ['Python', 'AI/ML', 'Healthcare', 'Public Health'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 5,
      title: 'JU-SRH - AI Health Chatbot',
      description: 'An AI chatbot deployed at Jimma University to provide accurate, confidential sexual & reproductive health information to students.',
      image: 'assets/images/placeholder.jpg',
      tags: ['Python', 'AI/ML', 'Healthcare', 'NLP'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: false
    }
  ];
  
  // Get filter buttons and project container
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectsContainer = document.getElementById('projects-container');
  
  if (!projectsContainer) return;
  
  // Render projects
  const renderProjects = (filter = 'all') => {
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(p => p.category === filter);
    
    projectsContainer.innerHTML = filteredProjects.map(project => `
      <div class="project-card card reveal" data-category="${project.category}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/placeholder.jpg'">
          <div class="project-overlay">
            <div class="project-links">
              ${project.github !== '#' ? `
                <a href="${project.github}" target="_blank" class="btn btn-secondary btn-sm">
                  <i class="fab fa-github"></i> Code
                </a>
              ` : ''}
              ${project.demo !== '#' ? `
                <a href="${project.demo}" target="_blank" class="btn btn-primary btn-sm">
                  <i class="fas fa-external-link-alt"></i> Demo
                </a>
              ` : ''}
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
    
    // Re-observe new elements for animations
    const newRevealElements = projectsContainer.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    newRevealElements.forEach(el => observer.observe(el));
  };
  
  // Filter functionality
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const filter = button.dataset.filter;
        renderProjects(filter);
      });
    });
  }
  
  // Initial render
  renderProjects();
  
  // Check for URL params (for chatbot navigation)
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter');
  if (initialFilter) {
    const filterBtn = document.querySelector(`[data-filter="${initialFilter}"]`);
    if (filterBtn) {
      setTimeout(() => filterBtn.click(), 500); // Small delay to ensure loaded
    }
  }
  
  // Search functionality
  const searchInput = document.getElementById('project-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.badge'))
          .map(badge => badge.textContent.toLowerCase())
          .join(' ');
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
      });
    });
  }
});
