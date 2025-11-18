// Reset Password Form Handling
const resetForm = document.querySelector(".phone__form");

if (resetForm) {
  const phoneInput = resetForm.querySelector("#phone");
  const phoneError = resetForm.querySelector("#phone-error");

  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Phone Pattern for Vietnam numbers
    const phonePattern = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;

    // Clear previous errors
    phoneInput.classList.remove("error");
    phoneError.classList.remove("show");
    phoneError.textContent = "";

    if (!phonePattern.test(phoneInput.value.trim())) {
      phoneInput.classList.add("error");
      phoneError.textContent = "Invalid phone number";
      phoneError.classList.add("show");
      return;
    }

    // If valid, dispatch event (removed undefined 'valid' variable)
    window.dispatchEvent(
      new CustomEvent("password-reset-success", { bubbles: true })
    );
  });

  // Clear error when user starts typing
  resetForm.addEventListener("input", (e) => {
    if (e.target === phoneInput && phoneInput.classList.contains("error")) {
      phoneInput.classList.remove("error");
      phoneError.classList.remove("show");
      phoneError.textContent = "";
    }
  });

  // Country Dropdown Handling
  const countrySelect = resetForm.querySelector(".phone__country-select");
  const countryList = resetForm.querySelector(".phone__country-list");
  const codeSpan = countrySelect?.querySelector(".phone__country-code");
  const flagImg = countrySelect?.querySelector(".phone__country-flag");

  if (countrySelect && countryList) {
    // Toggle dropdown visibility
    countrySelect.addEventListener("click", (e) => {
      countryList.classList.toggle("show");
      e.stopPropagation();
    });

    // Select a country
    countryList.querySelectorAll(".phone__country-item").forEach((li) => {
      li.addEventListener("click", () => {
        if (codeSpan) codeSpan.textContent = li.dataset.code;
        if (flagImg)
          flagImg.src = `https://flagcdn.com/w40/${li.dataset.flag}.png`;
        countryList.classList.remove("show");
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      countryList.classList.remove("show");
    });
  }
}
