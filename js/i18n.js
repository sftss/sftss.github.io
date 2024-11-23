i18next.init(
  {
    lng: "en", // default
    // lng: detectUserLanguage(), // auto detect pour après
    debug: true, // DEBUG
    resources: {
      en: {
        translation: {
          header: {
            home: "Home",
            about: "Me",
            projects: "Projects",
            contact: "Contact",
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
            details: {
              para1:
                "As a <strong>passionate developer</strong>, I specialize in creating modern and functate developernal software. Check out my achievements in the <strong>Projects</strong> section.",
              para2:
                "I like to share my acquired knowledge in <strong>development</strong> in order to help the developer community. Feel free to follow me on <a href='https://linkedin.com/in/SeferTasdemir' target='_blank'>Linkedin</a> and <a href='https://www.instagram.com/sf_tsd/' target='_blank'>Instagram</a> for more content.",
              para3:
                "I am open to professional opportunities. If you have an offer that matches my skills, <strong>contact me</strong>.",
            },
            contact_button: "Contact me",
          },
          projects: {
            home: {
              heading: "Projects",
              subheading:
                "Discover a selection of personal and academic projects that I have carried out.",
              galaxyRushContent:
                "Galaxy Rush is a WPF game that I created with my team, in C# on Visual Studio. This project was carried out during my first year of BUT Informatique.",
              phaserContent:
                "Here are several games running on the web, developed in JavaScript using the framework Phaser.",
              kubeContent:
                "Kube is a game made via Unity in C#. It is a minimalist style platform game with several worlds and levels.",
              botanicContent:
                "Botanic est un logiciel créé en C# lié à une base de données relationnelle. L'application a été créée pour la création de commandes et de produits pour une entreprise de décoration.",
              scodocContent:
                "ScoDoc is a free software created to track the education of university students. This project focuses on the creation and visualization of data created from scratch.",
              butSeeMore: "See more",
            },
            common: {
              butProjectLink: "See project",
              butBack: "Go Back",
              skills: "Skills",
              seeGitHub: "See on GitHub",
              projectsPresentaion: "Project presentation",
              feelFree:
                "Feel free to check out the project by visiting the GitHub link.",
            },
            botanic: {
              pPrimary:
                "The Botanic project case study is presented on this page, including an overview of the project as well as the tools used.",
              pDetail1:
                "Botanic is a software solution developed to streamline the purchase order management process for a garden center. Built with a focus on user-friendly navigation, this application select transportation modes, and view detailed order information and delivery dates.",
              pDetail2:
                "Designed to simplify the purchasing workflow, Botanic enhances operational efficiency by offering an intuitive user interface and reliable data management features.",
              pDetail3:
                "Among its key features, Botanic provides streamlined order creation with customizable filtering options, making it easy for users to locate and manage products efficiently.",
            },
            galaxyRush: {
              pPrimary:
                "The Galaxy Rush project case study is presented on this page, including an overview of the project as well as the tools used.",
              pDetail1:
                "Galaxy Rush is a WPF game coded in C# with Visual Studio, designed as an endless runner where players navigate a spaceshipto dodge evolving obstacles. Inspired by Flappy Bird, players press the spacebar to change direction while collecting power-ups that grant temporary invincibility.",
              pDetail2:
                "As gameplay progresses, the obstacles—ranging from asteroids to UFOs—become more frequent and challenging, pushing players to survive as long as possible.",
              pDetail3:
                "For those curious about the game's ultimate challenge, an invincibility key allows a sneak peek at what lies further into the game.",
            },
          },
          contact: {
            heading: "Contact",
            subheading:
              "Do you have a question or a project? Do not hesitate to contact me, I will give you an answer as soon as possible.",
            form: {
              name: "Name",
              email: "Email",
              subject: "Subject",
              message: "Message",
              send: "Send",
            },
          },
          footer: {
            seeMe: "See me on my socials",
            seeMeCvEn: "See my international CV",
            seeMeCvFr: "See my French CV",
          },
        },
      },
      fr: {
        translation: {
          header: {
            home: "Accueil",
            about: "Moi",
            projects: "Projets",
            contact: "Contact",
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
            details: {
              para1:
                "En tant que <strong>développeur passionné</strong>, je me spécialise dans la création de logiciels modernes et fonctionnels. Consultez mes réalisations dans la section <strong>Projets</strong>.",
              para2:
                "J'aime partager mes connaissances acquises en <strong>développement</strong> afin d'aider la communauté de développeurs. N'hésitez pas à me suivre sur <a href='https://linkedin.com/in/SeferTasdemir' target='_blank'>Linkedin</a> et <a href='https://www.instagram.com/sf_tsd/' target='_blank'>Instagram</a> pour plus de contenu.",
              para3:
                "Je suis ouvert aux opportunités professionnelles. Si vous avez une offre qui correspond à mes compétences, <strong>contactez-moi</strong>.",
            },
            contact_button: "Contactez-moi",
          },
          projects: {
            home: {
              heading: "Projets",
              subheading:
                "Découvrez une sélection de projets personnels et académiques que j'ai réalisés.",
              galaxyRushContent:
                "Galaxy Rush est un jeu WPF que j'ai développé avec mon équipe, en C# sur Visual Studio. Ce projet a été réalisé lors de ma première année en BUT Informatique.",
              phaserContent:
                "Voici plusieurs jeux fonctionnant sur le web, développés avec JavaScript à l'aide du framework Phaser.",
              kubeContent:
                "Kube est un jeu réalisé via Unity en C#. C'est un jeux de plateforme au style minimaliste avec plusieurs mondes et niveau.",
              botanicContent:
                "Botanic est un logiciel réalisé en C# en lien avec une base de données relationnelle. L'application a été créée pour la création de commandes et de produits pour une entreprise de décoration.",
              scodocContent:
                "ScoDoc est un logiciel fictif, développé pour suivre la formation des étudiants universitaires. Ce projet se concentre sur la création et la visualisation de données créées à partir de zéro.",
              butSeeMore: "Voir plus",
            },
            common: {
              butProjectLink: "Voir le projet",
              butBack: "Retour",
              skills: "Compétences",
              seeGitHub: "Voir sur GitHub",
              projectsPresentaion: "Présentation du projet",
              feelFree:
                "N'hésitez pas à consulter le projet en visitant le lien GitHub.",
            },
            botanic: {
              pPrimary:
                "L'étude de cas du projet Botanic est présentée sur cette page, comprenant un aperçu du projet ainsi que les outils utilisés.",
              pDetail1:
                "Botanic est une solution logicielle développée pour rationaliser le processus de gestion des commandes d'achat pour une jardinerie. Construite avec un accent sur la navigation conviviale, cette application permet de sélectionner les modes de transport, et de visualiser les informations détaillées de la commande et les dates de livraison.",
              pDetail2:
                "Conçu pour simplifier le flux de travail d'achat, Botanic améliore l'efficacité opérationnelle en offrant une interface utilisateur intuitive et des fonctionnalités de gestion de données fiables.",
              pDetail3:
                "Parmi ses principales fonctionnalités, Botanic offre une création de commande simplifiée avec des options de filtrage personnalisables, facilitant la localisation et la gestion efficace des produits par les utilisateurs.",
            },
            galaxyRush: {
              pPrimary:
                "L'étude de cas du projet Galaxy Rush est présentée sur cette page, comprenant un aperçu du projet ainsi que les outils utilisés.",
              pDetail1:
                "Galaxy Rush est un jeu WPF codé en C# avec Visual Studio, conçu comme un runner infini où les joueurs naviguent dans un vaisseau spatial pour éviter des obstacles évolutifs. Inspiré de Flappy Bird, les joueurs appuient sur la barre d'espace pour changer de direction tout en collectant des power-ups qui accordent une invincibilité temporaire.",
              pDetail2:
                "Au fur et à mesure que le gameplay progresse, les obstacles - allant des astéroïdes aux OVNI - deviennent plus fréquents et difficiles, poussant les joueurs à survivre le plus longtemps possible.",
              pDetail3:
                "Pour ceux qui sont curieux du défi ultime du jeu, une touche d'invincibilité permet de jeter un coup d'œil à ce qui se trouve plus loin dans le jeu.",
            },
          },
          contact: {
            heading: "Contact",
            subheading:
              "Vous avez une question ou un projet ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.",
            form: {
              name: "Prénom",
              email: "Email",
              subject: "Objet",
              message: "Message",
              send: "Envoyer",
            },
          },
          footer: {
            seeMe: "Voir mes réseaux",
            seeMeCvEn: "Voir mon CV international",
            seeMeCvFr: "Voir mon CV français",
          },
        },
      },
      interpolation: {
        escapeValue: false,
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
function detectUserLanguage() {
  const userLang = navigator.language || navigator.languages[0];
  return userLang.startsWith("fr") ? "fr" : "en";
}
function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n");
    // pour afficher HTML spécial
    const translation = i18next.t(keys);
    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation; //brut sinon
    }
  });
}
