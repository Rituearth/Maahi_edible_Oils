// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Diagnostic: Check elements and styles
    console.log("DOM Content Loaded - Starting Navigation Setup");
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    // Log elements to check if they exist
    console.log("Nav toggle found:", navToggle !== null);
    console.log("Nav links found:", navLinks !== null);
    
    // Check if toggle is visible
    if (navToggle) {
        const computedStyle = window.getComputedStyle(navToggle);
        console.log("Toggle display:", computedStyle.display);
        console.log("Toggle visibility:", computedStyle.visibility);
        console.log("Toggle z-index:", computedStyle.zIndex);
    }

    // Clean toggle implementation
    if (navToggle && navLinks) {
        console.log("Setting up toggle functionality");
        // Initialize menu state - hiding the menu initially
        navLinks.style.opacity = '0';
        navLinks.style.visibility = 'hidden';
        navLinks.style.pointerEvents = 'none';
        
        // Simple toggle function
        function toggleMenu() {
            console.log("Toggle menu called");
            const isExpanded = navToggle.classList.contains('active');
            console.log("Menu is currently expanded:", isExpanded);
            
            // Toggle class states
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Set ARIA attributes
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle icon between bars and times
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (!isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    console.log("Changed icon to times");
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    console.log("Changed icon to bars");
                }
            } else {
                console.warn("No icon found inside toggle button");
            }
            
            // Handle visibility
            if (!isExpanded) {
                // Opening menu
                navLinks.style.opacity = '1';
                navLinks.style.visibility = 'visible';
                navLinks.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                console.log("Menu opened");
            } else {
                // Closing menu
                navLinks.style.opacity = '0';
                
                // Delay hiding the menu to allow for transition
                setTimeout(() => {
                    if (!navToggle.classList.contains('active')) {
                        navLinks.style.visibility = 'hidden';
                        navLinks.style.pointerEvents = 'none';
                        console.log("Menu hidden after transition");
                    }
                }, 300);
                
                document.body.style.overflow = ''; // Allow scrolling
                console.log("Menu closing transition started");
            }
        }
        
        // Add click event to toggle button
        navToggle.addEventListener('click', (e) => {
            console.log("Toggle button clicked");
            e.preventDefault();
            toggleMenu();
        });
        
        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log("Nav link clicked");
                if (navToggle.classList.contains('active')) {
                    setTimeout(() => toggleMenu(), 100);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navToggle.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !navToggle.contains(e.target)) {
                console.log("Clicked outside menu, closing");
                toggleMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navToggle.classList.contains('active')) {
                console.log("Window resized, closing menu");
                toggleMenu();
            }
        });
    } else {
        console.error("Navigation toggle or links not found");
    }
    
    // Check for any conflicting styles or scripts
    const allScripts = document.querySelectorAll('script');
    console.log("Total scripts on page:", allScripts.length);
    
    // Check for multiple navigation instances
    const allToggles = document.querySelectorAll('.nav-toggle');
    console.log("Number of nav toggles found:", allToggles.length);
});

// Add keyframe animation for menu items
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Products Carousel
const carousel = document.querySelector('.products-carousel');
const cards = document.querySelectorAll('.product-card-small');
let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
    // Mouse events for drag scroll
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Animated Navigation Arrow
const navigateBtn = document.querySelector('.navigate-products');
if (navigateBtn) {
    navigateBtn.addEventListener('mouseenter', () => {
        navigateBtn.querySelector('i').style.transform = 'translateX(5px)';
    });

    navigateBtn.addEventListener('mouseleave', () => {
        navigateBtn.querySelector('i').style.transform = 'translateX(0)';
    });
}

// Enhanced Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add staggered animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2;
                entry.target.style.animationDelay = `${delay}s`;
            }
        }
    });
}, {
    threshold: 0.2
});

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card-small').forEach(el => {
    scrollObserver.observe(el);
});

// Scrolling Text Animation
const scrollingText = document.querySelector('.scrolling-text');
if (scrollingText) {
    // Clone the text for seamless loop
    scrollingText.innerHTML += ' • ' + scrollingText.innerHTML;
    
    // Adjust animation duration based on content length
    const textWidth = scrollingText.scrollWidth;
    const duration = textWidth / 50; // Adjust speed as needed
    scrollingText.style.animationDuration = `${duration}s`;
}

// Video Background Handling
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Ensure video plays on iOS
    document.addEventListener('touchstart', () => {
        heroVideo.play();
    }, { once: true });
    
    // Fallback for browsers that don't support autoplay
    heroVideo.addEventListener('loadeddata', () => {
        if (heroVideo.paused) {
            heroVideo.play().catch(() => {
                // If autoplay is blocked, show a static image instead
                heroVideo.style.display = 'none';
                document.querySelector('.hero').style.backgroundImage = 'url(assets/images/hero-bg.jpg)';
            });
        }
    });

    // Handle video loading error
    heroVideo.addEventListener('error', () => {
        heroVideo.style.display = 'none';
        document.querySelector('.hero').style.backgroundImage = 'url(assets/images/hero-bg.jpg)';
    });
}

// Enhanced Text Animation
const animateContent = () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const elements = heroContent.children;
        Array.from(elements).forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateContent);

// Reinitialize animations when video is loaded
if (heroVideo) {
    heroVideo.addEventListener('loadeddata', animateContent);
}

// Enhanced Feature Card Interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Header Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll button with smooth fade
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
    }
});

// Product filtering functionality and interactions
const filterSelects = document.querySelectorAll('.filter-select');
const productCards = document.querySelectorAll('.product-card');

function updateProductDisplay() {
    const sortBy = document.getElementById('sort').value;
    const category = document.getElementById('category').value;
    
    // Add animation class for smooth transitions
    productCards.forEach(product => {
        product.style.opacity = '0';
        setTimeout(() => {
            // Apply filters here
            product.style.opacity = '1';
        }, 300);
    });
}

function filterProducts() {
    const selectedCategory = document.querySelector('#category-filter').value;
    const selectedSort = document.querySelector('#sort-filter').value;

    let filteredProducts = Array.from(productCards);

    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(card => 
            card.dataset.category === selectedCategory
        );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;

        switch(selectedSort) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });

    // Hide all products first
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    });

    // Show filtered products with animation
    setTimeout(() => {
        const productsGrid = document.querySelector('.products-grid');
        filteredProducts.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            }, index * 100);
            productsGrid.appendChild(card);
        });
    }, 300);
}

if (filterSelects.length > 0) {
    filterSelects.forEach(filter => {
        filter.addEventListener('change', updateProductDisplay);
        
        // Enhanced filter interactions
        filter.addEventListener('focus', () => {
            filter.style.transform = 'translateY(-2px)';
            filter.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });

        filter.addEventListener('blur', () => {
            filter.style.transform = 'translateY(0)';
            filter.style.boxShadow = 'none';
        });
    });
}

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.classList.add('success');
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
            }, 2000);
        }, 1500);
    });
}

// Product Demo Section Animation
const demoCards = document.querySelectorAll('.demo-card');
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

demoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    demoObserver.observe(card);
});

// Product Image Zoom Effect
const productImages = document.querySelectorAll('.product-image img');

productImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const bounds = e.target.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPercent = mouseX / bounds.width;
        const yPercent = mouseY / bounds.height;
        
        e.target.style.transformOrigin = `${xPercent * 100}% ${yPercent * 100}%`;
        e.target.style.transform = 'scale(1.2)';
    });

    img.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
    });
});

// Product Card Interactions
const productButtons = document.querySelectorAll('.product-btn');

productButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.product-card');
        const product = {
            title: card.querySelector('h3').textContent,
            image: card.querySelector('img').src,
            description: card.querySelector('.product-description').textContent,
            price: card.dataset.price,
            size: card.querySelector('.product-size').textContent
        };

        if (btn.querySelector('.fa-info-circle')) {
            // View Details button clicked
            openProductModal(product);
        } else if (btn.querySelector('.fa-download')) {
            // Download Brochure button clicked
            downloadBrochure(product);
        }
    });
});

// Download Brochure Function
function downloadBrochure(product) {
    // Show loading state
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    btn.disabled = true;

    // Simulate brochure download (replace with actual download logic)
    setTimeout(() => {
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = `assets/brochures/${product.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
        link.download = `${product.title} Brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button state
        btn.innerHTML = originalContent;
        btn.disabled = false;
        
        // Show success message
        showNotification('Brochure downloaded successfully!', 'success');
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Enhanced Product Modal
function openProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="modal-info">
                    <h3>${product.title}</h3>
                    <p class="description">${product.description}</p>
                    <div class="product-details">
                        <div class="price">₹${product.price}</div>
                        <div class="size">${product.size}</div>
                    </div>
                    <div class="modal-actions">
                        <button class="buy-now-btn">
                            <i class="fas fa-shopping-cart"></i>
                            Buy Now
                        </button>
                        <button class="download-brochure-btn">
                            <i class="fas fa-download"></i>
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 100);

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeProductModal(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal(modal);
        }
    });

    // Download brochure handler
    const downloadBtn = modal.querySelector('.download-brochure-btn');
    downloadBtn.addEventListener('click', () => {
        downloadBrochure(product);
        closeProductModal(modal);
    });

    // Buy now handler
    const buyBtn = modal.querySelector('.buy-now-btn');
    buyBtn.addEventListener('click', () => {
        // Add your buy now logic here
        showNotification('Redirecting to checkout...', 'info');
    });
}

function closeProductModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--white);
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        border-left: 4px solid var(--success);
    }

    .notification.info {
        border-left: 4px solid var(--primary-color);
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: var(--success);
    }

    .notification.info i {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Enhanced Product Card Interactions
document.querySelectorAll('.product-card').forEach(card => {
    // 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Image Zoom Effect
    const image = card.querySelector('.product-image img');
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        image.style.transformOrigin = `${xPercent * 100}% ${yPercent * 100}%`;
    });
});

// Enhanced Demo Card Interactions
document.querySelectorAll('.demo-card').forEach(card => {
    // Parallax Effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        const image = card.querySelector('.demo-image img');
        image.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.demo-image img');
        image.style.transform = 'translate(0, 0)';
    });

    // Benefits List Animation
    const benefits = card.querySelectorAll('.benefits-list li');
    benefits.forEach((benefit, index) => {
        benefit.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Enhanced Logo Animation
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.05)';
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
});

// Enhanced Button Interactions
document.querySelectorAll('.product-btn, .demo-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });

    // Ripple Effect
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add Ripple Effect Styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Scroll Animations
const scrollElements = document.querySelectorAll('.product-card, .demo-card, .feature');
scrollElements.forEach(el => scrollObserver.observe(el));

// Enhanced Filter Interactions
filterSelects.forEach(select => {
    select.addEventListener('focus', () => {
        select.style.transform = 'translateY(-2px)';
        select.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });

    select.addEventListener('blur', () => {
        select.style.transform = 'translateY(0)';
        select.style.boxShadow = 'none';
    });
});

// Super simple mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    // Basic toggle functionality
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-links');
    
    // Only proceed if both elements exist
    if (!toggle || !menu) {
        console.error('Navigation toggle or menu not found');
        return;
    }
    
    // Set up the toggle click event
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle active class on both elements
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Update ARIA state
        const isExpanded = toggle.classList.contains('active');
        toggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon
        const icon = toggle.querySelector('i');
        if (icon) {
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Toggle body scroll
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (toggle.classList.contains('active')) {
                // Manually trigger toggle
                toggle.click();
            }
        });
    });
}); 