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
    'Portfolio de Sefer Tasdemir, Data Scientist : pipelines de données, BI et machine learning. En Master Machine Learning for AI à Lyon 2.',
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
  'stub.soon': 'Section à venir.',
  'stub.project': 'Page projet à venir.',
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
  'stub.soon': 'Section coming soon.',
  'stub.project': 'Project page coming soon.',
  'footer.mail': 'Email',
  'footer.back': 'Back to home',
};

const ui = { fr, en };

export const useTranslations = (lang: Lang) => (key: keyof typeof fr) => ui[lang][key];
