
// Gallery JavaScript for Mystic Hands by Sadiya
function initGallery() {
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;

    console.log('Gallery functionality initialized');
    
    // Only initialize features if their elements exist
    if (document.querySelector('.gallery-filter')) {
        setupGalleryFilter();
    }
    
    if (document.getElementById('gallery-lightbox')) {
        setupLightbox();
        setupTouchSupport();
    }
    
    if (document.querySelectorAll('.gallery-item').length > 0) {
        animateGalleryItems();
    }
}

function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });

            // Close lightbox if open
            if (lightbox && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    });
}

function setupLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!lightbox || !galleryItems || galleryItems.length === 0) return;
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const prevButton = lightbox.querySelector('.prev');
    const nextButton = lightbox.querySelector('.next');
    
    let currentIndex = 0;
    const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');

    function showImage(index) {
        const item = visibleItems[index];
        const imgSrc = item.querySelector('.gallery-image').style.backgroundImage.replace(/^url\(['"](.+)['"]\)$/, '$1');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = title;
        img.style.cssText = 'width: auto; height: auto; max-width: 95vw; max-height: 85vh; object-fit: contain; transition: all 0.3s ease;';
        
        const expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
        
        const container = document.createElement('div');
        container.className = 'lightbox-image-container';
        container.appendChild(img);
        container.appendChild(expandBtn);
        
        lightboxImage.innerHTML = '';
        lightboxImage.appendChild(container);
        
        expandBtn.onclick = function() {
            if (img.style.maxHeight === 'none') {
                img.style.maxHeight = '85vh';
                img.style.maxWidth = '95vw';
                expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
            } else {
                img.style.maxHeight = 'none';
                img.style.maxWidth = 'none';
                expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
            }
        };
        
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        currentIndex = index;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = visibleItems.indexOf(item);
            showImage(currentIndex);
            lightbox.style.display = 'flex';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            showImage(currentIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            showImage(currentIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % visibleItems.length;
                showImage(currentIndex);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
}

function setupTouchSupport() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe Left - Show next image
                lightbox.querySelector('.next').click();
            } else {
                // Swipe Right - Show previous image
                lightbox.querySelector('.prev').click();
            }
        }
    });
}

function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('active'), 100 * index);
    });
}

document.addEventListener('DOMContentLoaded', initGallery);
