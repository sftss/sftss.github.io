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
    'Portfolio de Sefer Tasdemir, Data Scientist\u00a0: pipelines de données, BI et machine learning. En Master Machine Learning for AI à Lyon 2.',
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
    'En Master Machine Learning for AI à Lyon 2. Disponible pour un stage à Lyon à partir d’avril 2027, pour 2 mois ou plus.',
  'hero.projects': 'Voir mes projets',
  'hero.cv': 'Télécharger mon CV',
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
    'Portfolio of Sefer Tasdemir, Data Scientist: data pipelines, BI and machine learning. Master’s student in Machine Learning for AI at Lyon 2.',
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
    'Master’s student in Machine Learning for AI at Lyon 2. Available for an internship in Lyon from April 2027, for 2 months or more.',
  'hero.projects': 'See my projects',
  'hero.cv': 'Download my CV',
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
