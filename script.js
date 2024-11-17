//#region hamburger
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  if (smallMenu.classList.contains("header__sm-menu--active")) {
    smallMenu.classList.remove("header__sm-menu--active");
  } else {
    smallMenu.classList.add("header__sm-menu--active");
  }
  if (headerHamMenuBtn.classList.contains("d-none")) {
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  } else {
    headerHamMenuBtn.classList.add("d-none");
    headerHamMenuCloseBtn.classList.remove("d-none");
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
}
//#endregion

//#region Back main page after click on logo
const headerLogoContainer = document.querySelector(".header__logo-container");

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
//#endregion
