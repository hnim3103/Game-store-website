/* === TOÀN BỘ FILE include-header.js (ĐÃ SỬA LỖI THỨ TỰ) === */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Tải HTML (header.html chứa TẤT CẢ các box popup)
  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);

      const cssFiles = ["/components/header/header.css",
                        "/styles/category.css"
      ];

      cssFiles.forEach((cssFile) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile;
        document.head.appendChild(link);
      });

      loadScriptsInOrder([
        "/scripts/auth.js", // 1. Auth manager FIRST
        "/components/header/header.js", // 2. Header logic SECOND
        "/scripts/login.js", // 3. Login form
        "/scripts/register.js", // 4. Register form
        "/scripts/email-account.js", // 5. Email reset
        "/scripts/phone-account.js", // 6. Phone reset
      ]).then(() => {
        // 5. CRITICAL: Update UI after all scripts load
        // This ensures the auth state is reflected even on page reload
        if (window.Auth) {
          window.Auth.updateUI();
          console.log("✓ Auth UI updated on page load");
        }
      });
    })
    .catch((err) => console.error("Lỗi nghiêm trọng khi tải header:", err));
});

function loadScriptsInOrder(scripts) {
  let promise = Promise.resolve();

  scripts.forEach((src) => {
    promise = promise.then(() => loadScript(src));
  });

  return promise;
}

// Load a single script
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log(`✓ Loaded: ${src}`);
      resolve();
    };
    script.onerror = () => {
      console.error(`✗ Failed to load: ${src}`);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.body.appendChild(script);
  });
}
