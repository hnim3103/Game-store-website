const cards = document.querySelectorAll('.slider__card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsContainer = document.getElementById('slider-dots');

let currentIndex = 0;

function updateSlider() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next');
  });

  const total = cards.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  cards[currentIndex].classList.add('active');
  cards[prevIndex].classList.add('prev');
  cards[nextIndex].classList.add('next');

  const dots = document.querySelectorAll('.slider__dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateSlider();
});


function createDots() {
  dotsContainer.innerHTML = '';

  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider__dot');
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
}

createDots();
updateSlider();

//Check login
function showLoginPopup() {
  const overlay = document.querySelector(".gsw-popup-overlay");
  const loginBox = document.querySelector('.popup-box[data-popup="login"]');

  if (overlay && loginBox) {
    // Hide all other popups
    document.querySelectorAll(".popup-box").forEach((box) => {
      box.classList.remove("active");
    });

    // Show login popup
    loginBox.classList.add("active");
    overlay.classList.add("active");
  }
}

// Check if user is logged in
function isLoggedIn() {
  return window.Auth
    ? window.Auth.isLoggedIn()
    : localStorage.getItem("loggedInUserEmail") !== null;
}

// ===== RESTRICT ADD TO CART =====
function restrictAddToCart() {
  const addToCartBtns = document.querySelectorAll(
    ".game-itemadd-cart, .slideradd-cart"
  );

  addToCartBtns.forEach((btn) => {
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
  const addToWishlisttBtn = document.querySelectorAll(
    ".game-cardwishlist, sliderwishlist"
  );

  addToWishlisttBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (!isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        alert("You need to login to add products to wishlist!");
        showLoginPopup();
      } else {
        alert("Added to Wishlist!");
      }
    });
  });
}

function initAuthRestrictions() {
  restrictAddToCart();
  restrictAddToWishlist();

  console.log("Game info auth restrictions initialized");
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuthRestrictions);
} else {
  initAuthRestrictions();
}