const cards = document.querySelectorAll('.slider__card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

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
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateSlider();
});

// Initialize
updateSlider();
