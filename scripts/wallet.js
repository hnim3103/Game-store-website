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
