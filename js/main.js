// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const galleryGrid = document.querySelector('.gallery-grid');
const testimonialCarousel = document.querySelector('.testimonial-carousel');

// Sample Data
const galleryItems = [
    {
        image: 'images/gallery/bridal-1.jpg',
        title: 'Royal Bridal Set',
        category: 'bridal'
    },
    {
        image: 'images/gallery/festival-1.jpg',
        title: 'Eid Special',
        category: 'festival'
    },
    {
        image: 'images/gallery/modern-1.jpg',
        title: 'Contemporary Fusion',
        category: 'modern'
    },
    {
        image: 'images/gallery/custom-1.jpg',
        title: 'Personalized Design',
        category: 'custom'
    }
];

const testimonials = [
    {
        quote: "Sadiya's Mehndi was the highlight of my wedding. The intricate details lasted for weeks!",
        author: "Ayesha Khan",
        event: "Wedding"
    },
    {
        quote: "I've never seen such perfect symmetry in henna art. Absolutely stunning work!",
        author: "Priya Sharma",
        event: "Eid Celebration"
    },
    {
        quote: "The booking process was seamless and the final result exceeded all expectations.",
        author: "Fatima Ahmed",
        event: "Bridal Shower"
    }
];

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);

// Set initial icon
const icon = themeToggle.querySelector('i');
icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Mobile Menu Toggle
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Load Gallery Items
function loadGalleryItems() {
    if (!galleryGrid) return;
    
    let html = '';
    galleryItems.forEach(item => {
        html += `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <button class="view-button">View Design</button>
                </div>
            </div>
        `;
    });
    
    galleryGrid.innerHTML = html;
}

// Load Testimonials
function loadTestimonials() {
    if (!testimonialCarousel) return;
    
    let html = '';
    testimonials.forEach(testimonial => {
        html += `
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>"${testimonial.quote}"</p>
                    <div class="testimonial-meta">
                        <span class="author">${testimonial.author}</span>
                        <span class="event">${testimonial.event}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    testimonialCarousel.innerHTML = html;
}

// Initialize Carousel
function initCarousel() {
    if (!testimonialCarousel) return;
    
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }
    
    // Auto-rotate every 5 seconds
    setInterval(nextTestimonial, 5000);
    showTestimonial(0);
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
hamburger.addEventListener('click', toggleMenu);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryItems();
    loadTestimonials();
    initCarousel();
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Trigger Easter Egg
                document.body.classList.add('konami');
                setTimeout(() => {
                    document.body.classList.remove('konami');
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});