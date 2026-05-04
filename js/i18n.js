// Innershift — i18n.js
// Traduzioni in italiano, inglese, francese, spagnolo e tedesco

const translations = {
  it: {
    flag: '🇮🇹', label: 'IT',
    nav_articles: 'Articoli', nav_events: 'Eventi', nav_resources: 'Risorse',
    hero_label: 'Crescita personale',
    hero_title: 'Il cambiamento', hero_title_em: 'parte da dentro',
    hero_sub: 'Articoli, workshop e risorse per chi vuole vivere con più consapevolezza, intenzione e profondità.',
    hero_cta: 'Esplora i contenuti',
    articles_title: 'Articoli recenti', articles_sub: 'Riflessioni, guide pratiche e spunti per la tua crescita',
    cat_habits: 'Abitudini', cat_mindfulness: 'Mindfulness', cat_wellness: 'Benessere',
    post1_title: 'Come costruire abitudini che durano nel tempo',
    post1_excerpt: 'Le abitudini sono il fondamento della crescita. Scopri come costruirle partendo da piccoli gesti quotidiani.',
    post2_title: 'Meditazione per principianti: da dove cominciare',
    post2_excerpt: 'Una guida semplice e pratica per iniziare a meditare, anche se non hai mai provato prima.',
    post3_title: 'I 5 pilastri del benessere mentale',
    post3_excerpt: 'Sonno, movimento, connessione, scopo e riflessione: le fondamenta di una mente in equilibrio.',
    read_more: 'Leggi →',
    events_title: 'Prossimi eventi', events_sub: 'Workshop, webinar e sessioni dal vivo',
    event1_title: 'Workshop: Costruire abitudini durature', event1_detail: 'Online via Zoom · 10:00 – 12:00 · Gratuito',
    event2_title: 'Webinar: Journaling profondo', event2_detail: 'Online · 18:30 – 20:00 · Posti limitati',
    register: 'Iscriviti',
    resources_title: 'Risorse gratuite', resources_sub: 'Guide e template da scaricare',
    label_book: 'LIBRO CONSIGLIATO', book_desc: 'di James Clear — Il bestseller su come piccole abitudini quotidiane portano a grandi cambiamenti nel tempo.',
    discover_book: 'Scopri su Amazon →',
    res1_title: 'Guida alla meditazione', res1_desc: 'Una guida pratica di 20 pagine per iniziare a meditare ogni giorno.',
    res2_title: 'Template journal settimanale', res2_desc: 'Il template che uso ogni settimana per riflettere e pianificare con intenzione.',
    res3_title: 'Piano benessere 30 giorni', res3_desc: 'Un programma giorno per giorno per costruire routine sane e sostenibili.',
    download_free: 'Scarica gratis',
    mindful_desc: 'Il mio libro di ricette senza farine integrali e senza lattosio — gustoso, sano e consapevole.',
    video_title: 'Video consigliati', video_sub: 'Contenuti video per ispirarti nel tuo percorso di crescita',
    reviews_title: 'Cosa dicono i lettori', reviews_sub: 'Storie reali di chi ha iniziato il suo percorso di crescita',
    review1_text: '"Innershift ha cambiato il mio modo di vedere le abitudini. Piccoli passi, grandi risultati."',
    review1_role: 'Lettore — Milano',
    review2_text: '"Il libro Mindful Meals è straordinario. Ricette sane che fanno bene anche all'anima!"',
    review2_role: 'Lettrice — Roma',
    review3_text: '"I workshop sono profondi e pratici. Ho trovato strumenti concreti per vivere con più intenzione."',
    review3_role: 'Partecipante workshop — Torino',
    newsletter_title: 'Resta in contatto', newsletter_sub: 'Iscriviti e ricevi articoli, risorse e aggiornamenti sugli eventi.',
    newsletter_placeholder: 'La tua email...', newsletter_btn: 'Iscriviti gratis',
    newsletter_note: 'Nessuno spam. Puoi disiscriverti in qualsiasi momento.',
    newsletter_thanks: 'Grazie! Ti contatteremo presto. 🌱',
    footer_tagline: 'Il cambiamento parte da dentro.', footer_copy: '© 2026 Innershift — Tutti i diritti riservati'
  },
  en: {
    flag: '🇬🇧', label: 'EN',
    nav_articles: 'Articles', nav_events: 'Events', nav_resources: 'Resources',
    hero_label: 'Personal growth',
    hero_title: 'Change', hero_title_em: 'starts from within',
    hero_sub: 'Articles, workshops and resources for those who want to live with more awareness, intention and depth.',
    hero_cta: 'Explore content',
    articles_title: 'Recent articles', articles_sub: 'Reflections, practical guides and insights for your growth',
    cat_habits: 'Habits', cat_mindfulness: 'Mindfulness', cat_wellness: 'Wellness',
    post1_title: 'How to build habits that last',
    post1_excerpt: 'Habits are the foundation of growth. Discover how to build them starting from small daily actions.',
    post2_title: 'Meditation for beginners: where to start',
    post2_excerpt: 'A simple and practical guide to start meditating, even if you have never tried before.',
    post3_title: 'The 5 pillars of mental wellbeing',
    post3_excerpt: 'Sleep, movement, connection, purpose and reflection: the foundation of a balanced mind.',
    read_more: 'Read →',
    events_title: 'Upcoming events', events_sub: 'Workshops, webinars and live sessions',
    event1_title: 'Workshop: Building lasting habits', event1_detail: 'Online via Zoom · 10:00 – 12:00 · Free',
    event2_title: 'Webinar: Deep journaling', event2_detail: 'Online · 18:30 – 20:00 · Limited seats',
    register: 'Register',
    resources_title: 'Free resources', resources_sub: 'Guides and templates to download',
    label_book: 'RECOMMENDED BOOK', book_desc: 'by James Clear — The bestseller on how small daily habits lead to big changes over time.',
    discover_book: 'Discover on Amazon →',
    res1_title: 'Meditation guide', res1_desc: 'A practical 20-page guide to start meditating every day.',
    res2_title: 'Weekly journal template', res2_desc: 'The template I use every week to reflect and plan with intention.',
    res3_title: '30-day wellness plan', res3_desc: 'A day-by-day program to build healthy and sustainable routines.',
    download_free: 'Download free',
    mindful_desc: 'My recipe book with no whole grain flours and no lactose — tasty, healthy and mindful.',
    video_title: 'Recommended videos', video_sub: 'Video content to inspire you on your growth journey',
    reviews_title: 'What readers say', reviews_sub: 'Real stories from people who started their growth journey',
    review1_text: '"Innershift changed the way I see habits. Small steps, big results."',
    review1_role: 'Reader — Milan',
    review2_text: '"Mindful Meals is extraordinary. Healthy recipes that nourish the soul too!"',
    review2_role: 'Reader — Rome',
    review3_text: '"The workshops are deep and practical. I found real tools to live with more intention."',
    review3_role: 'Workshop participant — Turin',
    newsletter_title: 'Stay in touch', newsletter_sub: 'Subscribe and receive articles, resources and event updates.',
    newsletter_placeholder: 'Your email...', newsletter_btn: 'Subscribe free',
    newsletter_note: 'No spam. Unsubscribe anytime.',
    newsletter_thanks: 'Thank you! We will be in touch soon. 🌱',
    footer_tagline: 'Change starts from within.', footer_copy: '© 2026 Innershift — All rights reserved'
  },
  fr: {
    flag: '🇫🇷', label: 'FR',
    nav_articles: 'Articles', nav_events: 'Événements', nav_resources: 'Ressources',
    hero_label: 'Croissance personnelle',
    hero_title: 'Le changement', hero_title_em: "vient de l'intérieur",
    hero_sub: "Articles, ateliers et ressources pour ceux qui veulent vivre avec plus de conscience, d'intention et de profondeur.",
    hero_cta: 'Explorer le contenu',
    articles_title: 'Articles récents', articles_sub: 'Réflexions, guides pratiques et idées pour votre croissance',
    cat_habits: 'Habitudes', cat_mindfulness: 'Pleine conscience', cat_wellness: 'Bien-être',
    post1_title: 'Comment construire des habitudes durables',
    post1_excerpt: 'Les habitudes sont le fondement de la croissance. Découvrez comment les construire à partir de petits gestes quotidiens.',
    post2_title: 'Méditation pour débutants: par où commencer',
    post2_excerpt: "Un guide simple et pratique pour commencer à méditer, même si vous n'avez jamais essayé.",
    post3_title: 'Les 5 piliers du bien-être mental',
    post3_excerpt: "Sommeil, mouvement, connexion, but et réflexion: les fondements d'un esprit équilibré.",
    read_more: 'Lire →',
    events_title: 'Prochains événements', events_sub: 'Ateliers, webinaires et sessions en direct',
    event1_title: 'Atelier: Construire des habitudes durables', event1_detail: 'En ligne via Zoom · 10:00 – 12:00 · Gratuit',
    event2_title: 'Webinaire: Journaling profond', event2_detail: 'En ligne · 18:30 – 20:00 · Places limitées',
    register: "S'inscrire",
    resources_title: 'Ressources gratuites', resources_sub: 'Guides et modèles à télécharger',
    label_book: 'LIVRE CONSEILLÉ', book_desc: 'par James Clear — Le bestseller sur comment de petites habitudes quotidiennes mènent à de grands changements.',
    discover_book: 'Découvrir sur Amazon →',
    res1_title: 'Guide de méditation', res1_desc: 'Un guide pratique de 20 pages pour commencer à méditer chaque jour.',
    res2_title: 'Modèle de journal hebdomadaire', res2_desc: "Le modèle que j'utilise chaque semaine pour réfléchir et planifier.",
    res3_title: 'Plan bien-être 30 jours', res3_desc: 'Un programme jour par jour pour construire des routines saines et durables.',
    download_free: 'Télécharger gratuitement',
    mindful_desc: 'Mon livre de recettes sans farines complètes et sans lactose — savoureux, sain et conscient.',
    video_title: 'Vidéos recommandées', video_sub: 'Contenu vidéo pour vous inspirer dans votre parcours de croissance',
    reviews_title: 'Ce que disent les lecteurs', reviews_sub: 'Histoires réelles de ceux qui ont commencé leur parcours de croissance',
    review1_text: '"Innershift a changé ma façon de voir les habitudes. Petits pas, grands résultats."',
    review1_role: 'Lecteur — Milan',
    review2_text: '"Mindful Meals est extraordinaire. Des recettes saines qui nourrissent aussi l'âme!"',
    review2_role: 'Lectrice — Rome',
    review3_text: '"Les ateliers sont profonds et pratiques. J'ai trouvé des outils concrets pour vivre avec plus d'intention."',
    review3_role: 'Participante atelier — Turin',
    newsletter_title: 'Restons en contact', newsletter_sub: 'Inscrivez-vous et recevez articles, ressources et mises à jour.',
    newsletter_placeholder: 'Votre email...', newsletter_btn: 'S'inscrire gratuitement',
    newsletter_note: 'Pas de spam. Désinscription à tout moment.',
    newsletter_thanks: 'Merci! Nous vous contacterons bientôt. 🌱',
    footer_tagline: "Le changement vient de l'intérieur.", footer_copy: '© 2026 Innershift — Tous droits réservés'
  },
  es: {
    flag: '🇪🇸', label: 'ES',
    nav_articles: 'Artículos', nav_events: 'Eventos', nav_resources: 'Recursos',
    hero_label: 'Crecimiento personal',
    hero_title: 'El cambio', hero_title_em: 'viene desde dentro',
    hero_sub: 'Artículos, talleres y recursos para quienes quieren vivir con más conciencia, intención y profundidad.',
    hero_cta: 'Explorar contenido',
    articles_title: 'Artículos recientes', articles_sub: 'Reflexiones, guías prácticas e ideas para tu crecimiento',
    cat_habits: 'Hábitos', cat_mindfulness: 'Mindfulness', cat_wellness: 'Bienestar',
    post1_title: 'Cómo construir hábitos que duran en el tiempo',
    post1_excerpt: 'Los hábitos son la base del crecimiento. Descubre cómo construirlos a partir de pequeños gestos cotidianos.',
    post2_title: 'Meditación para principiantes: por dónde empezar',
    post2_excerpt: 'Una guía simple y práctica para empezar a meditar, aunque nunca lo hayas intentado.',
    post3_title: 'Los 5 pilares del bienestar mental',
    post3_excerpt: 'Sueño, movimiento, conexión, propósito y reflexión: los cimientos de una mente equilibrada.',
    read_more: 'Leer →',
    events_title: 'Próximos eventos', events_sub: 'Talleres, webinars y sesiones en vivo',
    event1_title: 'Taller: Construir hábitos duraderos', event1_detail: 'En línea via Zoom · 10:00 – 12:00 · Gratuito',
    event2_title: 'Webinar: Journaling profundo', event2_detail: 'En línea · 18:30 – 20:00 · Plazas limitadas',
    register: 'Inscribirse',
    resources_title: 'Recursos gratuitos', resources_sub: 'Guías y plantillas para descargar',
    label_book: 'LIBRO CONSIGLIATO', book_desc: 'de James Clear — El bestseller sobre cómo pequeños hábitos diarios llevan a grandes cambios con el tiempo.',
    discover_book: 'Descubrir en Amazon →',
    res1_title: 'Guía de meditación', res1_desc: 'Una guía práctica de 20 páginas para empezar a meditar cada día.',
    res2_title: 'Plantilla de diario semanal', res2_desc: 'La plantilla que uso cada semana para reflexionar y planificar con intención.',
    res3_title: 'Plan bienestar 30 días', res3_desc: 'Un programa día a día para construir rutinas saludables y sostenibles.',
    download_free: 'Descargar gratis',
    mindful_desc: 'Mi libro de recetas sin harinas integrales y sin lactosa — sabroso, saludable y consciente.',
    video_title: 'Videos recomendados', video_sub: 'Contenido en video para inspirarte en tu camino de crecimiento',
    reviews_title: 'Lo que dicen los lectores', reviews_sub: 'Historias reales de quienes comenzaron su camino de crecimiento',
    review1_text: '"Innershift cambió mi forma de ver los hábitos. Pequeños pasos, grandes resultados."',
    review1_role: 'Lector — Milán',
    review2_text: '"Mindful Meals es extraordinario. Recetas saludables que también nutren el alma."',
    review2_role: 'Lectora — Roma',
    review3_text: '"Los talleres son profundos y prácticos. Encontré herramientas concretas para vivir con más intención."',
    review3_role: 'Participante taller — Turín',
    newsletter_title: 'Mantente en contacto', newsletter_sub: 'Suscríbete y recibe artículos, recursos y actualizaciones de eventos.',
    newsletter_placeholder: 'Tu email...', newsletter_btn: 'Suscribirse gratis',
    newsletter_note: 'Sin spam. Cancela cuando quieras.',
    newsletter_thanks: 'Gracias! Te contactaremos pronto. 🌱',
    footer_tagline: 'El cambio viene desde dentro.', footer_copy: '© 2026 Innershift — Todos los derechos reservados'
  },
  de: {
    flag: '🇩🇪', label: 'DE',
    nav_articles: 'Artikel', nav_events: 'Veranstaltungen', nav_resources: 'Ressourcen',
    hero_label: 'Persönliches Wachstum',
    hero_title: 'Veränderung', hero_title_em: 'beginnt von innen',
    hero_sub: 'Artikel, Workshops und Ressourcen für alle, die bewusster, intentionaler und tiefer leben möchten.',
    hero_cta: 'Inhalte entdecken',
    articles_title: 'Aktuelle Artikel', articles_sub: 'Reflexionen, praktische Leitfäden und Impulse für dein Wachstum',
    cat_habits: 'Gewohnheiten', cat_mindfulness: 'Achtsamkeit', cat_wellness: 'Wohlbefinden',
    post1_title: 'Wie man dauerhafte Gewohnheiten aufbaut',
    post1_excerpt: 'Gewohnheiten sind das Fundament des Wachstums. Entdecke, wie du sie mit kleinen täglichen Schritten aufbaust.',
    post2_title: 'Meditation für Anfänger: Wo anfangen',
    post2_excerpt: 'Ein einfacher und praktischer Leitfaden, um mit der Meditation zu beginnen, auch wenn du es nie versucht hast.',
    post3_title: 'Die 5 Säulen des mentalen Wohlbefindens',
    post3_excerpt: 'Schlaf, Bewegung, Verbindung, Zweck und Reflexion: die Grundlagen eines ausgeglichenen Geistes.',
    read_more: 'Lesen →',
    events_title: 'Kommende Veranstaltungen', events_sub: 'Workshops, Webinare und Live-Sessions',
    event1_title: 'Workshop: Dauerhafte Gewohnheiten aufbauen', event1_detail: 'Online via Zoom · 10:00 – 12:00 · Kostenlos',
    event2_title: 'Webinar: Tiefes Journaling', event2_detail: 'Online · 18:30 – 20:00 · Begrenzte Plätze',
    register: 'Anmelden',
    resources_title: 'Kostenlose Ressourcen', resources_sub: 'Leitfäden und Vorlagen zum Herunterladen',
    label_book: 'BUCHEMPFEHLUNG', book_desc: 'von James Clear — Der Bestseller darüber, wie kleine tägliche Gewohnheiten zu großen Veränderungen führen.',
    discover_book: 'Bei Amazon entdecken →',
    res1_title: 'Meditationsleitfaden', res1_desc: 'Ein praktischer 20-seitiger Leitfaden, um täglich zu meditieren.',
    res2_title: 'Wöchentliche Journal-Vorlage', res2_desc: 'Die Vorlage, die ich jede Woche nutze, um zu reflektieren und mit Intention zu planen.',
    res3_title: '30-Tage-Wohlbefindenplan', res3_desc: 'Ein Tages-für-Tages-Programm für gesunde und nachhaltige Routinen.',
    download_free: 'Kostenlos herunterladen',
    mindful_desc: 'Mein Rezeptbuch ohne Vollkornmehl und ohne Laktose — lecker, gesund und bewusst.',
    video_title: 'Empfohlene Videos', video_sub: 'Videoinhalte, die dich auf deinem Wachstumsweg inspirieren',
    reviews_title: 'Was Leser sagen', reviews_sub: 'Echte Geschichten von Menschen auf ihrem Wachstumsweg',
    review1_text: '"Innershift hat meine Sichtweise auf Gewohnheiten verändert. Kleine Schritte, große Ergebnisse."',
    review1_role: 'Leser — Mailand',
    review2_text: '"Mindful Meals ist außergewöhnlich. Gesunde Rezepte, die auch die Seele nähren!"',
    review2_role: 'Leserin — Rom',
    review3_text: '"Die Workshops sind tiefgründig und praktisch. Ich fand konkrete Werkzeuge für ein intentionales Leben."',
    review3_role: 'Workshop-Teilnehmerin — Turin',
    newsletter_title: 'In Kontakt bleiben', newsletter_sub: 'Abonniere und erhalte Artikel, Ressourcen und Veranstaltungs-Updates.',
    newsletter_placeholder: 'Deine E-Mail...', newsletter_btn: 'Kostenlos abonnieren',
    newsletter_note: 'Kein Spam. Jederzeit abmelden.',
    newsletter_thanks: 'Danke! Wir melden uns bald. 🌱',
    footer_tagline: 'Veränderung beginnt von innen.', footer_copy: '© 2026 Innershift — Alle Rechte vorbehalten'
  }
};

// ─── LINGUA ATTIVA ────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('innershift_lang') || 'it';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('innershift_lang', lang);
  applyTranslations();
  closeLangMenu();
  document.getElementById('current-lang-flag').textContent = translations[lang].flag;
  document.getElementById('current-lang-label').textContent = translations[lang].label;
  document.documentElement.lang = lang;
}

function applyTranslations() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}

function toggleLangMenu() {
  document.getElementById('lang-menu').classList.toggle('open');
}

function closeLangMenu() {
  document.getElementById('lang-menu').classList.remove('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.lang-selector')) closeLangMenu();
});

document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});
