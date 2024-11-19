i18next.init(
  {
    lng: "en", //default
    debug: true, // DEBUG
    resources: {
      en: {
        translation: {
          header: {
            home: "Home",
            about: "About me",
            projects: "Projects",
            contact: "Contact",
            cv: "CV",
          },
          home: {
            title: "Developing your future",
            projects_button: "Projects",
          },
          about: {
            heading: "About me",
            subheading:
              "Find out who I am, my current programming skills, and the projects I have completed.",
            title: "Meet me !",
            contact_button: "Contact me",
          },
          projects: {
            heading: "Projects",
            subheading:
              "Discover a selection of personal and academic projects that I have carried out.",
          },
          // suite
        },
      },
      fr: {
        translation: {
          header: {
            home: "Accueil",
            about: "À propos",
            projects: "Projets",
            contact: "Contact",
            cv: "CV",
          },
          home: {
            title: "Développer votre avenir",
            projects_button: "Projets",
          },
          about: {
            heading: "À propos de moi",
            subheading:
              "Découvrez qui je suis, mes compétences actuelles en programmation et les projets que j'ai réalisés.",
            title: "Rencontrez-moi !",
            contact_button: "Contactez-moi",
          },
          projects: {
            heading: "Projets",
            subheading:
              "Découvrez une sélection de projets personnels et académiques que j'ai réalisés.",
          },
        },
      },
    },
  },
  function (err, t) {
    updateContent();
  }
);

function changeLanguage(lang) {
  i18next.changeLanguage(lang, updateContent);
}

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n");
    el.textContent = i18next.t(keys);
  });
}
