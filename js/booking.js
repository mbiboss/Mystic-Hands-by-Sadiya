// Booking JavaScript for Mystic Hands by Sadiya
const BookingSystem = {
    config: {
        emailjs: {
            publicKey: "43uQhQL2JyBnvUTsO",
            serviceId: 'service_zv4zy43',
            templateId: 'template_h99nwgv',
            adminEmail: 'Ooismailforajioo@gmail.com'
        }
    },

    init() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.config.emailjs.publicKey);
        }

        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupDateTimePickers();
        window.Animations.setupFormAnimations();
    },

    setupFormValidation() {
        const validators = {
            name: value => value.length >= 2 || 'Name must be at least 2 characters',
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address',
            phone: value => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value) || 'Invalid phone number',
            date: value => new Date(value) > new Date() || 'Date must be in the future',
            time: value => value.length > 0 || 'Please select a time',
            service: value => value.length > 0 || 'Please select a service'
        };

        Object.entries(validators).forEach(([field, input]) => {
            const inputElement = document.getElementById(field);
            if (!inputElement) return;

            inputElement.addEventListener('blur', () => {
                const result = validators[field](inputElement.value.trim());
                this.handleValidation(inputElement, result === true ? null : result);
            });
        });
    },

    handleValidation(input, errorMessage) {
        const errorElement = input.nextElementSibling;
        if (!errorElement) return;

        if (errorMessage) {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },

    setupFormSubmission() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                await this.sendBookingEmail(data);
                await this.sendConfirmationEmail(data);

                this.showSuccessMessage(data);
                form.reset();
            } catch (error) {
                console.error('Booking failed:', error);
                alert('Sorry, there was an error sending your booking. Please try again or contact us directly.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Begin Your Henna Journey ✧';
            }
        });
    },

    async sendBookingEmail(data) {
        return emailjs.send(this.config.emailjs.serviceId, this.config.emailjs.templateId, {
            to_email: this.config.emailjs.adminEmail,
            to_name: data.name,
            from_name: 'Mystic Hands',
            service_name: data.service,
            booking_date: data.date,
            booking_time: data.time,
            customer_phone: data.phone,
            customer_email: data.email,
            customer_message: data.message || 'No message provided',
            reply_to: this.config.emailjs.adminEmail
        });
    },

    async sendConfirmationEmail(data) {
        return emailjs.send(this.config.emailjs.serviceId, 'template_confirmation', {
            to_email: data.email,
            to_name: data.name,
            service: data.service,
            date: data.date,
            time: data.time
        });
    },

    showSuccessMessage(data) {
        const form = document.getElementById('booking-form');
        const successMessage = document.getElementById('booking-success');
		const newBookingBtn = document.getElementById('new-booking-btn');

        if (!form || !successMessage) return;

        const formattedDate = new Date(data.date).toLocaleDateString();

        document.querySelector('#booking-success h3').innerHTML = '✧ Booking Confirmed! ✧';
        document.querySelector('#booking-success p').innerHTML = `
            Thank you ${data.name}!<br><br>
            Your ${data.service} booking has been confirmed for:<br>
            Date: ${formattedDate}<br>
            Time: ${data.time}<br><br>
            A confirmation email has been sent to ${data.email}
        `;

        form.style.display = 'none';
        successMessage.style.display = 'block';

		if (newBookingBtn) {
            newBookingBtn.addEventListener('click', function() {
                successMessage.style.display = 'none';
                form.style.display = 'block';
                form.reset();
            });
        }
    },

    setupDateTimePickers() {
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');

        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 6);

            dateInput.setAttribute('min', today);
            dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
        }

        if (timeInput) {
            timeInput.setAttribute('min', '09:00');
            timeInput.setAttribute('max', '19:00');
        }
    }
};

// Initialize booking system on DOM load
document.addEventListener('DOMContentLoaded', () => {
	BookingSystem.init();

    // Setup FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                const rect = answer.getBoundingClientRect();
                const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

                if (!isVisible) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });
});

// Add click effect to all buttons
document.removeEventListener('click', createClickEffect);

function createClickEffect(event) {
  // Add your click effect logic here. This is a placeholder.
  console.log("Click effect triggered!");
}

window.Animations = {
	setupFormAnimations() {
		const formInputs = document.querySelectorAll('.form-input');

		formInputs.forEach(input => {
			// Add focus animation
			input.addEventListener('focus', function() {
				this.classList.add('focused');

				// Move the label up if it exists
				const label = this.previousElementSibling;
				if (label && label.classList.contains('animated-label')) {
					label.classList.add('active');
				}
			});

			// Remove focus animation
			input.addEventListener('blur', function() {
				this.classList.remove('focused');

				// Only move the label back if input is empty
				const label = this.previousElementSibling;
				if (label && label.classList.contains('animated-label') && this.value === '') {
					label.classList.remove('active');
				}
			});

			// Check initial state (if input has value)
			if (input.value !== '') {
				const label = this.previousElementSibling;
				if (label && label.classList.contains('animated-label')) {
					label.classList.add('active');
				}
			}
		});

		// Add subtle animation to submit button
		const submitButton = document.querySelector('#booking-form button[type="submit"]');
		if (submitButton) {
			submitButton.addEventListener('mouseenter', function() {
				this.classList.add('pulse');
			});

			submitButton.addEventListener('mouseleave', function() {
				this.classList.remove('pulse');
			});
		}
	}
}