/**
 * Digital Taverna - Main JavaScript File
 * Handles mobile menu toggling and other interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate the hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Add scroll event for header styling
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only process if the href is not just "#"
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate header height for offset
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        
                        // Reset hamburger icon
                        const spans = menuToggle.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Create 8-bit heart animation element
        const heartAnimation = document.createElement('div');
        heartAnimation.className = 'pixel-heart-animation';
        heartAnimation.innerHTML = `
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 28 C16 28, 4 18, 4 12 C4 8, 7 4, 11 4 C14 4, 16 6, 16 6 C16 6, 18 4, 21 4 C25 4, 28 8, 28 12 C28 18, 16 28, 16 28 Z" 
                      fill="#FF0000" class="pixel-heart"/>
            </svg>
        `;
        contactForm.appendChild(heartAnimation);
        heartAnimation.style.display = 'none';

        // Input validation styling and animations
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Create pixel danger animation wrapper
            const dangerWrapper = document.createElement('div');
            dangerWrapper.className = 'pixel-danger-wrapper';
            input.parentNode.insertBefore(dangerWrapper, input);
            dangerWrapper.appendChild(input);

            // Add pixel danger animation element
            const dangerAnimation = document.createElement('div');
            dangerAnimation.className = 'pixel-danger-animation';
            dangerWrapper.appendChild(dangerAnimation);

            // Validation on input
            input.addEventListener('input', function() {
                // Remove previous validation states
                dangerWrapper.classList.remove('invalid', 'valid');
                dangerAnimation.innerHTML = '';

                // Validate based on input type
                if (input.validity.valid) {
                    dangerWrapper.classList.add('valid');
                    
                    // 8-bit coin pickup sound effect animation
                    if (input.id !== 'message') {
                        dangerAnimation.innerHTML = `
                            <div class="pixel-coin-animation">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="14" fill="#FFD700"/>
                                    <path d="M16 8 L18 14 L24 14 L19 18 L21 24 L16 20 L11 24 L13 18 L8 14 L14 14 Z" 
                                          fill="#FFA500" class="pixel-coin"/>
                                </svg>
                            </div>
                        `;
                    }
                } else {
                    dangerWrapper.classList.add('invalid');
                    
                    // Create pixel danger blocks
                    dangerAnimation.innerHTML = `
                        <div class="pixel-danger-blocks">
                            <div class="pixel-block"></div>
                            <div class="pixel-block"></div>
                            <div class="pixel-block"></div>
                            <div class="pixel-block"></div>
                        </div>
                    `;
                }
            });
        });

        // Existing form submission code with heart animation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate entire form
            if (contactForm.checkValidity()) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Show heart animation
                heartAnimation.style.display = 'block';
                heartAnimation.classList.add('pulse-animation');
                
                setTimeout(function() {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = '<p>Message sent successfully! We\'ll get back to you soon.</p>';
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    
                    successMessage.style.padding = '40px 20px';
                    successMessage.style.textAlign = 'center';
                    successMessage.style.color = '#4BB543';
                    successMessage.style.fontFamily = '"Press Start 2P", cursive';
                    successMessage.style.fontSize = '0.9rem';
                }, 1500);
            } else {
                // Trigger validation display
                contactForm.reportValidity();
            }
        });
    }
});
