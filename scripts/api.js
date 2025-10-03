const API_KEY = "ccc322b462be462284202fd90d0e2780";
const slider = document.getElementById("slider");
let items = [];
let index = 0;

async function loadGames() {
  try {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=5`);
    const data = await res.json();

    // Remove old static items
    slider.querySelectorAll(".item").forEach(el => el.remove());

    // Insert games into slider
    data.results.forEach(game => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `<img src="${game.background_image}" alt="${game.name}">`;
      slider.insertBefore(item, document.getElementById("prev")); // insert before prev button
    });

    // Update items reference
    items = document.querySelectorAll(".item");

    // Initialize slider
    updateSlider();
  } catch (err) {
    console.error("Error fetching RAWG data:", err);
  }
}

function updateSlider() {
  if (!items.length) return;

  items.forEach(item => {
    item.classList.remove("active", "prev", "next");
  });

  items[index].classList.add("active");
  items[(index - 1 + items.length) % items.length].classList.add("prev");
  items[(index + 1) % items.length].classList.add("next");
}

// Button controls
document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + items.length) % items.length;
  updateSlider();
});

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % items.length;
  updateSlider();
});

// Load games from RAWG
loadGames();
