document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".header__search-input");
  const searchBox = document.querySelector(".header__search");

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      searchBox.style.borderColor = "#00ff44";
    });
    searchInput.addEventListener("blur", () => {
      searchBox.style.borderColor = "#00e122";
    });
  }

 
  const navLinks = document.querySelectorAll(".header__nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });


  const toggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");
  const icon = toggle?.querySelector("i");

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("show");
    icon.classList.toggle("bx-x");
  });
});
