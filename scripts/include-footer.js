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
    })
    .catch((err) => console.error("Can't load footer:", err));
});
