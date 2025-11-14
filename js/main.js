// ============================
// MAIN JAVASCRIPT
// ============================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlight
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Sidebar hide/show on scroll
    const sidebar = document.querySelector('.sidebar');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function handleSidebarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // If we're at the top of the page (hero section), always show sidebar
        if (scrollTop <= 100) {
            sidebar.classList.remove('hidden');
        } 
        // If scrolling down, hide sidebar
        else if (scrollTop > lastScrollTop && scrollTop > 200) {
            sidebar.classList.add('hidden');
        } 
        // If scrolling up, show sidebar
        else if (scrollTop < lastScrollTop) {
            sidebar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Auto-hide sidebar after 3 seconds of no scrolling (except on hero)
        clearTimeout(scrollTimeout);
        if (scrollTop > 200) {
            scrollTimeout = setTimeout(() => {
                sidebar.classList.add('hidden');
            }, 3000);
        }
    }
    
    // Show sidebar on hover
    sidebar.addEventListener('mouseenter', function() {
        sidebar.classList.remove('hidden');
        clearTimeout(scrollTimeout);
    });
    
    // Call on scroll
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        handleSidebarScroll();
    });
    
    // Initialize on load
    highlightActiveSection();
    
});