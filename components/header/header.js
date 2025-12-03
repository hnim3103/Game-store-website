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

function onEnter() {
  clearTimeout(closeTimer);
  panel.classList.add("is-display");
}

function onLeave() {
  closeTimer = setTimeout(() => {
    panel.classList.remove("is-display");
  }, 250);
}

function updateHover() {
  if (!wrapper || !panel) return;

  if (window.innerWidth >= 900) {
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
  } else {
    wrapper.removeEventListener("mouseenter", onEnter);
    wrapper.removeEventListener("mouseleave", onLeave);
  }
}

// Run once on load
updateHover();

// Update if screen is resized
window.addEventListener("resize", updateHover);


// Hàm gắn id

function initAutoIndexing() {
  let pageName = window.location.pathname.split("/").pop().split(".")[0];
  if (!pageName || pageName === "") pageName = "home";

  // Tìm tất cả thẻ game
  const allCards = document.querySelectorAll(
    ".game-card, .game-item, .slider__item"
  );

  allCards.forEach((card, index) => {
    // A. Gán ID nếu chưa có
    if (!card.dataset.id) {
      const uniqueId = `${pageName}_game_${index}`;
      card.dataset.id = uniqueId;
      console.log(`Assigned ID ${uniqueId} to card on ${pageName}`);
    }
    // B. Gán Ảnh nếu chưa có
    if (!card.dataset.img) {
      const imgTag = card.querySelector("img");
      if (imgTag) {
        card.dataset.img = imgTag.getAttribute("src");
      } else {
        card.dataset.img = "/img/assets/1.png";
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAutoIndexing);
} else {
  initAutoIndexing();
}

// ADD TO WISHLIST

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
    ".game-card__wishlist, .slider__wishlist, .game-item__wishlist, .wishlist, .product-card__wishlist"
  );

  if (btn) {
    e.preventDefault();
    const card = btn.closest(
      ".game-card, .game-info, .game-item, .review-card, .slider__card, .product-card"
    );

    // LẤY DỮ LIỆU
    let id = card?.dataset.id || btn.dataset.id;
    let img = card?.dataset.img || btn.dataset.img;

    // --- FALLBACK: Tự động tìm ảnh nếu thiếu ---
    if (!id) {
      const imgTag = card?.querySelector("img");
      if (imgTag) {
        const src = imgTag.getAttribute("src");
        id = src.substring(src.lastIndexOf("/") + 1).split(".")[0];
        if (!img) img = src;
      }
    }

    if (!id) {
      return;
    }

    // LOGIN & LƯU
    const isLoggedIn = window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail");

    if (!isLoggedIn) {
      window.showNotification("You need login to add to wishlist", "remove");
      setTimeout(() => {
        if (window.showPopup) window.showPopup("login");
      }, 1000);
      return;
    }

    const currentList = getGlobalWishlist();

    if (!currentList.some((item) => item.id === id)) {
      currentList.push({ id, img });
      saveGlobalWishlist(currentList);

      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "#00e122";
      }
      window.showNotification("Added to wishlist", "add");
    } else {
      window.showNotification("This game already in wishlist!", "remove");
    }
  }
});

// ADD TO CART
const CART_STORAGE_KEY = "gsw_cart";

// STORAGE
function getGlobalCart() {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
function saveGlobalCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
}

// Lắng nghe sự kiện Click Add to Cart
document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(
    ".game-card__add-cart, .slider__add-cart, .product-card__add-cart, .btn-cart"
  );
  if (!btn) return;
  if (btn) {
    e.preventDefault();
    // KIỂM TRA LOGIN
    const isLoggedIn = window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail");
    if (!isLoggedIn) {
      window.showNotification("You need login to add to cart", "remove");
      setTimeout(() => {
        if (window.showPopup) window.showPopup("login");
      }, 1000);
      return;
    }

    const card = btn.closest(
      ".game-card, .game-item, .product-card, .game-info, .slider__card"
    );

    // LẤY DỮ LIỆU
    let id = card.dataset.id || btn.dataset.id;
    let img = card.dataset.img || btn.dataset.img;

    // Tìm Ảnh & ID (như Wishlist)
    if (!id || !img) {
      const imgTag = card.querySelector("img");
      if (imgTag) {
        const src = imgTag.getAttribute("src");
        if (!img) img = src;
        if (!id) id = src.substring(src.lastIndexOf("/") + 1).split(".")[0];
      }
    }

    // Tìm Giá Tiền
    let price = card.dataset.price;
    if (!price) {
      const textTags = card.querySelectorAll("p, span, div");
      for (let tag of textTags) {
        const text = tag.innerText.trim();
        if (/^\$?\d+(\.\d+)?\$?$/.test(text)) {
          price = text;
          break;
        }
      }
      if (!price) price = "$0.00";
    }

    // D. LƯU VÀO GIỎ HÀNG
    const currentCart = getGlobalCart();

    // Kiểm tra trùng lặp
    const existingItemIndex = currentCart.findIndex((item) => item.id === id);

    if (existingItemIndex === -1) {
      currentCart.push({
        id,
        img,
        price,
        quantity: 1,
      });
      window.showNotification("Added to cart", "add");
    } else {
      window.showNotification("This game is already in your cart!", "remove");
      return;
    }
    saveGlobalCart(currentCart);
  } else {
    window.showNotification("This game is already in your cart!", "remove");
  }
});
