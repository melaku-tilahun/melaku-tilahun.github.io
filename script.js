document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll animation with Intersection Observer for better performance
    const reveals = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // We stop observing once revealed for a "one-way" premium feel
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Current Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for Navigation and Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            } else if (targetId === "") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for liquid background (Subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const liquid = document.querySelector('.liquid-bg');
        if (liquid) {
            liquid.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Menu toggle interaction (Visual only for now)
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            console.log('Menu interaction triggered');
            // Add custom menu logic here if needed
        });
    }
});
