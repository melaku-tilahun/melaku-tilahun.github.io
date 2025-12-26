// ===================================
// ANIMATIONS - Scroll Reveal & Effects
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
    '.reveal-delay-1, .reveal-delay-2, .reveal-delay-3, ' +
    '.reveal-delay-4, .reveal-delay-5'
  );
  
  revealElements.forEach(el => observer.observe(el));
  
  // Parallax Effect on Scroll
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length > 0 && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
  
  // Gradient Orb Mouse Follow Effect
  const orbs = document.querySelectorAll('.gradient-orb');
  
  if (orbs.length > 0 && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
  
  // Stagger Animation for Grid Items
  const staggerGrids = document.querySelectorAll('[data-stagger]');
  
  staggerGrids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('reveal');
    });
  });
  
  // Counter Animation
  const counters = document.querySelectorAll('[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
  
  // Typing Effect
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(el => {
    const text = el.dataset.typing;
    const speed = parseInt(el.dataset.typingSpeed) || 100;
    let index = 0;
    
    el.textContent = '';
    
    const type = () => {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    
    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          typingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    typingObserver.observe(el);
  });
  
  // Tilt Effect on Cards
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
});
