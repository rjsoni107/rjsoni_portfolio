(function () {
    window.scroll(0, 0);
    "use strict";

    // Helper function to select elements
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    // Event listener function
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    // Scroll event listener
    const onScroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };

    // Activate navbar links based on scroll position
    const navbarLinks = select('#navbar .scrollto', true);
    const activateNavbarLinks = () => {
        let position = window.scrollY + 200;
        navbarLinks.forEach(navbarlink => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        });
    };
    window.addEventListener('load', activateNavbarLinks);
    onScroll(document, activateNavbarLinks);

    // Scroll to an element with header offset
    const scrollTo = (el) => {
        let header = select('#header');
        let offset = header.offsetHeight;
        if (!header.classList.contains('header-scrolled')) {
            offset -= 16;
        }
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        });
    };

    // Toggle header-scrolled class to #header when page is scrolled
    let selectHeader = select('#header');
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 60) {
                selectHeader.classList.add('header-scrolled');
            } else {
                selectHeader.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('load', headerScrolled);
        onScroll(document, headerScrolled);
    }

    // Mobile nav toggle
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });

    // Mobile nav dropdowns activate
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle('dropdown-active');
        }
    }, true);

    // Scroll to element on link click
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault();
            let navbar = select('#navbar');
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile');
                let navbarToggle = select('.mobile-nav-toggle');
                navbarToggle.classList.toggle('bi-list');
                navbarToggle.classList.toggle('bi-x');
            }
            scrollTo(this.hash);
        }
    }, true);

    // Scroll to element on page load with hash links in the URL
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollTo(window.location.hash);
            }
        }
    });

    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

})();
