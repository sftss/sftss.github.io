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
let isHeaderInteracting = false;

if (header) {
  header.addEventListener("pointerdown", () => {
    isHeaderInteracting = true;
    header.classList.remove("hidden");
  });

  header.addEventListener("pointerup", () => {
    isHeaderInteracting = false;
  });

  header.addEventListener("pointercancel", () => {
    isHeaderInteracting = false;
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;

  if (isHeaderInteracting || document.querySelector(".header-liens")?.classList.contains("open")) {
    header.classList.remove("hidden");
    dernierPoint = window.scrollY;
    return;
  }

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
const submitBtn = document.getElementById("submitBtn");

const contactStatusMessages = {
  fr: {
    sending: "Envoi en cours...",
    success: "Merci ! Votre message a bien ete envoye.",
    error: "Une erreur est survenue. Reessayez plus tard.",
  },
  en: {
    sending: "Sending...",
    success: "Thank you! Your message has been sent successfully.",
    error: "An error occurred. Please try again later.",
  },
};

function getContactLang() {
  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem("preferredLanguage"); } catch {}
  if (savedLanguage === "fr" || savedLanguage === "en") return savedLanguage;
  const userLang = (navigator.language || "en").toLowerCase();
  return userLang.startsWith("fr") ? "fr" : "en";
}

function setContactStatus(type) {
  if (!confirmationMessage) return;

  const lang = getContactLang();
  const text = contactStatusMessages[lang][type];
  const bgColor =
    type === "error" ? "#c0392b" : type === "sending" ? "#1f6feb" : "#28a745";

  confirmationMessage.textContent = text;
  confirmationMessage.style.display = "block";
  confirmationMessage.style.color = "#fff";
  confirmationMessage.style.backgroundColor = bgColor;
  confirmationMessage.style.border = "1px solid rgba(0,0,0,0.2)";
  confirmationMessage.style.borderRadius = "8px";
  confirmationMessage.style.padding = "1rem 1.5rem";
}

if (form && submitBtn) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    submitBtn.classList.add("contact-btn--loading");

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok || (payload && payload.success === false)) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setContactStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setContactStatus("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
      submitBtn.classList.remove("contact-btn--loading");
    }
  });
}

//#endregion contact form

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

let savedTheme = null;
try { savedTheme = localStorage.getItem("preferredTheme"); } catch {}
const themeChoosed = savedTheme || (isDarkModeEnabled ? "dark" : "light");
document.documentElement.setAttribute("data-theme", themeChoosed);
if (themeChoosed === "dark")
  themeToggle?.classList.add("theme-toggle--toggled");

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const nvTheme = isDark ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", nvTheme);
  try { localStorage.setItem("preferredTheme", nvTheme); } catch {}
  themeToggle.classList.toggle("theme-toggle--toggled");
});
//#endregion Theme toggle

//#region carousels
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
//#endregion carousels

//#region Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".header-liens");
let prevBodyOverflow = "";

function closeNavMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = prevBodyOverflow;
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevBodyOverflow;
    }
  });

  navMenu.querySelectorAll(".header-link").forEach((link) => {
    link.addEventListener("click", closeNavMenu);
  });

  window.matchMedia("(max-width: 40em)").addEventListener("change", (e) => {
    if (!e.matches) closeNavMenu();
  });
}
//#endregion

//#region Fix Botpress FAB position lock on mobile
(function () {
  function setupFabLock() {
    const fab = document.querySelector(".bpFab");
    if (!fab) return false;

    // Reset any drag-applied inline styles (left/top/transform translate)
    new MutationObserver(function () {
      fab.style.removeProperty("left");
      fab.style.removeProperty("top");
      const tr = fab.style.transform;
      if (tr && tr.includes("translate")) fab.style.removeProperty("transform");
    }).observe(fab, { attributes: true, attributeFilter: ["style"] });

    // Prevent touchmove inside the FAB iframe to block drag at the source
    const doc = document.querySelector('iframe[name="fab"]')?.contentDocument;
    if (doc) {
      doc.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });
    }

    return true;
  }

  if (!setupFabLock()) {
    let attempts = 0;
    const id = setInterval(function () {
      if (setupFabLock() || ++attempts >= 50) clearInterval(id);
    }, 200);
  }
})();
//#endregion Fix Botpress FAB position lock

//#region Lenis smooth scroll
try {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
} catch {}
//#endregion Lenis smooth scroll