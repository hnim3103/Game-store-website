// Listen for form submission
document
  .querySelector(".email__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // get form elements
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    // reset previous errors
    email.classList.remove("error");
    emailError.classList.remove("show");
    emailError.textContent = "";

    // check email validity
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      emailError.textContent = "Invalid Email";
      emailError.classList.add("show");
      valid = false;
    }

    if (valid) {
      window.location.href = "login.html";
    }
  });

// listen for input to clear errors
document.querySelector(".email__form").addEventListener("input", (e) => {
  if (e.target.classList.contains("error")) {
    e.target.classList.remove("error");
    const errorMessage = document.getElementById("email-error");
    errorMessage.classList.remove("show");
    errorMessage.textContent = "";
  }
});
