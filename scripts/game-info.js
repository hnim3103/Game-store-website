// REVIEW CARDS: READ MORE / LIKE / DISLIKE

function initReviewCard(card) {
  if (!card) return;

  const content = card.querySelector(".review-card__content");
  const body = card.querySelector(".review-card__body");
  const toggleBtn = card.querySelector(".review-card__toggle");
  const likeBtn = card.querySelector(".review-card__action--like");
  const dislikeBtn = card.querySelector(".review-card__action--dislike");

  // ----- READ MORE / SHOW LESS -----
  if (content && body && toggleBtn) {
    const collapsedHeight = 140;

    const updateReadMore = () => {
      const bodyHeight = body.scrollHeight;

      if (bodyHeight <= collapsedHeight) {
        // Review ngắn - ẩn hoàn toàn READ MORE và gradient
        toggleBtn.style.display = "none";
        content.style.maxHeight = "none";
        content.classList.remove("is-expanded");
        // Xóa ::after gradient bằng cách thêm class
        content.style.setProperty("--show-gradient", "0");
      } else {
        // Review dài - hiện READ MORE
        toggleBtn.style.display = "block";
        content.style.setProperty("--show-gradient", "1");

        if (!content.classList.contains("is-expanded")) {
          content.style.maxHeight = collapsedHeight + "px";
        } else {
          content.style.maxHeight = "none";
        }
      }
    };

    // Khởi tạo
    updateReadMore();

    // Cập nhật khi resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateReadMore, 100);
    });

    // Click READ MORE
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = content.classList.contains("is-expanded");

      if (isExpanded) {
        // Thu gọn
        content.classList.remove("is-expanded");
        content.style.maxHeight = collapsedHeight + "px";
        toggleBtn.textContent = "READ MORE";
        content.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        // Mở rộng
        content.classList.add("is-expanded");
        content.style.maxHeight = "none";
        toggleBtn.textContent = "SHOW LESS";
      }
    });
  }

  // ----- LIKE / DISLIKE -----
  if (likeBtn && dislikeBtn) {
    likeBtn.addEventListener("click", () => {
      const active = likeBtn.classList.contains("is-active");
      likeBtn.classList.toggle("is-active");
      if (!active) dislikeBtn.classList.remove("is-active");
    });

    dislikeBtn.addEventListener("click", () => {
      const active = dislikeBtn.classList.contains("is-active");
      dislikeBtn.classList.toggle("is-active");
      if (!active) likeBtn.classList.remove("is-active");
    });
  }
}

// Khởi tạo cho các review có sẵn
document.querySelectorAll(".review-card").forEach(initReviewCard);

// GAME DESCRIPTION TOGGLE – READ MORE / SHOW LESS
function initReadMore() {
  const descContent = document.querySelector(".js-description-content");
  const descBtn = document.querySelector(".js-toggle-btn");

  if (descContent && descBtn) {
    const collapsedHeight = getComputedStyle(descContent).maxHeight;

    descBtn.addEventListener("click", () => {
      const expanded = descContent.classList.toggle("is-expanded");

      if (expanded) {
        descContent.style.maxHeight = descContent.scrollHeight + "px";
        descBtn.textContent = "SHOW LESS";
      } else {
        descContent.style.maxHeight = collapsedHeight;
        descBtn.textContent = "READ MORE";
      }
    });
  }
}

// IMAGE GALLERY
function initGallery() {
  // Lấy các phần tử DOM cần thiết
  const mainImage = document.querySelector(".gallery__main-image");
  const mainVideo = document.querySelector(".gallery__main-video");
  const prevBtn = document.querySelector(".gallery__nav--prev");
  const nextBtn = document.querySelector(".gallery__nav--next");
  const thumbnails = document.querySelectorAll(".gallery__thumbnail-wrapper");
  const dotsContainer = document.querySelector(".gallery__dots");
  const thumbnailContainer = document.querySelector(".gallery__thumbnails");
  const swipeArea = document.querySelector(".gallery__main");

  if (!mainImage || thumbnails.length === 0) return;

  // Xây dựng mảng dữ liệu từ HTML
  const galleryItems = Array.from(thumbnails).map((wrapper) => {
    return {
      type: wrapper.dataset.type || "image",
      src: wrapper.dataset.largeSrc,
    };
  });

  let currentImageIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  // Hàm chuyển slide
  function setActiveItem(index) {
    // Kiểm tra: Không làm gì nếu item không tồn tại hoặc đang active
    if (!galleryItems[index] || currentImageIndex === index) return;

    const item = galleryItems[index];
    if (mainVideo) mainVideo.src = "";

    // Nếu là video
    if (item.type === "video" && mainVideo) {
      mainImage.classList.add("is-hidden"); // ẩn ảnh
      mainVideo.classList.remove("is-hidden"); // hiện video
      mainVideo.src = item.src + "?autoplay=1&mute=0&controls=1";
      // Ngược lại nếu là ảnh
    } else {
      mainImage.classList.remove("is-hidden");
      if (mainVideo) mainVideo.classList.add("is-hidden");
      mainImage.style.transition = "none";
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = item.src;
        mainImage.style.transition = "opacity 0.4s ease-in-out";
        void mainImage.offsetWidth;
        mainImage.style.opacity = 1;
      }, 50);
    }
    updateActiveUI(index, false);
    currentImageIndex = index;
  }

  // Hàm cập nhật giao diện
  function updateActiveUI(index, isInitialLoad = false) {
    // Cập nhật viền
    thumbnails.forEach((wrapper, i) => {
      wrapper.classList.toggle("gallery__thumbnail--active", i === index);
    });
    // Cập nhật chấm tròn cho mobile
    if (dotsContainer) {
      const allDots = dotsContainer.querySelectorAll(".gallery__dot");
      allDots.forEach((dot, i) => {
        dot.classList.toggle("gallery__dot--active", i === index);
      });
    }
    // Logic cuộn thumbnail vào giữa màn hình
    const activeThumb = thumbnails[index];
    if (activeThumb && thumbnailContainer) {
      const containerWidth = thumbnailContainer.offsetWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const newScrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;

      thumbnailContainer.scrollTo({
        left: newScrollLeft,
        behavior: isInitialLoad ? "auto" : "smooth",
      });
    }
  }

  // Hàm khởi tạo để đồng bộ thumbnail
  function initializeGallery() {
    let activeIndex = Array.from(thumbnails).findIndex((wrapper) =>
      wrapper.classList.contains("gallery__thumbnail--active")
    );
    if (activeIndex === -1) {
      activeIndex = 0;
    }
    currentImageIndex = activeIndex;
    updateActiveUI(currentImageIndex, true);
    if (dotsContainer) {
      galleryItems.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("gallery__dot");
        dot.dataset.index = index;
        dot.addEventListener("click", () => {
          setActiveItem(index);
        });
        dotsContainer.appendChild(dot);
      });
      updateActiveUI(currentImageIndex, true);
    }
  }

  // Hàm điều khiển
  function showNextImage() {
    let nextIndex = (currentImageIndex + 1) % galleryItems.length;
    setActiveItem(nextIndex);
  }

  function showPrevImage() {
    let prevIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveItem(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener("click", showNextImage);
  if (prevBtn) prevBtn.addEventListener("click", showPrevImage);

  thumbnails.forEach((wrapper, index) => {
    wrapper.addEventListener("click", function () {
      setActiveItem(index);
    });
  });

  // Gắn sự kiện vuốt
  if (swipeArea) {
    swipeArea.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    swipeArea.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;

      const swipeDiff = touchEndX - touchStartX;
      if (swipeDiff > swipeThreshold) {
        showPrevImage();
      } else if (swipeDiff < -swipeThreshold) {
        showNextImage();
      }
      touchStartX = 0;
      touchEndX = 0;
    });
  }

  initializeGallery();
}

//Check login

(function () {
  "use strict";

  // Helper function to show login popup
  function showLoginPopup() {
    const overlay = document.querySelector(".gsw-popup-overlay");
    const loginBox = document.querySelector('.popup-box[data-popup="login"]');

    if (overlay && loginBox) {
      // Hide all other popups
      document.querySelectorAll(".popup-box").forEach((box) => {
        box.classList.remove("active");
      });

      // Show login popup
      loginBox.classList.add("active");
      overlay.classList.add("active");
    }
  }

  // Check if user is logged in
  function isLoggedIn() {
    return window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail") !== null;
  }

  // ===== RESTRICT ADD TO CART =====
  function restrictAddToCart() {
    const addToCartBtn = document.querySelector(".btn-cart");

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function (e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          e.stopPropagation();
          alert("You need to login to add products to cart!");
          showLoginPopup();
        } else {
          alert("Added to cart!");
        }
      });
    }
  }

  function restrictAddToWishlist() {
    const addToWishlisttBtn = document.querySelector(".wishlist");

    if (addToWishlisttBtn) {
      addToWishlisttBtn.addEventListener("click", function (e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          e.stopPropagation();
          alert("You need to login to add products to wishlist!");
          showLoginPopup();
        } else {
          alert("Added to Wishlist!");
        }
      });
    }
  }
  // ===== RESTRICT RATING STARS =====
  function restrictRating() {
    const rateStarsContainer = document.getElementById("rateStars");
    const rateStars = rateStarsContainer
      ? rateStarsContainer.querySelectorAll("i")
      : [];

    if (rateStars.length) {
      rateStars.forEach((star) => {
        // Remove existing click listeners by cloning
        const newStar = star.cloneNode(true);
        star.parentNode.replaceChild(newStar, star);

        // Add new click listener with auth check
        newStar.addEventListener("click", function (e) {
          if (!isLoggedIn()) {
            e.preventDefault();
            e.stopPropagation();
            alert("You need to login to rate the game!");
            showLoginPopup();
            return false;
          }

          // Original rating logic
          const value = Number(newStar.dataset.star);
          window.selectedRating = value;

          const allStars = rateStarsContainer.querySelectorAll("i");
          allStars.forEach((s) => {
            const v = Number(s.dataset.star);
            if (v <= value) {
              s.classList.remove("fa-regular");
              s.classList.add("fa-solid");
            } else {
              s.classList.add("fa-regular");
              s.classList.remove("fa-solid");
            }
          });

          const rateLabel = document.getElementById("rateLabel");
          const ratingTextMap = {
            1: "Very bad",
            2: "Poor",
            3: "Average",
            4: "Great",
            5: "Excellent",
          };

          if (rateLabel) {
            rateLabel.textContent = ratingTextMap[value] || "";
          }

          const rateSubmitBtn = document.getElementById("rateSubmit");
          if (rateSubmitBtn) {
            rateSubmitBtn.disabled = false;
          }
        });
      });
    }
  }

  // ===== RESTRICT SUBMIT RATING BUTTON =====
  function restrictSubmitRating() {
    const rateSubmitBtn = document.getElementById("rateSubmit");

    if (rateSubmitBtn) {
      // Remove existing listener
      const newBtn = rateSubmitBtn.cloneNode(true);
      rateSubmitBtn.parentNode.replaceChild(newBtn, rateSubmitBtn);

      newBtn.disabled = true;

      newBtn.addEventListener("click", function (e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          e.stopPropagation();
          alert("You must be logged in to post a bid!");
          showLoginPopup();
          return false;
        }

        if (!window.selectedRating) {
          alert("Please select a star rating first.");
          return;
        }

        // Open review form
        const reviewForm = document.getElementById("reviewForm");
        const rateSection = document.getElementById("rateSection");

        if (reviewForm) {
          reviewForm.classList.add("is-visible");
          reviewForm.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (rateSection) {
          rateSection.classList.add("is-hidden");
        }
      });
    }
  }

  // ===== RESTRICT "ADD REVIEW NOW" LINK =====
  function restrictAddReviewLink() {
    const openReviewFormLink = document.getElementById("openReviewForm");

    if (openReviewFormLink) {
      openReviewFormLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (!isLoggedIn()) {
          alert("Bạn cần đăng nhập để viết review!");
          showLoginPopup();
          return false;
        }

        // Open review form
        const reviewForm = document.getElementById("reviewForm");
        const rateSection = document.getElementById("rateSection");

        if (reviewForm) {
          reviewForm.classList.add("is-visible");
          reviewForm.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (rateSection) {
          rateSection.classList.add("is-hidden");
        }
      });
    }
  }

  // ===== RESTRICT SUBMIT REVIEW BUTTON =====
  function restrictSubmitReview() {
    const submitReviewBtn = document.getElementById("submitReviewBtn");

    if (submitReviewBtn) {
      // Remove existing listener
      const newBtn = submitReviewBtn.cloneNode(true);
      submitReviewBtn.parentNode.replaceChild(newBtn, submitReviewBtn);

      newBtn.addEventListener("click", function (e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          e.stopPropagation();
          alert("Bạn cần đăng nhập để gửi review!");
          showLoginPopup();
          return false;
        }

        if (!window.selectedRating) {
          alert("Please select a star rating first.");
          return;
        }

        const reviewTitleInput = document.getElementById("reviewTitle");
        const reviewContentInput = document.getElementById("reviewContent");

        const title = reviewTitleInput ? reviewTitleInput.value.trim() : "";
        const text = reviewContentInput ? reviewContentInput.value.trim() : "";

        if (!title || !text) {
          alert("Please enter both a title and your review.");
          return;
        }

        // Create new review card
        const reviewsList = document.querySelector(".reviews-list");
        if (reviewsList) {
          const card = document.createElement("div");
          card.className = "review-card";

          const today = new Date();
          const dateStr = today.toLocaleDateString("en-GB");

          // Get username
          const user = window.Auth ? window.Auth.getCurrentUser() : null;
          const username = user ? user.username : "You";

          let starsHtml = "";
          for (let i = 1; i <= 5; i++) {
            const emptyClass =
              i > window.selectedRating ? " review-card__star--empty" : "";
            starsHtml += `<i class="fa-solid fa-star review-card__star${emptyClass}"></i>`;
          }

          card.innerHTML = `
            <div class="review-card__header">
              <div class="review-card__avatar"><i class="fa-solid fa-user"></i></div>
              <span class="review-card__username">${username}</span>
              <span class="review-card__date">${dateStr}</span>
            </div>
            <div class="review-card__toprow">
              <div class="review-card__stars">
                ${starsHtml}
              </div>
              <div class="review-card__actions">
                <button class="review-card__action review-card__action--like">
                  <i class="fa-solid fa-thumbs-up"></i>
                </button>
                <button class="review-card__action review-card__action--dislike">
                  <i class="fa-solid fa-thumbs-down"></i>
                </button>
              </div>
            </div>
            <div class="review-card__content">
              <h4 class="review-card__title">${title}</h4>
              <p class="review-card__body">${text}</p>
              <button class="review-card__toggle">READ MORE</button>
            </div>
          `;

          reviewsList.prepend(card);

          // Initialize the new card (if initReviewCard exists)
          if (typeof window.initReviewCard === "function") {
            window.initReviewCard(card);
          }
        }

        // Reset form
        if (reviewTitleInput) reviewTitleInput.value = "";
        if (reviewContentInput) reviewContentInput.value = "";

        const reviewForm = document.getElementById("reviewForm");
        const rateThanks = document.getElementById("rateThanks");

        if (reviewForm) reviewForm.classList.remove("is-visible");

        if (rateThanks) {
          rateThanks.classList.add("is-visible");
          rateThanks.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  // ===== INITIALIZE ALL RESTRICTIONS =====
  function initAuthRestrictions() {
    restrictAddToCart();
    restrictAddToWishlist();
    restrictRating();
    restrictSubmitRating();
    restrictAddReviewLink();
    restrictSubmitReview();

    console.log("Game info auth restrictions initialized");
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuthRestrictions);
  } else {
    // DOM already loaded
    setTimeout(initAuthRestrictions, 100);
  }

  // Re-initialize after login
  window.addEventListener("login-success", () => {
    console.log("User logged in, re-initializing restrictions");
    setTimeout(initAuthRestrictions, 100);
  });
})();

// INITIALIZE ALL FUNCTIONS
initReadMore();
initGallery();
