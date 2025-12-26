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
      title: 'RAG Implementation',
      description: 'Advanced Retrieval-Augmented Generation system for building specialized AI agents with contextual understanding.',
      image: 'assets/images/project-rag.jpg',
      tags: ['Python', 'AI/ML', 'LangChain', 'Vector DB'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 3,
      title: 'AI Chatbot Platform',
      description: 'Intelligent chatbot platform with domain-specific knowledge integration and natural language understanding.',
      image: 'assets/images/project-chatbot.jpg',
      tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Task Automation Suite',
      description: 'Collection of intelligent scripts and tools for automating repetitive development workflows.',
      image: 'assets/images/project-automation.jpg',
      tags: ['Python', 'Bash', 'CI/CD', 'Docker'],
      category: 'tools',
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
