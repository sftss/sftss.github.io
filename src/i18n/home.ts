import type { Family } from '../lib/skills';
import type { Lang } from './ui';

export type Category = 'bi' | 'ml' | 'db' | 'graph' | 'app';

interface HomeContent {
  skills: {
    title: string;
    lead: string;
    listLead: string;
    showList: string;
    showGraph: string;
    skip: string;
    toolLabel: string;
    projectLabel: string;
    families: Record<Family, string>;
  };
  projects: {
    lead: string;
    filterLabel: string;
    all: string;
    status: string;
    categories: Record<Category, string>;
  };
  ai: {
    title: string;
    lead: string;
    repo: string;
    items: { title: string; text: string; tags: string[]; stat?: string; href?: string; linkLabel?: string }[];
  };
  experience: {
    work: string;
    education: string;
    jobs: { title: string; place: string; dates: string; points: string[] }[];
    degrees: { title: string; place: string; dates: string }[];
  };
  about: { paragraphs: string[]; facts: { label: string; value: string }[] };
  contact: { lead: string };
}

export const home: Record<Lang, HomeContent> = {
  fr: {
    skills: {
      title: 'Compétences et projets',
      lead: 'Survolez un outil ou parcourez le graphe au clavier pour voir où il a servi, et inversement depuis un projet.',
      listLead: 'Les outils que j’utilise, regroupés par famille, avec les projets où ils ont servi.',
      showList: 'Afficher en liste',
      showGraph: 'Afficher le graphe',
      skip: 'Passer le graphe',
      toolLabel: '{name}, utilisé dans\u00a0: {list}',
      projectLabel: 'Projet {name}, outils\u00a0: {list}',
      families: {
        db: 'Bases de données & SQL',
        bi: 'BI & visualisation',
        etl: 'ETL & cloud',
        ml: 'Machine learning',
        graph: 'Bases graphes',
        app: 'Développement applicatif',
      },
    },
    projects: {
      lead: 'Sept projets de groupe réalisés pendant mon BUT Informatique, de la base de données au modèle.',
      filterLabel: 'Filtrer par catégorie',
      all: 'Tous',
      status: 'Projets affichés : {n}',
      categories: {
        bi: 'BI',
        ml: 'Machine learning',
        db: 'Bases de données',
        graph: 'Graphes',
        app: 'Développement applicatif',
      },
    },
    ai: {
      title: 'Avec {brand}',
      lead: 'En dehors des cours, je construis mes propres outils avec Claude Code : briefs écrits, mémoire entre les sessions, skills, serveurs MCP et vérification de chaque résultat avant de l’accepter.',
      repo: 'Voir le dépôt GitHub',
      items: [
        {
          title: 'Cockpit TR',
          text: 'Un tableau de bord local pour suivre un portefeuille boursier : import CSV, graphiques, veille hebdomadaire et assistant branché sur l’API d’Anthropic.',
          tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'API Claude'],
          href: 'https://github.com/sftss/cockpit-tr',
        },
        {
          title: 'encyClaupedia',
          text: 'Mon site de veille, que j’enrichis au fil de l’eau\u00a0: une encyclopédie des outils d’IA pour construire des workflows d’agents, avec skills, mémoire, automatisation et économie de tokens.',
          tags: ['Veille', 'Agents IA', 'Claude', 'GitHub Pages'],
          href: 'https://sftss.github.io/encyClaupedia/',
          linkLabel: 'Voir le site',
        },
        {
          title: 'Vidéos verticales',
          text: 'Une chaîne de production de vidéos bilingues : script, voix, animation, sous-titres et rendu, jusqu’à la planification de la publication.',
          tags: ['Three.js', 'Python', 'Playwright', 'FFmpeg'],
          stat: 'Meilleure publication\u00a0: environ 350k vues et 20k likes',
        },
        {
          title: 'Jeux Roblox',
          text: 'Un premier jeu incrémental, un dépôt modèle réutilisable et une veille quotidienne sur Steam, YouTube et Reddit pour repérer des concepts.',
          tags: ['Luau', 'Rojo', 'MCP', 'Python'],
        },
      ],
    },
    experience: {
      work: 'Expérience',
      education: 'Formation',
      jobs: [
        {
          title: 'Data Analyst en alternance',
          place: 'Autoroutes et tunnel du Mont-Blanc',
          dates: 'Sept. 2025 à sept. 2026',
          points: [
            'Architecture décisionnelle sur Microsoft Fabric\u00a0: extraction depuis SQL Server, pipelines ETL en SQL et R, modélisation OLAP.',
            'Rapports Power BI automatisés pour piloter les indicateurs d’exploitation.',
            'Scripts R pour fiabiliser les transferts de données et suivre le trafic à partir des données radars.',
            'Migration d’une base Excel vers SQL Server.',
          ],
        },
        {
          title: 'Stage de technicien de maintenance informatique',
          place: 'Autoroutes et tunnel du Mont-Blanc',
          dates: 'Avr. à juin 2025',
          points: [
            'Dashboards Power BI avec une nouvelle charte graphique et Power Automate.',
            'Migration de GLPI d’un serveur Windows vers un serveur Linux, avec documentation.',
          ],
        },
        {
          title: 'Opérateur de production et agent de tri',
          place: 'Sodep KUHAIL, MPM et Molliex Frères',
          dates: 'Étés 2022 à 2025',
          points: ['Vérification, tri et inventaire des pièces, préparation et emballage.'],
        },
      ],
      degrees: [
        {
          title: 'Master Informatique, parcours SISE envisagé en M2',
          place: 'Université Lumière Lyon 2',
          dates: 'Depuis 2026',
        },
        {
          title: 'BUT Informatique, parcours administration, gestion et exploitation des données',
          place: 'USMB, IUT d’Annecy',
          dates: '2023 à 2026',
        },
        {
          title: 'Baccalauréat général avec mention assez bien, option mathématiques expertes',
          place: 'Lycée Guillaume Fichet',
          dates: '2020 à 2023',
        },
      ],
    },
    about: {
      paragraphs: [
        'Je suis Sefer Tasdemir. Après un BUT Informatique parcours AGED à l’IUT d’Annecy et un an d’alternance comme Data Analyst aux Autoroutes et tunnel du Mont-Blanc, je suis en Master Informatique à Lyon\u00a02, avec le parcours SISE envisagé en M2.',
        'Pragmatique et autonome, je veux mettre mes compétences en pratique au sein d’une équipe avec laquelle je partage mes valeurs.',
        'En dehors des cours, je construis mes propres outils avec Claude Code et je tiens une veille sur les outils d’IA, encyClaupedia.',
      ],
      facts: [
        { label: 'Formation', value: 'Master Informatique, Université Lumière Lyon\u00a02' },
        { label: 'Recherche', value: 'Stage d’au moins 308\u00a0heures à Lyon, dès avril\u00a02027' },
        { label: 'Langues', value: 'Français et turc (natifs), anglais professionnel (TOEIC\u00a0: 900\u00a0points)' },
        { label: 'Hors du code', value: 'Échecs, football, basketball, athlétisme et musculation' },
      ],
    },
    contact: {
      lead: 'Je cherche un stage d’au moins 308\u00a0heures à Lyon, à partir d’avril\u00a02027. Le plus simple pour me joindre\u00a0: un e-mail ou un message sur LinkedIn.',
    },
  },
  en: {
    skills: {
      title: 'Skills and projects',
      lead: 'Hover over a tool or browse the graph with the keyboard to see where it was used, and the other way around from a project.',
      listLead: 'The tools I use, grouped by family, with the projects where they were used.',
      showList: 'Show as a list',
      showGraph: 'Show the graph',
      skip: 'Skip the graph',
      toolLabel: '{name}, used in: {list}',
      projectLabel: 'Project {name}, tools: {list}',
      families: {
        db: 'Databases & SQL',
        bi: 'BI & visualization',
        etl: 'ETL & cloud',
        ml: 'Machine learning',
        graph: 'Graph databases',
        app: 'Application development',
      },
    },
    projects: {
      lead: 'Seven group projects from my BUT in Computer Science, from database to model.',
      filterLabel: 'Filter by category',
      all: 'All',
      status: 'Projects shown: {n}',
      categories: {
        bi: 'BI',
        ml: 'Machine learning',
        db: 'Databases',
        graph: 'Graphs',
        app: 'Application development',
      },
    },
    ai: {
      title: 'With {brand}',
      lead: 'Outside of class, I build my own tools with Claude Code: written briefs, memory across sessions, skills, MCP servers and checking every result before accepting it.',
      repo: 'View the GitHub repository',
      items: [
        {
          title: 'Cockpit TR',
          text: 'A local dashboard to track a stock portfolio: CSV import, charts, a weekly watch and an assistant connected to the Anthropic API.',
          tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Claude API'],
          href: 'https://github.com/sftss/cockpit-tr',
        },
        {
          title: 'encyClaupedia',
          text: 'My watch site, which I keep adding to: an encyclopedia of AI tools for building agent workflows, covering skills, memory, automation and token savings.',
          tags: ['Tech watch', 'AI agents', 'Claude', 'GitHub Pages'],
          href: 'https://sftss.github.io/encyClaupedia/',
          linkLabel: 'Visit the site',
        },
        {
          title: 'Vertical videos',
          text: 'A production pipeline for bilingual videos: script, voice, animation, subtitles and rendering, through to publication scheduling.',
          tags: ['Three.js', 'Python', 'Playwright', 'FFmpeg'],
          stat: 'Best post: about 350k views and 20k likes',
        },
        {
          title: 'Roblox games',
          text: 'A first incremental game, a reusable template repository and a daily watch on Steam, YouTube and Reddit to spot concepts.',
          tags: ['Luau', 'Rojo', 'MCP', 'Python'],
        },
      ],
    },
    experience: {
      work: 'Experience',
      education: 'Education',
      jobs: [
        {
          title: 'Data Analyst apprentice',
          place: 'Autoroutes et tunnel du Mont-Blanc',
          dates: 'Sep. 2025 to Sep. 2026',
          points: [
            'Decision-support architecture on Microsoft Fabric: extraction from SQL Server, ETL pipelines in SQL and R, OLAP modeling.',
            'Automated Power BI reports to steer operational KPIs.',
            'R scripts to make data transfers reliable and track traffic from radar data.',
            'Migration of an Excel database to SQL Server.',
          ],
        },
        {
          title: 'IT maintenance technician intern',
          place: 'Autoroutes et tunnel du Mont-Blanc',
          dates: 'Apr. to Jun. 2025',
          points: [
            'Power BI dashboards with a new design system and Power Automate.',
            'Migration of GLPI from a Windows server to a Linux server, with documentation.',
          ],
        },
        {
          title: 'Production operator and sorting agent',
          place: 'Sodep KUHAIL, MPM and Molliex Frères',
          dates: 'Summers 2022 to 2025',
          points: ['Checking, sorting and inventory of parts, preparation and packaging.'],
        },
      ],
      degrees: [
        {
          title: 'Master’s in Computer Science, SISE track planned for the second year',
          place: 'Université Lumière Lyon 2',
          dates: 'Since 2026',
        },
        {
          title: 'BUT in Computer Science, data administration, management and operations track',
          place: 'USMB, IUT d’Annecy',
          dates: '2023 to 2026',
        },
        {
          title: 'General Baccalaureate with honors, Advanced Mathematics elective',
          place: 'Lycée Guillaume Fichet',
          dates: '2020 to 2023',
        },
      ],
    },
    about: {
      paragraphs: [
        'I’m Sefer Tasdemir. After a BUT in Computer Science (AGED track) at IUT d’Annecy and a year as an apprentice Data Analyst at Autoroutes et tunnel du Mont-Blanc, I’m now doing a Master’s in Computer Science at Lyon\u00a02, with the SISE track planned for the second year.',
        'Pragmatic and autonomous, I want to put my skills into practice within a team whose values I share.',
        'Outside of class, I build my own tools with Claude Code and keep a watch on AI tools, encyClaupedia.',
      ],
      facts: [
        { label: 'Education', value: 'Master’s in Computer Science, Université Lumière Lyon\u00a02' },
        { label: 'Looking for', value: 'An internship of at least 308 hours in Lyon, from April\u00a02027' },
        { label: 'Languages', value: 'French and Turkish (native), professional English (TOEIC: 900 points)' },
        { label: 'Away from code', value: 'Chess, football, basketball, athletics and weight training' },
      ],
    },
    contact: {
      lead: 'I’m looking for an internship of at least 308\u00a0hours in Lyon, from April\u00a02027. The easiest way to reach me is by email or on LinkedIn.',
    },
  },
};
