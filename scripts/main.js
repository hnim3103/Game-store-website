const items = document.querySelectorAll('.item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

function updateSlider() {
    items.forEach(item => item.className = 'item'); // reset all
    items[index].classList.add('active');
    items[(index - 1 + items.length) % items.length].classList.add('prev');
    items[(index + 1) % items.length].classList.add('next');
}

prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    updateSlider();
});

    updateSlider();