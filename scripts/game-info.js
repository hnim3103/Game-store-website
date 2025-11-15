// ==========================================================
// REVIEW CARDS: READ MORE / LIKE / DISLIKE
// ==========================================================

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
        content.style.setProperty('--show-gradient', '0');
      } else {
        // Review dài - hiện READ MORE
        toggleBtn.style.display = "block";
        content.style.setProperty('--show-gradient', '1');
        
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

// ==========================================================
// GAME DESCRIPTION TOGGLE – READ MORE / SHOW LESS
// ==========================================================
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

// ==========================================================
// IMAGE GALLERY
// ==========================================================
const mainImage = document.querySelector(".gallery__main-image");
const prevBtn = document.querySelector(".gallery__nav--prev");
const nextBtn = document.querySelector(".gallery__nav--next");
const thumbs = document.querySelectorAll(".gallery__thumbnail");
const dotsContainer = document.querySelector(".gallery__dots");

if (mainImage && thumbs.length > 0) {
  const imageList = Array.from(thumbs).map(t => t.dataset.largeSrc);
  let currentIndex = 0;

  // Tạo các chấm điều hướng
  if (dotsContainer) {
    imageList.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "gallery__dot";
      dot.dataset.index = i;
      dot.addEventListener("click", () => setImage(i));
      dotsContainer.appendChild(dot);
    });
  }

  // Cập nhật UI đang active
  const updateUI = (index) => {
    thumbs.forEach((t, i) =>
      t.classList.toggle("gallery__thumbnail--active", i === index)
    );
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".gallery__dot").forEach((dot, i) =>
        dot.classList.toggle("gallery__dot--active", i === index)
      );
    }
  };

  // Đổi ảnh
  const setImage = (index) => {
    if (index === currentIndex || !imageList[index]) return;

    mainImage.style.opacity = 0;

    setTimeout(() => {
      mainImage.src = imageList[index];
      mainImage.style.opacity = 1;
    }, 150);

    currentIndex = index;
    updateUI(index);
  };

  // Next / Prev
  const nextImage = () => setImage((currentIndex + 1) % imageList.length);
  const prevImage = () =>
    setImage((currentIndex - 1 + imageList.length) % imageList.length);

  if (nextBtn) nextBtn.addEventListener("click", nextImage);
  if (prevBtn) prevBtn.addEventListener("click", prevImage);

  // Click thumbnail
  thumbs.forEach((thumb, i) =>
    thumb.addEventListener("click", () => setImage(i))
  );

  // Vuốt trên mobile
  let startX = 0;
  let endX = 0;

  mainImage.addEventListener(
    "touchstart",
    e => (startX = e.changedTouches[0].screenX),
    { passive: true }
  );

  mainImage.addEventListener(
    "touchend",
    e => {
      endX = e.changedTouches[0].screenX;
      const diff = endX - startX;

      if (diff > 50) prevImage();
      else if (diff < -50) nextImage();
    },
    { passive: true }
  );

  // Khởi tạo
  setImage(0);
}

// ==========================================================
// RATE & REVIEW FLOW
// ==========================================================
const rateSection = document.getElementById("rateSection");
const rateStarsContainer = document.getElementById("rateStars");
const rateStars = rateStarsContainer ? rateStarsContainer.querySelectorAll("i") : [];
const rateLabel = document.getElementById("rateLabel");
const rateSubmitBtn = document.getElementById("rateSubmit");

const reviewForm = document.getElementById("reviewForm");
const reviewTitleInput = document.getElementById("reviewTitle");
const reviewContentInput = document.getElementById("reviewContent");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const cancelReviewBtn = document.getElementById("cancelReviewForm");

const rateThanks = document.getElementById("rateThanks");
const openReviewFormLink = document.getElementById("openReviewForm");

let selectedRating = 0;

const ratingTextMap = {
  1: "Very bad",
  2: "Poor",
  3: "Average",
  4: "Great",
  5: "Excellent",
};

// ----- chọn sao -----
if (rateStars.length) {
  rateStars.forEach(star => {
    star.addEventListener("click", () => {
      const value = Number(star.dataset.star);
      selectedRating = value;

      rateStars.forEach(s => {
        const v = Number(s.dataset.star);
        if (v <= value) {
          s.classList.remove("fa-regular");
          s.classList.add("fa-solid");
        } else {
          s.classList.add("fa-regular");
          s.classList.remove("fa-solid");
        }
      });

      if (rateLabel) {
        rateLabel.textContent = ratingTextMap[value] || "";
      }

      if (rateSubmitBtn) {
        rateSubmitBtn.disabled = false;
      }
    });
  });
}

// Helper: mở form review
function openReviewForm() {
  if (reviewForm) {
    reviewForm.classList.add("is-visible");
    reviewForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (rateSection) {
    rateSection.classList.add("is-hidden");
  }
}

// ----- SUBMIT rating -> mở form -----
if (rateSubmitBtn) {
  rateSubmitBtn.disabled = true;
  rateSubmitBtn.addEventListener("click", () => {
    if (!selectedRating) return;
    openReviewForm();
  });
}

// Link "Add a review now"
if (openReviewFormLink) {
  openReviewFormLink.addEventListener("click", (e) => {
    e.preventDefault();
    openReviewForm();
  });
}

// ----- Cancel form -----
if (cancelReviewBtn) {
  cancelReviewBtn.addEventListener("click", () => {
    if (reviewForm) reviewForm.classList.remove("is-visible");
    if (rateSection) rateSection.classList.remove("is-hidden");
    if (reviewTitleInput) reviewTitleInput.value = "";
    if (reviewContentInput) reviewContentInput.value = "";
  });
}

// ----- Gửi review -----
if (submitReviewBtn) {
  submitReviewBtn.addEventListener("click", () => {
    if (!selectedRating) {
      alert("Please select a star rating first.");
      return;
    }

    const title = reviewTitleInput ? reviewTitleInput.value.trim() : "";
    const text = reviewContentInput ? reviewContentInput.value.trim() : "";

    if (!title || !text) {
      alert("Please enter both a title and your review.");
      return;
    }

    const reviewsList = document.querySelector(".reviews-list");
    if (reviewsList) {
      const card = document.createElement("div");
      card.className = "review-card";

      const today = new Date();
      const dateStr = today.toLocaleDateString("en-GB");

      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        const emptyClass = i > selectedRating ? " review-card__star--empty" : "";
        starsHtml += `<i class="fa-solid fa-star review-card__star${emptyClass}"></i>`;
      }

      card.innerHTML = `
        <div class="review-card__header">
          <div class="review-card__avatar"><i class="fa-solid fa-user"></i></div>
          <span class="review-card__username">You</span>
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
      initReviewCard(card);
    }

    // Reset form
    if (reviewTitleInput) reviewTitleInput.value = "";
    if (reviewContentInput) reviewContentInput.value = "";

    if (reviewForm) reviewForm.classList.remove("is-visible");

    if (rateThanks) {
      rateThanks.classList.add("is-visible");
      rateThanks.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}