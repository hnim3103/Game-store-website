// RAWG API Configuration
const RAWG_API_KEY = 'ccc322b462be462284202fd90d0e2780';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

async function loadGames() {
  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=50`
    );

    const data = await response.json();
    const games = data.results;

    /* ---------------------------------------------------
       1. GAME CARDS (.game-card) — SIMPLE PRICE
    --------------------------------------------------- */
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach((card, index) => {
      const game = games[index];
      if (!game) return;

      // Replace image
      const img = card.querySelector(".game-card__image img");
      if (img && game.background_image) {
        img.src = game.background_image;
        img.alt = game.name;
      }

      // Generate simple price
      const priceEl = card.querySelector(".game-card__price span");
      if (priceEl) {
        const price = (Math.random() * (59.99 - 4.99) + 4.99).toFixed(2);
        priceEl.textContent = `${price}$`;
      }
    });

    /* ---------------------------------------------------
       2. SLIDER CARDS (.slider__card) — DISCOUNTED PRICE
    --------------------------------------------------- */
    const sliderCards = document.querySelectorAll(".slider__card");

    sliderCards.forEach((card, index) => {
      const game = games[index];
      if (!game) return;

      // Replace image
      const img = card.querySelector(".slider__card-image img");
      if (img && game.background_image) {
        img.src = game.background_image;
        img.alt = game.name;
      }

      // Generate discounted prices
      const originalPrice = (Math.random() * (59.99 - 19.99) + 19.99).toFixed(2);
      const discountedPrice = (originalPrice * 0.6).toFixed(2);
      const discountPercent = Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);

      // Update discount percent
      const discountEl = card.querySelector(".slider__discount-percent");
      if (discountEl) {
        discountEl.textContent = `${discountPercent}%`;
      }

      // Update price fields
      const originalEl = card.querySelector(".slider__price-original");
      const discountedEl = card.querySelector(".slider__price-discounted");

      if (originalEl) originalEl.textContent = `${originalPrice}$`;
      if (discountedEl) discountedEl.textContent = `${discountedPrice}$`;
    });

  } catch (error) {
    console.error("RAWG API ERROR:", error);
  }
}

// Run on page load
loadGames();
