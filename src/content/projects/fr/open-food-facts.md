---
title: Open Food Facts
summary: "D’un CSV de 326 Mo à une plateforme décisionnelle : bases OLTP et OLAP sur Azure, workflows Knime et tableaux de bord Power BI."
order: 2
categories: [bi, ml, db]
tags: [PostgreSQL, Azure, Azure Data Factory, Knime, Power BI, SQL]
cover: ../../../assets/projects/open-food-facts/logoOFF.webp
coverAlt: Logo Open Food Facts
repo: https://github.com/sftss/Open-Food-Fact
context: "SAE S4.C.01 du BUT Informatique, « développement avec une base de données et visualisation » (2024-25). Il fallait améliorer une base collaborative existante, y intégrer des ventes simulées, produire des rapports et entraîner des modèles capables d’attribuer le Nutri-Score malgré l’absence de données sur les fibres et le sodium."
team: Projet de groupe, 5 personnes.
role: J’ai écrit les scripts SQL qui assurent la cohérence des clés entre les deux serveurs Azure, et réalisé dans Knime les jointures, les correspondances d’identifiants et les transformations nécessaires.
learnings: Les difficultés et les apprentissages sont venus du management du projet et de l’initialisation du cahier des charges.
gallery:
  - src: ../../../assets/projects/open-food-facts/OLTPOFF.webp
    alt: Modèle relationnel OLTP centré sur la table PRODUCT, avec ses tables de référence
    caption: Modèle OLTP normalisé, de 16 tables.
  - src: ../../../assets/projects/open-food-facts/OLAPOFF.webp
    alt: Modèle OLAP avec les tables de faits de composition et de ventes et leurs dimensions
    caption: Modèle OLAP avec 2 tables de faits et 5 dimensions.
  - src: ../../../assets/projects/open-food-facts/knimeOFF1.webp
    alt: Workflow Knime enchaînant les modèles de prédiction de l’éco-score, du groupe Nova et du Nutri-Score
    caption: Workflow Knime des trois modèles de prédiction.
  - src: ../../../assets/projects/open-food-facts/knimeOFF2.webp
    alt: Détail du workflow Knime qui additionne les prédictions pour créer le score final
    caption: Création du score composite à partir des prédictions.
embeds:
  - title: Rapport OLTP, données de ventes simulées
    url: https://app.powerbi.com/view?r=eyJrIjoiNTJiZmZmYTAtZjU1ZC00MmE1LWI1MjgtNzc5NzE4YzI2MGQ1IiwidCI6ImUyMWU5NzgzLWQwYTAtNDhmOC04NTBlLTBiMDgxYjQ2ZDc4OCIsImMiOjh9
  - title: Rapport OLAP, données de ventes simulées
    url: https://app.powerbi.com/view?r=eyJrIjoiMGQ5ODMxZDctMzU3Zi00NTRhLTkxNGMtNDQ2YjQwOWE1MDM4IiwidCI6ImUyMWU5NzgzLWQwYTAtNDhmOC04NTBlLTBiMDgxYjQ2ZDc4OCIsImMiOjh9&pageName=21d819c14bae71120765
facts:
  - value: 326,6 Mo
    label: CSV Open Food Facts de départ
  - value: 16 + 7 tables
    label: modèles OLTP et OLAP, plus 11 vues
  - value: Plus de 600 000 lignes
    label: de ventes simulées sur 3 ans
  - value: 77 %
    label: de précision globale sur le Nutri-Score
  - value: 85 % et 82 %
    label: de précision sur l’éco-score et le groupe Nova, sur données inconnues
  - value: 86 %
    label: de précision pour attribuer le score composite, sur données inconnues
  - value: 4 + 4 pages
    label: rapports Power BI OLTP et OLAP
---

- **Base OLTP** : modèle normalisé sur Azure PostgreSQL, avec index sur les clés étrangères et vues dédiées à la visualisation.
- **Ventes simulées** : script Python générant les ventes de 1 000 produits sur 3 ans, selon des lois de Poisson et normales.
- **Base OLAP** : deux tables de faits, composition et ventes, alimentées par Azure Data Factory et Knime.
- **Exploration** : clustering k-Means et DBSCAN, évalué avec un scorer d’entropie.
- **Modèles** : arbres de décision puis Random Forest, le meilleur résultat venant de quatre modèles entraînés par groupe PNNS.
- **Score composite** : création de l’Open Food Facts Score (OFFS), qui additionne Nutri-Score, groupe Nova et éco-score, puis un arbre de décision pour l’attribuer aux nouveaux produits.
- **Restitution** : deux rapports Power BI, l’un sur le modèle OLTP, l’autre sur le modèle OLAP.
