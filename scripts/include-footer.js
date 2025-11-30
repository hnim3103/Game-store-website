document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/footer/footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load footer.html");
      return response.text();
    })
    .then((data) => {
      // Insert the footer at the end of the body
      document.body.insertAdjacentHTML("beforeend", data);

      // Load the footer CSS
      const footerCSS = document.createElement("link");
      footerCSS.rel = "stylesheet";
      footerCSS.href = "/components/footer/footer.css";
      document.head.appendChild(footerCSS);
    })
    .catch((err) => console.error("Can't load footer:", err));
});

//Check login status
document.body.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link || link.getAttribute("href") === "#") return;

  // list page require login
  const restrictedPaths = [
    "/html/wishlist.html",
    "/html/cart.html",
    "/html/wallet.html",
    "/html/setting.html",
    "/html/purchases.html",
    "/html/your-purchases.html",
    "/html/payment.html",
  ];

  // Lấy đường dẫn của link vừa bấm
  const targetHref = link.getAttribute("href");

  // Kiểm tra xem link này có nằm trong danh sách cấm không
  const isRestricted = restrictedPaths.some((path) =>
    targetHref.includes(path)
  );

  // NẾU LÀ LINK CẤM -> KIỂM TRA LOGIN
  if (isRestricted) {
    const isLoggedIn = window.Auth
      ? window.Auth.isLoggedIn()
      : localStorage.getItem("loggedInUserEmail");

    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();

      // Hiện thông báo đỏ
      window.showNotification("You need login to access this page", "remove");

      // Hiện Popup Login sau 1 giây
      setTimeout(() => {
        if (window.showPopup) window.showPopup("login");
      }, 1000);
    }
  }
});
