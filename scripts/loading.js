// ===== Helper: tắt animation nếu user bật Reduced Motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== FLOAT + ZOOM cho nhóm ảnh xung quanh =====
function animateFloatZoom(elements, options = {}) {
  if (prefersReducedMotion) return;

  const ampY   = options.ampY   ?? 8;
  const ampS   = options.ampS   ?? 0.03;
  const speed  = options.speed  ?? 1;

  elements.forEach((el) => {
    let angle = Math.random() * Math.PI * 2;

    function tick() {
      angle += 0.01 * speed;
      const y = Math.sin(angle) * ampY;
      const s = 1 + Math.sin(angle) * ampS;
      //  giữ ảnh không xoay
      el.style.transform = `translateY(${y}px) scale(${s})`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ===== Logo nhịp thở =====
function animateBreath(el, options = {}) {
  if (prefersReducedMotion) return;

  const ampS  = options.ampS ?? 0.03; // 3%
  const speed = options.speed ?? 1;

  let angle = 0;
  function tick() {
    angle += 0.01 * speed;
    const s = 1 + Math.sin(angle) * ampS;
    el.style.transform = `scale(${s})`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== Thoát màn loading =====
function exitLoading() {
  const stage = document.querySelector('.stage');
  stage.classList.add('is-hidden');
  // Nếu muốn chuyển trang sau khi ẩn:
  // setTimeout(() => location.href = '../homepage.html', 480);
  setTimeout(() => location.href = 'html/homepage.html', 480);  
}

// ===== Khởi động khi DOM sẵn sàng =====
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.picture-game-loading img');
  const logo   = document.querySelector('.loading-logo img');

  // chạy hiệu ứng
  animateFloatZoom(thumbs, { ampY: 8, ampS: 0.04, speed: 1 }); // zoom nhẹ hơn 4%
  if (logo) animateBreath(logo, { ampS: 0.03, speed: 1 });

  // setTimeout(exitLoading, 2000);
});

window.exitLoading = exitLoading;
