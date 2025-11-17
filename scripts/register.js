const registerForm = document.querySelector(".register__form");

// === THÊM KIỂM TRA NÀY ===
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const dob = document.getElementById("dob");
    const terms = document.getElementById("terms");
    const promotions = document.getElementById("promotions");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const dobError = document.getElementById("date-error");
    const termsError = document.getElementById("terms-error");
    const promotionsError = document.getElementById("promotions-error");

    // Get labels
    const nameLabel = name
      .closest(".register__input-group")
      .querySelector(".register__label");
    const emailLabel = email
      .closest(".register__input-group")
      .querySelector(".register__label");
    const passwordLabel = password
      .closest(".register__input-group")
      .querySelector(".register__label");
    const dobLabel = dob
      .closest(".register__input-group")
      .querySelector(".register__label");

    let valid = true;

    // Clear previous errors
    [name, email, password, dob, terms].forEach((i) =>
      i.classList.remove("error")
    );
    [nameLabel, emailLabel, passwordLabel, dobLabel].forEach((i) =>
      i.classList.remove("error")
    );
    [nameError, emailError, passwordError, dobError, termsError].forEach(
      (i) => {
        i.classList.remove("show");
        i.textContent = "";
      }
    );

    // Name validation
    if (name.value.trim().length < 4) {
      name.classList.add("error");
      nameLabel.classList.add("error");
      nameError.textContent = "Username must be at least 2 characters";
      nameError.classList.add("show");
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      emailLabel.classList.add("error");
      emailError.textContent = "Invalid Email";
      emailError.classList.add("show");
      valid = false;
    }

    // Password validation
    if (password.value.length < 6) {
      password.classList.add("error");
      passwordLabel.classList.add("error");
      passwordError.textContent = "Password must be at least 6 characters";
      passwordError.classList.add("show");
      valid = false;
    }

    // Date of birth validation
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobPattern.test(dob.value.trim())) {
      dob.classList.add("error");
      dobLabel.classList.add("error");
      dobError.textContent = "Invalid date format. Please use DD/MM/YYYY";
      dobError.classList.add("show");
      valid = false;
    }

    // Terms validation
    if (!terms.checked) {
      terms.classList.add("error");
      termsError.textContent = "You must accept the terms and conditions";
      termsError.classList.add("show");
      valid = false;
    }

    // Promotions validation
    if (!promotions.checked) {
      promotions.classList.add("error");
      promotionsError.textContent = "You must accept the terms and conditions";
      promotionsError.classList.add("show");
      valid = false;
    }

    // If all validations pass
    if (valid) {
      window.dispatchEvent(new CustomEvent("register-success"));
    }
  });

  // Remove error on input
  const form = document.querySelector(".register__form");
  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("error")) {
      e.target.classList.remove("error");
      const label = e.target
        .closest(".register__input-group")
        .querySelector(".register__label");
      const errorMessage = e.target
        .closest(".register__input-wrapper")
        .querySelector(".register__error");

      if (label) label.classList.remove("error");
      if (errorMessage) {
        errorMessage.classList.remove("show");
        errorMessage.textContent = "";
      }
    }
  });
}
