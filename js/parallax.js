// ============================
// PARALLAX EFFECTS
// ============================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // FIXED WATERMARK WITH IMAGE SWITCH
    // ============================================================
    const aboutWatermark = document.querySelector('.about-watermark-bg');
    const valuesWatermark = document.querySelector('.values-watermark-bg');
    
    if (aboutWatermark) {
        // Make about watermark fixed
        aboutWatermark.style.position = 'fixed';
        aboutWatermark.style.top = '-5rem';
        aboutWatermark.style.left = '-5rem';
        aboutWatermark.style.zIndex = '999';
    }
    
    // Hide values watermark (we'll use about watermark for both)
    if (valuesWatermark) {
        valuesWatermark.style.display = 'none';
    }
    
    // Parallax scroll effect
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // ============================================================
        // WATERMARK IMAGE SWITCH (black → white)
        // ============================================================
        const aboutWatermark = document.querySelector('.about-watermark-bg');
        const watermarkImg = aboutWatermark ? aboutWatermark.querySelector('img') : null;
        
        if (watermarkImg) {
            const aboutSectionForSwitch = document.querySelector('.about-section');
            const valuesSectionForSwitch = document.querySelector('.values-section');
            
            if (aboutSectionForSwitch && valuesSectionForSwitch) {
                const valuesTop = valuesSectionForSwitch.offsetTop;
                
                // Switch to white logo when entering values section
                if (scrolled >= valuesTop - 200) {  // 200px before values section
                    watermarkImg.src = 'assets/images/logo.png';  // White logo
                } else {
                    watermarkImg.src = 'assets/images/logo1.png';  // Black logo
                }
            }
        }
        
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
                const bgParallax = scrolled * 0.8;  // 0.5 = 50% speed (adjust this!)
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
        const valuesSection = document.querySelector('.values-section');
        
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const aboutTop = aboutRect.top;
            const windowHeight = window.innerHeight;
            
            // ============================================================
            // WATERMARK FADE EFFECT (Fades out at 30% scroll in About, fades back in for Values)
            // ============================================================
            const aboutWatermark = aboutSection.querySelector('.about-watermark-bg');
            if (aboutWatermark && valuesSection) {
                const scrollProgress = Math.abs(aboutTop) / aboutRect.height;
                const valuesRect = valuesSection.getBoundingClientRect();
                const valuesTop = valuesRect.top;
                
                // Check if we're in the Values section
                if (valuesTop <= windowHeight * 0.5) {
                    // Fade in for Values section (smooth transition)
                    const valueFadeProgress = Math.min(1, (windowHeight - valuesTop) / (windowHeight * 0.3));
                    aboutWatermark.style.opacity = 0.08 * valueFadeProgress;
                } else if (scrollProgress <= 0.3) {
                    // Visible from 0% to 30% scroll in About
                    aboutWatermark.style.opacity = 0.08;
                } else if (scrollProgress > 0.3 && scrollProgress <= 0.5) {
                    // Fade out from 30% to 50% in About
                    const fadeProgress = (scrollProgress - 0.3) / 0.2;
                    aboutWatermark.style.opacity = 0.08 * (1 - fadeProgress);
                } else {
                    // Hidden between About (50%) and Values sections
                    aboutWatermark.style.opacity = 0;
                }
            }
            
            // Only apply parallax when section is in view
            if (aboutTop < windowHeight && aboutTop > -aboutRect.height) {
                // Calculate parallax intensity based on scroll position
                const centerOffset = aboutTop + (aboutRect.height / 2) - (windowHeight / 2);
                
                // ============================================================
                // NO BACKGROUND PARALLAX - About has white background only
                // ============================================================
                
                // ============================================================
                // WATERMARK LOGO PARALLAX - VERTICAL FLOAT
                // ============================================================
                const watermark = aboutSection.querySelector('.parallax-watermark');
                if (watermark) {
                    const translateY = centerOffset * 0.08;  // Smooth vertical movement
                    // Keep transform for float effect, but position is already fixed
                    watermark.style.transform = `translateY(${translateY}px)`;
                    watermark.style.transition = 'transform 0.4s ease-out';
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
        
        // ============================================================
        // VALUES SECTION PARALLAX (img_bg_4.png)
        // ============================================================
        if (valuesSection) {
            const valuesRect = valuesSection.getBoundingClientRect();
            const valuesTop = valuesRect.top;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when section is in view
            if (valuesTop < windowHeight && valuesTop > -valuesRect.height) {
                // Calculate parallax intensity
                const centerOffset = valuesTop + (valuesRect.height / 2) - (windowHeight / 2);
                
                // Background Image Parallax
                const valuesSectionTop = valuesSection.offsetTop;
                const valuesParallaxOffset = (scrolled - valuesSectionTop) * 0.9;  // 0.5 = 50% speed
                valuesSection.style.backgroundPosition = `center ${valuesParallaxOffset - 115}px`;
                
                // Watermark stays in place (NO parallax on watermark)
                // Only content moves
                
                // Parallax for left side (core values) - moves slower
                const valuesLeftElements = valuesSection.querySelectorAll('.parallax-slow');
                valuesLeftElements.forEach(element => {
                    const translateY = centerOffset * 0.12;
                    element.style.transform = `translateY(${translateY}px)`;
                    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
                
                // Parallax for right side (mission/vision) - moves at normal speed
                const valuesRightElements = valuesSection.querySelectorAll('.parallax-normal');
                valuesRightElements.forEach(element => {
                    const translateY = centerOffset * 0.06;
                    element.style.transform = `translateY(${translateY}px)`;
                    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
                
                // Fade in effect
                const fadeInThreshold = windowHeight * 0.75;
                if (valuesTop < fadeInThreshold) {
                    valuesSection.style.opacity = '1';
                } else {
                    valuesSection.style.opacity = '0.5';
                }
                valuesSection.style.transition = 'opacity 0.6s ease';
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