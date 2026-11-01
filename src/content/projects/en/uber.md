---
title: Uber
summary: "A Laravel web app inspired by Uber and Uber Eats: map-based ride booking, PayPal payment, a chatbot and Power BI tracking."
order: 6
categories: [app, bi, db]
tags: [Laravel, PHP, PostgreSQL, JavaScript, Leaflet, Dialogflow, Power BI]
cover: ../../../assets/projects/uber/UberLogo.webp
coverAlt: Uber logo
repo: https://github.com/sftss/Uber
context: "SAE3.01 of the BUT in Computer Science, building an Uber application. The brief was to design the data management and develop an application covering passengers, drivers, rides, payments and bookings."
team: Group project.
role: I took the lead on the project and handled the technical side.
learnings: The main challenges and lessons came from managing the project and from setting up the initial requirements.
gallery:
  - src: ../../../assets/projects/uber/mainUber.webp
    alt: Dark home page offering to order a ride, book one or get a delivery
    caption: Application home page.
  - src: ../../../assets/projects/uber/courseUber.webp
    alt: Ride form next to a map showing the route
    caption: Ordering a ride, with the route on a map.
  - src: ../../../assets/projects/uber/restauUber.webp
    alt: Restaurant search by city and category, with a restaurant card
    caption: Food section, inspired by Uber Eats.
  - src: ../../../assets/projects/uber/chatUber.webp
    alt: Chatbot window explaining how to book a ride
    caption: Help chatbot built with Dialogflow.
  - src: ../../../assets/projects/uber/biUber1.webp
    alt: Power BI report of rides per month, with filters and KPIs
    caption: Rides per month.
  - src: ../../../assets/projects/uber/biUber2.webp
    alt: Power BI report of rides per month and by vehicle category
    caption: Rides by vehicle category.
  - src: ../../../assets/projects/uber/biUber3.webp
    alt: Map of France in the Power BI report, with bubbles sized by revenue
    caption: Map of rides by revenue.
facts:
  - value: 37 models
    label: Eloquent models in the application
  - value: 31 controllers
    label: and 91 Blade views
  - value: 5 integrations
    label: Leaflet, Nominatim, LocationIQ, PayPal and Dialogflow
---

- **Design**: UML diagrams, then conceptual and logical models in PowerAMC for PostgreSQL.
- **Application**: Laravel MVC development, with passenger and driver profiles, rides, bookings and a food section.
- **Integrations**: Leaflet map, address search with Nominatim and LocationIQ, PayPal payment and a Dialogflow chatbot.
- **Compliance**: cookie banner and privacy policy.
- **Tracking**: Power BI reports on rides and their geographic distribution, project tracking on Azure DevOps.
