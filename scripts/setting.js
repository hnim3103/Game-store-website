document.addEventListener("DOMContentLoaded", () => {
  //Select elements
  const openoverlayBtns = document.querySelectorAll(".open-update-overlay");
  const overlay = document.querySelector(".update-overlay");
  const cancelBtn = document.querySelector(".btn--cancel");
  const updateForm = document.getElementById("update-email-form");

  // open and close overlay
  const openoverlay = () => {
    if (overlay) overlay.classList.add("active");
  };
  const closeoverlay = () => {
    if (overlay) overlay.classList.remove("active");
  };

  openoverlayBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openoverlay();
    });
  });
  if (cancelBtn) cancelBtn.addEventListener("click", closeoverlay);
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeoverlay();
    });
  }

  // check before submit
  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      //get elements
      const email = document.getElementById("new-email");
      const newPass = document.getElementById("new-password");
      const address = document.getElementById("new-address");

      const profileSetting = document.querySelector(
        'input[name="profile_setting"]:checked'
      );
      const language = document.getElementById("language-select");
      const emailError = document.getElementById("new-email-error");
      const newPassError = document.getElementById("new-password-error");
      const addressError = document.getElementById("new-address-error");

      const inputs = [email, newPass, address];
      const errorMessages = [emailError, newPassError, addressError];

      inputs.forEach((input) => input.classList.remove("error"));
      errorMessages.forEach((msg) => {
        msg.textContent = "";
        msg.classList.remove("active");
      });

      //Check
      let isValid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check Email
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add("error");
        emailError.textContent = "Invalid Email";
        emailError.classList.add("active");
        isValid = false;
      }
      //Check pasword
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
      if (newPass.value.length < 6) {
        newPass.classList.add("error");
        newPassError.textContent =
          "Password must contain at least 6 characters";
        newPassError.classList.add("active");
        isValid = false;
      }

      // Check Billing Address
      if (address.value.trim() === "") {
        address.classList.add("error");
        addressError.textContent = "Please enter your billing address";
        addressError.classList.add("active");
        isValid = false;
      }

      // Final check
      if (isValid) {
        // update
        const newEmailValue = email.value;
        const newAddressValue = address.value;
        const newProfileValue = profileSetting.value;
        const newLanguageSelect = language;

        // update fe
        document.getElementById("static-email").textContent = newEmailValue;
        const profileText = newProfileValue === "public" ? "Public" : "Private";
        document.getElementById("static-profile").textContent = profileText;
        const langText =
          newLanguageSelect.options[newLanguageSelect.selectedIndex].text;
        document.getElementById("static-language").textContent = langText;

        closeoverlay();
      }
    });
  }

  if (updateForm) {
    updateForm.addEventListener("input", (e) => {
      if (e.target.classList.contains("error")) {
        e.target.classList.remove("error");
        const formGroup = e.target.closest(".form-group");
        if (!formGroup) return;
        const errorMessage = formGroup.querySelector(".form-e rror-message");
        if (errorMessage) {
          errorMessage.classList.remove("active");
          errorMessage.textContent = "";
        }
      }
    });
  }
});
