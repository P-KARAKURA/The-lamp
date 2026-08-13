document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       HEADER SCROLL EFFECT
    ========================================== */

    const header = document.querySelector(".about-header");


    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });



    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = document.querySelector(".about-menu-toggle");

    const navigation = document.querySelector(".about-nav");


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            header.classList.toggle("menu-open");

        });


        const navLinks = navigation.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                header.classList.remove("menu-open");

            });

        });

    }



    /* ==========================================
       SECTION REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".inner-section, .highlight-section, .closing-section"
    );


    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });



    /* ==========================================
       HIGHLIGHT / PROJECT CARDS REVEAL
    ========================================== */

    const cards = document.querySelectorAll(
        ".highlight-grid > div, .project-link-card"
    );


    const cardObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    cardObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.2
        }

    );


    cards.forEach(function (card, index) {

        card.style.transitionDelay = `${(index % 4) * 0.12}s`;

        card.classList.add("reveal");

        cardObserver.observe(card);

    });

});
