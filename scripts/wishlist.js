document.addEventListener("DOMContentLoaded", () => {
  // SLIDER
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

  //  DARKEN BUTTON WHEN CLICKED
  const allCartButtons = document.querySelectorAll(
    ".wishlist-item-box__button"
  );
  //Loop for button
  allCartButtons.forEach(function (button) {
    // listen click event
    button.addEventListener("click", function (event) {
      event.preventDefault();
      //add new class on the old class
      button.classList.add("button--clicked");
    });
  });

  //  HIDE BOX WHEN CLICK BIN
  const allRemoveIcons = document.querySelectorAll(
    ".wishlist-item-box__remove-icon"
  );
  // loop for icon
  allRemoveIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      const parentBox = icon.closest(".wishlist-item-box");
      //remove box
      if (parentBox) {
        parentBox.remove();
      }
    });
  });
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
