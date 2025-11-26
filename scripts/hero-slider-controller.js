const track = document.querySelector(".slider__track");
const cards = Array.from(document.querySelectorAll(".slider__card")).filter(card => !card.id);
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const dotsContainer = document.getElementById("slider-dots");

let index = cards.findIndex(card => card.classList.contains("active"));
if (index === -1) index = 0;

/* ---------------------------------------------------
   CREATE DOTS
--------------------------------------------------- */
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("slider__dot");
  if (i === index) dot.classList.add("active");

  dot.addEventListener("click", () => {
    animateCardChange();
    index = i;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

/* ---------------------------------------------------
   ANIMATION HELPERS
--------------------------------------------------- */

function animateCardChange() {
  const active = cards[index];

  // Slight zoom-out + fade animation
  active.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  active.style.transform = "scale(0.95)";
  active.style.opacity = "0.3";

  setTimeout(() => {
    active.style.transform = "";
    active.style.opacity = "";
  }, 400);
}

function animateTrackMovement() {
  track.style.transition = "transform 0.9s cubic-bezier(.25,.46,.45,1)";

  // Remove transition after animation completes
  setTimeout(() => {
    track.style.transition = "";
  }, 700);
}

function animateButton(btn) {
  btn.classList.add("clicked");
  btn.style.transition = "transform 0.2s";
  btn.style.transform = "scale(0.85)";

  setTimeout(() => {
    btn.style.transform = "";
  }, 150);
}

function animateDot(i) {
  const dot = dotsContainer.children[i];
  dot.style.transition = "transform 0.3s";
  dot.style.transform = "scale(1.4)";
  setTimeout(() => {
    dot.style.transform = "";
  }, 250);
}


/* ---------------------------------------------------
   UPDATE SLIDER POSITION + ACTIVE CARD
--------------------------------------------------- */
function updateSlider() {
  // activate animations
  animateTrackMovement();
  animateDot(index);

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);

    // Add entrance animation to the active card
    if (i === index) {
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      card.style.transition = ".4s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 10);
    }
  });

  dotsContainer.querySelectorAll("span").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });

  const activeCard = cards[index];
  const offset =
    activeCard.offsetLeft -
    (track.clientWidth / 2 - activeCard.clientWidth / 2);

  track.style.transform = `translateX(${-offset}px)`;
}

/* ---------------------------------------------------
   BUTTON CONTROLS + ANIMATION
--------------------------------------------------- */
nextBtn.addEventListener("click", () => {
  animateCardChange();
  animateButton(nextBtn);

  index = (index + 1) % cards.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  animateCardChange();
  animateButton(prevBtn);

  index = (index - 1 + cards.length) % cards.length;
  updateSlider();
});

/* ---------------------------------------------------
   AUTO-RUN (AUTO SLIDE)
--------------------------------------------------- */
track.addEventListener("mouseenter", () => clearInterval(autoSlide));
track.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    animateCardChange();
    index = (index + 1) % cards.length;
    updateSlider();
  }, 4000);
});

window.onload = updateSlider;