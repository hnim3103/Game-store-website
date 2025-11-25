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
    document.querySelectorAll(".game-card").forEach((card, index) => {
      const game = games[index];
      if (!game) return;

      // Image
      const img = card.querySelector(".game-card__image img");
      if (img && game.background_image) {
        img.src = game.background_image;
        img.alt = game.name;
      }

      // Simple random price
      const priceEl = card.querySelector(".game-card__price span");
      if (priceEl) {
        const price = (Math.random() * (59.99 - 4.99) + 4.99).toFixed(2);
        priceEl.textContent = `${price}$`;
      }
    });

    /* ---------------------------------------------------
       2. SLIDER CARDS (.slider__card) — DISCOUNTED PRICE
    --------------------------------------------------- */
    document.querySelectorAll(".slider__card").forEach((card, index) => {
      const game = games[index];
      if (!game) return;

      // Image
      const img = card.querySelector(".slider__card-image img");
      if (img && game.background_image) {
        img.src = game.background_image;
        img.alt = game.name;
      }

      // Price generation
      const originalPrice = (Math.random() * (59.99 - 19.99) + 19.99).toFixed(2);
      const discountedPrice = (originalPrice * 0.6).toFixed(2);
      const discountPercent = Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);

      // Discount percent
      const discountEl = card.querySelector(".slider__discount-percent");
      if (discountEl) discountEl.textContent = `${discountPercent}%`;

      // Prices
      const originalEl = card.querySelector(".slider__price-original");
      const discountedEl = card.querySelector(".slider__price-discounted");

      if (originalEl) originalEl.textContent = `${originalPrice}$`;
      if (discountedEl) discountedEl.textContent = `${discountedPrice}$`;
    });

    /* ---------------------------------------------------
       3. GAME ITEM (.game-item) 
    --------------------------------------------------- */
    document.querySelectorAll(".game-item").forEach((item, index) => {
      const game = games[index];
      if (!game) return;

      // Image
      const img = item.querySelector(".game-item__image img");
      if (img && game.background_image) {
        img.src = game.background_image;
        img.alt = game.name;
      }

      // Name
      const nameEl = item.querySelector(".game-item__game-name");
      if (nameEl) nameEl.textContent = game.name;

      // Genres
      const genresEl = item.querySelector(".game-item__game-genres");
      if (genresEl) genresEl.textContent = game.genres.map(g => g.name).join(", ");

      // Release Date
      const releaseEl = item.querySelector(".game-item__game-release-date");
      if (releaseEl) releaseEl.textContent = `Release Date: ${game.released}`;

      // Generate discount + price
      const discountPercent = Math.floor(Math.random() * (90 - 10) + 10);
      const originalPrice = (Math.random() * (59.99 - 19.99) + 19.99).toFixed(2);
      const discountedPrice = (originalPrice * (1 - discountPercent / 100)).toFixed(2);

      // Discount text
      const discountEl = item.querySelector(".game-item__discount-percent");
      if (discountEl) discountEl.textContent = `${discountPercent}%`;

      // Discounted price
      const priceEl = item.querySelector(".game-item__price-discounted");
      if (priceEl) priceEl.textContent = `$${discountedPrice}`;
    });

  } catch (error) {
    console.error("RAWG API ERROR:", error);
  }
}

// Run on page load
loadGames();
