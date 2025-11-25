document.addEventListener("DOMContentLoaded", function () {
  const smallSliders = document.querySelectorAll(".slider.small");

  smallSliders.forEach(slider => {
    const track = slider.querySelector(".slider__track");
    const cards = track.querySelectorAll(".game-card");
    const prevBtn = slider.querySelector(".slider__btn--prev");
    const nextBtn = slider.querySelector(".slider__btn--next");

    if (!track || cards.length === 0) return;

    function getSlideWidth() {
      // Amount to scroll = width of first visible slide
      const firstCard = cards[0];
      return firstCard.getBoundingClientRect().width +
             parseInt(getComputedStyle(track).gap) || 0;
    }

    function getMaxScroll() {
      return track.scrollWidth - track.clientWidth;
    }

    nextBtn.addEventListener("click", () => {
      const slideAmount = getSlideWidth();
      const maxScroll = getMaxScroll();

      const atEnd = Math.abs(track.scrollLeft - maxScroll) < 5;

      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: slideAmount, behavior: "smooth" });
      }
    });

    prevBtn.addEventListener("click", () => {
      const slideAmount = getSlideWidth();
      const maxScroll = getMaxScroll();

      const atStart = track.scrollLeft <= 0;

      if (atStart) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -slideAmount, behavior: "smooth" });
      }
    });

    // Recalculate when resizing screen
    window.addEventListener("resize", () => {
      // Optional: snap to the closest slide after resizing
      const slideAmount = getSlideWidth();
      const index = Math.round(track.scrollLeft / slideAmount);

      track.scrollTo({
        left: index * slideAmount,
        behavior: "instant"
      });
    });
  });
});
