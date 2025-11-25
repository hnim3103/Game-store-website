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

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();

      // Hide sign in button
      if (signinBtn) signinBtn.style.display = "none";

      // Show user info
      if (userDiv) userDiv.style.display = "flex";
      if (usernameSpan) usernameSpan.textContent = user.username;
    } else {
      // Show sign in button
      if (signinBtn) signinBtn.style.display = "block";

      // Hide user info
      if (userDiv) userDiv.style.display = "none";
    }
  },

  // Initialize auth system
  init() {
    this.updateUI();
    this.setupLogout();
  },

  // Setup logout functionality
  setupLogout() {
    const logoutBtn = document.querySelectorAll(
      ".header__logout, .profile-bar__signout"
    );
    const modal = document.getElementById("logout-modal");
    const btnConfirm = document.getElementById("btn-confirm-logout");
    const btnCancel = document.getElementById("btn-cancel-logout");

    if (!logoutBtn || !modal || !btnConfirm || !btnCancel) {
      console.warn("Auth: Không tìm thấy đủ các phần tử cho Logout Modal");
      return;
    }
    logoutBtn.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const userMenu = document.getElementById("userMenu");
        if (userMenu) userMenu.classList.remove("show");

        // Hiện modal xác nhận
        modal.classList.add("active");
      };
    });

    const closeModal = () => {
      modal.classList.remove("active");
    };

    btnCancel.addEventListener("click", closeModal);

    // Đóng khi bấm ra vùng tối bên ngoài
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    btnConfirm.onclick = () => {
      closeModal();
      this.logout();
      if (typeof window.showNotification === "function") {
        window.showNotification("You have logged out successfully!", "add");
      } else {
        console.log("Logged out");
      }
      setTimeout(() => {
        window.location.href = "/html/homepage.html";
      }, 1500);
    };
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
