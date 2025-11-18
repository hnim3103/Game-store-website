// Authentication state manager
const Auth = {
  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem("loggedInUserEmail") !== null;
  },

  // Get current user data
  getCurrentUser() {
    const email = localStorage.getItem("loggedInUserEmail");
    const username = localStorage.getItem("loggedInUserName");
    return email ? { email, username: username || email.split("@")[0] } : null;
  },

  // Set user data on login
  setUser(email, username = null) {
    localStorage.setItem("loggedInUserEmail", email);
    localStorage.setItem("loggedInUserName", username || email.split("@")[0]);
    this.updateUI();
  },

  // Clear user data on logout
  logout() {
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("loggedInUserName");
    this.updateUI();
  },

  // Update header UI based on auth state
  updateUI() {
    const signinBtn = document.querySelector(".header__signin");
    const userDiv = document.querySelector(".header__user");
    const usernameSpan = document.querySelector(".header__username");
    const logoutBtn = document.querySelector(".header__logout");

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();

      // Hide sign in button
      if (signinBtn) signinBtn.style.display = "none";

      // Show user info
      if (userDiv) userDiv.style.display = "flex";
      if (usernameSpan) usernameSpan.textContent = user.username;
      if (logoutBtn) logoutBtn.style.display = "block";
    } else {
      // Show sign in button
      if (signinBtn) signinBtn.style.display = "block";

      // Hide user info
      if (userDiv) userDiv.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  },

  // Initialize auth system
  init() {
    this.updateUI();
    this.setupLogout();
  },

  // Setup logout functionality
  setupLogout() {
    const logoutBtn = document.querySelector(".header__logout");
    console.log("Logout button found:", logoutBtn);

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
          console.log("User confirmed logout");
          this.logout();

          if (window.location.pathname !== "/index.html") {
            window.location.href = "/index.html";
          } else {
            console.log("Reloading homepage");
            window.location.reload();
          }
        }
      });
    }
  },
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Auth.init());
} else {
  Auth.init();
}

// Export for use in other scripts
window.Auth = Auth;
