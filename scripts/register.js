
    document.getElementsByClassName("register-form")[0].addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // get user input values
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const termsInput = document.getElementById("terms");
    const promotionsInput = document.getElementById("promotions");

    // Check if inputs are valid
    if (nameInput.value.trim().length < 5) {
        alert("Username phải có ít nhất 5 ký tự!");
        nameInput.classList.add("error");
        nameInput.focus();
        return;
    }

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
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobInput.value) {
        alert("Ngày sinh không hợp lệ. Vui lòng chọn ngày sinh theo định dạng DD/MM/YYYY.");
        dobInput.classList.add("error");
        dobInput.focus();
        return;
    }
    if (!dobPattern.test(dobInput.value.trim())) {
        alert("Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY.");
        dobInput.classList.add("error");
        dobInput.focus();
        return;
    }

    if (!termsInput.checked) {
        alert("Bạn phải đồng ý với điều khoản trước khi đăng ký!");
        termsInput.focus();
        return;
    }

     if (!promotionsInput.checked) {
        alert("Bạn phải đồng ý với điều khoản trước khi đăng ký!");
        termsInput.focus();
        return;
    }

    // if all validations pass
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
    });
