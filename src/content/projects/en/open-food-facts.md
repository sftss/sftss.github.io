---
title: Open Food Facts
summary: "From a 326 MB CSV to a decision-support platform: OLTP and OLAP databases on Azure, Knime workflows and Power BI dashboards."
order: 2
categories: [bi, ml, db]
tags: [PostgreSQL, Azure, Azure Data Factory, Knime, Power BI, SQL]
cover: ../../../assets/projects/open-food-facts/logoOFF.webp
coverAlt: Open Food Facts logo
repo: https://github.com/sftss/Open-Food-Fact
context: "SAE S4.C.01 of the BUT in Computer Science, “development with a database and visualization” (2024-25). The brief was to improve an existing collaborative database, add simulated sales, produce reports and train models able to assign the Nutri-Score despite missing fiber and sodium data."
team: Group project, 5 people.
role: I wrote the SQL scripts that keep keys consistent between the two Azure servers, and built the joins, ID matching and required transformations in Knime.
learnings: "With no fiber or sodium data, we had to train models instead of reproducing the official Nutri-Score formula, and reaching the Azure servers from the IUT network required port and proxy settings. On the team side, managing the project and setting up the initial requirements were my main lessons."
gallery:
  - src: ../../../assets/projects/open-food-facts/OLTPOFF.webp
    alt: OLTP relational model centered on the PRODUCT table, with its reference tables
    caption: Normalized OLTP model with 16 tables.
  - src: ../../../assets/projects/open-food-facts/OLAPOFF.webp
    alt: OLAP model with the composition and sales fact tables and their dimensions
    caption: OLAP model with 2 fact tables and 5 dimensions.
  - src: ../../../assets/projects/open-food-facts/knimeOFF1.webp
    alt: Knime workflow chaining the eco-score, Nova group and Nutri-Score prediction models
    caption: Knime workflow for the three prediction models.
  - src: ../../../assets/projects/open-food-facts/knimeOFF2.webp
    alt: Detail of the Knime workflow that adds up predictions to create the final score
    caption: Building the composite score from the predictions.
embeds:
  - title: OLTP report, simulated sales data
    url: https://app.powerbi.com/view?r=eyJrIjoiNTJiZmZmYTAtZjU1ZC00MmE1LWI1MjgtNzc5NzE4YzI2MGQ1IiwidCI6ImUyMWU5NzgzLWQwYTAtNDhmOC04NTBlLTBiMDgxYjQ2ZDc4OCIsImMiOjh9
  - title: OLAP report, simulated sales data
    url: https://app.powerbi.com/view?r=eyJrIjoiMGQ5ODMxZDctMzU3Zi00NTRhLTkxNGMtNDQ2YjQwOWE1MDM4IiwidCI6ImUyMWU5NzgzLWQwYTAtNDhmOC04NTBlLTBiMDgxYjQ2ZDc4OCIsImMiOjh9&pageName=21d819c14bae71120765
facts:
  - value: 326.6 MB
    label: starting Open Food Facts CSV
  - value: 16 + 7 tables
    label: OLTP and OLAP models, plus 11 views
  - value: Over 600,000 rows
    label: of simulated sales over 3 years
  - value: 77%
    label: overall Nutri-Score precision
  - value: 85% and 82%
    label: precision on eco-score and Nova group, on unseen data
  - value: 86%
    label: precision assigning the composite score, on unseen data
  - value: 4 + 4 pages
    label: OLTP and OLAP Power BI reports
---

- **OLTP database**: normalized model on Azure PostgreSQL, with indexes on foreign keys and views dedicated to visualization.
- **Simulated sales**: Python script generating sales for 1,000 products over 3 years, using Poisson and normal distributions.
- **OLAP database**: two fact tables, composition and sales, loaded with Azure Data Factory and Knime.
- **Exploration**: k-Means and DBSCAN clustering, evaluated with an entropy scorer.
- **Models**: decision trees then Random Forest, with the best result coming from four models trained per PNNS group.
- **Composite score**: creation of the Open Food Facts Score (OFFS), which adds up Nutri-Score, Nova group and eco-score, then a decision tree to assign it to new products.
- **Reporting**: two Power BI reports, one on the OLTP model and one on the OLAP model.
