        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Animation for elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.brand-item, .phone-mockup, .contact-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state for animated elements
        document.querySelectorAll('.brand-item, .phone-mockup, .contact-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
        
        // Trigger once on load in case elements are already in view
        window.addEventListener('load', animateOnScroll);



// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const nav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Scroll effect for nav
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const reelContainer = document.querySelector('.unique-reel-container');
    const scrollLeftBtn = document.querySelector('.unique-scroll-left');
    const scrollRightBtn = document.querySelector('.unique-scroll-right');
    const phoneMockups = document.querySelectorAll('.unique-phone-mockup');
    
    const scrollAmount = 350; // Default scroll amount for desktop
    let currentIndex = 0;
    
    function centerMockup(index) {
        if (window.innerWidth > 768) return; // Only apply this behavior on mobile
        
        const mockup = phoneMockups[index];
        const containerWidth = reelContainer.clientWidth;
        const mockupWidth = mockup.clientWidth;
        const mockupLeft = mockup.offsetLeft;
        
        // Calculate scroll position to center the mockup
        const scrollTo = mockupLeft - (containerWidth / 2) + (mockupWidth / 2);
        
        reelContainer.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
        
        currentIndex = index;
        updateArrowVisibility();
    }
    
    scrollLeftBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile behavior - center previous mockup
            const newIndex = Math.max(0, currentIndex - 1);
            centerMockup(newIndex);
        } else {
            // Desktop behavior - normal scroll
            reelContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    scrollRightBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile behavior - center next mockup
            const newIndex = Math.min(phoneMockups.length - 1, currentIndex + 1);
            centerMockup(newIndex);
        } else {
            // Desktop behavior - normal scroll
            reelContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    // Hide/show arrows based on scroll position
    function updateArrowVisibility() {
        if (window.innerWidth <= 768) {
            // Mobile behavior - hide arrows at ends
            scrollLeftBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
            scrollRightBtn.style.display = currentIndex < phoneMockups.length - 1 ? 'flex' : 'none';
        } else {
            // Desktop behavior - hide based on scroll position
            scrollLeftBtn.style.display = reelContainer.scrollLeft > 0 ? 'flex' : 'none';
            scrollRightBtn.style.display = reelContainer.scrollLeft < (reelContainer.scrollWidth - reelContainer.clientWidth) ? 'flex' : 'none';
        }
    }
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // Reset when switching back to desktop
            currentIndex = 0;
        }
        updateArrowVisibility();
    }
    
    reelContainer.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', handleResize);
    updateArrowVisibility(); // Initial check
    
    // Optional: Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    reelContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    reelContainer.addEventListener('touchend', e => {
        if (window.innerWidth > 768) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        
        if (touchStartX - touchEndX > threshold) {
            // Swipe left - next mockup
            const newIndex = Math.min(phoneMockups.length - 1, currentIndex + 1);
            centerMockup(newIndex);
        } else if (touchEndX - touchStartX > threshold) {
            // Swipe right - previous mockup
            const newIndex = Math.max(0, currentIndex - 1);
            centerMockup(newIndex);
        }
    }
});
