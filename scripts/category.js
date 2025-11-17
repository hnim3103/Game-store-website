
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
      var(--green-color) ${percent1}%,
      var(--dark-green-color) ${percent1}%,
      var(--dark-green-color) ${percent2}%,
      var(--green-color) ${percent2}%)`;
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
options.forEach(option => {
  option.addEventListener("click", (e) => {
    dropdownBtn.childNodes[0].textContent = e.target.textContent + " ";
    dropdownContainer.style.display = "none";
  });
});

// close dropdown on outside click
document.addEventListener("click", () => {
  dropdownContainer.style.display = "none";
});


const wishlists = document.querySelectorAll('.game-card__wishlist');
wishlists.forEach(wishlist => {
  wishlist.addEventListener('click', () => {
    wishlist.classList.toggle('active');
  });
});


