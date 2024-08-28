"use strict";

// Helper function to select elements
const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
};

// Event listener function
const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
};

// Scroll event listener
const onScroll = (el, listener) => el.addEventListener('scroll', listener);

// Activate navbar links based on scroll position
const navbarLinks = select('#navbar .scrollto', true);
const activateNavbarLinks = () => {
    const position = window.scrollY + 200;
    navbarLinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;
        const section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add('active');
        } else {
            navbarlink.classList.remove('active');
        }
    });
};

// Scroll to an element with header offset
const scrollTo = (el) => {
    const header = select('#header');
    const offset = header.classList.contains('header-scrolled') ? header.offsetHeight : header.offsetHeight - 16;
    const elementPos = select(el).offsetTop;
    window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
    });
};

// Toggle header-scrolled class to #header when page is scrolled
const handleHeaderScrolled = () => {
    const header = select('#header');
    if (header) {
        if (window.scrollY > 60) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
};

// Mobile nav toggle
const toggleMobileNav = () => {
    const navbar = select('#navbar');
    navbar.classList.toggle('navbar-mobile');
    const navToggle = select('.mobile-nav-toggle');
    navToggle.classList.toggle('bi-list');
    navToggle.classList.toggle('bi-x');
};

// Mobile nav dropdowns activate
const toggleDropdown = (e) => {
    const navbar = select('#navbar');
    if (navbar.classList.contains('navbar-mobile')) {
        e.preventDefault();
        e.target.nextElementSibling.classList.toggle('dropdown-active');
    }
};

// Scroll to element on link click
const handleScrollTo = (e) => {
    if (select(e.target.hash)) {
        e.preventDefault();
        const navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
            toggleMobileNav();
        }
        scrollTo(e.target.hash);
    }
};

// Typeing Effect for banner 
const typeEffect = () => {
    const typedElement = document.querySelector('.typed');
    const typedItems = typedElement.getAttribute('data-typed-items').split(',');
    let currentIndex = 0;
    let currentCharIndex = 0;
    let typingForward = true;

    const startTyping = () => {
        const currentText = typedItems[currentIndex];

        if (typingForward) {
            typedElement.textContent = currentText.substring(0, currentCharIndex);
            currentCharIndex++;

            if (currentCharIndex > currentText.length) {
                typingForward = false;
                setTimeout(startTyping, 1500);
                return;
            }
        } else {
            typedElement.textContent = currentText.substring(0, currentCharIndex);
            currentCharIndex--;

            if (currentCharIndex < 0) {
                typingForward = true;
                currentIndex = (currentIndex + 1) % typedItems.length;
                setTimeout(startTyping, 500);
                return;
            }
        }

        const delay = typingForward ? 80 : 50;
        setTimeout(startTyping, delay);
    };

    startTyping();
};


// Initialize event listeners
const init = () => {
    window.scroll(0, 0);
    window.addEventListener('load', typeEffect);
    window.addEventListener('load', activateNavbarLinks);
    onScroll(document, activateNavbarLinks);
    onScroll(document, handleHeaderScrolled);
    window.addEventListener('load', handleHeaderScrolled);
    on('click', '.mobile-nav-toggle', toggleMobileNav);
    on('click', '.navbar .dropdown > a', toggleDropdown, true);
    on('click', '.scrollto', handleScrollTo, true);

    // Scroll to element on page load with hash links in the URL
    window.addEventListener('load', () => {
        if (window.location.hash && select(window.location.hash)) {
            scrollTo(window.location.hash);
        }
    });
};

document.addEventListener('DOMContentLoaded', init);
