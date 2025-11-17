// Hiệu ứng float nhẹ cho ảnh xung quanh
function animateFloatZoom(images) {
  images.forEach(img => {
    let angle = Math.random() * Math.PI * 2;
    function tick() {
      angle += 0.01;
      const y = Math.sin(angle) * 8;       // dao động lên xuống
      const s = 1 + Math.sin(angle) * 0.04; // zoom nhẹ
      img.style.transform = `translateY(${y}px) scale(${s})`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Hiệu ứng cho logo
function animateBreath(el) { 
  function tick()  { 
    angle += 0.01; 
    const s = 1 + Math.sin(angle) * 0.03; 
    el.style.transform = `translate(-50%, -50%) scale(${s})`; 
    requestAnimationFrame(tick); 
  }
  requestAnimationFrame(tick); 
}

// Chuyển sang trang homepage
function exitLoading() {
  setTimeout(() => (location.href = '../../html/homepage.html'), 1000);
}

// Khi trang sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.picture-game-loading img');
  const logo = document.querySelector('.loading-logo img');

  animateFloatZoom(thumbs);
  if (logo) animateBreath(logo);

  // tự động chuyển trang homepage sau 1s khi người dùng không chịu thao tác click :(
  document.addEventListener('click', exitLoading);
  setTimeout(exitLoading, 1000);
});
