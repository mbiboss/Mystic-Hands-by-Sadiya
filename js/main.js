// Main JavaScript for Mystic Hands by Sadiya

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mystic Hands by Sadiya - Application Initialized');
    initApp();
    initParticles();
    setupEventListeners();

    // Initialize current page based on hash
    const currentPage = window.location.hash.substring(1) || 'home';
    navigateToPage(currentPage);
    updateActiveLink(currentPage);
});

// Initialize Application
function initApp() {
    setupEventListeners();
    initSPANavigation();
    checkThemePreference();
    observeAnimatedElements();
    setupFAQAccordions();
    setupTestimonialsCarousel();
}

// Setup Event Listeners
function setupEventListeners() {
    try {
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Navigation Links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('.nav-link, [data-page]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    navigateToPage(page);
                    window.location.hash = page;
                    updateActiveLink(page);
                    closeMobileMenu();
                }
            }
        });

        // Initialize theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Scroll Event Listener for Header
        window.addEventListener('scroll', handleScroll);

        // Initialize testimonials if they exist
        const testimonialsCarousel = document.querySelector('.testimonials-carousel');
        if (testimonialsCarousel) {
            setupTestimonialsCarousel();
        }

        // Initialize FAQ accordions if they exist
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            setupFAQAccordions();
        }
    } catch (error) {
        console.error('Error in setupEventListeners:', error);
    }
}

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 1000 } },
                color: { value: '#D2691E' },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: { enable: true, speed: 1, size_min: 0.1, sync: false }
                },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "bubble" },
                    onclick: { enable: true, mode: "repulse" },
                    resize: true
                },
                modes: {
                    bubble: { distance: 200, size: 12, duration: 2, opacity: 0.8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 }
                }
            },
            retina_detect: true
        });
    }
}

// Check Theme Preference
function checkThemePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Toggle Theme
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Scroll Events
function handleScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Initialize SPA Navigation
function initSPANavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSPANavigation);
    });
}

// Handle SPA Navigation
function handleSPANavigation(e) {
    e.preventDefault();
    const targetPage = e.currentTarget.getAttribute('data-page');
    if (targetPage) {
        navigateToPage(targetPage);
        window.location.hash = targetPage;
        updateActiveLink(targetPage);
        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navigate to Page
function navigateToPage(pageName) {
    if (!pageName) return;

    const contentContainer = document.querySelector('main');
    if (!contentContainer) return;

    if (pageName === 'home') {
        fetch('index.html')
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const mainContent = tempDiv.querySelector('main').innerHTML;
                contentContainer.innerHTML = mainContent;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                observeAnimatedElements();
                initPageScripts('home');
            });
        return;
    }

    fetch(`${pageName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const newContent = tempDiv.querySelector('section');

            if (newContent) {
                // Remove all existing animation classes before adding new content
                const existingElements = contentContainer.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
                existingElements.forEach(element => {
                    element.classList.remove('active');
                });
                
                contentContainer.innerHTML = newContent.outerHTML;
                
                // Only initialize page-specific scripts
                initPageScripts(pageName);
                observeAnimatedElements();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentContainer.innerHTML = `
                <div class="error-container">
                    <h1>Page Not Found</h1>
                    <p>Sorry, the requested page could not be loaded.</p>
                    <a href="#home" class="btn btn-primary" data-page="home">Return Home</a>
                </div>
            `;
        });
}

// Update Active Navigation Link
function updateActiveLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link, [data-page]');
    const currentPage = pageName || 'home';

    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize Page-Specific Scripts
function initPageScripts(pageName) {
    switch (pageName) {
        case 'gallery':
            if (typeof initGallery === 'function') {
                initGallery();
            }
            break;
        case 'booking':
            if (typeof initBookingForm === 'function') {
                initBookingForm();
            }
            break;
        case 'testimonials':
            observeAnimatedElements();
            break;
    }
}

// Observe Animated Elements
function observeAnimatedElements() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Testimonials Carousel
let currentTestimonial = 0;
function setupTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    // Show the first testimonial
    testimonials[currentTestimonial].classList.add('active');

    // Set automatic rotation every 8 seconds
    let testimonialInterval = setInterval(() => {
        slideTestimonial('next');
    }, 8000);

    // Pause rotation on hover
    const testimonialContainer = document.querySelector('.testimonials-carousel');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                slideTestimonial('next');
            }, 8000);
        });
    }
}

// Slide Testimonial
function slideTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    // Remove active class from current testimonial
    testimonials[currentTestimonial].classList.remove('active');

    // Calculate next testimonial index
    if (direction === 'next') {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    } else {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    }

    // Remove active class from all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });

    // Add active class only to current testimonial
    testimonials[currentTestimonial].classList.add('active');
}

// Setup FAQ Accordions
function setupFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                // Toggle current FAQ
                item.classList.toggle('active');

                // Animate answer height
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.opacity = "1";
                } else {
                    answer.style.maxHeight = "0";
                    answer.style.opacity = "0";
                }
            });
        }
    });
}

// Initialize FAQ accordions immediately
setupFAQAccordions();