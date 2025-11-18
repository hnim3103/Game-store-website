/*    PURCHASES sẽ hoạt động theo luồng sau
   - Chỉ trigger loading khi chuyển giữa purchases và wallet
   - Nếu user đã login thì vào your-purchases tức là page có dữ liệu
   - Nếu chưa login thì vào purchases empty để gợi ý login
*/

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true"; // Kiểm tra trạng thái đăng nhập
  const current = window.location.pathname; // Lấy đường dẫn trang hiện tại

  // Xử lý login redirect
  if (
    isLoggedIn &&
    current.includes("purchases.html") &&
    !current.includes("your-purchases")
  ) {
    sessionStorage.setItem("nextPage", "your-purchases.html"); // Trang dành cho user đã đăng nhập
    sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation

    window.location.href = "loading.html"; // Chuyển đến trang loading
    return;
  }

  if (!isLoggedIn && current.includes("your-purchases.html")) {
    sessionStorage.setItem("nextPage", "purchases.html"); // Trang dành cho user chưa đăng nhập
    sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation

    window.location.href = "loading.html"; // Chuyển đến trang loading
    return;
  }

  // CHỈ ÁP DỤNG LOADING khi bấm sang wallet
  const walletLink = document.querySelector('a[href="wallet.html"]'); // Lấy liên kết đến wallet

  if (walletLink) {
    walletLink.addEventListener("click", (e) => {
      e.preventDefault(); // Chặn hành vi mặc định của liên kết nếu có
      sessionStorage.setItem("nextPage", "wallet.html"); // Trang wallet
      sessionStorage.setItem("fromNavigation", "true"); // Đánh dấu chuyển trang từ navigation
      window.location.href = "loading.html"; // Chuyển đến trang loading
    });
  }
  // Sign-Out
  const signOutButton = document.querySelector(".profile-bar__signout");
  if (signOutButton) {
    signOutButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa đúng cái Key đã lưu
      localStorage.removeItem("loggedInUserEmail"); // <-- SỬA DÒNG NÀY

      alert("You have logged out.");
      window.location.href = "/index.html";
    });
  }
});
