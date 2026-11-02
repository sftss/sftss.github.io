---
title: Scodoc
summary: "A student tracking database, modeled from scratch and reported through Excel and Power BI."
order: 5
categories: [bi, db]
tags: [PostgreSQL, SQL, UML, Excel, Power BI]
cover: ../../../assets/projects/scodoc/ScodocLogo.webp
coverAlt: Scodoc logo
repo: https://github.com/sftss/Scodoc
context: "SAÉ 2.04 of the BUT in Computer Science, “Using a database”. The brief was to design a database managing students, their groups, modules, assessments and grades, then to draw analyses from it."
team: Group project, 3 people.
role: I co-designed the conceptual and logical models, wrote the reports, co-wrote the SQL queries and Excel calculations, and created the Power BI report.
learnings: "The main challenges and lessons came from managing the project and from setting up the initial requirements."
gallery:
  - src: ../../../assets/projects/scodoc/MLDScodoc.webp
    alt: Logical data model linking students, groups, modules, assessments and grades
    caption: Logical data model.
  - src: ../../../assets/projects/scodoc/ScodocExcel.webp
    alt: Excel sheet listing student grades by module, taken from the SQL view
    caption: SQL view imported into Excel for calculations.
  - src: ../../../assets/projects/scodoc/PowerBi1.webp
    alt: Student Information page of the Power BI report, with grade KPIs and a student list
    caption: Tracking page for students and their grades.
  - src: ../../../assets/projects/scodoc/PowerBi2.webp
    alt: Nationality and diversity of students page with a module treemap and a world map
    caption: Map page on where students come from.
facts:
  - value: 9 tables
    label: in the database
  - value: 1,178 inserts
    label: in the data script
  - value: 100 students
    label: tracked in the report
  - value: 2 pages
    label: in the Power BI report
---

- **Design**: requirements document, then conceptual and logical models in UML.
- **Database**: PostgreSQL script to create the schema and insert the data.
- **Queries**: SQL queries answering tracking questions, such as students with no grade for an assessment.
- **Analysis**: SQL view combining grades, students, modules and groups, imported into Excel for calculations.
- **Visualization**: Power BI report built on this view, with a tracking page and a map page.
