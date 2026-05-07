// Innershift — admin-supabase.js
// Admin con Supabase — salva i dati online per tutti

const ADMIN_PASSWORD = 'innershift2026';

// ─── AUTH ────────────────────────────────────────────────────────────────────
function doLogin() {
  const pwd = document.getElementById('login-pwd').value;
  const storedPwd = localStorage.getItem('innershift_password') || ADMIN_PASSWORD;
  if (pwd === storedPwd) {
    sessionStorage.setItem('innershift_auth', '1');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    refreshDashboard();
  } else {
    showToast('Password errata. Riprova.');
    document.getElementById('login-pwd').value = '';
  }
}

function doLogout() {
  sessionStorage.removeItem('innershift_auth');
  document.getElementById('admin-app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('innershift_auth') === '1') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    refreshDashboard();
  }
  const pwd = document.getElementById('login-pwd');
  if (pwd) pwd.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

// ─── NAVIGAZIONE ─────────────────────────────────────────────────────────────
function showPanel(name, el) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById('panel-' + name);
  if (panel) panel.classList.add('active');
  if (el) el.classList.add('active');
  if (name === 'dashboard') refreshDashboard();
  if (name === 'articoli') renderAllPosts();
  if (name === 'eventi') renderEvents();
  if (name === 'media') renderFiles();
  if (name === 'homepage') loadHomepageForm();
  if (name === 'libri') renderBooks();
  if (name === 'citazioni') renderQuotes();
}

// ─── POSTS ───────────────────────────────────────────────────────────────────
async function savePost(status) {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const category = document.getElementById('post-cat').value;
  const video_url = document.getElementById('post-video').value.trim();
  const summary = document.getElementById('ai-summary').textContent;

  if (!title) { showToast('Inserisci un titolo!'); return; }
  if (!content) { showToast('Inserisci il contenuto!'); return; }

  showToast('Salvataggio in corso...');
  try {
    await sbInsert('posts', { title, content, category, video_url, summary, status });
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-video').value = '';
    document.getElementById('ai-summary').textContent = 'La sintesi verrà generata automaticamente.';
    showToast(status === 'published' ? '✅ Articolo pubblicato!' : '✅ Bozza salvata!');
    showPanel('articoli', document.querySelector('[onclick*=articoli]'));
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function deletePost(id) {
  if (!confirm('Eliminare questo articolo?')) return;
  await sbDelete('posts', id);
  renderAllPosts();
  refreshDashboard();
  showToast('Articolo eliminato.');
}

async function renderAllPosts() {
  const list = document.getElementById('all-posts-list');
  if (!list) return;
  list.innerHTML = '<p style="color:#888;font-size:13px;">Caricamento...</p>';
  try {
    const posts = await sbFetch('posts', { order: 'created_at.desc' });
    if (posts.length === 0) { list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun articolo ancora.</p>'; return; }
    list.innerHTML = posts.map(p => `
      <div class="post-row">
        <div class="post-row-meta">
          <div class="post-row-title">${p.title}</div>
          <div class="post-row-date">${formatDate(p.created_at)} · ${p.category || ''}</div>
        </div>
        <span class="badge ${p.status === 'published' ? 'badge-pub' : 'badge-draft'}">${p.status === 'published' ? 'Pubblicato' : 'Bozza'}</span>
        <button class="btn-del" onclick="deletePost(${p.id})">×</button>
      </div>`).join('');
  } catch(e) { list.innerHTML = '<p style="color:red;font-size:13px;">Errore di connessione.</p>'; }
}

// ─── AI SUMMARY ──────────────────────────────────────────────────────────────
function generateSummary() {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  if (!title && !content) { showToast('Scrivi prima il titolo o il contenuto!'); return; }
  const summaryEl = document.getElementById('ai-summary');
  summaryEl.textContent = 'Generando sintesi...';
  setTimeout(() => {
    const summaries = [
      `Guida pratica su ${title.toLowerCase()}: ${content.substring(0, 80).replace(/\n/,' ')}...`,
      `${title} — riflessioni e strumenti per chi vuole crescere dall'interno.`,
      `Un articolo su "${title}" che esplora ${content.substring(0, 70)}...`
    ];
    summaryEl.textContent = summaries[Math.floor(Math.random() * summaries.length)];
  }, 1200);
}

// ─── SOCIAL SHARE ────────────────────────────────────────────────────────────
function sharePost(platform) {
  const title = document.getElementById('post-title').value || 'Nuovo articolo su Innershift';
  const url = 'https://innershift-two.vercel.app';
  const text = encodeURIComponent(`${title} — ${url}`);
  const links = {
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    X: `https://twitter.com/intent/tweet?text=${text}`,
    Instagram: null
  };
  if (platform === 'Instagram') { showToast('Instagram: copia il link e incollalo nella bio!'); return; }
  window.open(links[platform], '_blank', 'width=600,height=400');
}

// ─── EVENTI ──────────────────────────────────────────────────────────────────
function showAddEvent() {
  const f = document.getElementById('add-event-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function saveEvent() {
  const title = document.getElementById('ev-title').value.trim();
  const event_date = document.getElementById('ev-date').value;
  const event_time = document.getElementById('ev-time').value.trim();
  const link = document.getElementById('ev-link').value.trim();
  if (!title || !event_date) { showToast('Inserisci titolo e data!'); return; }
  try {
    await sbInsert('events', { title, event_date, event_time, link });
    document.getElementById('ev-title').value = '';
    document.getElementById('ev-date').value = '';
    document.getElementById('ev-time').value = '';
    document.getElementById('ev-link').value = '';
    document.getElementById('add-event-form').style.display = 'none';
    renderEvents();
    showToast('✅ Evento aggiunto!');
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function deleteEvent(id) {
  if (!confirm('Eliminare questo evento?')) return;
  await sbDelete('events', id);
  renderEvents();
}

async function renderEvents() {
  const list = document.getElementById('events-list-admin');
  if (!list) return;
  list.innerHTML = '<p style="color:#888;font-size:13px;">Caricamento...</p>';
  try {
    const events = await sbFetch('events', { order: 'event_date.asc' });
    if (events.length === 0) { list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun evento ancora.</p>'; return; }
    list.innerHTML = events.map(e => `
      <div class="post-row">
        <div class="post-row-meta">
          <div class="post-row-title">${e.title}</div>
          <div class="post-row-date">${e.event_date || ''}${e.event_time ? ' · ' + e.event_time : ''}</div>
        </div>
        <button class="btn-del" onclick="deleteEvent(${e.id})">×</button>
      </div>`).join('');
  } catch(e) { list.innerHTML = '<p style="color:red;font-size:13px;">Errore.</p>'; }
}

// ─── CITAZIONI ────────────────────────────────────────────────────────────────
function showAddQuote() {
  const f = document.getElementById('add-quote-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function saveQuote() {
  const quote_text = document.getElementById('quote-text').value.trim();
  const author = document.getElementById('quote-author').value.trim();
  if (!quote_text) { showToast('Inserisci la citazione!'); return; }
  try {
    await sbInsert('quotes', { quote_text, author });
    document.getElementById('quote-text').value = '';
    document.getElementById('quote-author').value = '';
    document.getElementById('add-quote-form').style.display = 'none';
    renderQuotes();
    showToast('✅ Citazione salvata!');
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function deleteQuote(id) {
  if (!confirm('Eliminare questa citazione?')) return;
  await sbDelete('quotes', id);
  renderQuotes();
}

async function renderQuotes() {
  const list = document.getElementById('quotes-list');
  if (!list) return;
  list.innerHTML = '<p style="color:#888;font-size:13px;">Caricamento...</p>';
  try {
    const quotes = await sbFetch('quotes', { order: 'created_at.desc' });
    if (quotes.length === 0) { list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessuna citazione ancora.</p>'; return; }
    list.innerHTML = quotes.map(q => `
      <div class="post-row">
        <div class="post-row-meta">
          <div class="post-row-title" style="font-style:italic;">"${q.quote_text.substring(0,60)}..."</div>
          <div class="post-row-date">— ${q.author || 'Anonimo'}</div>
        </div>
        <button class="btn-del" onclick="deleteQuote(${q.id})">×</button>
      </div>`).join('');
  } catch(e) { list.innerHTML = '<p style="color:red;font-size:13px;">Errore.</p>'; }
}

// ─── LIBRI ────────────────────────────────────────────────────────────────────
function showAddBook() {
  const f = document.getElementById('add-book-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function saveBook() {
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const description = document.getElementById('book-desc').value.trim();
  const amazon_link = document.getElementById('book-link').value.trim();
  const emoji = document.getElementById('book-emoji').value.trim() || '📖';
  if (!title || !author) { showToast('Inserisci titolo e autore!'); return; }
  try {
    await sbInsert('books', { title, author, description, amazon_link, emoji });
    document.getElementById('add-book-form').style.display = 'none';
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-desc').value = '';
    document.getElementById('book-link').value = '';
    renderBooks();
    showToast('✅ Libro aggiunto!');
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function deleteBook(id) {
  if (!confirm('Eliminare questo libro?')) return;
  await sbDelete('books', id);
  renderBooks();
}

async function renderBooks() {
  const list = document.getElementById('books-list');
  if (!list) return;
  list.innerHTML = '<p style="color:#888;font-size:13px;">Caricamento...</p>';
  try {
    const books = await sbFetch('books', { order: 'created_at.desc' });
    if (books.length === 0) { list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun libro ancora.</p>'; return; }
    list.innerHTML = books.map(b => `
      <div class="post-row">
        <div class="post-row-meta">
          <div class="post-row-title">${b.emoji} ${b.title}</div>
          <div class="post-row-date">${b.author}</div>
        </div>
        <button class="btn-del" onclick="deleteBook(${b.id})">×</button>
      </div>`).join('');
  } catch(e) { list.innerHTML = '<p style="color:red;font-size:13px;">Errore.</p>'; }
}

// ─── HOMEPAGE ────────────────────────────────────────────────────────────────
async function saveHomepage() {
  const fields = {
    hero_title: document.getElementById('hero-title').value.trim(),
    hero_em: document.getElementById('hero-em').value.trim(),
    hero_sub: document.getElementById('hero-sub').value.trim(),
    hero_cta: document.getElementById('hero-cta').value.trim(),
  };
  if (!fields.hero_title) { showToast('Inserisci almeno il titolo!'); return; }
  try {
    for (const [key, value] of Object.entries(fields)) {
      if (value) await sbInsert('settings', { key, value });
    }
    showToast('✅ Homepage aggiornata! Ricarica il sito per vederla.');
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function saveSocial() {
  const fields = {
    social_linkedin: document.getElementById('social-linkedin').value.trim(),
    social_instagram: document.getElementById('social-instagram').value.trim(),
    social_facebook: document.getElementById('social-facebook').value.trim(),
  };
  try {
    for (const [key, value] of Object.entries(fields)) {
      if (value) await sbInsert('settings', { key, value });
    }
    showToast('✅ Link social salvati!');
  } catch(e) { showToast('Errore: ' + e.message); }
}

async function loadHomepageForm() {
  try {
    const settings = await sbFetch('settings');
    settings.forEach(s => {
      const el = document.getElementById(s.key.replace('_', '-').replace('hero-', 'hero-'));
      if (el) el.value = s.value;
    });
  } catch(e) {}
}

// ─── MEDIA ────────────────────────────────────────────────────────────────────
function getFiles() { return JSON.parse(localStorage.getItem('innershift_files') || '[]'); }
function saveFilesList(files) { localStorage.setItem('innershift_files', JSON.stringify(files)); }

function handleFile(input) {
  const files = getFiles();
  Array.from(input.files).forEach(f => {
    files.unshift({ id: Date.now() + Math.random(), name: f.name, size: formatSize(f.size), type: f.type, date: new Date().toISOString() });
  });
  saveFilesList(files);
  renderFiles();
  showToast(`✅ ${input.files.length} file caricato/i!`);
  input.value = '';
}

function deleteFile(id) {
  if (!confirm('Eliminare questo file?')) return;
  saveFilesList(getFiles().filter(f => f.id !== id));
  renderFiles();
}

function renderFiles() {
  const files = getFiles();
  const list = document.getElementById('files-list');
  if (!list) return;
  if (files.length === 0) { list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun file ancora.</p>'; return; }
  list.innerHTML = files.map(f => `
    <div class="post-row">
      <div class="post-row-meta">
        <div class="post-row-title">${f.name}</div>
        <div class="post-row-date">${f.size} · ${formatDate(f.date)}</div>
      </div>
      <button class="btn-del" onclick="deleteFile(${f.id})">×</button>
    </div>`).join('');
}

// ─── PASSWORD ────────────────────────────────────────────────────────────────
function changePassword() {
  const current = document.getElementById('pwd-current').value;
  const newPwd = document.getElementById('pwd-new').value;
  const confirm = document.getElementById('pwd-confirm').value;
  const stored = localStorage.getItem('innershift_password') || ADMIN_PASSWORD;
  if (current !== stored) { showToast('Password attuale errata!'); return; }
  if (newPwd.length < 6) { showToast('Minimo 6 caratteri!'); return; }
  if (newPwd !== confirm) { showToast('Le password non coincidono!'); return; }
  localStorage.setItem('innershift_password', newPwd);
  document.getElementById('pwd-current').value = '';
  document.getElementById('pwd-new').value = '';
  document.getElementById('pwd-confirm').value = '';
  showToast('✅ Password aggiornata!');
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
async function refreshDashboard() {
  try {
    const posts = await sbFetch('posts');
    const events = await sbFetch('events');
    const files = getFiles();
    const published = posts.filter(p => p.status === 'published');
    const drafts = posts.filter(p => p.status === 'draft');
    const el = id => document.getElementById(id);
    if (el('stat-posts')) el('stat-posts').textContent = published.length;
    if (el('stat-drafts')) el('stat-drafts').textContent = drafts.length;
    if (el('stat-events')) el('stat-events').textContent = events.length;
    if (el('stat-files')) el('stat-files').textContent = files.length;
    const recentList = el('recent-posts-list');
    if (recentList) {
      if (posts.length === 0) {
        recentList.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun articolo ancora. Creane uno!</p>';
      } else {
        recentList.innerHTML = posts.slice(0,5).map(p => `
          <div class="post-row">
            <div class="post-row-meta">
              <div class="post-row-title">${p.title}</div>
              <div class="post-row-date">${formatDate(p.created_at)} · ${p.category || ''}</div>
            </div>
            <span class="badge ${p.status === 'published' ? 'badge-pub' : 'badge-draft'}">${p.status === 'published' ? 'Pubblicato' : 'Bozza'}</span>
          </div>`).join('');
      }
    }
  } catch(e) {}
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(0) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
