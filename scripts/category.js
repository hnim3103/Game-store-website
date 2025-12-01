const minRange = document.querySelector(".min-val");
const maxRange = document.querySelector(".max-val");
const minInput = document.querySelector(".input-field__min-input");
const maxInput = document.querySelector(".input-field__max-input");
const rangeTrack = document.querySelector(".price__slider-track");

const minGap = 1000; // minimal gap between sliders
const maxValue = parseInt(maxRange.max);

function updateTrack() {
  const percent1 = (minRange.value / maxValue) * 100;
  const percent2 = (maxRange.value / maxValue) * 100;
  rangeTrack.style.background = `linear-gradient(to right,
      var(--green) ${percent1}%,
      var(--bg2) ${percent1}%,
      var(--bg2) ${percent2}%,
      var(--green) ${percent2}%)`;
}

function syncInputs() {
  minInput.value = minRange.value;
  maxInput.value = maxRange.value;
  updateTrack();
}

// Range → Input
minRange.addEventListener("input", () => {
  if (parseInt(maxRange.value) - parseInt(minRange.value) <= minGap) {
    minRange.value = parseInt(maxRange.value) - minGap;
  }
  syncInputs();
});

maxRange.addEventListener("input", () => {
  if (parseInt(maxRange.value) - parseInt(minRange.value) <= minGap) {
    maxRange.value = parseInt(minRange.value) + minGap;
  }
  syncInputs();
});

// Input → Range
minInput.addEventListener("change", () => {
  let val = parseInt(minInput.value);
  if (isNaN(val)) val = 0;
  if (val < 0) val = 0;
  if (val > parseInt(maxRange.value) - minGap)
    val = parseInt(maxRange.value) - minGap;
  minRange.value = val;
  syncInputs();
});

maxInput.addEventListener("change", () => {
  let val = parseInt(maxInput.value);
  if (isNaN(val)) val = maxValue;
  if (val > maxValue) val = maxValue;
  if (val < parseInt(minRange.value) + minGap)
    val = parseInt(minRange.value) + minGap;
  maxRange.value = val;
  syncInputs();
});

// Initialize
syncInputs();

//dropdown button handler
const dropdownBtn = document.querySelector(".sort__dropdown button");
const dropdownContainer = document.querySelector(".dropdown__container");
const options = document.querySelectorAll(".dropdown__container li a");

// toggle dropdown
dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownContainer.style.display =
    dropdownContainer.style.display === "block" ? "none" : "block";
});

// change button text on select
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    dropdownBtn.childNodes[0].textContent = e.target.textContent + " ";
    dropdownContainer.style.display = "none";
  });
});

// close dropdown on outside click
document.addEventListener("click", () => {
  dropdownContainer.style.display = "none";
});

// Hàm kiểm tra đăng nhập
function isLoggedIn() {
  return window.Auth
    ? window.Auth.isLoggedIn()
    : localStorage.getItem("loggedInUserEmail") !== null;
}

const wishlists = document.querySelectorAll(".game-card__wishlist");
wishlists.forEach((wishlist) => {
  wishlist.addEventListener("click", () => {
    wishlist.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  restrictAddToCart();
  restrictAddToWishlist();
  console.log("Homepage restrictions initialized");
});

document.addEventListener("DOMContentLoaded", () => {
  restrictAddToCart();
  restrictAddToWishlist();
  console.log("Homepage restrictions initialized");
});

async function fetchGamesFromAPI(filters = {}) {
  const baseURL = "https://www.freetogame.com/api/games";

  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.platform) params.append("platform", filters.platform);
  if (filters.sortBy) params.append("sort-by", filters.sortBy);

  const url = `${baseURL}?${params.toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Lỗi API:", err);
    return [];
  }
}
function renderGames(games) {
  const container = document.querySelector(".category__game-list");
  if (!container) return;

  container.innerHTML = "";

  games.forEach((game) => {
    container.innerHTML += `
      <div class="game-card">
        <img class="game-card__img" src="${game.thumbnail}" alt="${game.title}">
        <h3 class="game-card__title">${game.title}</h3>
        <p class="game-card__genre">${game.genre}</p>
        <p class="game-card__platform">${game.platform}</p>
        <button class="game-card__add-cart">Add to cart</button>
      </div>
    `;
  });

  // Gắn lại sự kiện cho wishlist + add to cart sau render
  restrictAddToCart();
  restrictAddToWishlist();
}
