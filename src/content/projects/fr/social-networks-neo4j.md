---
title: Social Networks Neo4j
summary: "Un réseau social modélisé en base graphe : comparaison NoSQL, modèle Neo4j, jeu de données synthétique et requêtes Cypher."
order: 4
categories: [graph, db]
tags: [Neo4j, Cypher, Python, Faker]
cover: ../../../assets/projects/social-networks-neo4j/Neo4jLogo.webp
coverAlt: Logo Neo4j
repo: https://github.com/sftss/Social-Networks-Neo4j
context: "Projet tutoré du BUT Informatique, « Étude et expérimentation d’un service NoSQL ». Il fallait choisir un service NoSQL adapté à un réseau social, le justifier, puis l’expérimenter sur un jeu de données conçu pour l’occasion."
team: Projet de groupe, 3 personnes.
role: J’ai été responsable de l’analyse comparative des solutions NoSQL et j’ai co-conçu le modèle de données.
learnings: Les difficultés et les apprentissages sont venus du management du projet et de l’initialisation du cahier des charges.
gallery:
  - src: ../../../assets/projects/social-networks-neo4j/NeoModel.webp
    alt: Schéma du graphe reliant les nœuds User, Post, Comment, Tag, Topic, Group et Report
    caption: Modèle de graphe et ses 7 labels.
  - src: ../../../assets/projects/social-networks-neo4j/ExFollowing.webp
    alt: Visualisation dense des relations FOLLOWS entre utilisateurs, formant des groupes distincts
    caption: Relations FOLLOWS, où les communautés générées se distinguent.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryViz.webp
    alt: Visualisation du graphe avec des nœuds colorés par label
    caption: Visualisation du graphe dans Neo4j Aura.
  - src: ../../../assets/projects/social-networks-neo4j/ExQuery.webp
    alt: Tableau du nombre de relations par type, de FOLLOWS à CREATED
    caption: Nombre de relations par type.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryProportion.webp
    alt: Tableau du nombre de publications par niveau de visibilité
    caption: Publications par niveau de visibilité.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryReport.webp
    alt: Propriétés d’un nœud Report, dont le motif et le statut
    caption: Un signalement et ses propriétés.
facts:
  - value: 7 labels
    label: et 10 types de relations alimentés
  - value: 3 000 utilisateurs
    label: répartis en 5 communautés
  - value: 5 000 publications
    label: et 8 000 commentaires, sur 1 an simulé
  - value: 61 887 relations FOLLOWS
    label: sur 109 067 relations au total
  - value: 3 solutions
    label: comparées avant le choix, Neo4j, MongoDB et SPARQL
---

- **Étude préalable** : comparaison de Neo4j, MongoDB et SPARQL, puis choix de Neo4j, car la valeur du réseau social tient à ses relations.
- **Modèle** : graphe de propriétés avec contraintes d’unicité et index, couvrant utilisateurs, publications, interactions, groupes et signalements.
- **Génération** : script Python reproductible, avec une graine fixe, des communautés thématiques et des comptes influenceurs pour obtenir un graphe réaliste.
- **Expérimentation** : import sur Neo4j Aura, puis scénarios Cypher d’insertion, de requêtes, d’agrégation, de mise à jour et de suppression, dont des recommandations par chemins de longueur 2 à 3.
