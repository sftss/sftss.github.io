i18next.init(
  {
    // lng: "en", // default
    lng: detectUserLanguage(), // auto detect
    debug: false,
    resources: {
      en: {
        translation: {
          header: {
            home: "Home",
            about: "About me",
            interests: "Interests",
            competences: "Competencies",
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
                "I am Sefer Tasdemir, I am currently completing my <strong>third year of Computer Science Bachelor's Degree in Technology</strong> at the IUT of Annecy (France). I had my <strong>French Baccalaureate, specializing in mathematics with honors</strong>, if you want to know more about my <strong>educational and professional background</strong>, I invite you to look at <strong>my CV</strong> at the <strong>bottom of the page</strong>.",
              para2:
                "I am a native speaker of <strong>french</strong> and <strong>turkish</strong>, a B2 level in <strong>english</strong> (TOEIC 900 pts) and a bit of <strong>spanish</strong>. Aside from coding, I am passionate about <strong>chess</strong> (1200 Elo) and sport, I play <strong>football</strong>, <strong>basketball</strong>, <strong>athletics</strong> and <strong>bodybuilding</strong>.",
              para3:
                "I am open to professional opportunities. If you have an offer that matches my skills, <strong>contact me below</strong>.",
            },
            identity: {
              title: "Civil status",
              nameLabel: "Name",
              nameValue: "Sefer Tasdemir",
              birthLabel: "Date of birth",
              birthValue: "July 1, 2005",
              cityLabel: "City",
              cityValue: "Annecy, France",
              nationalityLabel: "Nationality",
              nationalityValue: "French",
              licenseLabel: "Driving license",
              licenseValue: "B1",
              emailLabel: "Email",
              emailValue: "tasdemir.sefer.74@gmail.com",
            },
            skills: "My skills",
            contact_button: "Contact me",
          },
          interests: {
            heading: "Interests",
            subheading:
              "Passions that enrich my personal and professional development",
            items: {
              sport: {
                title: "Sport & Well-being",
                description:
                  "Regular participation in team sports, combined with physical training (weight training, cardio), is a cornerstone of balance for me. By cultivating a taste for effort and group cohesion, I strengthen my perseverance and interpersonal skills, while also gaining essential mental stability.",
                tags: {
                  team: "Team",
                  perseverance: "Perseverance",
                  communication: "Communication",
                },
              },
              tech: {
                title: "Technology Watch",
                description:
                  "Passionate about technological innovations, I maintain constant awareness through social media and specialized newsletters. This curiosity allows me to anticipate changes in the sector and continuously update my skills to stay abreast of the latest trends.",
                tags: {
                  innovation: "Innovation",
                  trends: "Trends",
                  adaptation: "Adaptation",
                },
              },
              gaming: {
                title: "Video Games",
                description:
                  "From the complex management of Dwarf Fortress to the responsiveness of Valorant, my passion for video games has always been an intellectual driving force. It has honed my ability to analyze situations, develop strategies, and solve problems—skills that I now apply to my coding.",
                tags: {
                  strategy: "Strategy",
                  analysis: "Analysis",
                  creativity: "Creativity",
                },
              },
            },
          },
          /* 20251230  */
          competences: {
            heading: "Competencies & evidence",
            subheading:
              "Linking savoir, savoir-faire, and savoir-être with real traces from my projects.",
            definition: {
              title: "Competence = knowledge + practice + behavior",
              body: "A competence combines resources (knowledge), critical learnings (how to apply them), and behaviors that make collaboration work.",
              savoir: "Knowledge",
              savoirFaire: "Skills",
              savoirEtre: "Attitude",
            },
            traces: {
              title: "Traces & proof",
              trace: "Trace",
              proof: "Proof",
              traceBody:
                "Code excerpts from mini-projects (e.g., Python interfaces, database queries) built during tutorials.",
              proofBody:
                "Worked in pairs to build a Python UI to search movies in a database; captures of the UI and commented source code document the solution and the algorithms used.",
            },
            portfolio: {
              title: "E-portfolio approach",
              item1:
                "Step back on experiences that helped me grow specific competencies.",
              item2:
                "Map each experience to my training reference framework to position myself.",
              item3:
                "Document and share evidence (trace + justification) of the competencies I claim.",
              item4: "Connect these competencies with my professional goals.",
            },
          },
          experience: {
            heading: "Work experience and education",
            subheading: "Key missions, internships, and projects",
            items: {
              dataAnalyst: {
                type: "Work-Study Program",
                dates: "Sep 2025 - Sep 2026",
                title: "Data Analyst",
                place: "Mont-Blanc Highways and Tunnel",
                b1: "Developed R automation scripts, improving efficiency and ensuring reliable information transfers between Excel workbooks.",
                b2: "Created an automated Excel dashboard via R script for precise network speed monitoring.",
                b3: "Built Power BI dashboards with new graphic charter (UX/UI) and Power Automate.",
                b4: "Optimized database management processes with documentation.",
                b5: "Migrated an Excel database to SQL Server.",
              },
              maintenance: {
                type: "Internship",
                dates: "Apr 2025 - Jun 2025",
                title: "IT Maintenance Technician",
                place: "Mont-Blanc Highways and Tunnel",
                b1: "Developed SQL automation scripts reducing query processing time.",
                b2: "Created Power BI dashboards with new graphic charter (UX/UI) and Power Automate.",
                b3: "Optimized database management processes with documentation.",
                b4: "Configured and migrated GLPI from Windows server to Linux server.",
              },
              operator: {
                type: "Summer Jobs",
                dates: "2022, 2023, 2024, 2025",
                title: "Production Operator and Sorting Agent",
                place: "Sodep KUHAIL and MPM",
                b1: "Verification, sorting and inventory of parts.",
                b2: "Preparation, packaging and production maintenance.",
              },
            },
            education: {
              heading: "Education",
              items: {
                but: {
                  type: "Degree",
                  dates: "2023 - Present",
                  title:
                    "Bachelor of Technology in Computer Science - AGED track",
                  place:
                    "3rd year - Administration, Management and Data Exploitation",
                },
                bac: {
                  type: "Degree",
                  dates: "2020 - 2023",
                  title: "General Baccalaureate",
                  place:
                    "Expert mathematics option, S.E.S / Mathematics specialization",
                },
              },
            },
          },
          projects: {
            home: {
              heading: "Projects",
              subheading:
                "Discover a selection of personal and academic projects that I have carried out.",
              /* 20251230  */
              socialNetworksContent:
                "Graph database modeling of a social network with Cypher queries, shortest-path analytics, and recommendations.",
              tpDataContent:
                "Machine learning lab using MLxtend: data preparation, model stacking, evaluation, and association rules mining.",
              offContent:
                "It is a project to analyze and enhance nutritional and commercial data from the Open Food Facts database using an OLTP/OLAP architecture, Power BI visualizations, and artificial intelligence models on Knime.",
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
                "ScoDoc is a WPF based platform developed for teachers to efficiently manage student records and school administration tasks. As part of a collaborative project, our team drafted a comprehensive requirements document to ensure alignment with specific functionality and usability goals. We designed both a Conceptual Data Model (CDM) and a Logical Data Model (LDM) in UML, implemented a PostgreSQL database with a structured SQL script, and developed custom queries for streamlined data management.",
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
            about: "À propos de moi",
            interests: "Centres d'intérêt",
            competences: "Compétences",
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
                "Je suis Sefer Tasdemir je termine actuellement ma <strong>troisième année de BUT Informatique</strong> à l'IUT d'Annecy (France). J'ai obtenu mon <strong>baccalauréat général, spécialisé en mathématiques avec mention</strong>, si vous voulez en savoir plus sur mon <strong>parcours scolaire et professionnel</strong>, je vous invite à <strong>consulter mon CV en bas de la page</strong>.",
              para2:
                "Je parle couramment <strong>français</strong> et <strong>turc</strong>, j'ai un niveau B2 en <strong>anglais</strong> (TOEIC 900 pts) et un niveau scolaire d'<strong>espagnol</strong>. En dehors du codage, je suis passionné par les <strong>échecs</strong> (1200 Elo) et le sport, je pratique le <strong>football</strong>, le <strong>basketball</strong>, l'<strong>athlétisme</strong> et la <strong>musculation</strong>.",
              para3:
                "Je suis ouvert aux opportunités professionnelles. Si vous avez une offre qui correspond à mes compétences, <strong>contactez-moi en dessous</strong>.",
            },
            identity: {
              title: "État civil",
              nameLabel: "Nom",
              nameValue: "Sefer Tasdemir",
              birthLabel: "Date de naissance",
              birthValue: "1 juillet 2005",
              cityLabel: "Ville",
              cityValue: "Annecy, France",
              nationalityLabel: "Nationalité",
              nationalityValue: "Française",
              licenseLabel: "Permis de conduire",
              licenseValue: "B1",
              emailLabel: "Email",
              emailValue: "tasdemir.sefer.74@gmail.com",
            },
            skills: "Mes compétences",
            contact_button: "Contactez-moi",
          },
          interests: {
            heading: "Centres d'intérêt",
            subheading:
              "Mes passions qui enrichissent mon développement personnel et professionnel",
            items: {
              sport: {
                title: "Sport & Bien-être",
                description:
                  "La pratique régulière de sports collectifs, alliée à l’entraînement physique (musculation, cardio), est pour moi un pilier d'équilibre. En cultivant le goût de l'effort et la cohésion de groupe, je renforce ma persévérance et mes aptitudes relationnelles, tout en m'apportant une stabilité mentale indispensable.",
                tags: {
                  team: "Équipe",
                  perseverance: "Persévérance",
                  communication: "Communication",
                },
              },
              tech: {
                title: "Veille Technologique",
                description:
                  "Passionné par les innovations technologiques, j'assure une veille constante via les réseaux sociaux et des newsletters spécialisées. Cette curiosité me permet d'anticiper les changements du secteur et d'actualiser mes compétences en continu pour rester en phase avec les dernières tendances.",
                tags: {
                  innovation: "Innovation",
                  trends: "Tendances",
                  adaptation: "Adaptation",
                },
              },
              gaming: {
                title: "Jeux Vidéo",
                description:
                  "De la gestion complexe de Dwarf Fortress à la réactivité de Valorant, ma passion pour le jeu vidéo a toujours été un moteur intellectuel. Elle a aiguisé ma capacité à analyser des situations, élaborer des stratégies et résoudre des problèmes, des compétences  que je mets au service de mon code.",
                tags: {
                  strategy: "Stratégie",
                  analysis: "Analyse",
                  creativity: "Créativité",
                },
              },
            },
          },
          /* 20251230  */
          competences: {
            heading: "Compétences & preuves",
            subheading:
              "Articuler savoir, savoir-faire et savoir-être avec des traces concrètes de mes projets.",
            definition: {
              title: "Compétence = savoir + savoir-faire + savoir-être",
              body: "Une compétence mobilise des ressources (connaissances), des apprentissages critiques (comment agir) et des comportements collaboratifs.",
              savoir: "Savoir",
              savoirFaire: "Savoir-faire",
              savoirEtre: "Savoir-être",
            },
            traces: {
              title: "Traces & preuve",
              trace: "Trace",
              proof: "Preuve",
              traceBody:
                "Extraits de code issus de mini-projets (interfaces Python, requêtes base de données) réalisés en TD.",
              proofBody:
                "En binôme, j'ai développé une interface Python pour rechercher des films dans une base. La capture de l'interface finale et le code commenté détaillent l'algorithme et la fiabilité de la recherche.",
            },
            portfolio: {
              title: "Démarche e-portfolio",
              item1:
                "Prendre du recul sur les expériences qui ont fait progresser mes compétences.",
              item2:
                "Relier chaque expérience à mon référentiel de formation pour me situer.",
              item3:
                "Documenter et partager des preuves (trace + justification) des compétences que je revendique.",
              item4: "Faire le lien avec mon projet professionnel.",
            },
          },
          experience: {
            heading: "Expérience et formation",
            subheading: "Missions clés, stages et projets",
            items: {
              dataAnalyst: {
                type: "Alternance",
                dates: "Sep 2025 - Sep 2026",
                title: "Data Analyst",
                place: "Autoroutes et tunnel du Mont-Blanc",
                b1: "Développement de scripts R d'automatisation, améliorant l'efficacité et garantissant la fiabilité des transferts d'informations entre les classeurs Excel.",
                b2: "Création d'un dashboard Excel automatisé via un script R, pour un suivi précis des vitesses sur le réseau.",
                b3: "Création de dashboards Power BI avec une nouvelle charte graphique (UX/UI) et Power Automate.",
                b4: "Optimisation des processus de gestion de BDD avec documentation.",
                b5: "Migration d'une base de données Excel vers SQL Server.",
              },
              maintenance: {
                type: "Stage",
                dates: "Avr 2025 - Juin 2025",
                title: "Technicien Maintenance Informatique",
                place: "Autoroutes et tunnel du Mont-Blanc",
                b1: "Développement de scripts SQL d'automatisation réduisant le temps de traitement des requêtes.",
                b2: "Création de dashboards Power BI avec une nouvelle charte graphique (UX/UI) et Power Automate.",
                b3: "Optimisation des processus de gestion de BDD avec documentation.",
                b4: "Configuration et migration de GLPI d'un serveur Windows vers un serveur Linux.",
              },
              operator: {
                type: "Job d'été",
                dates: "2022, 2023, 2024, 2025",
                title: "Opérateur de production et Agent de tri",
                place: "Sodep KUHAIL et MPM",
                b1: "Vérification, tri et inventaire des pièces.",
                b2: "Préparation, emballage et maintenance de la production.",
              },
            },
            education: {
              heading: "Formation",
              items: {
                but: {
                  type: "Diplôme",
                  dates: "2023 - Présent",
                  title: "BUT Informatique parcours AGED",
                  place:
                    "3e année - Administration, Gestion et Exploitation des Données",
                },
                bac: {
                  type: "Diplôme",
                  dates: "2020 - 2023",
                  title: "Baccalauréat Général",
                  place:
                    "Option maths expertes, spécialité S.E.S / Mathématiques",
                },
              },
            },
          },
          projects: {
            home: {
              heading: "Projets",
              subheading:
                "Découvrez une sélection de projets personnels et académiques que j'ai réalisés.",
              socialNetworksContent:
                "Modélisation graphe d'un réseau social avec requêtes Cypher, analyses de plus courts chemins et recommandations.",
              tpDataContent:
                "TP de machine learning avec MLxtend : préparation de données, stacking de modèles, évaluation et fouille de règles d'association.",
              offContent:
                "C'est un projet d’analyse et de valorisation des données nutritionnelles et commerciales de la base Open Food Facts à travers une architecture OLTP/OLAP, des visualisations Power BI et des modèles d’intelligence artificielle sur Knime.",
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
                "ScoDoc est une plateforme basée sur WPF développée pour permettre aux enseignants de gérer efficacement les dossiers des étudiants et les tâches administratives scolaires. Dans le cadre d'un projet collaboratif, notre équipe a rédigé un document de spécifications complet pour garantir l'alignement avec des objectifs de fonctionnalité et d'utilisabilité spécifiques. Nous avons conçu un Modèle de Données Conceptuel (MDC) et un Modèle de Données Logique (MDL) en UML, implémenté une base de données PostgreSQL avec un script SQL structuré, et développé des requêtes personnalisées pour une gestion de données simplifiée.",
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
  return userLang.startsWith("fr") ? "fr" : "en"; //langue par défaut détectée
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
