async function loadGameInfo(gameId = 3498) { 
  // Default: "Grand Theft Auto V" just to ensure it works.
  try {
    // Get basic game details
    const res = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`);
    const game = await res.json();

    // Get screenshots
    const scrRes = await fetch(`${RAWG_BASE_URL}/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);
    const screenshots = await scrRes.json();

    // ------------------------------
    // 1. Title
    // ------------------------------
    const titleEl = document.querySelector(".game-info__title");
    if (titleEl) titleEl.textContent = game.name;

    // ------------------------------
    // 2. Reviews
    // ------------------------------
    const starsEl = document.querySelector(".game-info__stars");
    const ratingEl = document.querySelector(".game-info__rating");
    const votesEl = document.querySelector(".game-info__votes");

    if (starsEl) starsEl.textContent = convertToStars(game.rating);
    if (ratingEl) ratingEl.textContent = convertRatingWord(game.rating);
    if (votesEl) votesEl.textContent = `(${game.ratings_count})`;

    // ------------------------------
    // 3. Genres
    // ------------------------------
    const genresEl = document.querySelector(".game-info__genres");
    if (genresEl) {
      genresEl.innerHTML = ""; // Clear previous
      game.genres.forEach(g => {
        const span = document.createElement("span");
        span.className = "game-info__genre";
        span.textContent = g.name;
        genresEl.appendChild(span);
      });
    }

    // ------------------------------
    // 4. Screenshots
    // ------------------------------
    const imageEls = document.querySelectorAll(".game-info__image");
    screenshots.results.slice(0, imageEls.length).forEach((img, i) => {
      imageEls[i].src = img.image;
    });

  } catch (error) {
    console.error("RAWG GAME INFO ERROR:", error);
  }
}

/* Helper: Convert numeric rating to star symbols */
function convertToStars(rating) {
  const fullStars = Math.round(rating);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

/* Helper: Convert rating to text ("Very Positive", etc.) */
function convertRatingWord(rating) {
  if (rating >= 4.5) return "Overwhelmingly Positive";
  if (rating >= 4.0) return "Very Positive";
  if (rating >= 3.0) return "Positive";
  if (rating >= 2.0) return "Mixed";
  return "Negative";
}

// Run sidebar load
loadGameInfo(3011); 
