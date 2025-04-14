// Main JavaScript for Mystic Hands by Sadiya

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Application
    initApp();
    
    // Setup Event Listeners
    setupEventListeners();
    
    // Initialize Particles.js
    initParticles();
    
    // Check for initial theme preference
    checkThemePreference();
    
    // Initialize SPA Navigation
    initSPANavigation();
    
    // Setup Testimonials Carousel
    setupTestimonialsCarousel();
    
    // Set up FAQ Accordions
    setupFAQAccordions();
    
    // Start animation observation
    observeAnimatedElements();
});

// Initialize Application
function initApp() {
    console.log('Mystic Hands by Sadiya - Application Initialized');
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close Mobile Menu on Link Click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Footer Links SPA Behavior
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', handleSPANavigation);
    });
    
    // Scroll Event Listener for Header
    window.addEventListener('scroll', handleScroll);
    
    // Setup Testimonial Controls
    const prevButton = document.querySelector('.testimonial-btn.prev');
    const nextButton = document.querySelector('.testimonial-btn.next');
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => slideTestimonial('prev'));
        nextButton.addEventListener('click', () => slideTestimonial('next'));
    }
}

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 15, density: { enable: true, value_area: 800 } },
                color: { value: '#9D7553' },
                shape: {
                    type: ['circle', 'triangle', 'edge', 'polygon'],
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 10,
                    random: true,
                    anim: { enable: true, speed: 3, size_min: 5, sync: false }
                },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: { enable: true, mode: 'bubble' },
                    onclick: { enable: true, mode: 'repulse' },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 0.5 } },
                    bubble: { distance: 400, size: 12, duration: 2, opacity: 0.5, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('Particles.js library not loaded.');
    }
}

// Check Theme Preference from localStorage
function checkThemePreference() {
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Toggle Dark/Light Theme
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
    
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Scroll Events
function handleScroll() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Initialize SPA Navigation
function initSPANavigation() {
    // Set up click listeners for all navigation links
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleSPANavigation);
    });
    
    // Handle initial navigation based on hash
    const initialHash = window.location.hash || '#home';
    navigateToPage(initialHash.substring(1));
    
    // Update active link based on hash
    updateActiveLink(initialHash.substring(1));
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1) || 'home';
        updateActiveLink(hash);
    });
}

// Handle SPA Navigation Clicks
function handleSPANavigation(e) {
    e.preventDefault();
    
    const targetPage = this.getAttribute('data-page');
    
    // If we're clicking on Home from a different page, handle it specially
    if (targetPage === 'home' && window.location.hash !== '#home') {
        window.location.hash = targetPage;
        location.reload(); // Reload page to go to home
        return;
    }
    
    // For other links or if already on home
    navigateToPage(targetPage);
    
    // Update URL hash
    window.location.hash = targetPage;
    
    // Update active link
    updateActiveLink(targetPage);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to Page
function navigateToPage(pageName) {
    const contentContainer = document.getElementById('page-content');
    
    // Only home content is loaded initially from index.html
    // Other pages need to be loaded
    if (pageName !== 'home') {
        contentContainer.classList.add('page-exit');
        
        // Fetch page content
        fetch(`${pageName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page not found');
                }
                return response.text();
            })
            .then(html => {
                setTimeout(() => {
                    contentContainer.innerHTML = html;
                    contentContainer.classList.remove('page-exit');
                    contentContainer.classList.add('page-enter');
                    
                    // Initialize page-specific scripts
                    initPageScripts(pageName);
                    
                    // Reset animation observations for new content
                    observeAnimatedElements();
                }, 300);
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
                contentContainer.classList.remove('page-exit');
            });
    } else {
        // We're already on the home page which is loaded from index.html
        // Just reinitialize any home page specific functionality
        initPageScripts('home');
    }
}

// Update Active Navigation Link
function updateActiveLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
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
            // Initialize Gallery Page Scripts
            if (typeof initGallery === 'function') {
                initGallery();
            }
            break;
        case 'booking':
            // Initialize Booking Page Scripts
            if (typeof initBookingForm === 'function') {
                initBookingForm();
            }
            break;
        case 'home':
            // Re-initialize home page specific functionality
            setupTestimonialsCarousel();
            break;
        case 'testimonials':
            // Initialize testimonials page functionality
            observeAnimatedElements();
            break;
        case 'about':
            // Any about page specific functionality
            break;
    }
    
    // Setup FAQ accordions regardless of page since they might appear on multiple pages
    setupFAQAccordions();
}

// Testimonials Carousel
let currentTestimonial = 0;
function setupTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    // Show the first testimonial
    testimonials[currentTestimonial].classList.add('active');
    
    // Set automatic rotation every 5 seconds
    setInterval(() => {
        slideTestimonial('next');
    }, 5000);
}

// Slide Testimonial
function slideTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    testimonials[currentTestimonial].classList.remove('active');
    
    if (direction === 'next') {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    } else {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    }
    
    testimonials[currentTestimonial].classList.add('active');
}

// Setup FAQ Accordions
function setupFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all open accordions
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open the clicked one if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
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
