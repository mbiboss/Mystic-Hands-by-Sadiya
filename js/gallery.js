// Gallery JavaScript for Mystic Hands by Sadiya

// Initialize gallery functionality when gallery page loads
function initGallery() {
    console.log('Gallery functionality initialized');
    
    // Setup gallery filtering
    setupGalleryFilter();
    
    // Setup lightbox functionality
    setupLightbox();
    
    // Add touch/swipe support for mobile devices
    setupTouchSupport();
    
    // Initialize animations for gallery items
    animateGalleryItems();
}

// Setup Gallery Filter Functionality
function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                // Hide all items first with a fade out effect
                item.classList.add('fade-out');
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Remove fade out and add fade in
                        item.classList.remove('fade-out');
                        item.classList.add('fade-in');
                        item.classList.add('active');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                        item.classList.remove('active');
                    }
                }, 300);
            });
        });
    });
}

// Setup Lightbox Functionality
function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-nav.next');
    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Update the array of visible items based on current filter
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            window.getComputedStyle(item).display !== 'none'
        );
    }
    
    // Open lightbox with the selected image
    function openLightbox(index) {
        updateVisibleItems();
        
        if (visibleItems.length === 0) return;
        
        currentIndex = index;
        
        const item = visibleItems[currentIndex];
        const image = item.querySelector('.gallery-image');
        const overlayContent = item.querySelector('.overlay-content');
        
        // Set background color of lightbox image same as gallery item
        if (image) {
            const bgColor = window.getComputedStyle(image).backgroundColor;
            lightboxImage.style.backgroundColor = bgColor;
        }
        
        // Set title and description
        if (overlayContent) {
            const title = overlayContent.querySelector('h3').textContent;
            const description = overlayContent.querySelector('p').textContent;
            
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
        }
        
        // Show lightbox with animation
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.style.opacity = '0';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            // Re-enable scrolling
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Navigate to next image
    function nextImage() {
        updateVisibleItems();
        
        if (visibleItems.length <= 1) return;
        
        // Animate transition
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            updateLightboxContent();
            lightboxImage.style.opacity = '1';
        }, 200);
    }
    
    // Navigate to previous image
    function prevImage() {
        updateVisibleItems();
        
        if (visibleItems.length <= 1) return;
        
        // Animate transition
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxContent();
            lightboxImage.style.opacity = '1';
        }, 200);
    }
    
    // Update lightbox content based on current index
    function updateLightboxContent() {
        const item = visibleItems[currentIndex];
        const image = item.querySelector('.gallery-image');
        const overlayContent = item.querySelector('.overlay-content');
        
        // Set background color
        if (image) {
            const bgColor = window.getComputedStyle(image).backgroundColor;
            lightboxImage.style.backgroundColor = bgColor;
        }
        
        // Set title and description
        if (overlayContent) {
            const title = overlayContent.querySelector('h3').textContent;
            const description = overlayContent.querySelector('p').textContent;
            
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
        }
    }
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
}

// Setup Touch/Swipe Support for Mobile Devices
function setupTouchSupport() {
    const lightbox = document.getElementById('gallery-lightbox');
    
    if (!lightbox) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Add touch event listeners to lightbox
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    // Determine swipe direction and trigger appropriate action
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, go to next image
            document.querySelector('.lightbox-nav.next').click();
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, go to previous image
            document.querySelector('.lightbox-nav.prev').click();
        }
    }
}

// Animate Gallery Items on Load
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Staggered animation for gallery items
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active');
        }, 100 * index);
    });
}

// If the page is loaded directly (not via SPA navigation)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#gallery') {
        initGallery();
    }
});
