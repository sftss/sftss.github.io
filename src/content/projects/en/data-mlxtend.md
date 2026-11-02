---
title: Data MLxtend
summary: "Basket analysis for a British gift shop: data cleaning, RFM segmentation and association rules with Apriori."
order: 3
categories: [ml]
tags: [Python, pandas, seaborn, MLxtend]
cover: ../../../assets/projects/data-mlxtend/Mlxtend.webp
coverAlt: MLxtend logo
repo: https://github.com/sftss/TP-Data-MLxtend
context: Practical assignment of the BUT in Computer Science. From a year of transactions, the brief was to clean the data, describe buying behavior and surface products bought together.
team: Group project.
role: I took the lead on the project and handled the technical side.
learnings: The main challenges and lessons came from managing the project and from setting up the initial requirements.
gallery:
  - src: ../../../assets/projects/data-mlxtend/1_paniers_par_mois.webp
    alt: Line chart of baskets per month, peaking in November 2011
    caption: Baskets per month, with a peak in November.
  - src: ../../../assets/projects/data-mlxtend/2_paniers_par_jour_et_heure.webp
    alt: Bar charts of baskets by day of the week and by hour of the day
    caption: Baskets by day of the week and by hour.
  - src: ../../../assets/projects/data-mlxtend/3_taille_des_paniers_filtres.webp
    alt: Histogram of basket sizes on a logarithmic scale
    caption: Basket size distribution.
  - src: ../../../assets/projects/data-mlxtend/4_top_20_articles.webp
    alt: Horizontal ranking of the 20 best-selling items
    caption: The 20 most popular items.
  - src: ../../../assets/projects/data-mlxtend/5_regles_association.webp
    alt: Horizontal bars of association rules sorted by lift, colored by confidence
    caption: The 6 association rules, sorted by lift.
  - src: ../../../assets/projects/data-mlxtend/6_segmentation_rfm.webp
    alt: Bar chart of customers per RFM segment, from Champions to New customers
    caption: RFM segmentation of the 4,293 customers.
  - src: ../../../assets/projects/data-mlxtend/7_fidelite_clients.webp
    alt: Histogram of visits per customer and a pie chart of customer loyalty
    caption: Customer loyalty.
  - src: ../../../assets/projects/data-mlxtend/8_evolution_clients.webp
    alt: Stacked bars of new and returning customers per month
    caption: New and returning customers per month.
facts:
  - value: 18,044 baskets
    label: valid after cleaning, from December 2010 to December 2011
  - value: 4,293 customers
    label: and 3,835 distinct items
  - value: 6 segments
    label: of customers from the RFM analysis
  - value: 2,670 baskets
    label: analyzed by Apriori, over the last 30 days
  - value: 6 rules
    label: kept at 2% support and 80% confidence
  - value: Lift of 29.44
    label: for the best rule, with 91.5% confidence
---

- **Cleaning**: removal of baskets with no identified customer, normalization of product names and exclusion of non-product lines such as postage or discounts.
- **Descriptive analysis**: basket distribution by month, day and hour, basket size and best-selling items.
- **Customers**: RFM segmentation into 6 segments, loyalty analysis and tracking of new and returning customers.
- **Association rules**: Apriori over the last 30 days, with a minimum support of 2%, itemsets of size 3 at most and a minimum confidence of 80%, then sorted by lift.
