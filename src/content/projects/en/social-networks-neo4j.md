---
title: Social Networks Neo4j
summary: "A social network modeled as a graph database: NoSQL comparison, Neo4j model, synthetic dataset and Cypher queries."
order: 4
categories: [graph, db]
tags: [Neo4j, Cypher, Python, Faker]
cover: ../../../assets/projects/social-networks-neo4j/Neo4jLogo.webp
coverAlt: Neo4j logo
repo: https://github.com/sftss/Social-Networks-Neo4j
context: "Supervised project of the BUT in Computer Science, “Study and experimentation of a NoSQL service”. The brief was to choose a NoSQL service suited to a social network, justify the choice, then test it on a purpose-built dataset."
team: Group project, 3 people.
role: I was responsible for the comparative analysis of NoSQL solutions and co-designed the data model.
learnings: The main challenges and lessons came from managing the project and from setting up the initial requirements.
gallery:
  - src: ../../../assets/projects/social-networks-neo4j/NeoModel.webp
    alt: Graph schema linking the User, Post, Comment, Tag, Topic, Group and Report nodes
    caption: Graph model and its 7 labels.
  - src: ../../../assets/projects/social-networks-neo4j/ExFollowing.webp
    alt: Dense visualization of FOLLOWS relationships between users, forming distinct groups
    caption: FOLLOWS relationships, where the generated communities stand out.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryViz.webp
    alt: Graph visualization with nodes colored by label
    caption: Graph visualization in Neo4j Aura.
  - src: ../../../assets/projects/social-networks-neo4j/ExQuery.webp
    alt: Table of relationship counts by type, from FOLLOWS to CREATED
    caption: Relationship counts by type.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryProportion.webp
    alt: Table of post counts by visibility level
    caption: Posts by visibility level.
  - src: ../../../assets/projects/social-networks-neo4j/ExQueryReport.webp
    alt: Properties of a Report node, including its reason and status
    caption: A report and its properties.
facts:
  - value: 7 labels
    label: and 10 populated relationship types
  - value: 3,000 users
    label: across 5 communities
  - value: 5,000 posts
    label: and 8,000 comments, over 1 simulated year
  - value: 61,887 FOLLOWS
    label: out of 109,067 relationships in total
  - value: 3 solutions
    label: compared before choosing, Neo4j, MongoDB and SPARQL
---

- **Preliminary study**: comparison of Neo4j, MongoDB and SPARQL, then choice of Neo4j, because a social network’s value lies in its relationships.
- **Model**: property graph with uniqueness constraints and indexes, covering users, posts, interactions, groups and reports.
- **Generation**: reproducible Python script with a fixed seed, themed communities and influencer accounts to produce a realistic graph.
- **Experimentation**: import into Neo4j Aura, then Cypher scenarios for insertion, querying, aggregation, update and deletion, including recommendations through paths of length 2 to 3.
