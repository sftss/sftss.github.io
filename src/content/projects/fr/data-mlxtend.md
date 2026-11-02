---
title: Data MLxtend
summary: "Analyse des paniers d’une boutique de cadeaux britannique : nettoyage, segmentation RFM et règles d’association avec Apriori."
order: 3
categories: [ml]
tags: [Python, pandas, seaborn, MLxtend]
cover: ../../../assets/projects/data-mlxtend/Mlxtend.webp
coverAlt: Logo MLxtend
repo: https://github.com/sftss/TP-Data-MLxtend
context: Travail pratique du BUT Informatique. À partir d’un an de transactions, il fallait nettoyer les données, décrire les comportements d’achat et faire ressortir les produits achetés ensemble.
team: Projet de groupe.
role: J’ai pris le lead du projet et je me suis occupé de la partie technique.
learnings: "Avant de chercher des règles, il a fallu nettoyer les données : écarter les paniers sans client et les lignes qui ne sont pas des produits, comme les frais de port. Côté équipe, le management du projet et l’initialisation du cahier des charges ont été mes principaux apprentissages."
gallery:
  - src: ../../../assets/projects/data-mlxtend/1_paniers_par_mois.webp
    alt: Courbe du nombre de paniers par mois, avec un pic en novembre 2011
    caption: Paniers par mois, avec un pic en novembre.
  - src: ../../../assets/projects/data-mlxtend/2_paniers_par_jour_et_heure.webp
    alt: Histogrammes du nombre de paniers par jour de la semaine et par heure de la journée
    caption: Paniers par jour de la semaine et par heure.
  - src: ../../../assets/projects/data-mlxtend/3_taille_des_paniers_filtres.webp
    alt: Histogramme de la taille des paniers en échelle logarithmique
    caption: Distribution de la taille des paniers.
  - src: ../../../assets/projects/data-mlxtend/4_top_20_articles.webp
    alt: Classement horizontal des 20 articles les plus vendus
    caption: Les 20 articles les plus populaires.
  - src: ../../../assets/projects/data-mlxtend/5_regles_association.webp
    alt: Barres horizontales des règles d’association triées par lift, colorées selon la confiance
    caption: Les 6 règles d’association, triées par lift.
  - src: ../../../assets/projects/data-mlxtend/6_segmentation_rfm.webp
    alt: Histogramme du nombre de clients par segment RFM, de Champions à Nouveaux clients
    caption: Segmentation RFM des 4 293 clients.
  - src: ../../../assets/projects/data-mlxtend/7_fidelite_clients.webp
    alt: Histogramme du nombre de visites par client et diagramme circulaire de la fidélité
    caption: Fidélité des clients.
  - src: ../../../assets/projects/data-mlxtend/8_evolution_clients.webp
    alt: Barres empilées des clients nouveaux et récurrents par mois
    caption: Clients nouveaux et récurrents par mois.
facts:
  - value: 18 044 paniers
    label: valides après nettoyage, de décembre 2010 à décembre 2011
  - value: 4 293 clients
    label: et 3 835 articles distincts
  - value: 6 segments
    label: de clients issus de l’analyse RFM
  - value: 2 670 paniers
    label: analysés par Apriori, sur les 30 derniers jours
  - value: 6 règles
    label: retenues à 2 % de support et 80 % de confiance
  - value: Lift de 29,44
    label: pour la meilleure règle, avec 91,5 % de confiance
---

- **Nettoyage** : retrait des paniers sans client identifié, normalisation des noms de produits et exclusion des lignes qui n’en sont pas, comme les frais de port ou les remises.
- **Analyse descriptive** : distribution des paniers par mois, jour et heure, taille des paniers et articles les plus vendus.
- **Clients** : segmentation RFM en 6 segments, analyse de la fidélité et suivi des clients nouveaux et récurrents.
- **Règles d’association** : Apriori sur les 30 derniers jours, avec un support minimal de 2 %, des itemsets de taille 3 au plus et une confiance minimale de 80 %, puis tri par lift.
