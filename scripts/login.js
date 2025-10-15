document.getElementsByClassName("login-form")[0].addEventListener
("submit", function(event) 
    {
        event.preventDefault(); // Prevent the form from submitting immediately


        // Get user input values
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            alert("Email không hợp lệ!");
            emailInput.classList.add("error");
            emailInput.focus();
            return;
        }

        if (passwordInput.value.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            passwordInput.classList.add("error");
            passwordInput.focus();
            return;
        }

        // If all validations pass
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
        
    }
);
