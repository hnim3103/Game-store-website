document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      // Chèn header vào đầu body
      document.body.insertAdjacentHTML("afterbegin", data);

      //  Thêm file CSS
      const headerCSS = document.createElement("link");
      headerCSS.rel = "stylesheet";
      headerCSS.href = "/components/header/header.css";
      document.head.appendChild(headerCSS);

      // Gắn sự kiện toggle menu trực tiếp sau khi chèn DOM
      const initMenuToggle = () => {
        const toggle = document.querySelector(".header__menu-toggle");
        const nav = document.querySelector(".header__nav");
        const icon = toggle?.querySelector("i");

        if (!toggle || !nav) {
          console.warn("Không tìm thấy menu toggle hoặc nav — kiểm tra lại class trong header.html");
          return;
        }

        toggle.addEventListener("click", () => {
          nav.classList.toggle("show");
          icon?.classList.toggle("bx-x");
        });

        // Đóng menu khi click ra ngoài
        document.addEventListener("click", (e) => {
          if (
            !e.target.closest(".header__nav") &&
            !e.target.closest(".header__menu-toggle")
          ) {
            nav.classList.remove("show");
            icon?.classList.remove("bx-x");
          }
        });

        console.log("Menu toggle initialized");
      };

      // Gọi sau 100ms để DOM cập nhật xong
      setTimeout(initMenuToggle, 100);

      // Gọi file JS riêng của header (nếu cần search, language...)
      const headerJS = document.createElement("script");
      headerJS.src = "/components/header/header.js";
      document.body.appendChild(headerJS);

      // Highlight menu trang hiện tại
      setTimeout(() => {
        const currentPage = window.location.pathname.split("/").pop();
        document.querySelectorAll(".header__nav-link").forEach((link) => {
          const href = link.getAttribute("href");
          if (href && currentPage && href.endsWith(currentPage)) {
            link.classList.add("active");
          }
        });
      }, 300);
    })
    .catch((err) => console.error(" Không thể load header:", err));
});
