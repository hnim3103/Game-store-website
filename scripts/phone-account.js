// Reset Password Form Handling

const resetForm = document.querySelector(".reset-form");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");

resetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // PhonePatter
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

  // If valid, redirect to login page
  window.location.href = "login.html";
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

const countrySelect = document.querySelector(".country-select");
const countryList = document.querySelector(".country-list");
const codeSpan = countrySelect.querySelector(".code");
const flagImg = countrySelect.querySelector("img");

// Toggle dropdown visibility
countrySelect.addEventListener("click", (e) => {
  countryList.classList.toggle("show");
  e.stopPropagation(); 
});

// Select a country
countryList.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    codeSpan.textContent = li.dataset.code;
    flagImg.src = `https://flagcdn.com/w40/${li.dataset.flag}.png`;
    countryList.classList.remove("show");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  countryList.classList.remove("show");
});
