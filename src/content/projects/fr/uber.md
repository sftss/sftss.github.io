---
title: Uber
summary: "Une application web inspirée d’Uber et d’Uber Eats sous Laravel : réservation de courses sur carte, paiement PayPal, chatbot et suivi Power BI."
order: 6
categories: [app, bi, db]
tags: [Laravel, PHP, PostgreSQL, JavaScript, Leaflet, Dialogflow, Power BI]
cover: ../../../assets/projects/uber/UberLogo.webp
coverAlt: Logo Uber
repo: https://github.com/sftss/Uber
context: "SAE3.01 du BUT Informatique, création d’une application Uber. Il fallait concevoir la gestion des données et développer une application couvrant les passagers, les chauffeurs, les courses, les paiements et les réservations."
team: Projet de groupe.
role: J’ai pris le lead du projet et je me suis occupé de la partie technique.
learnings: Les difficultés et les apprentissages sont venus du management du projet et de l’initialisation du cahier des charges.
gallery:
  - src: ../../../assets/projects/uber/mainUber.webp
    alt: Page d’accueil sombre proposant de commander une course, de réserver ou de se faire livrer
    caption: Page d’accueil de l’application.
  - src: ../../../assets/projects/uber/courseUber.webp
    alt: Formulaire de course à côté d’une carte montrant l’itinéraire
    caption: Commande d’une course, avec l’itinéraire sur carte.
  - src: ../../../assets/projects/uber/restauUber.webp
    alt: Recherche de restaurants par ville et catégorie, avec une fiche de restaurant
    caption: Partie restauration, inspirée d’Uber Eats.
  - src: ../../../assets/projects/uber/chatUber.webp
    alt: Fenêtre de chatbot expliquant comment réserver une course
    caption: Chatbot d’aide construit avec Dialogflow.
  - src: ../../../assets/projects/uber/biUber1.webp
    alt: Rapport Power BI du nombre de courses par mois, avec filtres et indicateurs
    caption: Nombre de courses par mois.
  - src: ../../../assets/projects/uber/biUber2.webp
    alt: Rapport Power BI du nombre de courses par mois et par catégorie de véhicule
    caption: Courses par catégorie de véhicule.
  - src: ../../../assets/projects/uber/biUber3.webp
    alt: Carte de France du rapport Power BI, avec des bulles selon le chiffre d’affaires
    caption: Cartographie des courses selon leur chiffre d’affaires.
facts:
  - value: 37 modèles
    label: Eloquent dans l’application
  - value: 31 contrôleurs
    label: et 91 vues Blade
  - value: 5 intégrations
    label: Leaflet, Nominatim, LocationIQ, PayPal et Dialogflow
---

- **Conception** : diagrammes UML, puis modèles conceptuel et logique sous PowerAMC pour PostgreSQL.
- **Application** : développement Laravel en MVC, avec les profils passagers et chauffeurs, les courses, les réservations et une partie restauration.
- **Intégrations** : carte Leaflet, recherche d’adresses avec Nominatim et LocationIQ, paiement PayPal et chatbot Dialogflow.
- **Conformité** : bannière de cookies et politique de confidentialité.
- **Pilotage** : rapports Power BI sur les courses et leur répartition géographique, suivi du projet sur Azure DevOps.
