//#region hamburger
const hamMenuBtn = document.querySelector(".header_main-ham-menu-cont");
const smallMenu = document.querySelector(".header_sm-menu");
const headerHamMenuBtn = document.querySelector(".header_main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header_main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header_sm-menu-link");

const toggleMenu = () => {
  smallMenu.classList.toggle("header_sm-menu--active");
  headerHamMenuBtn.classList.toggle("d-none");
  headerHamMenuCloseBtn.classList.toggle("d-none");
};
hamMenuBtn.addEventListener("click", toggleMenu);
headerSmallMenuLinks.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});
//#endregion

//#region Back main page after click on logo
const headerLogoContainer = document.querySelector(".header_logo-container");
headerLogoContainer.addEventListener("click", () => {
  location.href = "../";
});
//#endregion

//#region Header hide
let dernierPoint = 1;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const pointActuelle = window.scrollY;

  if (pointActuelle > dernierPoint) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  dernierPoint = pointActuelle;
});
//#endregion

//#region contact form
grecaptcha.enterprise.ready(function () {
  grecaptcha.enterprise
    .execute("6LejqG4qAAAAABlIzVJGqdeXY1jM40vidOhODuit", { action: "submit" })
    .then(function (token) {
      document.getElementById("captchaResponse").value = token;
    });
});
//#endregion

//#region Rocket
function launchRocket() {
  const rocket = document.querySelector(".rocket");
  rocket.style.animation = "launch 3s ease-in-out forwards";
}
(function (d) {
  "use strict";
  const shakeButton = d.querySelector("#shake");
  const shakeElement = d.querySelector("body");
  shakeButton.addEventListener("click", () => {
    shakeElement.classList.add("animate");
    setTimeout(function () {
      shakeElement.classList.remove("animate");
    }, 1000);
  });
})(document);
//#endregion

