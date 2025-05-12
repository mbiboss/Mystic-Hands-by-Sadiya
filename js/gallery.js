
// Gallery JavaScript for Mystic Hands by Sadiya
function initGallery() {
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;

    console.log('Gallery functionality initialized');
    setupGalleryFilter();
    setupLightbox();
    setupTouchSupport();
    setupLazyLoading();
    setupSearchFilter();
    animateGalleryItems();
}

function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const gallery = document.querySelector('.gallery-grid');
    
    // Initialize Isotope for smooth filtering animations
    const iso = new Isotope(gallery, {
        itemSelector: '.gallery-item',
        layoutMode: 'masonry',
        transitionDuration: '0.4s'
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filterValue = button.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filter with animation
            if (filterValue === 'all') {
                iso.arrange({ filter: '*' });
            } else {
                iso.arrange({ filter: `[data-category="${filterValue}"]` });
            }
            
            // Update visible items for lightbox
            updateVisibleItems();
        });
    });
}

function setupSearchFilter() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'gallery-search';
    searchInput.placeholder = 'Search designs...';
    
    const filterSection = document.querySelector('.gallery-filter');
    filterSection.appendChild(searchInput);
    
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const desc = item.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || desc.includes(searchTerm);
            
            item.style.display = matches ? '' : 'none';
            item.classList.toggle('fade-in', matches);
        });
    }, 300));
}

function setupLazyLoading() {
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.style.backgroundImage = `url(${src})`;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, options);
    
    document.querySelectorAll('.gallery-image').forEach(img => {
        observer.observe(img);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateVisibleItems() {
    window.visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => getComputedStyle(item).display !== 'none');
}

function setupLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const prevButton = lightbox.querySelector('.prev');
    const nextButton = lightbox.querySelector('.next');
    
    let currentIndex = 0;
    window.visibleItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    function showImage(index) {
        const item = window.visibleItems[index];
        if (!item) return;
        
        const imgSrc = item.querySelector('.gallery-image').style.backgroundImage
            .replace(/^url\(['"](.+)['"]\)$/, '$1');
            
        lightboxImage.innerHTML = `
            <div class="lightbox-image-container">
                <img src="${imgSrc}" alt="${item.querySelector('h3').textContent}" class="lightbox-img">
                <button class="expand-btn"><i class="fas fa-expand"></i></button>
                <div class="lightbox-caption">
                    <h3>${item.querySelector('h3').textContent}</h3>
                    <p>${item.querySelector('p').textContent}</p>
                </div>
            </div>`;
            
        setupImageControls(lightboxImage.querySelector('img'), 
                          lightboxImage.querySelector('.expand-btn'));
        currentIndex = index;
    }
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            showImage(index);
            lightbox.style.display = 'flex';
        });
    });
    
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            const direction = button === prevButton ? -1 : 1;
            const newIndex = (currentIndex + direction + window.visibleItems.length) 
                            % window.visibleItems.length;
            showImage(newIndex);
        });
    });
    
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevButton.click();
            else if (e.key === 'ArrowRight') nextButton.click();
            else if (e.key === 'Escape') lightbox.style.display = 'none';
        }
    });
}

function setupImageControls(img, expandBtn) {
    let scale = 1;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };
    
    expandBtn.addEventListener('click', () => {
        const isExpanded = img.classList.contains('expanded');
        img.classList.toggle('expanded');
        expandBtn.innerHTML = isExpanded ? 
            '<i class="fas fa-expand"></i>' : 
            '<i class="fas fa-compress"></i>';
        
        if (!isExpanded) {
            scale = 1;
            currentPos = { x: 0, y: 0 };
            updateImageTransform();
        }
    });
    
    img.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.min(Math.max(1, scale * delta), 3);
        updateImageTransform();
    });
    
    function updateImageTransform() {
        img.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) scale(${scale})`;
    }
}

function setupTouchSupport() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    lightbox.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                lightbox.querySelector('.next').click();
            } else {
                lightbox.querySelector('.prev').click();
            }
        }
    });
}

function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('fade-in'), 50 * index);
    });
}

document.addEventListener('DOMContentLoaded', initGallery);
