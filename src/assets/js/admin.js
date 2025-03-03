document.addEventListener(
  "DOMContentLoaded",
  () => {
    const adminEl = document.getElementById("nc-root");

    const img = adminEl.querySelector(".css-u6jh90-CustomIconWrapper img");
    img.setAttribute("src", "/assets/images/bespokelogo.png");

    const decapLogo = adminEl.querySelector("span.exus10f2");
    decapLogo.setAttribute("style", "display:none");
  },
  { once: true },
);
