const cards = document.querySelectorAll(".slider__card");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function updateSlider() {
  cards.forEach((card, index) => {
    card.classList.remove("active", "prev", "next");
  });

  const total = cards.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  cards[currentIndex].classList.add("active");
  cards[prevIndex].classList.add("prev");
  cards[nextIndex].classList.add("next");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateSlider();
});

// Initialize
updateSlider();

// Hàm kiểm tra đăng nhập (Giả lập hoặc lấy từ localStorage thực tế)
function isLoggedIn() {
  return window.Auth
    ? window.Auth.isLoggedIn()
    : localStorage.getItem("loggedInUserEmail") !== null;
}

// Hàm hiện Popup Login
function showLoginPopup() {
  const overlay =
    document.querySelector(".gsw-popup-overlay") ||
    document.getElementById("overlay-container");
  const loginBox = document.querySelector('.popup-box[data-popup="login"]');

  if (loginBox) {
    loginBox.classList.add("active");
    if (overlay) overlay.classList.add("active");
  } else {
    console.log(
      "Chưa tìm thấy Login Popup trong DOM, chuyển hướng trang login..."
    );
    window.location.href = "/login.html";
  }
}

function restrictAddToCart() {
  const cartBtns = document.querySelectorAll(
    ".slider__add-cart, .game-card__add-cart"
  );

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (!isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        alert("You need to login to add products to cart!");
        showLoginPopup();
      } else {
        alert("Added to cart!");
      }
    });
  });
}

function restrictAddToWishlist() {
  const wishlistBtns = document.querySelectorAll(
    ".slider__wishlist, .game-card__wishlist"
  );

  wishlistBtns.forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn()) {
        alert("You need to login to add products to wishlist!");
        showLoginPopup();
      } else {
        const icon = newBtn.querySelector("i");
        if (icon) {
          if (icon.classList.contains("fa-regular")) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "#00e122";
          } else {
            icon.classList.add("fa-regular");
            icon.classList.remove("fa-solid");
            icon.style.color = "";
          }
        }
        alert("Added to Wishlist!");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  restrictAddToCart();
  restrictAddToWishlist();
  console.log("Homepage restrictions initialized");
});
