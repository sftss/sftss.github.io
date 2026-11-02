---
title: IMDb
summary: "A complete decision-support solution on IMDb data: Python ETL, OLAP warehouse, Power BI and sentiment analysis."
order: 1
categories: [bi, ml, db]
tags: [Python, SQL Server, SSIS, Power BI, DAX, scikit-learn, PowerAMC]
cover: ../../../assets/projects/imdb/ImdbLogo.webp
coverAlt: IMDb logo
repo: https://github.com/sftss/IMDb
context: "SAE5.C.01 of the BUT in Computer Science (2025-26, IUT d’Annecy). Starting from IMDb’s public flat files, the brief was to design an optimized SQL Server database and Power BI reports, then AI models able to assess a review from its text alone, all on a standard PC."
team: Group project, 5 people.
role: I took the lead on the project and handled the technical side.
learnings: The main challenges and lessons came from managing the project and from setting up the initial requirements.
gallery:
  - src: ../../../assets/projects/imdb/IMDbModeleOLTP.webp
    alt: OLTP relational schema with the TITLE, PERSON and TITLE_PRINCIPAL tables and their reference tables
    caption: Normalized OLTP model with 12 tables.
  - src: ../../../assets/projects/imdb/IMDbModeleOLAP.webp
    alt: OLAP star schema with the T_FACT_MOVIE_STATS and T_FACT_CASTING fact tables and their dimensions
    caption: Star schema with 2 fact tables, 9 dimensions and a bridge table for genres.
  - src: ../../../assets/projects/imdb/IMDbModelePowerBI.webp
    alt: Data model view in Power BI, showing relationships between facts and dimensions
    caption: Semantic model in Power BI.
  - src: ../../../assets/projects/imdb/PowerBI/p1_main.webp
    alt: General Statistics page of the Power BI report, with KPIs, a historical curve and a world map
    caption: Catalog overview.
  - src: ../../../assets/projects/imdb/PowerBI/p1_tooltip_share.webp
    alt: World map with a tooltip showing the five most popular genres of a country
    caption: Tooltip on hover showing a country’s leading genres.
  - src: ../../../assets/projects/imdb/PowerBI/p2_movie.webp
    alt: Statistics of movies page with a key influencers visual, a ranking and a scatter plot
    caption: Movie analysis, with the Key Influencers AI visual.
  - src: ../../../assets/projects/imdb/PowerBI/p3_casting.webp
    alt: Casting page with search filters and rankings of actors and directors
    caption: Casting analysis.
  - src: ../../../assets/projects/imdb/PowerBI/p4_versus.webp
    alt: TV Shows vs Movies page with histograms, stacked areas and a Sankey diagram
    caption: TV shows and movies compared, down to a Sankey diagram.
  - src: ../../../assets/projects/imdb/PowerBI/p5_video_game.webp
    alt: Focus on Video Game page with engagement by genre between Europe and North America
    caption: Focus on video games.
  - src: ../../../assets/projects/imdb/IA/M1Matrice.webp
    alt: Confusion matrix of the binary model, with a strongly dominant diagonal
    caption: Model 1, positive or negative polarity.
  - src: ../../../assets/projects/imdb/IA/M2Nuage.webp
    alt: Scatter plot comparing actual and predicted ratings, with the perfect prediction line
    caption: Model 2, actual and predicted rating out of 10.
  - src: ../../../assets/projects/imdb/IA/M3Matrice.webp
    alt: Confusion matrix of the grade model, across four classes
    caption: Model 3, grade classification.
facts:
  - value: Over 12 GB
    label: 7 TSV input files
  - value: 222M rows
    label: processed by the ETL in 25 minutes
  - value: 12 + 12 tables
    label: OLTP and OLAP models
  - value: 62 to 7 ms
    label: join query after indexing
  - value: 90.2%
    label: polarity accuracy on 25,000 test reviews
  - value: MAE of 1.61
    label: on the rating out of 10, with an R² of 0.657
  - value: 65%
    label: grade accuracy, with the Mixed class assigned by a rule
  - value: 5 + 3 pages
    label: OLAP Power BI report and its tooltips
---

- **Modeling**: conceptual, logical and physical models in PowerAMC for a normalized, constrained OLTP schema.
- **ETL**: multithreaded Python script with manual memory management and disk offloading to fit on a standard PC, followed by bulk loading with BCP.
- **Optimization**: indexes on foreign keys and composite indexes, backed by execution plan analysis.
- **Decision support**: move to a star schema loaded with SSIS, then Power BI reports.
- **AI**: TF-IDF and linear models compared with 3-fold cross-validation, using a restricted hyperparameter grid to stay frugal.
