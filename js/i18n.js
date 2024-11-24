i18next.init(
  {
    // lng: "en", // default
    lng: detectUserLanguage(), // auto detect pour après
    debug: false, // DEBUG
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
            skills: "My skills",
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
            kube: {
              pPrimary:
                "The Kube project case study is presented on this page, including an overview of the project as well as the tools used.",
              pDetail1:
                "Kube is a 3D obstacle game developed with Unity. The player must navigate through different levels avoiding various obstacles, with increasing challenges at each stage. This project aims to offer an immersive and captivating gaming experience with a modern and dynamic graphic interface.",
              pDetail2:
                "Since its launch, Kube has been well-received for its innovative game mechanics and attractive visual design Kube aims to entertain and challenge players by providing them with a fluid and engaging gaming experience. This project is part of my portfolio of games developed with Unity.",
              pDetail3:
                "Among its features, Kube offers advanced 3D graphics and immersive sound effects for an enriching gaming experience.",
            },
            phaser: {
              pPrimary:
                "The Phaser project case study is presented on this page, including an overview of the project as well as the tools used.",
              pDetail1:
                "The first game is a platformer where players aim to collect as many coins as possible. Every time the score increases by 100 points, a new bouncing obstacle appears, making it increasingly challenging to gather coins.",
              pDetail2:
                "The second game is another platformer designed as a course. Players must collect all coins, locate a hidden door, avoid floor spikes, and keep an eye on their health bar to prevent it from reaching zero.",
              pDetail3:
                "The third game is an endless runner inspired by Jetpack Joyride. In this game, players press the space bar to ascend and release it to descend, navigating through an ever-evolving environment filled with obstacles.",
              pDetail4:
                "The fourth and final game is a multiplayer star-collecting competition that operates on a Node.js server. Players compete to collect the most stars, with the winner being the one who accumulates the highest number. Each of these games introduces unique mechanics for a varied and engaging experience.",
            },
            scodoc: {
              pPrimary:
                "The ScoDoc project case study is presented on this page, including an overview of the project as well as the tools used.",
              pDetail1:
                "Scodoc is a WPF based platform developed for teachers to efficiently manage student records and school administration tasks. As part of a collaborative project, our team drafted a comprehensive requirements document to ensure alignment with specific functionality and usability goals. We designed both a Conceptual Data Model (CDM) and a Logical Data Model (LDM) in UML, implemented a PostgreSQL database with a structured SQL script, and developed custom queries for streamlined data management.",
              pDetail2:
                "To enhance data accessibility, we imported a database view into Excel, enabling calculations and graphical analysis, and created two Power BI dashboards that visually represent key information from the same data view. This end-to-end project demonstrates robust data visualization to simplify administrative workflows in educational settings.",
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
            skills: "Mes compétences",
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
            kube: {
              pPrimary:
                "L'étude de cas du projet Kube est présentée sur cette page, comprenant un aperçu du projet ainsi que les outils utilisés.",
              pDetail1:
                "Kube est un jeu d'obstacles en 3D développé avec Unity. Le joueur doit naviguer à travers différents niveaux en évitant divers obstacles, avec des défis croissants à chaque étape. Ce projet vise à offrir une expérience de jeu immersive et captivante avec une interface graphique moderne et dynamique.",
              pDetail2:
                "Depuis son lancement, Kube a été bien accueilli pour ses mécanismes de jeu innovants et son design visuel attrayant. Kube vise à divertir et à défier les joueurs en leur offrant une expérience de jeu fluide et engageante. Ce projet fait partie de mon portefeuille de jeux développés avec Unity.",
              pDetail3:
                "Parmi ses fonctionnalités, Kube offre des graphismes 3D avancés et des effets sonores immersifs pour une expérience de jeu enrichissante.",
            },
            phaser: {
              pPrimary:
                "L'étude de cas du projet Phaser est présentée sur cette page, comprenant un aperçu du projet ainsi que les outils utilisés.",
              pDetail1:
                "Le premier jeu est un jeu de plateforme où les joueurs visent à collecter autant de pièces que possible. Chaque fois que le score augmente de 100 points, un nouvel obstacle rebondissant apparaît, rendant de plus en plus difficile la collecte des pièces.",
              pDetail2:
                "Le deuxième jeu est un autre jeu de plateforme conçu comme un parcours. Les joueurs doivent collecter toutes les pièces, localiser une porte cachée, éviter les pointes de sol et surveiller leur barre de santé pour éviter qu'elle n'atteigne zéro.",
              pDetail3:
                "Le troisième jeu est un runner infini inspiré de Jetpack Joyride. Dans ce jeu, les joueurs appuient sur la barre d'espace pour monter et la relâchent pour descendre, naviguant à travers un environnement en constante évolution rempli d'obstacles.",
              pDetail4:
                "Le quatrième et dernier jeu est une compétition multijoueur de collecte d'étoiles qui fonctionne sur un serveur Node.js. Les joueurs s'affrontent pour collecter le plus d'étoiles, le vainqueur étant celui qui accumule le plus grand nombre. Chacun de ces jeux introduit des mécanismes uniques pour une expérience variée et engageante.",
            },
            scodoc: {
              pPrimary:
                "L'étude de cas du projet ScoDoc est présentée sur cette page, comprenant un aperçu du projet ainsi que les outils utilisés.",
              pDetail1:
                "Scodoc est une plateforme basée sur WPF développée pour permettre aux enseignants de gérer efficacement les dossiers des étudiants et les tâches administratives scolaires. Dans le cadre d'un projet collaboratif, notre équipe a rédigé un document de spécifications complet pour garantir l'alignement avec des objectifs de fonctionnalité et d'utilisabilité spécifiques. Nous avons conçu un Modèle de Données Conceptuel (MDC) et un Modèle de Données Logique (MDL) en UML, implémenté une base de données PostgreSQL avec un script SQL structuré, et développé des requêtes personnalisées pour une gestion de données simplifiée.",
              pDetail2:
                "Pour améliorer l'accessibilité des données, nous avons importé une vue de base de données dans Excel, permettant des calculs et une analyse graphique, et créé deux tableaux de bord Power BI qui représentent visuellement des informations clés à partir de la même vue de données. Ce projet de bout en bout démontre une visualisation de données robuste pour simplifier les flux de travail administratifs dans les environnements éducatifs.",
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

function detectUserLanguage() {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) return savedLanguage; //lang sauvg.
  const userLang = navigator.language || navigator.languages[0];
  return userLang.startsWith("fr") ? "fr" : "en"; //Langue par défaut détectée
}

function changeLanguage(lang) {
  localStorage.setItem("preferredLanguage", lang); //sauvg dans localStorage
  i18next.changeLanguage(lang, () => updateContent()); //switch langue
}

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n");
    const translation = i18next.t(keys);

    //html spécial
    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
}
