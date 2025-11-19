document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".genres__grid .game-card");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (cards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSlider() {
      cards.forEach((card, index) => {
        // remove old class
        card.classList.remove("active", "prev", "next", "prev-2", "next-2");

        // 1.Calculate position
        const prev2Index = (currentIndex - 2 + totalCards) % totalCards;
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;
        const next2Index = (currentIndex + 2) % totalCards;

        // 2. assign new class based on location
        if (index === currentIndex) {
          card.classList.add("active"); // mid card
        } else if (index === prevIndex) {
          card.classList.add("prev"); // left card
        } else if (index === nextIndex) {
          card.classList.add("next"); // right card
        } else if (index === prev2Index) {
          card.classList.add("prev-2"); // hide card(left)
        } else if (index === next2Index) {
          card.classList.add("next-2"); // hide card(right)
        }
      });
    }

    // 3. assign event to button
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

  //check
  const isLoggedIn = localStorage.getItem("loggedIn") === "true"; // Kiểm tra trạng thái đăng nhập
  const current = window.location.pathname; // Lấy đường dẫn trang hiện tại

  // Xử lý login redirect
  if (
    isLoggedIn &&
    current.includes("purchases.html") &&
    !current.includes("your-purchases")
  ) {
    sessionStorage.setItem("nextPage", "your-purchases.html"); // Trang dành cho user đã đăng nhập
    sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation

    window.location.href = "loading.html"; // Chuyển đến trang loading
    return;
  }

  if (!isLoggedIn && current.includes("your-purchases.html")) {
    sessionStorage.setItem("nextPage", "purchases.html"); // Trang dành cho user chưa đăng nhập
    sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation

    window.location.href = "loading.html"; // Chuyển đến trang loading
    return;
  }

  // CHỈ ÁP DỤNG LOADING khi bấm sang wallet
  const walletLink = document.querySelector('a[href="wallet.html"]'); // Lấy liên kết đến wallet

  if (walletLink) {
    walletLink.addEventListener("click", (e) => {
      e.preventDefault(); // Chặn hành vi mặc định của liên kết nếu có
      sessionStorage.setItem("nextPage", "wallet.html"); // Trang wallet
      sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation
      window.location.href = "loading.html"; // Chuyển đến trang loading
    });
  }
  // Sign-Out
  const signOutButton = document.querySelector(".profile-bar__signout");
  if (signOutButton) {
    signOutButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa đúng cái Key đã lưu
      localStorage.removeItem("loggedInUserEmail"); // <-- SỬA DÒNG NÀY

      alert("You have logged out.");
      window.location.href = "/html/homepage.html";
    });
  }
});
