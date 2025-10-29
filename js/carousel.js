// Hero Carousel functionality
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.interval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.startAutoPlay();
    }

    cacheElements() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
    }

    setupEventListeners() {
        // Previous/Next buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Pause when window loses focus
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }

    goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = this.slides.length - 1;
        } else if (slideIndex >= this.slides.length) {
            slideIndex = 0;
        }

        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all indicators
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Show target slide
        this.slides[slideIndex].classList.add('active');
        
        // Activate corresponding indicator
        if (this.indicators[slideIndex]) {
            this.indicators[slideIndex].classList.add('active');
        }

        this.currentSlide = slideIndex;
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    previousSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Public method to restart carousel (for when returning to home section)
    restart() {
        this.startAutoPlay();
    }

    // Public method to stop carousel (for when leaving home section)
    pause() {
        this.stopAutoPlay();
    }
}