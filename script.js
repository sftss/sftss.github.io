// hamburger
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

// Back main page after click on logo
const headerLogoContainer = document.querySelector(".header__logo-container");

headerLogoContainer.addEventListener("click", () => {
  location.href = "../";
});

const translations = [
  "Yo",
  "Hola",
  "Ciao",
  "Hallo",
  "Merhaba",
  "Привет",
  "こんにちは",
  "안녕하세요",
  "欢迎",
  "Olá",
];

let currentIndex = 0;

function changeLanguage() {
  const langElement = document.getElementById("dynamic-lang");
  langElement.classList.remove("fade-in");
  langElement.classList.add("fade-out");

  setTimeout(() => {
    langElement.textContent = translations[currentIndex];
    currentIndex = (currentIndex + 1) % translations.length;
    langElement.classList.remove("fade-out");
    langElement.classList.add("fade-in");
  }, 500);
}

setInterval(changeLanguage, 2000);

// requete php
document
  .querySelector(".contact__form")
  .addEventListener("submit", function (event) {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs.");
      event.preventDefault();
    }
  });
