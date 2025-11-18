const loginForm = document.querySelector(".login__form");

if (loginForm) {
  const submitButton = loginForm.querySelector(".login__submit");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Get labels
    const emailLabel = email
      .closest(".login__input-group")
      .querySelector(".login__label");
    const passwordLabel = password
      .closest(".login__input-group")
      .querySelector(".login__label");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    // Clear previous errors
    [email, password].forEach((i) => i.classList.remove("error"));
    [emailLabel, passwordLabel].forEach((i) => i.classList.remove("error"));
    [emailError, passwordError].forEach((i) => {
      i.classList.remove("show");
      i.textContent = "";
    });

    // Validation logic remains the same
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      emailLabel.classList.add("error");
      emailError.textContent = "Invalid Email";
      emailError.classList.add("show");
      valid = false;
    }

    if (password.value.length < 6) {
      password.classList.add("error");
      passwordLabel.classList.add("error");
      passwordError.textContent = "Password must be at least 6 characters";
      passwordError.classList.add("show");
      valid = false;
    }

    if (valid) {
      if (window.Auth) {
        window.Auth.setUser(email.value.trim());
      } else {
        // Fallback if Auth not loaded
        localStorage.setItem("loggedInUserEmail", email.value.trim());
      }

      // Dispatch success event
      window.dispatchEvent(new CustomEvent("login-success", { bubbles: true }));

      // Reset form
      loginForm.reset();
    }
  });

  if (submitButton) {
    submitButton.disabled = false;
  }
}
const form = document.querySelector(".login__form");

// === REMOVE ERROR ===
if (form) {
  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("error")) {
      e.target.classList.remove("error");
      const label = e.target
        .closest(".login__input-group")
        .querySelector(".login__label");
      const errorMessage = e.target
        .closest(".login__input-wrapper")
        .querySelector(".login__error");

      if (label) label.classList.remove("error");
      if (errorMessage) {
        errorMessage.classList.remove("show");
        errorMessage.textContent = "";
      }
    }
  });
}
