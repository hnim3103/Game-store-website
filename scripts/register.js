document.getElementsByClassName("register-form")[0].addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Get user input values
    const form = document.querySelector(".register-form");
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
    const promotionsError = document.getElementById("promotions-error")

    // Get labels
    const nameLabel = name.closest('.input-group').querySelector('label');
    const emailLabel = email.closest('.input-group').querySelector('label');
    const passwordLabel = password.closest('.input-group').querySelector('label');
    const dobLabel = dob.closest('.input-group').querySelector('label');

    let valid = true;
    
    // Clear previous errors
    [name, email, password, dob, terms].forEach(i => i.classList.remove("error"));
    [nameLabel, emailLabel, passwordLabel, dobLabel].forEach(i => i.classList.remove("error"));
    [nameError, emailError, passwordError, dobError, termsError].forEach(i => {
        i.classList.remove("show");
        i.textContent = "";
    });

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
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    if (!passwordPattern.test(password.value.trim())) {
        password.classList.add("error");
        passwordLabel.classList.add("error");
        passwordError.textContent = "Password must contain at least 6 characters, 1 uppercase letter, and 1 special character";
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
        promotionsError.textContent = "You must accept the terms     and conditions";
        promotionsError.classList.add("show");
        valid = false;
    }


    // If all validations pass
    if (valid) {
        window.location.href = "login.html";
    }
})
// Remove the error when input
const form = document.querySelector(".register-form");
form.addEventListener("input", e => {
    if (e.target.classList.contains("error")) {
        e.target.classList.remove("error");
        const label = e.target.closest('.input-group').querySelector('label');
        const errorMessage = e.target.closest('.input-wrapper').querySelector('.error-message');
        
        if (label) label.classList.remove("error");
        if (errorMessage) {
            errorMessage.classList.remove("show");
            errorMessage.textContent = "";
        }
    }
});