/**
* ============================================
* about.js - Script for handling animation and interactions
*
* Main functions:
* 1. Scroll reveal animation - show elements on scroll
* 2. Rotating quote text - change quote every 2.5 seconds
* 3. Scroll progress indicator - scroll progress bar
* 4. Smooth scrolling - smooth scroll when clicking anchor links
* ============================================
*/

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {

/* ============================================
SCROLL REVEAL ANIMATION
Detect when elements enter viewport and add class "visible"
============================================ */

// Get all elements that need to be revealed when scrolling
// querySelectorAll returns a NodeList of all matching elements
const revealEls = document.querySelectorAll(".hero, .section, .showcase, .review, .partners");

/**
* Reveal function: Check element position relative to viewport
* Called every time user scrolls or loads the page
*/
const reveal = () => {
    // Trigger point: 90% of viewport height
    // This means when the element is 10% from bottom, it will trigger
    const trigger = window.innerHeight * 0.9;
    // Loop through all elements that need revealing
    revealEls.forEach((el) => {
        // getBoundingClientRect() returns element's position and size
        // .top: distance from element's top to viewport top
        const top = el.getBoundingClientRect().top;
        // If top < trigger, element is now visible
        if (top < trigger) {
            el.classList.add("visible"); // Add class to trigger CSS animation
        }
    });
};

// Listen for scroll event on window
window.addEventListener("scroll", reveal);
// Trigger immediately to reveal elements already on screen
// (no need to scroll)
reveal();

/* ============================================
ROTATING QUOTE TEXT
Change the quote text every 2.5 seconds
============================================ */

// Get the quote text element by ID
const quote = document.getElementById("quote-text");
// Check if the quote element exists (defensive programming)
if (quote) {
    // Array of quotes to alternate
    const quotes = [
        "One of 50 Best Websites – TIME",
        "Trusted by Millions of Gamers",
        "Your Library, Your Rules",
    ];
    let index = 0; // Current index
    /**
     * setInterval: Run function every 2500ms (2.5 seconds)
     * Arrow function preserves 'this' context
     */
    setInterval(() => {
        // Remove "fade" class to reset animation
        quote.classList.remove("fade");
        // Trigger reflow - ensures browser applies CSS before adding the class again
        // offsetWidth is a property that triggers reflow (force browser repaint)
        void quote.offsetWidth;
        // Increase index, use modulo (%) to wrap back to 0 at the end of array
        // Example: (2 + 1) % 3 = 0 (wraps to start)
        index = (index + 1) % quotes.length;
        // Update the text content to the new quote
        quote.textContent = quotes[index];
        // Add back the "fade" class to trigger CSS animation
        quote.classList.add("fade");
    }, 2500); // 2500 milliseconds = 2.5 seconds
}

/* ============================================
ANIMATION: SCROLL PROGRESS INDICATOR
Create a progress bar at the top to show scroll percentage
============================================ */

// Create progress bar element
const progressBar = document.createElement('div');
progressBar.className = 'scroll-indicator';
document.body.appendChild(progressBar);

/**
* Update progress bar width based on scroll position
*/
function updateProgressBar() {
    // scrollTop: number of pixels scrolled from top
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // scrollHeight: total scrollable height
    // clientHeight: viewport height
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Calculate percent scrolled (0-100)
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    // Update progress bar width
    progressBar.style.width = scrollPercent + '%';
}
// Listen for scroll event
window.addEventListener('scroll', updateProgressBar);
// Initial call
updateProgressBar();

/* ============================================
ANIMATION: CARD SHIMMER EFFECT
Create light shimmer effect on cards when loaded
============================================ */
/**
* Intersection Observer to detect when card enters viewport
* Then trigger shimmer animation
*/
const cards = document.querySelectorAll('.section__card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Different delay for each card
            setTimeout(() => {
                entry.target.style.animation = 'shimmer 1.5s ease-out';
            }, index * 100); // 100ms delay between each card
            // Unobserve after animating
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of card is visible
});
// Observe all cards
cards.forEach(card => cardObserver.observe(card));

/* ============================================
REMOVED: SECTION ICON ROTATION
Animation for rotating icon on section scroll removed
============================================ */

/* ============================================
ANIMATION: SMOOTH SCROLL TO TOP
Show scroll to top button when scrolled down
============================================ */

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--green);
    color: var(--bg1);
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 225, 34, 0.4);
`;
document.body.appendChild(scrollTopBtn);
// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});
// Click to scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll
    });
});
// Hover effect
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0, 225, 34, 0.6)';
});
scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 4px 12px rgba(0, 225, 34, 0.4)';
});

/* ============================================
ANIMATION: TEXT TYPING EFFECT
Hero title appears as if being typed
============================================ */
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = ''; // Clear the original text
    heroTitle.style.opacity = '1';
    let charIndex = 0;
    /**
     * Typing effect: add each character one by one
     */
    function typeChar() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50); // 50ms between each character
        }
    }
    // Start typing after 200ms
    setTimeout(typeChar, 200);
}

// Log message when script loads
console.log('about.js loaded successfully!');
console.log('GSW Platform - Making games last forever');
console.log('Active animations: Scroll Progress, Shimmer, Breathing, Float, Scroll to Top, Typing Effect');
console.log('Removed: Icon rotation animations');

/* ============================================
CSS ANIMATIONS ADDED
Inject into the document for use
============================================ */
// Create style element
const style = document.createElement('style');
style.textContent = `
/* Shimmer animation for cards */
@keyframes shimmer {
    0% {
        background-position: -200%;
    }
    100% {
        background-position: 200%;
    }
}`;
document.head.appendChild(style);});