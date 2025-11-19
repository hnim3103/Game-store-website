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