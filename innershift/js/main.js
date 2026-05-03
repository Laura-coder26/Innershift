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
