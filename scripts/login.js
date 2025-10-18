document.getElementsByClassName("login-form")[0].addEventListener
("submit", function(event) 
    {
        event.preventDefault(); // Prevent the form from submitting immediately


        // Get user input values
        const form = document.querySelector(".login-form");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;
        [email, password].forEach(i => i.classList.remove("error"));

        if (!emailPattern.test(email.value.trim())) {
            alert("Invalid Email");
            email.classList.add("error");
            valid = false;
            return;
        }

        if (password.value.length < 6) {
            alert("Password must be at least 6 characters");
            password.classList.add("error");
            valid = false;
            return;
        }

        if (valid) {
            alert("Login successfully!");
            window.location.href = "index.html";
        }
    }
);

form.addEventListener("input", e => {
    if (e.target.classList.contains("error")) e.target.classList.remove("error");
});
    
