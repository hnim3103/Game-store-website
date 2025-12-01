document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Preload CSS first (loads in parallel)
    const cssFiles = [
      "/components/header/header.css",
      "/styles/global.css",
      "/styles/game-card.css",
    ];

    cssFiles.forEach(href => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });

    // Load HTML + JS in parallel
    const [html] = await Promise.all([
      fetch("/components/header/header.html").then(res => res.text()),
      loadScript("/scripts/auth.js"),
      loadScript("/components/header/header.js"),
      loadScript("/scripts/login.js"),
      loadScript("/scripts/register.js"),
      loadScript("/scripts/email-account.js"),
      loadScript("/scripts/phone-account.js"),
      loadScript("/scripts/fetchAPI_game-card.js"),
    ]);

    // Insert header only AFTER everything is loaded
    document.body.insertAdjacentHTML("afterbegin", html);

    if (window.Auth) {
      window.Auth.updateUI();
      console.log("✓ Header fully loaded");
    }

  } catch (err) {
    console.error("Header load failed:", err);
  }
});

// Script loader
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed: " + src));
    document.head.appendChild(s);
  });
}
