document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('henna-booking-form');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const eventType = document.getElementById('event-type').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            if (!name || !email || !phone || !eventType || !date || !time) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', {
                name,
                email,
                phone,
                eventType,
                date,
                time,
                designType: document.getElementById('design-type').value,
                details: document.getElementById('details').value.trim()
            });
            
            // Show confirmation modal
            confirmationModal.style.display = 'flex';
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Date picker restrictions
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const minDate = new Date();
        minDate.setDate(today.getDate() + 14); // 2 weeks in advance
        
        dateInput.min = minDate.toISOString().split('T')[0];
        
        // Disable monsoon months (June-August)
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            const month = selectedDate.getMonth() + 1; // 1-12
            
            if (month >= 6 && month <= 8) {
                alert('Note: Henna may not last as long during monsoon season (June-August)');
            }
        });
    }
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.2
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize scroll animations
    handleScrollAnimation();
});