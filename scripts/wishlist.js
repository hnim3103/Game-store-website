document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlist-container");
  const wishlistCountLabel = document.getElementById("wishlist-count");
  const STORAGE_KEY = "list_wishlist";

  // QUẢN LÝ DỮ LIỆU
  function getWishlist() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveWishlist(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderWishlist();
  }

  // RENDER HTML
  function createWishlistItemHTML(game) {
    return `
      <div class="wishlist-item-box">
          <div class="wishlist-item-box__column wishlist-item-box__product">
            <a href="game-info.html">
              <img src="${
                game.img || "/img/assets/1.png"
              }" alt="Game Cover" class="wishlist-item-box__image" />
            </a>
            <div class="wishlist-item-box__details">
              <span class="wishlist-item-box__title">OUTLAST Trinity</span>
              <span class="wishlist-item-box__info">Zombies, Action</span>
              <span class="wishlist-item-box__info">Release: 2024</span>
            </div>
          </div>

          <span class="wishlist-item-box__release-date">8 OCT 25</span>

          <div class="wishlist-item-box__column wishlist-item-box__actions">
            <div class="wishlist-item-box__price-tag">
              <label class="discount-percent">-75%</label>
              <div class="price-container">
                <label class="price-original"><u>$19.99</u></label>
                <label class="price-sale">$4.99</label>
              </div>
            </div>

            <div class="action-buttons">
              <a href="#" class="wishlist-item-box__button">ADD TO CART</a>
              <img src="/img/icons/bin.png" class="wishlist-item-box__remove-icon" onclick="removeGame('${
                game.id
              }')" />
            </div>
          </div>
        </div>
    `;
  }

  function renderWishlist() {
    const items = getWishlist();

    if (wishlistCountLabel)
      wishlistCountLabel.textContent = `${items.length} Games`;
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (items.length === 0) {
      wishlistContainer.innerHTML = `<p style="text-align: center; padding: 40px; color: #fff; font-size: 30px">Your wishlist is empty.</p>`;
    } else {
      items.forEach((game) => {
        wishlistContainer.insertAdjacentHTML(
          "beforeend",
          createWishlistItemHTML(game)
        );
      });
    }
    attachCartEvents();
  }

  function attachCartEvents() {
    document.querySelectorAll(".wishlist-item-box__button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.classList.add("button--clicked");
      });
    });
  }

  // HÀM XÓA
  window.removeGame = function (id) {
    const newItems = getWishlist().filter((item) => item.id !== id);
    saveWishlist(newItems);

    // Gọi thông báo từ Header (nếu có)
    if (typeof window.showNotification === "function") {
      window.showNotification("Removed from wishlist", "remove");
    }
  };
  window.addEventListener("storageUpdated", () => {
    renderWishlist();
  });

  // SLIDER

  const cards = document.querySelectorAll(".genres__grid .game-card");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (cards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSlider() {
      cards.forEach((card, index) => {
        card.classList.remove("active", "prev", "next", "prev-2", "next-2");

        const prev2Index = (currentIndex - 2 + totalCards) % totalCards;
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;
        const next2Index = (currentIndex + 2) % totalCards;

        if (index === currentIndex) card.classList.add("active");
        else if (index === prevIndex) card.classList.add("prev");
        else if (index === nextIndex) card.classList.add("next");
        else if (index === prev2Index) card.classList.add("prev-2");
        else if (index === next2Index) card.classList.add("next-2");
      });
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateSlider();
    });

    updateSlider();
  }

  renderWishlist();
});
