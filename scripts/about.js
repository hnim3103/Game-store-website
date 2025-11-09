document.addEventListener("DOMContentLoaded", () => {
  // ===== Hiệu ứng hiện dần khi cuộn =====
  const revealEls = document.querySelectorAll(".hero, .section");
  const reveal = () => {
    const trigger = window.innerHeight * 0.9;
    revealEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  // ===== Hiệu ứng đổi chữ trong hero quote =====
  const quote = document.getElementById("quote-text");
  if (quote) {
    const quotes = [
      "One of 50 Best Websites – TIME",
      "Trusted by Millions of Gamers",
      "Your Library, Your Rules",
    ];
    let index = 0;

    setInterval(() => {
      quote.classList.remove("fade");
      void quote.offsetWidth; // reset animation
      index = (index + 1) % quotes.length;
      quote.textContent = quotes[index];
      quote.classList.add("fade");
    }, 2000);
  }
});
