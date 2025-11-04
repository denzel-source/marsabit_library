// Main initialization file - Marsabit Library
class MarsabitLibrary {
    constructor() {
        this.carousel = null;
        this.navigation = null;
        this.animations = null;
        this.init();
    }

    async init() {
        try {
            // Load components in order
            await this.loadHeader();
            await this.loadHero();
            await this.loadQuickFeatures();
            await this.loadNewsEvents();
            await this.loadStats();
            await this.loadFooter();
            
            // Initialize systems
            this.initSystems();
            this.setupGlobalEventListeners();
            
            console.log('🏛️ Marsabit Library initialized successfully!');
        } catch (error) {
            console.error('Error initializing library:', error);
        }
    }

    initSystems() {
        // Initialize carousel if on home section
        if (document.querySelector('.hero-carousel')) {
            this.carousel = new HeroCarousel();
        }
        
        // Initialize navigation
        this.navigation = new NavigationSystem();
        
        // Initialize animations
        this.animations = new AnimationSystem();
    }

    setupGlobalEventListeners() {
        // Listen for section changes to manage carousel
        window.addEventListener('sectionChanged', (e) => {
            const section = e.detail.section;
            
            if (section === 'home' && this.carousel) {
                this.carousel.restart();
            } else if (this.carousel) {
                this.carousel.pause();
            }
            
            // Refresh animations when section changes
            if (this.animations) {
                setTimeout(() => this.animations.refresh(), 100);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(e.target);
        });

        // Handle newsletter signup
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                this.handleNewsletterSignup(e);
            });
        }
    }

    async loadHeader() {
        const headerHTML = `
            <header class="header">
                <nav class="nav">
                    <div class="nav-brand">
                        <h2>Marsabit Library</h2>
                    </div>
                    <button class="mobile-menu-btn" aria-label="Toggle menu">☰</button>
                    <ul class="nav-links">
                        <li><a href="#home" class="nav-link active">Home</a></li>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#services" class="nav-link">Services</a></li>
                        <li><a href="#collection" class="nav-link">Collection</a></li>
                        <li><a href="#visit" class="nav-link">Visit Us</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        document.getElementById('header').innerHTML = headerHTML;
    }

    async loadHero() {
    const heroHTML = `
        <div class="hero-carousel">
    <!-- Slide 1: Modern Library Interior -->
    <div class="carousel-slide active" style="background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Welcome to Marsabit Library</h1>
            <p>Your gateway to knowledge, community, and growth in the heart of Marsabit</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">Explore Library</button>
                <button class="cta-button secondary">Become a Member</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 2: Digital Learning Center -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Digital Learning Center</h1>
            <p>Free computer access, internet, and digital literacy programs for all ages</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">View Services</button>
                <button class="cta-button secondary">Book Computer</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 3: Community Events -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Community Events & Programs</h1>
            <p>Join book clubs, workshops, and cultural events throughout the year</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">See Events</button>
                <button class="cta-button secondary">Join Club</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 4: Children's Reading -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Children's Story Time</h1>
            <p>Every Saturday at 10 AM - Magical adventures await young readers!</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">View Schedule</button>
                <button class="cta-button secondary">Learn More</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 5: Study Spaces -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Quiet Study Spaces</h1>
            <p>Comfortable areas for individual study, research, and academic work</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">View Facilities</button>
                <button class="cta-button secondary">Reserve Space</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 6: African Book Collection -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">    
     <h1>50,000+ Books Available</h1>
            <p>Explore our diverse collection featuring African authors and stories</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">Browse Collection</button>
                <button class="cta-button secondary">Search Catalog</button>
            </div>
        </div>
    </div>
    
    <!-- Slide 7: African Cultural Heritage -->
    <div class="carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')">
        <div class="slide-content">
            <h1>Local History & Culture</h1>
            <p>Discover Marsabit's rich heritage and Kenyan cultural traditions</p>
            <div class="hero-cta-buttons">
                <button class="cta-button">Explore Heritage</button>
                <button class="cta-button secondary">View Archives</button>
            </div>
        </div>
    </div>
    
    <div class="carousel-controls">
        <button class="carousel-btn prev-btn" aria-label="Previous slide">‹</button>
        <button class="carousel-btn next-btn" aria-label="Next slide">›</button>
    </div>
    
    <div class="carousel-indicators">
        <span class="indicator active" aria-label="Slide 1"></span>
        <span class="indicator" aria-label="Slide 2"></span>
        <span class="indicator" aria-label="Slide 3"></span>
        <span class="indicator" aria-label="Slide 4"></span>
        <span class="indicator" aria-label="Slide 5"></span>
        <span class="indicator" aria-label="Slide 6"></span>
        <span class="indicator" aria-label="Slide 7"></span>
    </div>
</div>
    `;
    document.getElementById('hero').innerHTML = heroHTML;
}

    async loadQuickFeatures() {
        const featuresHTML = `
            <section class="quick-features-section">
                <div class="container">
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">📚</div>
                            <h3>Extensive Collection</h3>
                            <p>Over 50,000 books across all genres and subjects</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💻</div>
                            <h3>Digital Resources</h3>
                            <p>Free computer access and online databases</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">👥</div>
                            <h3>Community Programs</h3>
                            <p>Regular events, workshops, and reading clubs</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🏛️</div>
                            <h3>Modern Facilities</h3>
                            <p>Comfortable reading areas and study spaces</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('quick-features').innerHTML = featuresHTML;
    }

    async loadNewsEvents() {
        const newsHTML = `
            <section class="news-events-section">
                <div class="container">
                    <h2 class="section-title">News & Events</h2>
                    <p class="section-subtitle">Stay updated with our latest activities and programs</p>
                    
                    <div class="news-grid">
                        <article class="news-card card">
                            <div class="news-date">
                                <span class="date-day">15</span>
                                <span class="date-month">DEC</span>
                            </div>
                            <div class="news-content">
                                <h3>Annual Reading Challenge</h3>
                                <p>Join our year-end reading challenge and win exciting prizes. Open to all age groups.</p>
                                <a href="#" class="read-more">Learn More →</a>
                            </div>
                        </article>
                        
                        <article class="news-card card">
                            <div class="news-date">
                                <span class="date-day">20</span>
                                <span class="date-month">DEC</span>
                            </div>
                            <div class="news-content">
                                <h3>Holiday Story Time</h3>
                                <p>Special Christmas edition of our children's story time with festive activities.</p>
                                <a href="#" class="read-more">Learn More →</a>
                            </div>
                        </article>
                        
                        <article class="news-card card">
                            <div class="news-date">
                                <span class="date-day">05</span>
                                <span class="date-month">JAN</span>
                            </div>
                            <div class="news-content">
                                <h3>New Year Tech Workshop</h3>
                                <p>Learn digital skills in our free technology workshop for seniors and adults.</p>
                                <a href="#" class="read-more">Learn More →</a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('news-events').innerHTML = newsHTML;
    }

    async loadStats() {
        const statsHTML = `
            <section class="stats-section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-number">50,000+</span>
                            <span class="stat-label">Books Available</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">5,000+</span>
                            <span class="stat-label">Active Members</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">120+</span>
                            <span class="stat-label">Weekly Visitors</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">25+</span>
                            <span class="stat-label">Annual Events</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('stats').innerHTML = statsHTML;
    }

    async loadFooter() {
        const footerHTML = `
           <footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <h3>Marsabit Library</h3>
                <p class="tagline">Read • Know • Empower</p>
                <p class="affiliation">Kenya National Library Service</p>
                <div class="social-links">
                    <a href="#" class="social-link" aria-label="Facebook">📘</a>
                    <a href="#" class="social-link" aria-label="Twitter">🐦</a>
                    <a href="#" class="social-link" aria-label="Instagram">📷</a>
                </div>
            </div>
            
            <div class="footer-actions">
                <div class="action-buttons">
                    <a href="#contact-section" class="action-btn">Contact Us</a>
                    <a href="#visit-section" class="action-btn outline">Find Us</a>
                </div>
                
                <div class="newsletter-compact">
                    <p>Get updates</p>
                    <form class="newsletter-form">
                        <input type="email" class="newsletter-input" placeholder="Email" required>
                        <button type="submit" class="newsletter-btn">→</button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 Marsabit Library | Kenya National Library Service</p>
            <div class="legal-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
        </div>
    </div>
</footer>
        `;
        document.getElementById('footer').innerHTML = footerHTML;
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', formValues);
        
        // Show success message
        this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
    }

    handleNewsletterSignup(e) {
        e.preventDefault();
        const email = e.target.querySelector('.newsletter-input').value;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
        }, 500);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add basic styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarsabitLibrary();
});

// Export for potential future module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarsabitLibrary, HeroCarousel, NavigationSystem, AnimationSystem };
}