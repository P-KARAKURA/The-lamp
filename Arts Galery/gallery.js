/* =========================================================
   LAMPSTAND VISUAL STORIES
   GALLERY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INTRO SLIDESHOW
    ===================================================== */

    const slides = document.querySelectorAll(".intro-slide");
    const messages = document.querySelectorAll(".intro-message");
    const progressBar = document.getElementById("progressBar");
    const currentNumber = document.querySelector(".progress-current");

    let currentSlide = 0;
    const slideDuration = 5000;

    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        messages.forEach((message, i) => {
            message.classList.toggle("active", i === index);
        });

        if (progressBar) {
            const progress = ((index + 1) / slides.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (currentNumber) {
            currentNumber.textContent =
                String(index + 1).padStart(2, "0");
        }
    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }


    if (slides.length > 1) {

        showSlide(0);

        setInterval(nextSlide, slideDuration);

    }


    /* =====================================================
       ENTER GALLERY
    ===================================================== */

    const enterGallery =
        document.getElementById("enterGallery");

    const gallery =
        document.getElementById("gallery");

    if (enterGallery && gallery) {

        enterGallery.addEventListener("click", () => {

            gallery.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       GALLERY FILTERS
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const galleryCards =
        document.querySelectorAll(".gallery-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* Filter cards */

            galleryCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                    card.style.opacity = "0";
                    card.style.transform =
                        "translateY(20px)";

                    requestAnimationFrame(() => {

                        card.style.transition =
                            "opacity 0.5s ease, transform 0.5s ease";

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    });

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       LIGHTBOX DATA
    ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxDescription =
        document.getElementById("lightboxDescription");

    const lightboxCategory =
        document.getElementById("lightboxCategory");

    const currentImage =
        document.getElementById("currentImage");

    const totalImages =
        document.getElementById("totalImages");

    const closeButton =
        document.getElementById("lightboxClose");

    const previousButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");


    let lightboxItems = [];
    let lightboxIndex = 0;


    /* =====================================================
       COLLECT GALLERY CARDS
    ===================================================== */

    function getVisibleCards() {

        return Array.from(galleryCards)
            .filter(card =>
                !card.classList.contains("hidden")
            );

    }


    function prepareLightboxItems() {

        lightboxItems =
            getVisibleCards().map(card => {

                const image =
                    card.querySelector("img");

                const title =
                    card.querySelector(".gallery-card-content h3");

                const description =
                    card.querySelector(".gallery-card-content p");

                const tag =
                    card.querySelector(".gallery-tag");

                return {

                    image: image ? image.src : "",

                    alt: image ? image.alt : "",

                    title: title
                        ? title.textContent.trim()
                        : "",

                    description: description
                        ? description.textContent.trim()
                        : "",

                    category: tag
                        ? tag.textContent.trim()
                        : ""

                };

            });

        if (totalImages) {

            totalImages.textContent =
                String(lightboxItems.length)
                    .padStart(2, "0");

        }

    }


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        prepareLightboxItems();

        if (!lightboxItems.length) {
            return;
        }

        lightboxIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       UPDATE LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        const item =
            lightboxItems[lightboxIndex];

        if (!item) {
            return;
        }


        lightboxImage.style.opacity = "0";


        setTimeout(() => {

            lightboxImage.src =
                item.image;

            lightboxImage.alt =
                item.alt;

            lightboxTitle.textContent =
                item.title;

            lightboxDescription.textContent =
                item.description;

            lightboxCategory.textContent =
                item.category;

            lightboxImage.style.opacity = "1";

        }, 150);


        if (currentImage) {

            currentImage.textContent =
                String(lightboxIndex + 1)
                    .padStart(2, "0");

        }

    }


    /* =====================================================
       CARD CLICK
    ===================================================== */

    galleryCards.forEach(card => {

        card.addEventListener("click", () => {

            const visibleCards =
                getVisibleCards();

            const index =
                visibleCards.indexOf(card);

            openLightbox(index);

        });

    });


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    function nextImage() {

        if (!lightboxItems.length) {
            return;
        }

        lightboxIndex++;

        if (
            lightboxIndex >=
            lightboxItems.length
        ) {

            lightboxIndex = 0;

        }

        updateLightbox();

    }


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    function previousImage() {

        if (!lightboxItems.length) {
            return;
        }

        lightboxIndex--;

        if (lightboxIndex < 0) {

            lightboxIndex =
                lightboxItems.length - 1;

        }

        updateLightbox();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextImage
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousImage
        );

    }


    /* =====================================================
       KEYBOARD CONTROL
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });


    /* =====================================================
       CLICK OUTSIDE IMAGE TO CLOSE
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });

    }


    /* =====================================================
       TOUCH / SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            }
        );

    }


    function handleSwipe() {

        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < 50) {
            return;
        }


        if (distance < 0) {

            nextImage();

        } else {

            previousImage();

        }

    }


    /* =====================================================
       FEATURED STORY BUTTON
    ===================================================== */

    const storyOpen =
        document.querySelector(".story-open");

    const featuredImage =
        document.querySelector(".featured-image img");

    const featuredTitle =
        document.querySelector(".featured-content h2");

    const featuredDescription =
        document.querySelector(".featured-content p");

    if (storyOpen) {

        storyOpen.addEventListener("click", () => {

            const item = {

                image:
                    featuredImage
                        ? featuredImage.src
                        : "",

                alt:
                    featuredImage
                        ? featuredImage.alt
                        : "",

                title:
                    featuredTitle
                        ? featuredTitle.textContent.trim()
                        : "",

                description:
                    featuredDescription
                        ? featuredDescription.textContent.trim()
                        : "",

                category:
                    "CREATIVE ARTS"

            };


            lightboxItems = [item];

            lightboxIndex = 0;

            if (totalImages) {
                totalImages.textContent = "01";
            }

            updateLightbox();

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    }


    /* =====================================================
       IMAGE PRELOADING
    ===================================================== */

    slides.forEach(slide => {

        const image =
            slide.querySelector("img");

        if (image && image.src) {

            const preload =
                new Image();

            preload.src =
                image.src;

        }

    });


});