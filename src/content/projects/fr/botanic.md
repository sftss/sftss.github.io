---
title: Botanic
summary: "Une application de bureau C# et WPF pour gérer les bons de commande du service achats d’une jardinerie."
order: 7
categories: [app, db]
tags: [C#, WPF, .NET, PostgreSQL, Npgsql]
cover: ../../../assets/projects/botanic/BotanicLogo.webp
coverAlt: Logo Botanic
repo: https://github.com/sftss/Botanic
context: SAE201 du BUT Informatique. Il fallait développer une application de bureau reliée à une base de données, pour permettre au service achats d’une jardinerie de gérer ses bons de commande.
team: Projet de groupe, 3 personnes.
role: J’ai pris le lead du projet et je me suis occupé de la partie technique.
learnings: Les difficultés et les apprentissages sont venus du management du projet et de l’initialisation du cahier des charges.
gallery:
  - src: ../../../assets/projects/botanic/ConnexionBotanic.webp
    alt: Écran de connexion avec une photo de jardinerie et un formulaire
    caption: Écran de connexion.
  - src: ../../../assets/projects/botanic/RechercherProduitBotanic.webp
    alt: Écran d’achat auprès d’un fournisseur, avec une recherche et des articles récents et leurs prix
    caption: Recherche d’articles auprès des fournisseurs.
  - src: ../../../assets/projects/botanic/FiltrerBotanic.webp
    alt: Panneau de filtres par catégorie, prix et couleur
    caption: Filtres par catégorie, prix et couleur.
  - src: ../../../assets/projects/botanic/EnregistrerModifierProduitBotanic.webp
    alt: Formulaire d’enregistrement d’un produit, avec couleur, catégorie, fournisseur et prix
    caption: Enregistrement et modification d’un produit.
  - src: ../../../assets/projects/botanic/EnregistrerModifierCommandeBotanic.webp
    alt: Formulaire de commande, avec magasin, mode de transport et dates
    caption: Enregistrement et modification d’une commande.
  - src: ../../../assets/projects/botanic/ValiderCommandeBotanic.webp
    alt: Tableau de validation d’une commande, avec les produits et les quantités
    caption: Validation d’une commande.
  - src: ../../../assets/projects/botanic/VisualiserCommandeBotanic.webp
    alt: Liste des commandes avec leur détail, transport, magasin et livraison
    caption: Suivi et détail des commandes.
facts:
  - value: 2 266 lignes
    label: de C#
  - value: 1 370 lignes
    label: de XAML
  - value: .NET 6
    label: avec WPF et Npgsql pour PostgreSQL
  - value: 7 écrans
    label: présentés dans la galerie
---

- **Accès** : écran de connexion avec les identifiants de la base de données.
- **Produits** : recherche et filtres par type, catégorie, couleur et fournisseur, enregistrement et modification.
- **Commandes** : création, choix du mode de transport, validation, puis consultation du détail et des dates de livraison.
- **Données** : connexion à PostgreSQL avec Npgsql, et classes métier pour les produits, les fournisseurs, les magasins et les commandes.
