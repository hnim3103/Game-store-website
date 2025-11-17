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

// ==================== POPUP OVERLAY ====================
// Create overlay
let overlay = document.getElementById("global-popup-overlay");

if (!overlay) {
  overlay = document.createElement("div");
  overlay.className = "gsw-popup-overlay";
  overlay.id = "global-popup-overlay";
  document.body.appendChild(overlay);
} else {
  overlay.className = "gsw-popup-overlay";
}

// ==================== CLOSE POPUP ====================
const closePopup = () => {
  overlay.classList.remove("active");
  setTimeout(() => {
    overlay.innerHTML = "";
    document.getElementById("dynamic-popup-script")?.remove();
    document.getElementById("dynamic-popup-css")?.remove();
  }, 300);
};

// ==================== OPEN POPUP ====================
const openPopup = (url, scriptSrc, cssSrc, contentSelector) => {
  document.getElementById("dynamic-popup-css")?.remove();

  const link = document.createElement("link");
  link.id = "dynamic-popup-css";
  link.rel = "stylesheet";
  link.href = cssSrc;
  document.head.appendChild(link);

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const content = doc.querySelector(contentSelector);

      if (content) {
        overlay.innerHTML = "";
        overlay.appendChild(content);
        document.getElementById("dynamic-popup-script")?.remove();
        const script = document.createElement("script");
        script.id = "dynamic-popup-script";
        script.src = scriptSrc;
        script.defer = true;
        document.body.appendChild(script);
        overlay.classList.add("active");
      } else {
        console.error(`Không tìm thấy "${contentSelector}" trong ${url}`);
      }
    })
    .catch((err) => console.error(`Lỗi tải ${url}:`, err));
};

// ==================== EVENT: SIGN IN BUTTON ====================
const profileBtn = document.querySelector(".header__signin");
if (profileBtn) {
  profileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openPopup(
      "/html/login.html",
      "/scripts/login.js",
      "/styles/login.css",
      ".login"
    );
  });
}

// ==================== EVENT: CLICK BÊN TRONG OVERLAY ====================
overlay.addEventListener("click", (e) => {
  // login to register
  if (e.target.closest(".login__button--register")) {
    e.preventDefault();
    openPopup(
      "/html/register.html",
      "/scripts/register.js",
      "/styles/register.css",
      ".register"
    );
  }
  // Register to login
  else if (e.target.closest(".register__button--signin")) {
    e.preventDefault();
    openPopup(
      "/html/login.html",
      "/scripts/login.js",
      "/styles/login.css",
      ".login"
    );
  }
  // Sign in to Forgot Password
  else if (e.target.closest(".login__forgot-password")) {
    e.preventDefault();
    openPopup(
      "/html/email-account.html",
      "/scripts/email-account.js",
      "/styles/email-account.css",
      ".email"
    );
  }
  // Email account to Phone account
  else if (e.target.closest(".email__button--phone")) {
    e.preventDefault();
    openPopup(
      "/html/phone-account.html",
      "/scripts/phone-account.js",
      "/styles/phone-account.css",
      ".phone"
    );
  }
  // Phone account to Email account
  else if (e.target.closest(".phone__button--email")) {
    e.preventDefault();
    openPopup(
      "/html/email-account.html",
      "/scripts/email-account.js",
      "/styles/email-account.css",
      ".email"
    );
  }
  // Return login
  else if (
    e.target.closest(".email__return") ||
    e.target.closest(".phone__return")
  ) {
    e.preventDefault();
    openPopup(
      "/html/login.html",
      "/scripts/login.js",
      "/styles/login.css",
      ".login"
    );
  }
  // Close overlay
  else if (e.target === overlay) {
    closePopup();
  }
});

// ==================== EVENT: WINDOW EVENTS ====================
window.addEventListener("login-success", () => {
  closePopup();
});

window.addEventListener("register-success", () => {
  openPopup(
    "/html/login.html",
    "/scripts/login.js",
    "/styles/login.css",
    ".login"
  );
});

window.addEventListener("password-reset-success", () => {
  openPopup(
    "/html/login.html",
    "/scripts/login.js",
    "/styles/login.css",
    ".login"
  );
});
// Logout
window.setLoggedIn = (value) => {
  localStorage.setItem("isLoggedIn", value ? "true" : "false");
};

window.isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

window.updateHeaderAuth = () => {
  const signinBtn = document.querySelector(".header__signin");
  const userBox = document.querySelector(".header__user");
  const userNameEl = document.querySelector(".header__username");
  const logoutBtn = document.querySelector(".header__logout");

  if (window.isLoggedIn()) {
    signinBtn.style.display = "none";
    userBox.style.display = "flex";

    if (userNameEl) {
      userNameEl.textContent = localStorage.getItem("userEmail") || "User";
      if (userNameEl && logoutBtn) {
        // toggle logout menu
        userNameEl.addEventListener("click", () => {
          logoutBtn.style.display =
            logoutBtn.style.display === "none" ? "block" : "none";
        });

        // click logout
        logoutBtn.addEventListener("click", () => {
          setLoggedIn(false);
          localStorage.removeItem("userEmail");
          updateHeaderAuth();
        });
      }
    }
  } else {
    signinBtn.style.display = "inline-block";
    userBox.style.display = "none";
    logoutBtn.style.display = "none";
  }
};

updateHeaderAuth();
//Cart
document.querySelectorAll(".header__cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      openPopup(
        "/html/login.html",
        "/scripts/login.js",
        "/styles/login.css",
        ".login"
      );
    }
  });
});
