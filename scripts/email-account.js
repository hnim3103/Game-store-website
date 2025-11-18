const emailForm = document.querySelector(".email__form");

if (emailForm) {
  // Listen for form submission
  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // get form elements - query within form scope
    const email = emailForm.querySelector("#email");
    const emailError = emailForm.querySelector("#email-error");

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
      window.dispatchEvent(
        new CustomEvent("password-reset-success", { bubbles: true })
      );
    }
  });

  // listen for input to clear errors
  emailForm.addEventListener("input", (e) => {
    if (e.target.classList.contains("error")) {
      e.target.classList.remove("error");
      const errorMessage = emailForm.querySelector("#email-error");
      if (errorMessage) {
        errorMessage.classList.remove("show");
        errorMessage.textContent = "";
      }
    }
  });
}
