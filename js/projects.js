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
      image: 'assets/images/project-fayda-light.jpg',
      tags: ['TypeScript', 'Node.js', 'OIDC', 'Security'],
      category: 'open-source',
      github: 'https://github.com/melaku-tilahun/fayda-sdk',
      demo: 'https://www.npmjs.com/package/fayda-sdk',
      featured: true
    },
    {
      id: 2,
      title: 'PerLab - AI Study Platform',
      description: 'An AI-driven learning platform designed to help students prepare for national exams through structured explanations and intelligent academic support.',
      image: 'assets/images/project-perlab-light.jpg',
      tags: ['React', 'Python', 'AI/ML', 'Education'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 3,
      title: 'JU-SRH - AI Health Chatbot',
      description: 'An AI chatbot deployed at Jimma University to provide accurate, confidential sexual & reproductive health information to students.',
      image: 'assets/images/placeholder-light.jpg',
      tags: ['Python', 'AI/ML', 'Healthcare', 'NLP'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Gini AI - Assignment Assistant',
      description: 'An AI assistant that helps students understand assignments, generate structured responses, and improve academic productivity.',
      image: 'assets/images/placeholder-light.jpg',
      tags: ['Python', 'OpenAI', 'Education', 'NLP'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 5,
      title: 'AFP Assistant',
      description: 'A React Native mobile application with Supabase authentication, built for structured data interaction and operational assistance.',
      image: 'assets/images/placeholder-light.jpg',
      tags: ['React Native', 'Supabase', 'Mobile', 'TypeScript'],
      category: 'tools',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Polio Awareness Chatbot',
      description: 'An AI chatbot developed to support public health education and awareness initiatives for polio prevention.',
      image: 'assets/images/placeholder-light.jpg',
      tags: ['Python', 'AI/ML', 'Healthcare', 'Public Health'],
      category: 'ai-ml',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 7,
      title: 'Web Exploitation Framework',
      description: 'A modular, Metasploit-inspired penetration testing framework focused on OWASP Top 10 web vulnerabilities.',
      image: 'assets/images/placeholder-light.jpg',
      tags: ['Python', 'Security', 'Pentesting', 'OWASP'],
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
