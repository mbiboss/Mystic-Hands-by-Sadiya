// Booking JavaScript for Mystic Hands by Sadiya

// Initialize booking functionality when booking page loads
function initBookingForm() {
    console.log('Booking form functionality initialized');
    
    // Setup form validation
    setupFormValidation();
    
    // Setup form animations
    setupFormAnimations();
    
    // Setup FAQ accordions
    setupFAQAccordions();
    
    // Initialize date picker with restrictions
    initDateTimePickers();
}

// Setup Form Validation
function setupFormValidation() {
    const bookingForm = document.getElementById('booking-form');
    
    if (!bookingForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');
    
    // Success message element
    const successMessage = document.getElementById('booking-success');
    
    // New booking button
    const newBookingBtn = document.getElementById('new-booking-btn');
    
    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        if (!validateName(nameInput)) {
            isValid = false;
        }
        
        // Email validation
        if (!validateEmail(emailInput)) {
            isValid = false;
        }
        
        // Phone validation
        if (!validatePhone(phoneInput)) {
            isValid = false;
        }
        
        // Date validation
        if (!validateDate(dateInput)) {
            isValid = false;
        }
        
        // Time validation
        if (!validateTime(timeInput)) {
            isValid = false;
        }
        
        // Service validation
        if (!validateService(serviceInput)) {
            isValid = false;
        }
        
        // If all fields are valid, show success message
        if (isValid) {
            // Call animation function from animations.js
            if (window.Animations && window.Animations.animateFormSuccess) {
                window.Animations.animateFormSuccess();
            } else {
                // Fallback if animations.js is not loaded
                bookingForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
        }
    });
    
    // Reset form when "Make Another Booking" is clicked
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            bookingForm.reset();
            successMessage.style.display = 'none';
            bookingForm.style.display = 'flex';
            
            // Reset all error messages
            const errorElements = bookingForm.querySelectorAll('.form-error');
            errorElements.forEach(element => {
                element.textContent = '';
                element.style.display = 'none';
            });
            
            // Reset form animations
            setupFormAnimations();
        });
    }
    
    // Real-time validation on input
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            validateName(this);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhone(this);
        });
    }
    
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            validateDate(this);
        });
    }
    
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            validateTime(this);
        });
    }
    
    if (serviceInput) {
        serviceInput.addEventListener('change', function() {
            validateService(this);
        });
    }
}

// Validation Functions
function validateName(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();
    
    if (value === '') {
        showError(input, errorElement, 'Please enter your name');
        return false;
    } else if (value.length < 2) {
        showError(input, errorElement, 'Name must be at least 2 characters');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function validateEmail(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(input, errorElement, 'Please enter your email address');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function validatePhone(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    if (value === '') {
        showError(input, errorElement, 'Please enter your phone number');
        return false;
    } else if (!phoneRegex.test(value)) {
        showError(input, errorElement, 'Please enter a valid phone number');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function validateDate(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Set max date to 6 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    
    if (value === '') {
        showError(input, errorElement, 'Please select a date');
        return false;
    } else if (selectedDate < today) {
        showError(input, errorElement, 'Please select a date in the future');
        return false;
    } else if (selectedDate > maxDate) {
        showError(input, errorElement, 'Please select a date within the next 6 months');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function validateTime(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value;
    
    if (value === '') {
        showError(input, errorElement, 'Please select a time');
        return false;
    } else {
        // Parse the selected time
        const [hours, minutes] = value.split(':').map(Number);
        
        // Check if time is within business hours (9am - 7pm)
        if (hours < 9 || hours >= 19) {
            showError(input, errorElement, 'Please select a time between 9:00 AM and 7:00 PM');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }
}

function validateService(input) {
    if (!input) return false;
    
    const errorElement = input.nextElementSibling;
    const value = input.value;
    
    if (value === '' || value === null) {
        showError(input, errorElement, 'Please select a service');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

// Show Error Message
function showError(input, errorElement, message) {
    if (!errorElement) return;
    
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide Error Message
function hideError(input, errorElement) {
    if (!errorElement) return;
    
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Setup Form Animations
function setupFormAnimations() {
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
            const label = input.previousElementSibling;
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

// Setup FAQ Accordions
function setupFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Initialize Date and Time Pickers with Restrictions
function initDateTimePickers() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set max date to 6 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);
        const maxDateString = maxDate.toISOString().split('T')[0];
        dateInput.setAttribute('max', maxDateString);
    }
    
    if (timeInput) {
        // Set min and max time (9am - 7pm)
        timeInput.setAttribute('min', '09:00');
        timeInput.setAttribute('max', '19:00');
    }
}

// If the page is loaded directly (not via SPA navigation)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#booking') {
        initBookingForm();
    }
});
