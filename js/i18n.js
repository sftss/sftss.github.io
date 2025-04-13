i18next.init(
  {
    // lng: "en", // default
    lng: detectUserLanguage(), // auto detect pour après
    debug: false,
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
            title: "Meet me!",
            details: {
              para1:
                "I am Sefer Tasdemir, a 19 years old developer, I am currently completing my <strong>second year of Computer Science Bachelor's Degree in Technology</strong> at the IUT of Annecy (France). I had my <strong>French Baccalaureate, specializing in mathematics with honors</strong>, and if you want to know more about my <strong>educational and professional background</strong>, I invite you to look at <strong>my CV</strong> at the <strong>bottom of the page</strong>.",
              para2:
                "I am a native speaker of <strong>french</strong> and <strong>turkish</strong>, a B2 level in <strong>english</strong> and a bit of <strong>spanish</strong>. Aside from coding, I am passionate about <strong>chess</strong> (1200 Elo) and sport, I play <strong>football</strong>, <strong>basketball</strong>, <strong>athletics</strong> and <strong>bodybuilding</strong>.",
              para3:
                "I am open to professional opportunities. If you have an offer that matches my skills, <strong>contact me below</strong>.",
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
              offContent:
                "It is a project to analyze and enhance nutritional and commercial data from the Open Food Facts database using an OLTP/OLAP architecture, Power BI visualizations, and artificial intelligence models on Knime.",
              kubeContent:
                "Kube is a game made via Unity in C#. It is a minimalist style platform game with several worlds and levels.",
              botanicContent:
                "Botanic est un logiciel créé en C# lié à une base de données relationnelle. L'application a été créée pour la création de commandes et de produits pour une entreprise de décoration.",
              scodocContent:
                "ScoDoc is a free software created to track the education of university students. This project focuses on the creation and visualization of data created from scratch.",
              uberContent:
                "Uber is a university project where the framework Laravel is used. We tried to make it identical to the real site, including Uber Eats.",
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
              pDetail1:
                "Botanic is a software solution developed to streamline the purchase order management process for a garden center. Built with a focus on user-friendly navigation, this application select transportation modes, and view detailed order information and delivery dates.",
              pDetail2:
                "Designed to simplify the purchasing workflow, Botanic enhances operational efficiency by offering an intuitive user interface and reliable data management features.",
              pDetail3:
                "Among its key features, Botanic provides streamlined order creation with customizable filtering options, making it easy for users to locate and manage products efficiently.",
            },
            galaxyRush: {
              pDetail1:
                "Galaxy Rush is a WPF game coded in C# with Visual Studio, designed as an endless runner where players navigate a spaceshipto dodge evolving obstacles. Inspired by Flappy Bird, players press the spacebar to change direction while collecting power-ups that grant temporary invincibility.",
              pDetail2:
                "As gameplay progresses, the obstacles—ranging from asteroids to UFOs—become more frequent and challenging, pushing players to survive as long as possible.",
              pDetail3:
                "For those curious about the game's ultimate challenge, an invincibility key allows a sneak peek at what lies further into the game.",
            },
            kube: {
              pDetail1:
                "Kube is a 3D obstacle game developed with Unity. The player must navigate through different levels avoiding various obstacles, with increasing challenges at each stage. This project aims to offer an immersive and captivating gaming experience with a modern and dynamic graphic interface.",
              pDetail2:
                "Since its launch, Kube has been well-received for its innovative game mechanics and attractive visual design Kube aims to entertain and challenge players by providing them with a fluid and engaging gaming experience. This project is part of my portfolio of games developed with Unity.",
              pDetail3:
                "Among its features, Kube offers advanced 3D graphics and immersive sound effects for an enriching gaming experience.",
            },
            openFoodFact: {
              pDetail1:
                "As part of a school project, I worked on the Open Food Facts database with the aim of structuring, transforming, and enhancing nutritional and sales data related to food products. The main goal was to make this data exploitable in a decision-making context through a PostgreSQL OLAP database, clear visualizations, and AI-driven analysis.",
              pDetail2:
                "The project had several objectives. First, we designed a normalized relational database (OLTP), then built a multidimensional OLAP database to facilitate analysis. Our team implemented a complete customized data migration pipeline between the OLTP and OLAP using Azure Data Factory and Knime. At the same time, we created Power BI dashboards and developed two artificial intelligence models: one to predict the NutriScore and another to calculate a new environmental-nutritional score called the 'Open Food Facts Score' (OOFS).",
              pDetail3:
                "From a technical standpoint, we first modeled and deployed a complete OLTP database on Azure PostgreSQL, including all entities (products, ingredients, brands, sales, additives, etc.), their relationships, and integrity constraints. Then, we built a star-schema OLAP database with dimensions derived from the OLTP and two fact tables—one for composition and another for sales. To ensure key consistency between the two databases hosted on different Azure servers, I wrote custom SQL scripts and used Knime to manage joins, ID matching, and required transformations.",
              pDetail4:
                "Thanks to Knime, our team processed and transformed the data in several steps. We designed workflows to connect nutritional and contextual data to their identifiers in the decision model, performed clustering on products based on their nutritional profile, and trained machine learning models (regression, decision tree, neural network) to automatically predict the NutriScore of incomplete products. Another AI model was developed to predict a new composite score integrating nutrition, degree of processing (Nova score), ecoscore, and data completeness.",
              pDetail5:
                "Finally, we designed Power BI dashboards to track the distribution of NutriScores, explore PNNS food categories, and monitor sales by geographical area, brand, or nutritional score. The project resulted in a complete and operational analytical platform that enables visualization, prediction, and decision-making around the nutritional and financial quality of food products.",
            },
            scodoc: {
              pDetail1:
                "Scodoc is a WPF based platform developed for teachers to efficiently manage student records and school administration tasks. As part of a collaborative project, our team drafted a comprehensive requirements document to ensure alignment with specific functionality and usability goals. We designed both a Conceptual Data Model (CDM) and a Logical Data Model (LDM) in UML, implemented a PostgreSQL database with a structured SQL script, and developed custom queries for streamlined data management.",
              pDetail2:
                "To enhance data accessibility, we imported a database view into Excel, enabling calculations and graphical analysis, and created two Power BI dashboards that visually represent key information from the same data view. This end-to-end project demonstrates robust data visualization to simplify administrative workflows in educational settings.",
            },
            uber: {
              pDetail1:
                "Uber is a project developed as part of a development with Laravel, aiming to replicate the essential features of the original application. The main goal was to design a web solution to connect passengers and drivers, allowing real-time ride booking.",
              pDetail2:
                "The project includes features such as user registration and authentication, profile management for drivers and passengers, and ride booking with precise tracking via Leaflet. The design of the site was designed to offer a well user experience for both customers and drivers.",
              pDetail3:
                "From a technical point, this project implements a robust architecture based on Laravel, with efficient database management using Eloquent migrations and templates. The system also ensures data security through secure authentication and user input validation. Here is a list of the APIs that we were able to integrate: Nominatim and LocationIQ (address suggestion and auto-completion), Leaflet (map), PayPal (payment), Google Analytics and Cookie-script (cookie analysis).",
              pDetail4:
                "We also created a data visualization to track the number of races, the amounts of races according to the years or the type of vehicle reserved. With also a visualization of the amounts on a map in order to see the most dynamic areas. The data was imported via views from the database.",
              pDetail5:
                "This chatbot, built using Dialogflow, leverages advanced natural language processing capabilities to provide efficient and accurate responses to user queries. Designed with user experience in mind, the chatbot offers seamless interaction and contextual understanding, making it an effective tool for communication and support.",
            },
          },
          contact: {
            heading: "Contact",
            form: {
              name: "Name",
              email: "Email",
              subject: "Subject",
              message: "Message",
              send: "Send",
              messConf:
                "Thank you! Your message has been sent successfully.  😊",
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
                "Je suis Sefer Tasdemir, un développeur de 19 ans, je termine actuellement ma <strong>deuxième année de BUT Informatique</strong> à l'IUT d'Annecy (France). J'ai eu mon <strong>baccalauréat général, spécialisé en mathématiques avec mention</strong>, et si vous voulez en savoir plus sur mon <strong>parcours scolaire et professionnel</strong>, je vous invite à <strong>consulter mon CV en bas de la page</strong>.",
              para2:
                "Je parle couramment <strong>français</strong> et <strong>turc</strong>, j'ai un niveau B2 en <strong>anglais</strong> et un niveau scolaire d'<strong>espagnol</strong>. En dehors du codage, je suis passionné par les <strong>échecs</strong> (1200 Elo) et le sport, je pratique le <strong>football</strong>, le <strong>basketball</strong>, l'<strong>athlétisme</strong> et la <strong>musculation</strong>.",
              para3:
                "Je suis ouvert aux opportunités professionnelles. Si vous avez une offre qui correspond à mes compétences, <strong>contactez-moi en dessous</strong>.",
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
              offContent:
                "C'est un projet d’analyse et de valorisation des données nutritionnelles et commerciales de la base Open Food Facts à travers une architecture OLTP/OLAP, des visualisations Power BI et des modèles d’intelligence artificielle sur Knime.",
              kubeContent:
                "Kube est un jeu réalisé via Unity en C#. C'est un jeux de plateforme au style minimaliste avec plusieurs mondes et niveau.",
              botanicContent:
                "Botanic est un logiciel réalisé en C# en lien avec une base de données relationnelle. L'application a été créée pour la création de commandes et de produits pour une entreprise de décoration.",
              scodocContent:
                "ScoDoc est un logiciel fictif, développé pour suivre la formation des étudiants universitaires. Ce projet se concentre sur la création et la visualisation de données créées à partir de zéro.",
              uberContent:
                "Uber est un projet universitaire avec le framework Laravel. Nous avons essayé de le rendre identique au site réel, y compris Uber Eats.",
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
              pDetail1:
                "Botanic est une solution logicielle développée pour rationaliser le processus de gestion des commandes d'achat pour une jardinerie. Construite avec un accent sur la navigation conviviale, cette application permet de sélectionner les modes de transport, et de visualiser les informations détaillées de la commande et les dates de livraison.",
              pDetail2:
                "Conçu pour simplifier le flux de travail d'achat, Botanic améliore l'efficacité opérationnelle en offrant une interface utilisateur intuitive et des fonctionnalités de gestion de données fiables.",
              pDetail3:
                "Parmi ses principales fonctionnalités, Botanic offre une création de commande simplifiée avec des options de filtrage personnalisables, facilitant la localisation et la gestion efficace des produits par les utilisateurs.",
            },
            galaxyRush: {
              pDetail1:
                "Galaxy Rush est un jeu WPF codé en C# avec Visual Studio, conçu comme un runner infini où les joueurs naviguent dans un vaisseau spatial pour éviter des obstacles évolutifs. Inspiré de Flappy Bird, les joueurs appuient sur la barre d'espace pour changer de direction tout en collectant des power-ups qui accordent une invincibilité temporaire.",
              pDetail2:
                "Au fur et à mesure que le gameplay progresse, les obstacles - allant des astéroïdes aux OVNI - deviennent plus fréquents et difficiles, poussant les joueurs à survivre le plus longtemps possible.",
              pDetail3:
                "Pour ceux qui sont curieux du défi ultime du jeu, une touche d'invincibilité permet de jeter un coup d'œil à ce qui se trouve plus loin dans le jeu.",
            },
            kube: {
              pDetail1:
                "Kube est un jeu d'obstacles en 3D développé avec Unity. Le joueur doit naviguer à travers différents niveaux en évitant divers obstacles, avec des défis croissants à chaque étape. Ce projet vise à offrir une expérience de jeu immersive et captivante avec une interface graphique moderne et dynamique.",
              pDetail2:
                "Depuis son lancement, Kube a été bien accueilli pour ses mécanismes de jeu innovants et son design visuel attrayant. Kube vise à divertir et à défier les joueurs en leur offrant une expérience de jeu fluide et engageante. Ce projet fait partie de mon portefeuille de jeux développés avec Unity.",
              pDetail3:
                "Parmi ses fonctionnalités, Kube offre des graphismes 3D avancés et des effets sonores immersifs pour une expérience de jeu enrichissante.",
            },
            openFoodFact: {
              pDetail1:
                "Dans le cadre d’un projet scolaire, j’ai travaillé sur la base Open Food Facts dans le but de structurer, transformer et valoriser les données nutritionnelles et de ventes des produits alimentaires. L’objectif principal était de rendre ces données exploitables dans un contexte décisionnel via une base de données PostgreSQL OLAP, des visualisations claires, et des analyses basées sur l’intelligence artificielle.",
              pDetail2:
                'Le projet avait plusieurs objectifs. Il s’agissait tout d’abord de concevoir une base relationnelle normalisée (OLTP), puis de créer une base multidimensionnelle (OLAP) afin d’en faciliter l’analyse. Notre groupe a mis en place une chaîne complète de migration personnalisée des données entre OLTP et OLAP, Azure Data Factory et Knime. En parallèle, on a produit des visualisations Power BI et développé deux intelligences artificielles, l’une pour prédire le NutriScore et l’autre pour calculer un nouveau score environnemental-nutritionnel appelé "Open Food Facts Score" (OOFS).',
              pDetail3:
                "Sur le plan technique, on a d’abord modélisé et déployé une base OLTP complète sur PostgreSQL Azure, avec toutes les entités (produits, ingrédients, marques, ventes, additifs, etc.), leurs relations et les contraintes d’intégrité. Ensuite, nous avons créé une base OLAP en étoile avec les dimensions qu'on a déduit de la base OLTP et deux tables de faits, l'un pour la composition et le second pour les ventes. Pour assurer la cohérence des clés entre les deux bases hébergées sur des serveurs Azure distincts, j’ai réalisé des scripts SQL personnalisés et utilisé Knime pour réalisé les jointures, les correspondances d’identifiants et les transformations nécessaires.",
              pDetail4:
                "Grâce à Knime, notre équipe a manipulé et transformé les données en plusieurs étapes. on a conçu des workflows pour relier les données nutritionnelles et contextuelles à leurs identifiants dans le modèle décisionnel, effectué de la clusterisation sur les produits selon leur profil nutritionnel, et entraîné des modèles de machine learning (régression, arbre de décision, réseau de neurones) pour prédire automatiquement le NutriScore des produits incomplets. Une autre IA a été développée pour prédire un nouveau score composite intégrant à la fois la nutrition, le degré de transformation (score Nova), l’écoscore, et la complétude des données.",
              pDetail5:
                "Enfin, nous avons conçu des dashboards sous Power BI permettant de suivre la répartition des NutriScores, explorer les catégories alimentaires PNNS, surveiller les ventes par zone géographique, marque ou score nutritionnel. Le projet aboutit à une plateforme analytique complète et exploitable, permettant la visualisation, la prédiction et la décision autour de la qualité nutritionnelle et financière des produits alimentaires.",
            },
            scodoc: {
              pDetail1:
                "Scodoc est une plateforme basée sur WPF développée pour permettre aux enseignants de gérer efficacement les dossiers des étudiants et les tâches administratives scolaires. Dans le cadre d'un projet collaboratif, notre équipe a rédigé un document de spécifications complet pour garantir l'alignement avec des objectifs de fonctionnalité et d'utilisabilité spécifiques. Nous avons conçu un Modèle de Données Conceptuel (MDC) et un Modèle de Données Logique (MDL) en UML, implémenté une base de données PostgreSQL avec un script SQL structuré, et développé des requêtes personnalisées pour une gestion de données simplifiée.",
              pDetail2:
                "Pour améliorer l'accessibilité des données, nous avons importé une vue de base de données dans Excel, permettant des calculs et une analyse graphique, et créé deux tableaux de bord Power BI qui représentent visuellement des informations clés à partir de la même vue de données. Ce projet de bout en bout démontre une visualisation de données robuste pour simplifier les flux de travail administratifs dans les environnements éducatifs.",
            },
            uber: {
              pDetail1:
                "Uber est un projet réalisé dans le cadre d’un développement avec Laravel, visant à reproduire les fonctionnalités essentielles de l'application originale. L’objectif principal était de concevoir une solution web pour connecter les passagers et les chauffeurs, permettant de réserver des trajets en temps réel.",
              pDetail2:
                "Le projet comprend des fonctionnalités telles que l'inscription et l'authentification des utilisateurs, la gestion des profils pour les chauffeurs et les passagers, et la réservation des courses avec un suivi précis via Leaflet. Le design du site a été pensée pour offrir une expérience utilisateur à la fois pour les clients mais aussi les chauffeurs.",
              pDetail3:
                "D'un point de vue technique, ce projet met en œuvre une architecture robuste basée sur Laravel, avec une gestion efficace de la base de données à l'aide de migrations et de modèles Eloquent. Le système garantit également la sécurité des données grâce à une authentification sécurisée et une validation des entrées utilisateur. Voici une liste des API qu'on a pu intégrer : Nominatim et LocationIQ (proposition et auto-complétion des adresses), Leaflet (carte), PayPal (règlement), Google Analytics et Cookie-script (analyse des cookies).",
              pDetail4:
                "On a aussi réalisé une visualisation de données pour suivre le nombre de course, les montants des courses selon les années ou le type de véhicule réservé. Avec également une visualisation des montants sur une carte afin de voir les zones les plus dynamiques. Les données ont été importées via des vues depuis la base de données.",
              pDetail5:
                "Ce chatbot, construit avec Dialogflow, exploite des capacités avancées de traitement du langage naturel pour fournir des réponses efficaces et précises aux requêtes des utilisateurs. Conçu avec l'expérience utilisateur à l'esprit, le chatbot offre une interaction fluide et une compréhension contextuelle, en faisant un outil efficace pour la communication et le support.",
            },
          },
          contact: {
            heading: "Contact",
            form: {
              name: "Prénom",
              email: "Email",
              subject: "Objet",
              message: "Message",
              send: "Envoyer",
              messConf: "Merci ! Votre message a bien été envoyé. 😊",
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
