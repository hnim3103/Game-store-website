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

      // Optionally load the footer JS (only if it exists)
      const footerJS = document.createElement("script");
      footerJS.src = "/components/footer/footer.js";
      footerJS.onload = () => console.log("Footer script loaded");
      footerJS.onerror = () => console.warn("No footer.js found — skipping");
      document.body.appendChild(footerJS);
    })
    .catch((err) => console.error("Can't load footer:", err));
});
