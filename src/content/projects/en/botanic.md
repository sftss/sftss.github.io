---
title: Botanic
summary: "A C# and WPF desktop application to manage purchase orders for a garden center’s purchasing department."
order: 7
categories: [app, db]
tags: [C#, WPF, .NET, PostgreSQL, Npgsql]
cover: ../../../assets/projects/botanic/BotanicLogo.webp
coverAlt: Botanic logo
repo: https://github.com/sftss/Botanic
context: SAE201 of the BUT in Computer Science. The brief was to develop a desktop application connected to a database, so that a garden center’s purchasing department could manage its purchase orders.
team: Group project, 3 people.
role: I took the lead on the project and handled the technical side.
learnings: The main challenges and lessons came from managing the project and from setting up the initial requirements.
gallery:
  - src: ../../../assets/projects/botanic/ConnexionBotanic.webp
    alt: Login screen with a garden center photo and a form
    caption: Login screen.
  - src: ../../../assets/projects/botanic/RechercherProduitBotanic.webp
    alt: Supplier purchasing screen with a search bar and recent items with their prices
    caption: Searching items from suppliers.
  - src: ../../../assets/projects/botanic/FiltrerBotanic.webp
    alt: Filter panel by category, price and color
    caption: Filters by category, price and color.
  - src: ../../../assets/projects/botanic/EnregistrerModifierProduitBotanic.webp
    alt: Product form with color, category, supplier and prices
    caption: Saving and editing a product.
  - src: ../../../assets/projects/botanic/EnregistrerModifierCommandeBotanic.webp
    alt: Order form with store, transport mode and dates
    caption: Saving and editing an order.
  - src: ../../../assets/projects/botanic/ValiderCommandeBotanic.webp
    alt: Order validation table with products and quantities
    caption: Validating an order.
  - src: ../../../assets/projects/botanic/VisualiserCommandeBotanic.webp
    alt: Order list with details, transport, store and delivery
    caption: Tracking and order details.
facts:
  - value: 2,266 lines
    label: of C#
  - value: 1,370 lines
    label: of XAML
  - value: .NET 6
    label: with WPF and Npgsql for PostgreSQL
  - value: 7 screens
    label: shown in the gallery
---

- **Access**: login screen using database credentials.
- **Products**: search and filters by type, category, color and supplier, plus saving and editing.
- **Orders**: creation, transport mode selection, validation, then order details and delivery dates.
- **Data**: PostgreSQL connection with Npgsql, and domain classes for products, suppliers, stores and orders.
