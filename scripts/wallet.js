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
});
