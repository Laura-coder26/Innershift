// Innershift — main.js
// Carica i post pubblicati dal localStorage e li mostra nella homepage

document.addEventListener('DOMContentLoaded', () => {
  loadPublicPosts();
  loadPublicEvents();
});

function loadPublicPosts() {
  const posts = JSON.parse(localStorage.getItem('innershift_posts') || '[]');
  const published = posts.filter(p => p.status === 'published');
  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  if (published.length === 0) return; // lascia i post di esempio statici

  grid.innerHTML = published.slice(0, 6).map(p => `
    <div class="post-card">
      <div class="post-cat">${p.category || 'Articolo'}</div>
      <h3 class="post-title">${p.title}</h3>
      <p class="post-excerpt">${p.summary || p.content.substring(0, 120) + '...'}</p>
      <div class="post-footer">
        <span class="post-date">${formatDate(p.date)}</span>
        <a href="#" class="post-link">Leggi →</a>
      </div>
    </div>
  `).join('');
}

function loadPublicEvents() {
  const events = JSON.parse(localStorage.getItem('innershift_events') || '[]');
  const list = document.getElementById('events-list');
  if (!list || events.length === 0) return;

  list.innerHTML = events.map(e => `
    <div class="event-item">
      <div class="event-date-box">
        <span class="event-day">${new Date(e.date).getDate()}</span>
        <span class="event-month">${new Date(e.date).toLocaleString('it', {month:'short'}).toUpperCase()}</span>
      </div>
      <div class="event-info">
        <h3>${e.title}</h3>
        <p>${e.time || ''}</p>
      </div>
      ${e.link ? `<a href="${e.link}" class="btn-outline-light" target="_blank">Iscriviti</a>` : ''}
    </div>
  `).join('');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── ANIMAZIONI SCROLL ───────────────────────────────────────────────────────
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.post-card, .resource-card, .review-card, .event-item, .stat-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ─── NEWSLETTER ──────────────────────────────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (!email) return;

  // Salva email in localStorage
  const emails = JSON.parse(localStorage.getItem('innershift_emails') || '[]');
  if (!emails.includes(email)) {
    emails.push(email);
    localStorage.setItem('innershift_emails', JSON.stringify(emails));
  }

  document.querySelector('.newsletter-form').style.display = 'none';
  document.getElementById('newsletter-success').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// ─── CARICA CONTENUTI DA SUPABASE ────────────────────────────────────────────

async function loadSupabaseContent() {
  try {
    // Carica articoli pubblicati
    const posts = await sbFetch('posts', { filter: 'status=eq.published', order: 'created_at.desc' });
    if (posts && posts.length > 0) {
      const grid = document.getElementById('posts-grid');
      if (grid) {
        grid.innerHTML = posts.slice(0, 6).map(p => `
          <div class="post-card">
            <div class="post-cat">${p.category || 'Articolo'}</div>
            <h3 class="post-title">${p.title}</h3>
            <p class="post-excerpt">${p.summary || p.content.substring(0, 120) + '...'}</p>
            <div class="post-footer">
              <span class="post-date">${formatDate(p.created_at)}</span>
              <a href="#" class="post-link">Leggi →</a>
            </div>
          </div>`).join('');
      }
    }

    // Carica eventi
    const events = await sbFetch('events', { order: 'event_date.asc' });
    if (events && events.length > 0) {
      const list = document.getElementById('events-list');
      if (list) {
        list.innerHTML = events.map(e => `
          <div class="event-item">
            <div class="event-date-box">
              <span class="event-day">${new Date(e.event_date).getDate()}</span>
              <span class="event-month">${new Date(e.event_date).toLocaleString('it', {month:'short'}).toUpperCase()}</span>
            </div>
            <div class="event-info">
              <h3>${e.title}</h3>
              <p>${e.event_time || ''}</p>
            </div>
            ${e.link ? `<a href="${e.link}" class="btn-outline-light" target="_blank">Iscriviti</a>` : ''}
          </div>`).join('');
      }
    }

    // Carica libri da Supabase e aggiunge alla griglia risorse
    const books = await sbFetch('books', { order: 'created_at.desc' });
    if (books && books.length > 0) {
      const grid = document.querySelector('.resources-grid');
      if (grid) {
        const booksHtml = books.map(b => `
          <div class="resource-card book-card-text">
            <div class="book-icon">${b.emoji || '📖'}</div>
            <div class="resource-icon">LIBRO CONSIGLIATO</div>
            <h3>${b.title}</h3>
            <p class="book-author">${b.author}</p>
            <p>${b.description || ''}</p>
            ${b.amazon_link ? `<a href="${b.amazon_link}" target="_blank" class="btn-download">Scopri su Amazon →</a>` : ''}
          </div>`).join('');
        grid.insertAdjacentHTML('afterbegin', booksHtml);
      }
    }

    // Carica citazioni da Supabase
    const quotes = await sbFetch('quotes', { order: 'created_at.desc' });
    if (quotes && quotes.length > 0) {
      const quoteSections = document.querySelectorAll('.site-quote p[data-i18n]');
      quotes.forEach((q, i) => {
        if (quoteSections[i]) {
          quoteSections[i].textContent = `"${q.quote_text}"`;
          const cite = quoteSections[i].nextElementSibling;
          if (cite) cite.textContent = `— ${q.author || ''}`;
        }
      });
    }

  } catch(e) {
    console.log('Supabase non raggiungibile, uso contenuti statici.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof sbFetch !== 'undefined') {
    loadSupabaseContent();
  }
});
