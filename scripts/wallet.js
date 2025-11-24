document.addEventListener("DOMContentLoaded", () => {
  // Link tới purchases
  const purchasesLink = document.querySelector('a[href="purchases.html"]');

  if (purchasesLink) {
    purchasesLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("nextPage", "purchases.html");
      sessionStorage.setItem("fromNavigation", "true");
      window.location.href = "loading.html";
    });
  }

  // Link tới your-purchases nếu user đăng nhập
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const yourPurchases = document.querySelector('a[href="your-purchases.html"]');

  if (isLoggedIn && yourPurchases) {
    yourPurchases.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("nextPage", "your-purchases.html");
      sessionStorage.setItem("fromNavigation", "true");
      window.location.href = "loading.html";
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
      window.location.href = "/html/homepage.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // LẤY EMAIL NGƯỜI DÙNG TỪ localStorage 
  const userEmail = localStorage.getItem("loggedInUserEmail");

  if (userEmail) {
    //TÁCH USERNAME từ email
    const username = userEmail.split("@")[0];

    //TRUY CẬP TỚI NƠI HIỂN THỊ TRONG HTML
    const usernameElement = document.querySelector(".profile-bar__username");
    const fullnameElement = document.querySelector(".profile-bar__fullname");

    //GHI DỮ LIỆU LÊN GIAO DIỆN
    if (usernameElement) usernameElement.textContent = username;
    if (fullnameElement) fullnameElement.textContent = userEmail;
  }
});
// GIFT CARD REDEEM
const voucherInput = document.getElementById("voucher-code");
const voucherButton = document.querySelector(".voucher__button");
const balanceAmount = document.querySelector(".balance-amount");

if (voucherButton) {
  voucherButton.addEventListener("click", () => {
    const code = voucherInput.value.trim();

    if (code === "060705") {
      // Thành công
      balanceAmount.textContent = "$1.00";
      voucherInput.value = "";
      alert("Gift Card redeemed successfully!");
    } else {
      // Sai mã
      alert("Invalid code");
    }
  });
}
