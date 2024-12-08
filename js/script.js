//#region Back main page after click on logo
const headerLogoContainer = document.querySelector(".header-logo-container");
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
// grecaptcha.enterprise.ready(function () {
//   grecaptcha.enterprise
//     .execute("6LejqG4qAAAAABlIzVJGqdeXY1jM40vidOhODuit", { action: "submit" })
//     .then(function (token) {
//       document.getElementById("captchaResponse").value = token;
//     });
// });
const form = document.getElementById("contactForm");
const confirmationMessage = document.getElementById("confirmationMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  setTimeout(() => {
    confirmationMessage.style.display = "block";
    form.reset();
  }, 300);
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
