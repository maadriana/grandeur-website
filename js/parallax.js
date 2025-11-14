// ============================
// PARALLAX EFFECTS
// ============================

document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax scroll effect
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax effect
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroContent = document.querySelector('.hero-content');
            const heroTitleImage = document.querySelector('.hero-title-image');
            const heroSubtitleImage = document.querySelector('.hero-subtitle-image');
            const globeContainer = document.querySelector('.globe-container');
            
            // ============================================================
            // HERO BACKGROUND PARALLAX (Globe moves DOWN as you scroll)
            // ============================================================
            const heroBackground = heroSection.querySelector('::before');
            if (heroSection) {
                // Move background DOWN (positive value = downward movement)
                const bgParallax = scrolled * 0.5;  // 0.5 = 50% speed (adjust this!)
                heroSection.style.backgroundPosition = `center ${bgParallax}px`;
            }
            
            if (heroContent) {
                heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
            }
            
            // Parallax for GRANDEUR - slower movement
            if (heroTitleImage) {
                heroTitleImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            // Parallax for INTERNATIONAL - faster movement for depth effect
            if (heroSubtitleImage) {
                heroSubtitleImage.style.transform = `translateY(${scrolled * 0.6}px)`;
            }
            
            if (globeContainer) {
                globeContainer.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
            }
        }
        
        // About section parallax effects
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const aboutTop = aboutRect.top;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when section is in view
            if (aboutTop < windowHeight && aboutTop > -aboutRect.height) {
                // Calculate parallax intensity based on scroll position
                const centerOffset = aboutTop + (aboutRect.height / 2) - (windowHeight / 2);
                
                // ============================================================
                // BACKGROUND IMAGE PARALLAX (img_bg_3.jpeg)
                // ============================================================
                const sectionTop = aboutSection.offsetTop;
                const parallaxOffset = (scrolled - sectionTop) * 0.5;  // 0.5 = 50% speed (adjust this!)
                aboutSection.style.backgroundPosition = `center ${parallaxOffset}px`;
                
                // ============================================================
                // WATERMARK LOGO PARALLAX - VERTICAL FLOAT (Option 2 Active)
                // ============================================================
                const watermark = aboutSection.querySelector('.parallax-watermark');
                if (watermark) {
                    const translateY = centerOffset * 0.08;  // Smooth vertical movement
                    const opacity = Math.max(0.3, Math.min(1, 0.7 + (centerOffset * 0.0002)));
                    watermark.style.transform = `translateY(${translateY}px)`;
                    watermark.style.opacity = opacity;
                    watermark.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
                }
                
                // Parallax for left side (expertise) - moves slower
                const leftElements = aboutSection.querySelectorAll('.parallax-slow');
                leftElements.forEach(element => {
                    const translateY = centerOffset * 0.12;
                    element.style.transform = `translateY(${translateY}px)`;
                    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
                
                // Parallax for right side (content) - moves at normal speed
                const rightElements = aboutSection.querySelectorAll('.parallax-normal');
                rightElements.forEach(element => {
                    const translateY = centerOffset * 0.06;
                    element.style.transform = `translateY(${translateY}px)`;
                    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
                
                // Individual expertise items parallax - staggered
                const expertiseItems = aboutSection.querySelectorAll('.expertise-item');
                expertiseItems.forEach((item, index) => {
                    const itemTranslateY = centerOffset * (0.08 + index * 0.03);
                    const itemOpacity = Math.max(0.3, Math.min(1, 1 - Math.abs(centerOffset) / 800));
                    item.style.transform = `translateY(${itemTranslateY}px)`;
                    item.style.opacity = itemOpacity;
                    item.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease';
                });
                
                // Fade in effect for about content
                const fadeInThreshold = windowHeight * 0.75;
                if (aboutTop < fadeInThreshold) {
                    aboutSection.style.opacity = '1';
                    aboutSection.style.transform = 'translateY(0)';
                } else {
                    aboutSection.style.opacity = '0.5';
                    aboutSection.style.transform = 'translateY(20px)';
                }
                aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        }
        
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });
    }
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply parallax on scroll with throttling
    window.addEventListener('scroll', throttle(parallaxScroll, 10));
    
    // Initial call
    parallaxScroll();
    
    // Initialize fade elements
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
});


// ============================================================
// PARALLAX SPEED ADJUSTMENT GUIDE
// ============================================================
// 
// BACKGROUND IMAGE SPEED (Line 54):
// const parallaxOffset = (scrolled - sectionTop) * 0.5;
//                                                   ^^^
// Change this number:
// - 0.3 = Slower parallax (subtle)
// - 0.5 = Medium parallax (recommended)
// - 0.7 = Faster parallax (dramatic)
// - 1.0 = No parallax effect
// - -0.5 = Reverse direction
//
// WATERMARK LOGO SPEED (Line 63):
// const translateY = centerOffset * 0.08;
//                                   ^^^^
// Change this number:
// - 0.05 = Slower float
// - 0.08 = Medium float (current)
// - 0.12 = Faster float
// ============================================================