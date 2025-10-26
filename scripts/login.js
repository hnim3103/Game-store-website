document.getElementsByClassName("login-form")[0].addEventListener
("submit", function(event) 
    {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Get user input values
        const form = document.querySelector(".login-form");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        
        // Get labels
        const emailLabel = email.closest('.input-group').querySelector('label');
        const passwordLabel = password.closest('.input-group').querySelector('label');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;
        
        // Clear previous errors
        [email, password].forEach(i => i.classList.remove("error"));
        [emailLabel, passwordLabel].forEach(i => i.classList.remove("error"));
        [emailError, passwordError].forEach(i => {
            i.classList.remove("show");
            i.textContent = "";
        });

        // Custom validation for email
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("error");
            emailLabel.classList.add("error");
            emailError.textContent = "Invalid Email";
            emailError.classList.add("show");
            valid = false;
        }

        // Custom validation for password
        if (password.value.length < 6) {
            password.classList.add("error");
            passwordLabel.classList.add("error");
            passwordError.textContent = "Password must be at least 6 characters";
            passwordError.classList.add("show");
            valid = false;
        }

        if (valid) {
            window.location.href = "homepage.html";
        }
    }
);

// Fix event listener 
const form = document.querySelector(".login-form");
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