// ============================
// PRODUCTS CAROUSEL
// ============================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // PRODUCT CARD HOVER EFFECTS
    // ============================================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Store original gradient
        const gradient = card.getAttribute('data-gradient');
        
        card.addEventListener('mouseenter', function() {
            // Remove featured from all cards
            productCards.forEach(c => {
                c.classList.remove('featured');
                c.style.background = '#f5f5f5'; // Reset to default
            });
            
            // Add featured to ONLY this card
            this.classList.add('featured');
            
            // Apply gradient background
            if (gradient) {
                this.style.background = gradient;
            }
        });
        
        // Don't remove on mouseleave - keep featured until another is hovered
    });
    
    // ============================================================
    // CAROUSEL NAVIGATION
    // ============================================================
    const carousel = document.querySelector('.products-carousel');
    const grid = document.querySelector('.products-grid');
    const navLeft = document.querySelector('.carousel-nav-left');
    const navRight = document.querySelector('.carousel-nav-right');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = 2; // We have 8 products, showing 4 at a time = 2 slides
    
    // All 8 products data - BRIGHT NEON COLORS
    const allProducts = [
        // Slide 1
        { name: 'Lychee', subtitle: 'Lychee Drink', number: '01', gradient: 'linear-gradient(180deg, #C9A3CF 0%, #8B5A96 100%)', image: 'assets/images/1.png' },
        { name: 'Blackcurrant', subtitle: 'Blackcurrant Drink', number: '02', gradient: 'linear-gradient(180deg, #6BC4C4 0%, #3A7878 100%)', image: 'assets/images/2.png' },
        { name: 'Melon', subtitle: 'Melon Drink', number: '03', gradient: 'linear-gradient(180deg, #A3E38B 0%, #5F9D50 100%)', image: 'assets/images/3.png' },
        { name: 'Coconut', subtitle: 'Coconut Drink', number: '04', gradient: 'linear-gradient(180deg, #BDDCE9 0%, #6B8A9A 100%)', image: 'assets/images/4.png' },
        // Slide 2
        { name: 'Mango', subtitle: 'Mango Drink', number: '05', gradient: 'linear-gradient(180deg, #F5D368 0%, #B89645 100%)', image: 'assets/images/5.png' },
        { name: 'Orange', subtitle: 'Orange Drink', number: '06', gradient: 'linear-gradient(180deg, #FFB95F 0%, #D88840 100%)', image: 'assets/images/6.png' },
        { name: 'Strawberry', subtitle: 'Strawberry Drink', number: '07', gradient: 'linear-gradient(180deg, #F5A5D9 0%, #B85F8A 100%)', image: 'assets/images/7.png' },
        { name: 'Pineapple', subtitle: 'Pineapple Drink', number: '08', gradient: 'linear-gradient(180deg, #FFF77A 0%, #C9BC4F 100%)', image: 'assets/images/8.png' }
    ];
    
    function updateNavigationArrows() {
        // Hide left arrow on first slide
        if (currentSlide === 0) {
            navLeft.classList.add('hidden');
        } else {
            navLeft.classList.remove('hidden');
        }
        
        // Hide right arrow on last slide
        if (currentSlide === totalSlides - 1) {
            navRight.classList.add('hidden');
        } else {
            navRight.classList.remove('hidden');
        }
    }
    
    function updateSlide(slideIndex) {
        currentSlide = slideIndex;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update navigation arrows
        updateNavigationArrows();
        
        // Get products for current slide
        const startIndex = currentSlide * 4;
        const slideProducts = allProducts.slice(startIndex, startIndex + 4);
        
        // Clear current grid
        grid.innerHTML = '';
        
        // Add products for this slide
        slideProducts.forEach((product, index) => {
            const isFeatured = index === 0; // First card is featured by default
            
            const card = document.createElement('div');
            card.className = `product-card${isFeatured ? ' featured' : ''}`;
            card.setAttribute('data-product', product.name.toLowerCase());
            card.setAttribute('data-gradient', product.gradient);
            if (isFeatured) {
                card.style.background = product.gradient;
            } else {
                card.style.background = '#f5f5f5';
            }
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name} Drink">
                </div>
                <div class="product-info">
                    <span class="product-number">${product.number}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-subtitle">${product.subtitle}</p>
                    <a href="#" class="product-button">View More ></a>
                </div>
            `;
            
            // Re-attach hover listeners
            const gradient = product.gradient;
            card.addEventListener('mouseenter', function() {
                document.querySelectorAll('.product-card').forEach(c => {
                    c.classList.remove('featured');
                    c.style.background = '#f5f5f5';
                });
                this.classList.add('featured');
                this.style.background = gradient;
            });
            
            grid.appendChild(card);
        });
    }
    
    // Navigation buttons
    if (navLeft) {
        navLeft.addEventListener('click', function() {
            if (currentSlide > 0) {
                updateSlide(currentSlide - 1);
            }
        });
    }
    
    if (navRight) {
        navRight.addEventListener('click', function() {
            if (currentSlide < totalSlides - 1) {
                updateSlide(currentSlide + 1);
            }
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateSlide(index);
        });
    });
    
    // Initialize navigation arrows
    updateNavigationArrows();
});

// Apply gradient to first featured card on page load
window.addEventListener('load', function() {
    const firstFeatured = document.querySelector('.product-card.featured');
    if (firstFeatured) {
        const gradient = firstFeatured.getAttribute('data-gradient');
        if (gradient) {
            firstFeatured.style.background = gradient;
        }
    }
});