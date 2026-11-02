export const langs = ['fr', 'en'] as const;
export type Lang = (typeof langs)[number];

export const cvUrl = (lang: Lang) =>
  `/assets/${lang === 'fr' ? 'FR' : 'EN'}%20Sefer%20Tasdemir%20CV.pdf`;

export const links = {
  linkedin: 'https://www.linkedin.com/in/sefertasdemir/',
  github: 'https://github.com/sftss',
  email: 'tasdemir.sefer74@gmail.com',
};

const fr = {
  'meta.title': 'Sefer Tasdemir | Data Scientist',
  'meta.description':
    'Portfolio de Sefer Tasdemir, Data Scientist\u00a0: pipelines de données, BI et machine learning. En Master Informatique à Lyon\u00a02.',
  'skip': 'Aller au contenu',
  'nav.label': 'Navigation principale',
  'nav.projects': 'Projets',
  'nav.experience': 'Expérience',
  'nav.about': 'À propos',
  'nav.contact': 'Contact',
  'nav.cv': 'CV',
  'lang.label': 'Choix de la langue',
  'lang.switch': 'Lire en français',
  'theme.dark': 'Mode sombre',
  'hero.title': 'Data Scientist',
  'hero.tagline': 'Full-stack data : du pipeline au modèle.',
  'hero.status':
    'En Master Informatique à Lyon\u00a02. Je cherche un stage d’au moins 308\u00a0heures à Lyon, à partir d’avril\u00a02027.',
  'hero.projects': 'Voir mes projets',
  'hero.cv': 'Voir mon CV',
  'cv.newTab': '(s’ouvre dans un nouvel onglet)',
  'chat.open': 'Une question\u00a0?',
  'chat.loading': 'Chargement…',
  'project.back': '← Tous les projets',
  'project.repo': 'Voir le dépôt GitHub',
  'project.context': 'Contexte',
  'project.team': 'Équipe et mon rôle',
  'project.approach': 'Démarche',
  'project.visuals': 'Visuels',
  'project.facts': 'Chiffres et faits',
  'project.learnings': 'Ce que j’en retiens',
  'project.others': 'Autres projets',
  'lightbox.label': 'Image agrandie',
  'lightbox.close': 'Fermer',
  'lightbox.prev': 'Image précédente',
  'lightbox.next': 'Image suivante',
  'embed.load': 'Charger le rapport Power BI',
  'embed.note': 'Hébergé par Microsoft : rien n’est chargé avant ce clic.',
  'embed.open': 'Ouvrir dans Power BI',
  'footer.mail': 'E-mail',
  'footer.back': 'Retour à l’accueil',
};

const en: typeof fr = {
  'meta.title': 'Sefer Tasdemir | Data Scientist',
  'meta.description':
    'Portfolio of Sefer Tasdemir, Data Scientist: data pipelines, BI and machine learning. Master’s student in Computer Science at Lyon\u00a02.',
  'skip': 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.cv': 'CV',
  'lang.label': 'Language selection',
  'lang.switch': 'Read in English',
  'theme.dark': 'Dark mode',
  'hero.title': 'Data Scientist',
  'hero.tagline': 'Full-stack data: from pipeline to model.',
  'hero.status':
    'Master’s student in Computer Science at Lyon\u00a02. Looking for an internship of at least 308\u00a0hours in Lyon, from April\u00a02027.',
  'hero.projects': 'See my projects',
  'hero.cv': 'View my CV',
  'cv.newTab': '(opens in a new tab)',
  'chat.open': 'Any questions?',
  'chat.loading': 'Loading…',
  'project.back': '← All projects',
  'project.repo': 'View the GitHub repository',
  'project.context': 'Context',
  'project.team': 'Team and my role',
  'project.approach': 'Approach',
  'project.visuals': 'Visuals',
  'project.facts': 'Facts and figures',
  'project.learnings': 'What I took away',
  'project.others': 'Other projects',
  'lightbox.label': 'Enlarged image',
  'lightbox.close': 'Close',
  'lightbox.prev': 'Previous image',
  'lightbox.next': 'Next image',
  'embed.load': 'Load the Power BI report',
  'embed.note': 'Hosted by Microsoft: nothing loads before this click.',
  'embed.open': 'Open in Power BI',
  'footer.mail': 'Email',
  'footer.back': 'Back to home',
};

const ui = { fr, en };

export const useTranslations = (lang: Lang) => (key: keyof typeof fr) => ui[lang][key];
