//#region Back main page after click on logo
const headerLogoContainer = document.querySelector(".header-logo-container");
headerLogoContainer.addEventListener("click", () => {
  location.href = "../";
});
//#endregion

//#region Reveal up animations
function initRevealUpAnimations() {
  const revealSelectors = [
    ".texte-css-main",
    ".texte-css-sub",
    ".about-content-main",
    ".about-content-skills",
    ".projects-colon",
    ".experience-subtitle",
    ".exp-card",
    ".exp-animate",
    ".interest-card",
    ".interest-animate",
    ".contact-form-container",
    ".project-details-content-main > *",
    ".project-related .main-container > *",
    ".project-end-actions .main-container > *",
  ];

  const revealTargets = [
    ...new Set(
      revealSelectors.flatMap((selector) => [
        ...document.querySelectorAll(selector),
      ]),
    ),
  ];

  if (!revealTargets.length) return;

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-up");
    const delay = Math.min((index % 12) * 70, 560);
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
}

initRevealUpAnimations();
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

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    setTimeout(() => {
      if (confirmationMessage) {
        confirmationMessage.style.display = "block";
      }
      form.reset();
    }, 300);
  });
}

//#endregion contact form

//#region Rocket

//#region Rocket
function launchRocket() {
  const rocket = document.querySelector(".rocket");
  if (rocket) {
    rocket.style.animation = "launch 3s ease-in-out forwards";
  }
}
(function (d) {
  "use strict";
  const shakeButton = d.querySelector("#shake");
  const shakeElement = d.querySelector("body");

  if (shakeButton && shakeElement) {
    shakeButton.addEventListener("click", () => {
      shakeElement.classList.add("animate");
      setTimeout(() => {
        shakeElement.classList.remove("animate");
      }, 1000);
    });
  }
})(document);

//#endregion

//#region Theme toggle
const themeToggle = document.getElementById("themeToggle");
const isDarkModeEnabled = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

const themeChoosed =
  localStorage.getItem("preferredTheme") ||
  (isDarkModeEnabled ? "dark" : "light");
document.documentElement.setAttribute("data-theme", themeChoosed);
if (themeChoosed === "dark")
  themeToggle?.classList.add("theme-toggle--toggled");

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const nvTheme = isDark ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", nvTheme);
  localStorage.setItem("preferredTheme", nvTheme);
  themeToggle.classList.toggle("theme-toggle--toggled");
});
//#endregion Theme toggle

//#region IMDb carousels
function initImdbCarousels() {
  const carousels = document.querySelectorAll(".imdb-carousel");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    if (carousel.dataset.ready === "true") return;

    const imageElement = carousel.querySelector(".imdb-carousel-image");
    const prevButton = carousel.querySelector(".imdb-carousel-btn-prev");
    const nextButton = carousel.querySelector(".imdb-carousel-btn-next");
    const dotsContainer = carousel.querySelector(".imdb-carousel-dots");
    const counterElement = carousel.querySelector(".imdb-carousel-counter");
    const images = (carousel.dataset.images || "")
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean);

    if (
      !imageElement ||
      !prevButton ||
      !nextButton ||
      !dotsContainer ||
      !counterElement ||
      !images.length
    ) {
      return;
    }

    const autoplayDelayMs = 7000;
    const swipeThresholdPx = 50;
    let currentIndex = 0;
    let autoplayTimer = null;
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerDeltaX = 0;

    const viewport = document.createElement("div");
    viewport.className = "imdb-carousel-viewport";

    const track = document.createElement("div");
    track.className = "imdb-carousel-track";

    images.forEach((src, index) => {
      const slideImage = document.createElement("img");
      slideImage.src = src;
      slideImage.alt = `${imageElement.alt} ${index + 1}`;
      slideImage.className = "imdb-carousel-slide";
      slideImage.loading = "lazy";
      track.appendChild(slideImage);
    });

    viewport.appendChild(track);
    imageElement.insertAdjacentElement("afterend", viewport);

    dotsContainer.innerHTML = "";
    const dots = images.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "imdb-carousel-dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = index;
        renderSlide();
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    const updateTrackPosition = (offsetPx = 0) => {
      const viewportWidth = viewport.clientWidth;
      const baseOffset = -currentIndex * viewportWidth;
      track.style.transform = `translateX(${baseOffset + offsetPx}px)`;
    };

    const renderSlide = (withTransition = true) => {
      if (withTransition) {
        carousel.classList.remove("is-dragging");
      }
      updateTrackPosition(0);
      counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === currentIndex);
      });
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        renderSlide();
      }, autoplayDelayMs);
    };

    const restartAutoplay = () => {
      startAutoplay();
    };

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      renderSlide();
      restartAutoplay();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      renderSlide();
      restartAutoplay();
    });

    viewport.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      isPointerDown = true;
      pointerStartX = touch.clientX;
      pointerDeltaX = 0;
      carousel.classList.add("is-dragging");
      stopAutoplay();
    });

    viewport.addEventListener("touchmove", (event) => {
      if (!isPointerDown) return;
      const touch = event.touches[0];
      if (!touch) return;
      pointerDeltaX = touch.clientX - pointerStartX;
      updateTrackPosition(pointerDeltaX);
    });

    const handleSwipeEnd = () => {
      if (!isPointerDown) return;
      isPointerDown = false;

      if (Math.abs(pointerDeltaX) > swipeThresholdPx) {
        if (pointerDeltaX < 0) {
          currentIndex = (currentIndex + 1) % images.length;
        } else {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
      }

      pointerDeltaX = 0;
      renderSlide();
      startAutoplay();
    };

    viewport.addEventListener("touchend", handleSwipeEnd);
    viewport.addEventListener("touchcancel", handleSwipeEnd);

    window.addEventListener("resize", () => {
      renderSlide(false);
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    carousel.dataset.ready = "true";
    renderSlide();
    startAutoplay();
  });
}

initImdbCarousels();
//#endregion IMDb carousels
