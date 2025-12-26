// ===================================
// MAIN JAVASCRIPT - Navigation & Core Functionality
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Active Navigation Link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Navbar Scroll Effect
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Custom Cursor (Desktop Only)
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = e.clientX;
      dotY = e.clientY;
    });
    
    function animateCursor() {
      // Smooth follow for main cursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      // Instant follow for dot
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .social-link');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
      });
    });
  }
  
  // Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Add page transition class
  document.body.classList.add('page-transition');
});

// Custom Cursor Styles (injected)
const cursorStyles = `
  .custom-cursor {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, border-color 0.3s;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.cursor-hover {
    width: 60px;
    height: 60px;
    border-color: var(--color-accent-secondary);
  }
  
  .custom-cursor-dot {
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--color-accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background 0.3s;
  }
  
  .custom-cursor-dot.cursor-hover {
    width: 8px;
    height: 8px;
    background: var(--color-accent-secondary);
  }
  
  * {
    cursor: none !important;
  }
  
  @media (max-width: 768px) {
    .custom-cursor,
    .custom-cursor-dot {
      display: none !important;
    }
    
    * {
      cursor: auto !important;
    }
  }
`;

// Inject cursor styles
if (window.innerWidth > 768) {
  const style = document.createElement('style');
  style.textContent = cursorStyles;
  document.head.appendChild(style);
}
