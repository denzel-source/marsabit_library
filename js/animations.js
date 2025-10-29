// Animations and interactive effects
class AnimationSystem {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupCounterAnimation();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for scroll animations
        document.querySelectorAll('.feature-card, .news-card, .stat-card, .service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    animateOnScroll(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add staggered animation for grids
        if (element.parentElement.classList.contains('features-grid') ||
            element.parentElement.classList.contains('news-grid') ||
            element.parentElement.classList.contains('stats-grid')) {
            
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.style.transitionDelay = `${index * 0.1}s`;
        }
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card, .feature-card, .service-card');
            if (card) {
                card.style.transform = 'translateY(-5px)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card, .feature-card, .service-card');
            if (card && !card.classList.contains('active')) {
                card.style.transform = 'translateY(0)';
            }
        });
    }

    setupLoadingAnimations() {
        // Page load animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);

        // Staggered loading for hero content
        const heroContent = document.querySelector('.slide-content');
        if (heroContent) {
            const children = heroContent.children;
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 500 + (index * 200));
            });
        }
    }

    setupCounterAnimation() {
        // Animate statistics counters
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounters(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statCards.forEach(card => counterObserver.observe(card));
        }
    }

    animateCounters(statCard) {
        const numberElement = statCard.querySelector('.stat-number');
        if (!numberElement) return;

        const targetText = numberElement.textContent;
        const isPlus = targetText.includes('+');
        const targetNumber = parseInt(targetText.replace('+', '').replace(',', ''));
        
        if (isNaN(targetNumber)) return;

        let current = 0;
        const increment = targetNumber / 30; // Animate over 30 steps
        const duration = 1500; // 1.5 seconds
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }
            
            numberElement.textContent = Math.floor(current).toLocaleString() + (isPlus ? '+' : '');
        }, duration / 30);
    }

    // Public method to refresh animations
    refresh() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.setupScrollAnimations();
    }
}