document.addEventListener("DOMContentLoaded", () => {
  // Search box focus effects
  const searchInput = document.querySelector(".header__search-input");
  const searchBox = document.querySelector(".header__search");

  if (searchInput && searchBox) {
    searchInput.addEventListener("focus", () => {
      searchBox.style.borderColor = "#00ff44";
    });
    searchInput.addEventListener("blur", () => {
      searchBox.style.borderColor = "#00e122";
    });
  }

  // Active nav link management
  const navLinks = document.querySelectorAll(".header__nav-link");
  const currentPage = window.location.pathname;

  navLinks.forEach((link) => {
    // Set active based on current page
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }

    // Toggle active on click
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      
      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        nav.classList.remove("show");
        icon.classList.remove("bx-x");
      }
    });
  });

  // Mobile menu toggle
  const toggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");
  const icon = toggle?.querySelector("i");

  if (toggle && nav && icon) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("show");
      icon.classList.toggle("bx-x");
      icon.classList.toggle("bx-menu");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("show");
        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");
      }
    });

    // Close menu on window resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        nav.classList.remove("show");
        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");
      }
    });
  }
});