---
title: Scodoc
summary: "Une base de suivi des étudiants, modélisée de zéro puis restituée dans Excel et Power BI."
order: 5
categories: [bi, db]
tags: [PostgreSQL, SQL, UML, Excel, Power BI]
cover: ../../../assets/projects/scodoc/ScodocLogo.webp
coverAlt: Logo Scodoc
repo: https://github.com/sftss/Scodoc
context: "SAÉ 2.04 du BUT Informatique, « Exploitation d’une base de données ». Il fallait concevoir une base gérant les étudiants, leurs groupes, leurs modules, leurs évaluations et leurs notes, puis en tirer des analyses."
team: Projet de groupe, 3 personnes.
role: J’ai co-conçu les modèles conceptuel et logique, rédigé les rapports, co-écrit les requêtes SQL et les calculs Excel, et créé le rapport Power BI.
learnings: Les difficultés et les apprentissages sont venus du management du projet et de l’initialisation du cahier des charges.
gallery:
  - src: ../../../assets/projects/scodoc/MLDScodoc.webp
    alt: Modèle logique de données reliant les étudiants, groupes, modules, évaluations et notes
    caption: Modèle logique de données.
  - src: ../../../assets/projects/scodoc/ScodocExcel.webp
    alt: Tableau Excel listant les notes des étudiants par module, issu de la vue SQL
    caption: Vue SQL importée dans Excel pour les calculs.
  - src: ../../../assets/projects/scodoc/PowerBi1.webp
    alt: Page Student Information du rapport Power BI, avec indicateurs de notes et liste des étudiants
    caption: Page de suivi des étudiants et de leurs notes.
  - src: ../../../assets/projects/scodoc/PowerBi2.webp
    alt: Page Nationality and diversity of students avec un treemap des modules et une carte du monde
    caption: Page cartographique sur l’origine des étudiants.
facts:
  - value: 9 tables
    label: dans la base de données
  - value: 1 178 insertions
    label: dans le script de peuplement
  - value: 100 étudiants
    label: suivis dans le rapport
  - value: 2 pages
    label: dans le rapport Power BI
---

- **Conception** : cahier des charges, puis modèles conceptuel et logique en UML.
- **Base de données** : script PostgreSQL de création et d’insertion des données.
- **Requêtes** : requêtes SQL répondant à des questions de suivi, comme les étudiants sans note pour une évaluation.
- **Analyse** : vue SQL croisant notes, étudiants, modules et groupes, importée dans Excel pour les calculs.
- **Visualisation** : rapport Power BI construit sur cette vue, avec une page de suivi et une page cartographique.
