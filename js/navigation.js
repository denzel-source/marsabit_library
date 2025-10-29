// Navigation and smooth scrolling system
class NavigationSystem {
    constructor() {
        this.sections = new Map();
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupScrollSpy();
    }

    cacheElements() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = new Map([
            ['home', 'hero'],
            ['about', 'about-section'],
            ['services', 'services-section'], 
            ['collection', 'collection-section'],
            ['visit', 'visit-section'],
            ['contact', 'contact-section']
        ]);

        // Get all section elements that actually exist on the page
        this.existingSections = {};
        for (const [key, value] of this.sections) {
            const element = document.getElementById(value);
            if (element) {
                this.existingSections[key] = element;
            }
        }
    }

    setupEventListeners() {
        // Navigation link clicks - smooth scroll to sections
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').replace('#', '');
                this.scrollToSection(targetSection);
                this.updateActiveNavLink(link);
            });
        });

        // Update URL hash when scrolling through sections
        window.addEventListener('scroll', () => {
            this.updateActiveSectionOnScroll();
        }, { passive: true });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            });
        }
    }

    setupScrollSpy() {
        // Create Intersection Observer to detect active section
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Adjust these values to change when section becomes active
            threshold: 0
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = this.getSectionKeyFromElement(entry.target);
                    if (sectionId) {
                        this.updateActiveNavLinkBySection(sectionId);
                        this.updateURLHash(sectionId);
                    }
                }
            });
        }, observerOptions);

        // Observe all existing sections
        Object.values(this.existingSections).forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    getSectionKeyFromElement(element) {
        for (const [key, value] of Object.entries(this.existingSections)) {
            if (value === element) {
                return key;
            }
        }
        return null;
    }

    scrollToSection(sectionId) {
        const targetElement = this.existingSections[sectionId];
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20; // Extra spacing

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL immediately for better UX
            this.updateURLHash(sectionId);
        } else {
            console.warn(`Section ${sectionId} not found on page`);
        }
    }

    updateActiveSectionOnScroll() {
        // This is now handled by the Intersection Observer for better performance
    }

    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveNavLinkBySection(sectionId) {
        this.navLinks.forEach(link => {
            const linkSection = link.getAttribute('href').replace('#', '');
            if (linkSection === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateURLHash(sectionId) {
        // Only update hash for sections other than home
        if (sectionId !== 'home') {
            window.history.replaceState(null, null, `#${sectionId}`);
        } else {
            window.history.replaceState(null, null, ' ');
        }
    }

    // Public method to navigate programmatically
    goToSection(sectionId) {
        this.scrollToSection(sectionId);
    }

    // Get current active section based on scroll position
    getCurrentSection() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        for (const [sectionId, element] of Object.entries(this.existingSections)) {
            const sectionTop = element.offsetTop;
            const sectionBottom = sectionTop + element.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return sectionId;
            }
        }
        
        return 'home';
    }
}