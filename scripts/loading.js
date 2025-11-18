// File: load-screen.js
// Script này sẽ nhúng loading screen vào homepage

(function () {
  // Tạo HTML cho loading screen
  const loadingHTML = `
    <div id="loading-screen" class="loading-screen">
      <!-- Nền hình ảnh -->
      <div class="loading-background"></div>

      <!-- Logo trung tâm -->
      <div class="loading-logo">
        <img src="/img/loading/loading_logo.svg" alt="GSW Logo">
      </div>

      <!-- Ảnh game xung quanh -->
      <div class="picture-game-loading">
        <img src="/img/loading/loading_1.png" alt="Game 1">
        <img src="/img/loading/loading_2.png" alt="Game 2">
        <img src="/img/loading/loading_3.png" alt="Game 3">
        <img src="/img/loading/loading_4.png" alt="Game 4">
        <img src="/img/loading/loading_5.png" alt="Game 5">
        <img src="/img/loading/loading_6.png" alt="Game 6">
        <img src="/img/loading/loading_7.png" alt="Game 7">
        <img src="/img/loading/loading_8.png" alt="Game 8">
      </div>
    </div>
  `;

  // Chèn loading HTML vào đầu body
  document.body.insertAdjacentHTML("afterbegin", loadingHTML);

  // Animation cho ảnh xung quanh
  function animateFloatZoom(images) {
    images.forEach((img) => {
      let angle = Math.random() * Math.PI * 2;
      function tick() {
        angle += 0.01;
        const y = Math.sin(angle) * 8;
        const s = 1 + Math.sin(angle) * 0.04;
        img.style.transform = `translateY(${y}px) scale(${s})`;
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Animation cho logo
  function animateBreath(el) {
    let angle = 0;
    function tick() {
      angle += 0.01;
      const s = 1 + Math.sin(angle) * 0.03;
      el.style.transform = `translate(-50%, -50%) scale(${s})`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Ẩn loading screen
  function hideLoading() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Xóa hoàn toàn khỏi DOM để tiết kiệm tài nguyên
        loadingScreen.remove();
      }, 500);
    }
  }

  // Khởi động animations
  function initLoading() {
    const thumbs = document.querySelectorAll(".picture-game-loading img");
    const logo = document.querySelector(".loading-logo img");

    if (thumbs.length > 0) animateFloatZoom(thumbs);
    if (logo) animateBreath(logo);

    // Tự động ẩn sau 2 giây
    setTimeout(hideLoading, 2000);

    // Hoặc click để ẩn ngay
    document.addEventListener("click", hideLoading, { once: true });
  }

  // Chạy khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoading);
  } else {
    initLoading();
  }
})();
