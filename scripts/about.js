document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".hero, .section, .showcase, .review, .partners");

  const reveal = () => {
    const trigger = window.innerHeight * 0.9;
    revealEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  };

  window.addEventListener("scroll", reveal);
  reveal(); 

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
      void quote.offsetWidth;
      index = (index + 1) % quotes.length;
      quote.textContent = quotes[index];
      quote.classList.add("fade");
    }, 2500);
  }
});
