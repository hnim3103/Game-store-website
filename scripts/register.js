document.getElementsByClassName("register-form")[0].addEventListener("submit", function(event) {
event.preventDefault(); // Prevent the form from submitting immediately

    // get user  values
    const form = document.getElementsByClassName("register-form")[0];
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const dob = document.getElementById("dob");
    const terms = document.getElementById("terms");
    const promotions = document.getElementById("promotions");

    
    let valid = true;
    [email, password, dob, terms, promotions].forEach(i => i.classList.remove("error"));

    // Check if s are valid
    // Email conditions
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        alert("Invalid Email");
        email.classList.add("error");
        valid = false;
        return;
    }
    //Password conditions
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    if (!passwordPattern.test(password.value.trim())) {
        alert("Password must be at least 6 characters including uppercase letters and special characters");
        password.classList.add("error");
        valid = false;
        return;
    }
    // Dob conditons
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobPattern.test(dob.value.trim())) {
        alert("Invalid date of birth. Please select date of birth in DD/MM/YYYY format.");
        dob.classList.add("error");
        valid = false;
        return;
    }

    if (!terms.checked) {
        alert("You must agree to the terms before registering!");
        valid = false;
        return;
    }

     if (!promotions.checked) {
        alert("You must agree to the terms before registering!");
        valid = false;
        return;
    }

    // if all validations pass
    if (valid) {
        alert("Login successfully!");
        window.location.href = "index.html";
    }
})
//Remove the error when input
form.addEventListener("input", e => {
    if (e.target.classList.contains("error")) e.target.classList.remove("error");
})
