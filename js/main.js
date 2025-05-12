// Load footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const html = await response.text();
        const existingFooter = document.querySelector('footer');
        if (!existingFooter) {
            document.body.insertAdjacentHTML('beforeend', html);
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Main JavaScript for Mystic Hands by Sadiya
window.addEventListener('load', async function() {
    console.log('Mystic Hands by Sadiya - Application Initialized');
    await loadFooter();
    setupEventListeners();
    checkThemePreference();
    observeAnimatedElements();

    // Initialize current page based on hash or default to home
    const initialPage = window.location.hash.substring(1) || 'home';
    await navigateToPage(initialPage);
    updateActiveLink(initialPage);
});


// Setup Event Listeners
// Load images from HTML data attributes
const floatingDesigns = document.querySelector('.floating-designs');
if (floatingDesigns) {
    window.BRIDAL_IMAGES = JSON.parse(floatingDesigns.dataset.bridalImages || '{}');
    window.MODERN_IMAGES = JSON.parse(floatingDesigns.dataset.modernImages || '{}');
    window.TRADITIONAL_IMAGES = JSON.parse(floatingDesigns.dataset.traditionalImages || '{}');
    window.EVENTS_IMAGES = JSON.parse(floatingDesigns.dataset.eventsImages || '{}');
    window.BRAND_IMAGES = JSON.parse(floatingDesigns.dataset.brandImages || '{}');
}

function setupEventListeners() {
    try {
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn && navMenu) {
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

        // Add click effect to consultation button
        const bookingSubmit = document.querySelector('.booking-submit');
        if (bookingSubmit) {
            bookingSubmit.addEventListener('click', function(e) {
                createButtonEffect(this);
                for(let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'button-particle';
                    particle.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
                    particle.style.setProperty('--y', (Math.random() * 200 - 100) + 'px');
                    this.appendChild(particle);
                }
            });
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
                number: { value: 80, density: { enable: true, value_area: 1500 } },
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

// Toggle Button Logic
document.getElementById("toggle-button").addEventListener("click", function () {
    const buttonGroup = document.querySelector(".floating-button-group");
    buttonGroup.classList.toggle("active"); // Toggle the "active" class
});

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Add entrance animation for nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, 100 * (index + 1));
            });
        } else {
            document.body.style.overflow = '';
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(20px)';
            });
        }
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
async function navigateToPage(pageName) {
    if (!pageName) return;

    const contentContainer = document.querySelector('main');
    if (!contentContainer) return;

    try {
        if (pageName === 'home') {
            // For home page, load index.html
            const response = await fetch('index.html');
            const html = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const mainContent = tempDiv.querySelector('main');
            if (mainContent) {
                contentContainer.innerHTML = mainContent.innerHTML;
            }
        } else {
            const response = await fetch(`${pageName}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const newContent = tempDiv.querySelector('section');
            if (newContent) {
                contentContainer.innerHTML = newContent.outerHTML;
            }
        }

        window.scrollTo(0, 0);
        await loadFooter();
        initPageScripts(pageName);
        observeAnimatedElements();
    } catch (error) {
        console.error('Error loading page:', error);
        contentContainer.innerHTML = `
            <div class="error-container">
                <h1>Page Not Found</h1>
                <p>Sorry, the requested page could not be loaded.</p>
                <a href="#home" class="btn btn-primary" data-page="home">Return Home</a>
            </div>
        `;
    }
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
const TestimonialCarousel = {
    currentIndex: 0,
    interval: null,
    
    init() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;

        // Show the first testimonial
        testimonials[this.currentIndex].classList.add('active');

        // Set automatic rotation
        this.startAutoRotation();

        // Setup hover pause
        const container = document.querySelector('.testimonials-carousel');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoRotation());
            container.addEventListener('mouseleave', () => this.startAutoRotation());
        }
    },

    slide(direction) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;

        testimonials[this.currentIndex].classList.remove('active');

        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % testimonials.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + testimonials.length) % testimonials.length;
        }

        testimonials[this.currentIndex].classList.add('active');
    },

    startAutoRotation() {
        this.stopAutoRotation();
        this.interval = setInterval(() => this.slide('next'), 8000);
    },

    stopAutoRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

function setupTestimonialsCarousel() {
    TestimonialCarousel.init();
}

// Global function for HTML onclick handlers
window.slideTestimonial = function(direction) {
    TestimonialCarousel.slide(direction);
};

// Setup FAQ Accordions
function setupFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        // Initial animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, index * 150);

        if (question) {
            question.addEventListener('click', () => {
                const currentActive = document.querySelector('.faq-item.active');
                if (currentActive && currentActive !== item) {
                    currentActive.classList.remove('active');
                    const currentAnswer = currentActive.querySelector('.faq-answer');
                    const currentIcon = currentActive.querySelector('.faq-icon i');
                    if (currentAnswer) {
                        currentAnswer.style.maxHeight = '0';
                        currentAnswer.style.opacity = '0';
                    }
                    if (currentIcon) {
                        currentIcon.style.transform = 'rotate(0deg)';
                    }
                }

                item.classList.toggle('active');

                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                        if (icon) {
                            icon.style.transform = 'rotate(180deg)';
                        }
                    } else {
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                        if (icon) {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            });
        }

        if (question && answer) {
            question.addEventListener('click', (e) => {
                e.preventDefault();

                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon i');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                        }
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });

                // Toggle current FAQ
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.opacity = '1';
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
                e.preventDefault();
                const category = item.closest('.faq-category');
                const categoryItems = category.querySelectorAll('.faq-item');

                // Close other items in the same category
                categoryItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                        }
                    }
                });

                // Toggle current FAQ
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.opacity = '1';

                    // Smooth scroll if answer is not fully visible
                    const rect = answer.getBoundingClientRect();
                    const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

                    if (!isVisible) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                }
            });
        }
    });
}

// Initialize FAQ accordions immediately
setupFAQAccordions();
