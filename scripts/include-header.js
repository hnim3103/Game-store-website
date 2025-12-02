document.addEventListener("DOMContentLoaded", async function () {
  try {
    //preload css
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

    const html = await fetch("/components/header/header.html").then(res => res.text());

    // Inject HTML immediately
    document.body.insertAdjacentHTML("afterbegin", html);


    //load js
    await Promise.all([
      loadScript("/scripts/auth.js"),
      loadScript("/components/header/header.js"),
      loadScript("/scripts/login.js"),
      loadScript("/scripts/register.js"),
      loadScript("/scripts/email-account.js"),
      loadScript("/scripts/phone-account.js"),
      loadScript("/scripts/fetchAPI_game-card.js"),
    ]);

    //update auth UI
    if (window.Auth) {
      window.Auth.updateUI();
      console.log("✓ Header loaded + buttons active");
    }

  } catch (err) {
    console.error("Header load failed:", err);
  }
});

//Script loader
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}
