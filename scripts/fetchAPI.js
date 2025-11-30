// RAWG API Configuration
const RAWG_API_KEY = 'ccc322b462be462284202fd90d0e2780'; // Get from https://rawg.io/apidocs
const RAWG_BASE_URL = 'https://api.rawg.io/api';

// State
let currentPage = 1;
let totalCount = 0;
let filters = {
  search: '',
  genres: [],
  ordering: '-added',
  pageSize: 30
};

// Genre mapping (RAWG genre IDs)
const genreMap = {
  'action': 4,
  'adventure': 3,
  'racing': 1,
  'role-playing': 5,
  'shooter': 2,
  'simulation': 14,
  'sports': 15,
  'strategy': 10
};

// Fetch games from RAWG API
async function fetchGames() {
  try {
    const params = new URLSearchParams({
      key: RAWG_API_KEY,
      page: currentPage,
      page_size: filters.pageSize,
      ordering: filters.ordering
    });

    if (filters.search) {
      params.append('search', filters.search);
    }

    if (filters.genres.length > 0) {
      params.append('genres', filters.genres.join(','));
    }

    const response = await fetch(`${RAWG_BASE_URL}/games?${params}`);
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return null;
  }
}

// Generate a consistent price based on game ID (so it doesn't change on refresh)
function generatePrice(gameId) {
  // Use game ID as seed for consistent pricing
  const seed = gameId * 9301 + 49297;
  const random = (seed % 233280) / 233280;
  
  // Generate price between $4.99 and $59.99
  const price = (random * 55 + 4.99).toFixed(2);
  
  // 30% chance of being free
  if (random < 0.3) return '0.00';
  
  return price;
}

// Create game card HTML (keeping your exact structure)
function createGameCard(game) {
  const price = generatePrice(game.id);
  const imageUrl = game.background_image || '/img/assets/1.png';
  
  return `
    <article class="game-card" data-game-id="${game.id}">
      <a href="/html/game-info.html">
        <div class="game-card__image">
          <img src="${imageUrl}" alt="${game.name}" loading="lazy">
        </div>
      </a>
      <div class="game-card__content">
        <div class="game-card__price-wrapper">
          <p>${price === '0.00' ? 'Free' : '$' + price}</p>
        </div>
      </div>
      <div class="game-card__button">
        <div class="game-card__add-cart">
          <button class="game-card__add-to-cart" aria-label="Add to cart">
            <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
            <span>Add to cart</span>
          </button>
        </div>
        <button class="game-card__wishlist" aria-label="Add to wishlist">
          <i class="fa-regular fa-heart" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  `;
}

// Render games
async function renderGames() {
  const container = document.querySelector('.game-grid__container');
  const titleElement = document.querySelector('.main__title');
  
  // Show loading
  container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-size: 18px; color: rgba(255, 255, 255, 0.7);">Loading games...</div>';
  
  const data = await fetchGames();
  
  if (!data || !data.results) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-size: 18px; color: #ff6b6b;">Failed to load games. Please check your API key.</div>';
    return;
  }

  totalCount = data.count;
  
  // Update title
  titleElement.textContent = `New Games (${data.count})`;
  
  // Render cards
  container.innerHTML = data.results.map(game => createGameCard(game)).join('');
  
  // Update pagination
  updatePagination();
  
  // Re-attach event listeners
  attachCardListeners();
}

// Update pagination display
function updatePagination() {
  const maxPage = Math.ceil(totalCount / filters.pageSize);
  
  // Update top pagination
  const currentPageSpans = document.querySelectorAll('.current-page');
  const maxPageSpans = document.querySelectorAll('.max-page');
  
  currentPageSpans.forEach(span => span.textContent = currentPage);
  maxPageSpans.forEach(span => span.textContent = maxPage);
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.querySelector('.main__search-input');
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filters.search = e.target.value;
      currentPage = 1;
      renderGames();
    }, 500);
  });
}

// Setup genre filters
function setupGenreFilters() {
  const genreCheckboxes = document.querySelectorAll('input[name="action"], input[name="adventure"], input[name="racing"], input[name="role-playing"], input[name="shooter"], input[name="simulation"], input[name="sports"], input[name="strategy"]');
  
  genreCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const genreId = genreMap[checkbox.name];
      
      if (checkbox.checked) {
        if (!filters.genres.includes(genreId)) {
          filters.genres.push(genreId);
        }
      } else {
        filters.genres = filters.genres.filter(id => id !== genreId);
      }
      
      currentPage = 1;
      renderGames();
    });
  });
}

// Setup sorting
function setupSorting() {
  const sortButton = document.querySelector('.sort__dropdown button');
  const dropdown = document.querySelector('.dropdown__container');
  const sortLinks = dropdown.querySelectorAll('a');
  
  // Toggle dropdown
  sortButton.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.hidden = !dropdown.hidden;
  });
  
  // Sort options mapping
  const sortMap = {
    'Bestselling': '-added',
    'Lowest Price': 'name',
    'Highest Price': '-name',
    'User Reviews': '-rating'
  };
  
  sortLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sortText = link.textContent;
      filters.ordering = sortMap[sortText];
      
      // Update button text
      const buttonText = sortButton.childNodes[0];
      if (buttonText.nodeType === Node.TEXT_NODE) {
        buttonText.textContent = sortText + '\n                    ';
      }
      
      dropdown.hidden = true;
      currentPage = 1;
      renderGames();
    });
  });
  
  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sort__dropdown')) {
      dropdown.hidden = true;
    }
  });
}

// Setup pagination
function setupPagination() {
  // Top pagination arrows
  const topPagination = document.querySelector('.result__selections .pagination__bar');
  topPagination.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const text = e.target.textContent;
      const maxPage = Math.ceil(totalCount / filters.pageSize);
      
      if (text === '<' && currentPage > 1) {
        currentPage--;
        renderGames();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (text === '>' && currentPage < maxPage) {
        currentPage++;
        renderGames();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });
  
  // Bottom pagination
  const bottomPagination = document.querySelector('#bottom.pagination__bar');
  bottomPagination.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const text = e.target.textContent.trim();
      const maxPage = Math.ceil(totalCount / filters.pageSize);
      
      if (text === '<' && currentPage > 1) {
        currentPage--;
        renderGames();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (text === '>' && currentPage < maxPage) {
        currentPage++;
        renderGames();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!isNaN(text)) {
        const page = parseInt(text);
        if (page !== currentPage && page >= 1 && page <= maxPage) {
          currentPage = page;
          renderGames();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  });
}


// Initialize everything
function init() {
  // Check if API key is set
  if (RAWG_API_KEY === 'YOUR_API_KEY_HERE') {
    const container = document.querySelector('.game-grid__container');
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-size: 18px; color: #ff6b6b;">Please set your RAWG API key in the script.</div>';
    return;
  }
  
  setupSearch();
  setupGenreFilters();
  setupSorting();
  setupPagination();
  renderGames();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}