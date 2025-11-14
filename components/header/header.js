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
// overlay login
const profileBtn = document.querySelector(".header__signin");

if (profileBtn) {
  profileBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // create overlay contain login box
    const overlay = document.createElement("div");
    overlay.classList.add("page-overlay");
    Object.assign(overlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "auto",
      transition: "opacity 0.3s ease",
      opacity: "0",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 99999,
    });

    // create iframe login box
    const iframe = document.createElement("iframe");

    // style iframe
    Object.assign(iframe.style, {
      width: "550px",
      height: "600px",
      border: "none",
      borderRadius: "10px",
      zIndex: "100000",
    });

    // click outside, close overlay
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.style.opacity = "0";
        // Animation remove
        setTimeout(() => {
          overlay.remove();
        }, 300);
      }
    });

    overlay.appendChild(iframe);
    document.body.appendChild(overlay);

    iframe.onload = () => {
      overlay.style.opacity = "1";
    };
    iframe.src = "login.html";
  });
}

// login success, close overlay
window.addEventListener("message", (event) => {
  if (event.data === "login-success") {
    const overlay = document.querySelector(".page-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 300); // Animation
    }
  }
});
