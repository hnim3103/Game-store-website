/* === UPDATED header.js WITH AUTH INTEGRATION === */

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

// ===== POPUP MANAGEMENT =====
const overlay = document.querySelector(".gsw-popup-overlay");
const allPopupBoxes = document.querySelectorAll(".popup-box");
const profileBtn = document.querySelector(".header__signin");
const cartButton = document.querySelector(".header__cart");

// Hàm HIỆN 1 box cụ thể
window.showPopup = (targetData) => {
  // Ẩn tất cả các box khác
  allPopupBoxes.forEach((box) => {
    box.classList.remove("active");
  });

  // search và hiện pop up mong muốn
  const targetBox = document.querySelector(
    `.popup-box[data-popup="${targetData}"]`
  );
  if (targetBox) {
    targetBox.classList.add("active");
    overlay.classList.add("active");
  } else {
    console.error(`Không tìm thấy popup box: ${targetData}`);
  }
};

window.closePopup = () => {
  overlay.classList.remove("active");
  allPopupBoxes.forEach((box) => {
    box.classList.remove("active");
  });
};

// ===== CART ACCESS CONTROL (UPDATED) =====
if (cartButton) {
  cartButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail");

    if (!isLoggedIn) {
      window.showNotification("You need to login to view card", "remove");
      setTimeout(() => {
        showPopup("login");
      }, 1000);
    } else {
      // Navigate to cart only if logged in
      window.location.href = "/html/cart.html";
    }
  });
}

// ===== SIGN IN BUTTON =====
if (profileBtn) {
  profileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showPopup("login");
  });
}

// ===== OVERLAY CLICK HANDLING =====
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closePopup();
    return;
  }

  const navLink = e.target.closest(".popup-nav");
  if (navLink) {
    e.preventDefault();
    const target = navLink.dataset.target;
    showPopup(target);
  }
});

// ===== EVENT LISTENERS FOR AUTH EVENTS =====
window.addEventListener("login-success", () => {
  closePopup();
  // Update UI using Auth manager if available
  if (window.Auth) {
    window.Auth.updateUI();
  }
});

window.addEventListener("register-success", () => {
  showPopup("login");
});

window.addEventListener("password-reset-success", () => {
  showPopup("login");
});

const nameBtn = document.getElementById("userBtn");
const userMenu = document.getElementById("userMenu");

nameBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  userMenu.classList.toggle("show");
});

document.addEventListener("click", function (e) {
  if (!userMenu.contains(e.target) && !nameBtn.contains(e.target)) {
    userMenu.classList.remove("show");
  }
});

//category colappsible handler
const wrapper = document.querySelector(".category-item-wrapper");
const panel = document.querySelector(".category__collabsible");

let closeTimer;

wrapper.addEventListener("mouseenter", () => {
  clearTimeout(closeTimer);

  panel.classList.add("is-display");
});

wrapper.addEventListener("mouseleave", () => {
  closeTimer = setTimeout(() => {
    panel.classList.remove("is-display");
  }, 250);
});

// HÀM HIỆN THÔNG BÁO (NOTIFICATION)

// Cấu hình Key lưu trữ
const GLOBAL_STORAGE_KEY = "list_wishlist";

window.showNotification = function (message, type = "add") {
  let notificationBox = document.getElementById("notification-box");
  if (!notificationBox) return;

  const notification = document.createElement("div");
  notificationBox.appendChild(notification);

  notification.classList.add("notification", type);
  const iconClass = type === "add" ? "fa-circle-check" : "fa-trash-can";

  notification.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  setTimeout(() => {
    notification.remove();
  }, 2500);
};

// QUẢN LÝ STORAGE
function getGlobalWishlist() {
  const data = localStorage.getItem(GLOBAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveGlobalWishlist(items) {
  localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("storageUpdated"));
}

// LẮNG NGHE CLICK wishlist
document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(
    ".game-card__wishlist, .slider__wishlist, .game-item__wishlist, .wishlist"
  );

  if (btn) {
    e.preventDefault();
    const isLoggedIn = window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail");
    if (!isLoggedIn) {
      // Chưa đăng nhập -> Báo lỗi & Mở Login Form
      window.showNotification("You need login to add to wishlist", "remove");

      setTimeout(() => {
        if (window.showPopup) window.showPopup("login");
      }, 1000);

      return; // Dừng lại, không chạy code thêm game bên dưới
    }

    const id = btn.dataset.id;
    const img = btn.dataset.img;

    if (!id) {
      console.warn("Nút Wishlist này thiếu data-id:", btn);
      return;
    }

    const currentList = getGlobalWishlist();

    // Check if already in wishlist
    if (!currentList.some((item) => item.id === id)) {
      currentList.push({ id, img });
      saveGlobalWishlist(currentList);

      // chang icon wishlist
      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "#00e122";
      }

      window.showNotification("Added to wishlist", "add");
    } else {
      window.showNotification("Game already in wishlist!", "remove");
    }
  }
});
