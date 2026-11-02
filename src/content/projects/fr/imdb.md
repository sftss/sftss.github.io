---
title: IMDb
summary: "Une solution décisionnelle complète sur les données IMDb : ETL Python, entrepôt OLAP, Power BI et analyse de sentiments."
order: 1
categories: [bi, ml, db]
tags: [Python, SQL Server, SSIS, Power BI, DAX, scikit-learn, PowerAMC]
cover: ../../../assets/projects/imdb/ImdbLogo.webp
coverAlt: Logo IMDb
repo: https://github.com/sftss/IMDb
context: "SAE5.C.01 du BUT Informatique (2025-26, IUT d’Annecy). À partir des fichiers plats publics d’IMDb, il fallait concevoir une base SQL Server optimisée et des rapports Power BI, puis des modèles d’IA capables de qualifier une critique à partir de son seul texte, le tout sur un PC standard."
team: Projet de groupe, 5 personnes.
role: J’ai pris le lead du projet et je me suis occupé de la partie technique.
learnings: "Le principal défi technique a été l’ETL : traiter 222 millions de lignes sur un PC standard sans saturer la mémoire. Côté équipe, le management du projet et l’initialisation du cahier des charges ont été mes principaux apprentissages."
gallery:
  - src: ../../../assets/projects/imdb/IMDbModeleOLTP.webp
    alt: Schéma relationnel OLTP avec les tables TITLE, PERSON, TITLE_PRINCIPAL et leurs tables de référence
    caption: Modèle OLTP normalisé, de 12 tables.
  - src: ../../../assets/projects/imdb/IMDbModeleOLAP.webp
    alt: Schéma en étoile OLAP avec les tables de faits T_FACT_MOVIE_STATS et T_FACT_CASTING et leurs dimensions
    caption: Modèle en étoile avec 2 tables de faits, 9 dimensions et une table pont pour les genres.
  - src: ../../../assets/projects/imdb/IMDbModelePowerBI.webp
    alt: Vue du modèle de données dans Power BI, avec les relations entre faits et dimensions
    caption: Modèle sémantique dans Power BI.
  - src: ../../../assets/projects/imdb/PowerBI/p1_main.webp
    alt: Page General Statistics du rapport Power BI, avec indicateurs, courbe historique et carte du monde
    caption: Vue d’ensemble du catalogue.
  - src: ../../../assets/projects/imdb/PowerBI/p1_tooltip_share.webp
    alt: Carte du monde avec une info-bulle montrant les cinq genres les plus populaires d’un pays
    caption: Info-bulle au survol d’un pays, avec ses genres dominants.
  - src: ../../../assets/projects/imdb/PowerBI/p2_movie.webp
    alt: Page Statistics of movies avec un visuel d’influenceurs clés, un classement et un nuage de points
    caption: Analyse des films, avec le visuel IA « Influenceurs clés ».
  - src: ../../../assets/projects/imdb/PowerBI/p3_casting.webp
    alt: Page Casting avec filtres de recherche, classements des acteurs et des réalisateurs
    caption: Analyse des castings.
  - src: ../../../assets/projects/imdb/PowerBI/p4_versus.webp
    alt: Page TV Shows vs Movies avec histogrammes, aires empilées et diagramme de Sankey
    caption: Séries et films comparés, jusqu’au diagramme de Sankey.
  - src: ../../../assets/projects/imdb/PowerBI/p5_video_game.webp
    alt: Page Focus on Video Game avec engagement par genre entre l’Europe et l’Amérique du Nord
    caption: Focus sur les jeux vidéo.
  - src: ../../../assets/projects/imdb/IA/M1Matrice.webp
    alt: Matrice de confusion du modèle binaire, avec une diagonale très majoritaire
    caption: Modèle 1, polarité positive ou négative.
  - src: ../../../assets/projects/imdb/IA/M2Nuage.webp
    alt: Nuage de points comparant les notes réelles aux notes prédites, avec la droite de prédiction parfaite
    caption: Modèle 2, note réelle et note prédite sur 10.
  - src: ../../../assets/projects/imdb/IA/M3Matrice.webp
    alt: Matrice de confusion du modèle à grades, sur quatre classes
    caption: Modèle 3, classification par grades.
facts:
  - value: Plus de 12 Go
    label: 7 fichiers TSV en entrée
  - value: 222 M de lignes
    label: traitées par l’ETL, en 25 minutes
  - value: 12 + 12 tables
    label: modèles OLTP et OLAP
  - value: De 62 à 7 ms
    label: requête de jointure après indexation
  - value: 90,2 %
    label: d’accuracy sur la polarité, sur 25 000 critiques de test
  - value: MAE de 1,61
    label: sur la note sur 10, avec un R² de 0,657
  - value: 65 %
    label: d’accuracy sur les grades, la classe Mixed étant attribuée par règle
  - value: 5 + 3 pages
    label: rapport Power BI OLAP et ses info-bulles
---

- **Modélisation** : MCD, MLD et MPD sous PowerAMC pour un modèle OLTP normalisé et contraint.
- **ETL** : script Python multithread, avec gestion manuelle de la mémoire et déchargement sur disque pour tenir sur un PC standard, puis chargement massif avec BCP.
- **Optimisation** : index sur les clés étrangères et index composites, justifiés par l’analyse des plans d’exécution.
- **Décisionnel** : passage à un modèle en étoile alimenté par SSIS, puis rapports Power BI.
- **IA** : TF-IDF et modèles linéaires comparés en validation croisée 3-fold, avec une grille d’hyperparamètres restreinte pour rester frugal.
