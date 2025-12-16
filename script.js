// Maritime Gold - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Maritime Gold homepage loaded');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero CTA smooth scrolling
    const heroLinks = document.querySelectorAll('.hero-cta a');
    heroLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Here you would typically send the data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Visual editor drag and drop functionality
    const draggableElements = document.querySelectorAll('[data-cursor-element-id]');
    let draggedElement = null;

    draggableElements.forEach(element => {
        element.addEventListener('mousedown', function(e) {
            console.log('Element clicked:', element.dataset.cursorElementId);
            draggedElement = element;
            // Add visual feedback
            element.style.cursor = 'grabbing';
            element.style.opacity = '0.8';
        });
    });

    // Handle mouseup on document to catch releases anywhere
    document.addEventListener('mouseup', function(e) {
        if (draggedElement) {
            draggedElement.style.cursor = 'grab';
            draggedElement.style.opacity = '1';
            draggedElement = null;
        }
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat h3');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetValue = parseInt(stat.textContent);
                animateNumber(stat, 0, targetValue, 2000);
                statsObserver.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Animate number counting up
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
