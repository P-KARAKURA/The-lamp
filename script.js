/* ==========================================================================
   LAMPSTAND WEBSITE MAIN JAVASCRIPT
   Features:
   - Mobile Navigation Toggle
   - Hero Image Slider
   - Smooth Scroll for Anchor Links
   - Animated Impact Counters (Intersection Observer)
   - EmailJS Contact Form Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MOBILE NAVIGATION TOGGLE
    ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('header nav');

 const header = document.querySelector(".site-header");
     menuToggle.addEventListener('click', () => {
    
        // make nav-menu visible when menuToggle is clicked turigukora show and hide 
        if (navMenu.classList.contains('active')) {
            navMenu.style.visibility = 'visible';
            navMenu.style.opacity = '1';
        } else {
            navMenu.style.visibility = 'hidden';
            navMenu.style.opacity = '0';
        }


    });

    if (menuToggle && navMenu) {

         menuToggle.addEventListener("click", function () {

            header.classList.toggle("menu-open");

        });


        console.log('Menu toggle and navigation menu found. Setting up event listeners.');
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            console.log(`Menu toggle clicked. Active state: ${menuToggle.classList.contains('active')}`);
            console.log(`Navigation menu active state: ${navMenu.classList.contains('active')}`);
        });

        // Close navigation menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // menuToggle.classList.remove('active');
                // navMenu.classList.remove('active');

            //     navMenu.style.visibility = 'hidden';
            // navMenu.style.opacity = '0';
            });
        });


     
    }


    /* ==========================================
       2. HERO SLIDER AUTOMATION & MANUAL DOTS
    ========================================== */
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 seconds per slide
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlider() {
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        }
    }

    function resetSliderTimer() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Add click listeners to slide pagination dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSliderTimer();
        });
    });

    // Start auto-sliding if slides exist
    if (slides.length > 0) {
        startSlider();
    }


    /* ==========================================
       3. SMOOTH SCROLLING FOR INTERNAL LINKS
    ========================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#' && targetId !== '') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });


    /* ==========================================
       4. ANIMATED IMPACT COUNTERS
    ========================================== */
    const counters = document.querySelectorAll('.counter-number');
    const impactSection = document.querySelector('.impact');

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Lower number = faster count speed

            const updateCount = () => {
                const currentText = counter.innerText.replace('+', '').replace(/,/g, '');
                const count = +currentText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment) + '+';
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };

            updateCount();
        });
    }

    // Trigger counter animation only when section scrolls into view
    if (impactSection && counters.length > 0) {
        let observerTriggered = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !observerTriggered) {
                    animateCounters();
                    observerTriggered = true; // Prevents re-animating every scroll
                }
            });
        }, {
            threshold: 0.3 // Triggers when 30% of the section is visible in screen
        });

        observer.observe(impactSection);
    }

    /* ==========================================
   5. EMAILJS CONTACT FORM SUBMISSION
========================================== */
function sendEmail(event) {
    if (event) event.preventDefault();

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    // Simple HTML validation check
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    formStatus.innerHTML = '';

    // PUT YOUR ACTUAL EMAILJS KEYS HERE!
    const serviceID = 'YOUR_SERVICE_ID';     // e.g. 'service_abc123'
    const templateID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_xyz789'
    const publicKey = 'YOUR_PUBLIC_KEY';     // e.g. 'user_XXXXXX' or 'pub_XXXXXX'

    emailjs.sendForm(serviceID, templateID, contactForm, publicKey)
        .then(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            formStatus.style.color = '#2e7d32';
            formStatus.style.margin = '10px 0';
            formStatus.innerHTML = '<p>✨ Message sent successfully! We will get back to you soon.</p>';

            contactForm.reset();
        }, (error) => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            formStatus.style.color = '#d32f2f';
            formStatus.style.margin = '10px 0';
            formStatus.innerHTML = `<p>❌ Error (${error.status}): ${error.text || JSON.stringify(error)}</p>`;

            console.error('EmailJS Error:', error);
        });
}


    /* ==========================================
       5. EMAILJS CONTACT FORM SUBMISSION
    ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop standard browser form submission

            // Change button state while sending
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Clear previous status messages
            formStatus.innerHTML = '';
            formStatus.style.color = '';

            // REPLACE THESE TWO STRINGS WITH YOUR EMAILJS CREDENTIALS
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            // Send form data via EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success Message
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    formStatus.style.color = '#2e7d32'; // Green success text
                    formStatus.style.margin = '10px 0';
                    formStatus.innerHTML = '<p>✨ Message sent successfully! We will get back to you soon.</p>';

                    contactForm.reset(); // Clear all form input fields
                }, (error) => {
                    // Error Message
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    formStatus.style.color = '#d32f2f'; // Red error text
                    formStatus.style.margin = '10px 0';
                    formStatus.innerHTML = '<p>❌ Failed to send message. Please try again or reach out directly.</p>';
                    
                    console.error('EmailJS Error:', error);
                });
        });
    }

});

function sendEmail(event) {
    if (event) event.preventDefault();

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    // Simple HTML validation check
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    formStatus.innerHTML = '';

    // PUT YOUR ACTUAL EMAILJS KEYS HERE!
    const serviceID = 'YOUR_SERVICE_ID';     // e.g. 'service_abc123'
    const templateID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_xyz789'
    const publicKey = 'YOUR_PUBLIC_KEY';     // e.g. 'user_XXXXXX' or 'pub_XXXXXX'

    emailjs.sendForm(serviceID, templateID, contactForm, publicKey)
        .then(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            formStatus.style.color = '#2e7d32';
            formStatus.style.margin = '10px 0';
            formStatus.innerHTML = '<p>✨ Message sent successfully! We will get back to you soon.</p>';

            contactForm.reset();
        }, (error) => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            formStatus.style.color = '#d32f2f';
            formStatus.style.margin = '10px 0';
            formStatus.innerHTML = `<p>❌ Error (${error.status}): ${error.text || JSON.stringify(error)}</p>`;

            console.error('EmailJS Error:', error);
        });
}
