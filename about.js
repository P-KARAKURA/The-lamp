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


        /* Close menu after selecting a link */

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
        ".about-introduction, .about-context, .lampstand-idea, .pillars-section, .dialogue-section, .about-closing"
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
       PILLAR CARDS REVEAL
    ========================================== */

    const pillarCards = document.querySelectorAll(".pillar-card");


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


    pillarCards.forEach(function (card, index) {

        card.style.transitionDelay = `${index * 0.12}s`;

        card.classList.add("reveal");

        cardObserver.observe(card);

    });


    console.log("LAMPSTAND About page loaded successfully.");

});