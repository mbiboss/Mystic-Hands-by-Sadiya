// Animations JavaScript for Mystic Hands by Sadiya

const Animations = {
    init() {
        this.triggerInitialAnimations();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupContinuousAnimations();
        this.setupClickEffects();
        this.setupFormAnimations();
    },

    triggerInitialAnimations() {
        document.querySelectorAll('.hero-section .fade-in, .hero-section .slide-left, .hero-section .slide-right')
            .forEach((el, index) => {
                setTimeout(() => el.classList.add('active'), 100 * index);
            });
    },

    setupScrollAnimations() {
        const scrollObserver = new IntersectionObserver(
            entries => entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    scrollObserver.unobserve(entry.target);
                }
            }),
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        document.querySelectorAll('.fade-in:not(.active), .slide-left:not(.active), .slide-right:not(.active), .scale-in:not(.active)')
            .forEach(element => scrollObserver.observe(element));
    },

    setupHoverAnimations() {
        // Service cards hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.classList.add('pulse'));
            card.addEventListener('mouseleave', () => card.classList.remove('pulse'));
        });

        // Gallery items hover
        document.querySelectorAll('.gallery-item').forEach(item => {
            const overlay = item.querySelector('.image-overlay');
            if (overlay) {
                item.addEventListener('mouseenter', () => overlay.style.opacity = '1');
                item.addEventListener('mouseleave', () => overlay.style.opacity = '0');
            }
        });

        // Button hover
        document.querySelectorAll('.glow-on-hover').forEach(btn => {
            btn.addEventListener('mouseenter', () => btn.classList.add('glow'));
            btn.addEventListener('mouseleave', () => btn.classList.remove('glow'));
        });
    },

    setupContinuousAnimations() {
        document.querySelectorAll('.feature-icon, .service-icon')
            .forEach(element => element.classList.add('float'));

        document.querySelectorAll('.cta-section .btn')
            .forEach(button => button.classList.add('pulse'));

        this.createFloatingParticles();
    },

    setupClickEffects() {
        document.addEventListener('click', this.createClickEffect);

        const submitBtn = document.querySelector('.booking-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.createButtonEffect(submitBtn));
        }
    },

    createClickEffect(e) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    },

    createButtonEffect(button) {
        const colors = ['#D2691E', '#8B4513', '#CD853F'];
        Array.from({length: 8}).forEach(() => {
            const particle = document.createElement('div');
            particle.className = 'button-particle';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
            particle.style.setProperty('--y', (Math.random() * 200 - 100) + 'px');
            button.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        });
    },

    createFloatingParticles() {
        let container = document.getElementById('particles-js') || (() => {
            const div = document.createElement('div');
            div.id = 'particles-js';
            div.classList.add('particles-container');
            document.body.appendChild(div);
            return div;
        })();

        // Define particle shapes
        const shapes = [
            // Flower SVG
            `<svg viewBox="0 0 100 100" class="particle-svg flower"><path d="M50,20 C60,10 70,15 75,25 C80,35 75,50 65,55 C75,60 80,75 75,85 C70,95 60,100 50,90 C40,100 30,95 25,85 C20,75 25,60 35,55 C25,50 20,35 25,25 C30,15 40,10 50,20 Z" fill="currentColor"/><circle cx="50" cy="55" r="10" fill="var(--accent-color-2)"/></svg>`,

            // Leaf SVG
            `<svg viewBox="0 0 100 100" class="particle-svg leaf"><path d="M30,20 C60,5 85,30 70,60 C55,85 20,90 10,60 C0,30 30,20 30,20 Z" fill="currentColor"/><path d="M30,20 C40,40 30,70 10,60" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/></svg>`,

            // Mandala dot
            `<svg viewBox="0 0 100 100" class="particle-svg mandala-dot"><circle cx="50" cy="50" r="20" fill="currentColor"/><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="5,5"/></svg>`,

            // Henna swirl
            `<svg viewBox="0 0 100 100" class="particle-svg swirl"><path d="M40,20 C80,10 90,50 75,70 C60,90 30,80 20,60 C10,40 20,20 40,20 Z M40,20 C40,40 60,50 75,70" stroke="currentColor" stroke-width="3" fill="none"/></svg>`,

            // Simple paisley
            `<svg viewBox="0 0 100 100" class="particle-svg paisley"><path d="M30,20 C70,5 90,40 70,70 C50,100 10,80 20,50 C30,20 50,30 50,40 C50,50 40,60 30,50 C20,40 30,30 30,20" fill="currentColor"/></svg>`
        ];

        // Create a good number of particles
        const particleCount = 18; // More particles for a fuller effect

        for (let i = 0; i < particleCount; i++) {
            // Create particle container
            const particle = document.createElement('div');
            particle.classList.add('henna-particle');

            // Randomly select a shape
            const shapeIndex = Math.floor(Math.random() * shapes.length);

            // Random position - cover the entire viewport for a more distributed effect
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Varied sizes - make some larger for visual interest
            const size = Math.random() * 40 + 20; // Bigger size range

            // Random rotation for natural look
            const rotation = Math.random() * 360;

            // Random speed/delay with longer durations for a gentler float
            const delay = Math.random() * 8; // More varied delays
            const duration = Math.random() * 20 + 20; // Longer durations for slower movement

            // Random path variation
            const pathVariation = Math.floor(Math.random() * 4); // 4 different path types
            let animationName;

            switch(pathVariation) {
                case 0:
                    animationName = 'particleFloatPath1';
                    break;
                case 1:
                    animationName = 'particleFloatPath2';
                    break;
                case 2:
                    animationName = 'particleFloatPath3';
                    break;
                default:
                    animationName = 'particleFloatPath4';
            }

            // Random color variation but staying in theme
            const colorSet = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)', 'var(--accent-color-2)'];
            const color = colorSet[Math.floor(Math.random() * colorSet.length)];

            // Apply styles
            particle.style.cssText = `
                position: fixed;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${Math.random() * 0.3 + 0.1}; /* More varied opacity */
                color: ${color};
                transform: rotate(${rotation}deg);
                animation: ${animationName} ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                z-index: -1;
                pointer-events: none;
            `;

            // Insert SVG
            particle.innerHTML = shapes[shapeIndex];

            // Add to container
            container.appendChild(particle);
        }
    },

    // Form-specific animations
    setupFormAnimations() {
        document.querySelectorAll('.form-input').forEach(input => {
            const label = input.nextElementSibling;
            if (!label?.classList.contains('animated-label')) return;

            if (input.value) label.classList.add('active');

            input.addEventListener('focus', () => label.classList.add('active'));
            input.addEventListener('blur', () => {
                if (!input.value) label.classList.remove('active');
            });
        });
    },

    // Page transition animation
    animatePageTransition(callback) {
        const pageContent = document.getElementById('page-content');
        if (!pageContent) return;

        pageContent.classList.add('page-exit');
        setTimeout(() => {
            callback?.();
            pageContent.classList.remove('page-exit');
            pageContent.classList.add('page-enter');
            setTimeout(() => pageContent.classList.remove('page-enter'), 500);
        }, 300);
    },

    animateFormSuccess() {
        const form = document.getElementById('booking-form');
        const successMessage = document.getElementById('booking-success');

        if (!form || !successMessage) return;

        form.classList.add('fade-out');

        setTimeout(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.classList.add('active');

            const successIcon = successMessage.querySelector('.success-icon');
            if (successIcon) {
                successIcon.classList.add('active');
            }
        }, 300);
    },

    animateTestimonialChange(current, next) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;

        testimonials[current].classList.add('page-exit');

        setTimeout(() => {
            testimonials[current].classList.remove('active');
            testimonials[current].classList.remove('page-exit');
            testimonials[next].classList.add('active');
        }, 300);
    }

};

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => Animations.init());

// Export for use in other modules
window.Animations = Animations;