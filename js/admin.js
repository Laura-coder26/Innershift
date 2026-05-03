// Innershift — admin.js
// CMS completo con localStorage: post, eventi, media, login

const ADMIN_PASSWORD = 'innershift2026';

// ─── AUTH ───────────────────────────────────────────────────────────────────

function doLogin() {
  const pwd = document.getElementById('login-pwd').value;
  if (pwd === ADMIN_PASSWORD) {
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
  // Login con tasto Invio
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
}

// ─── POSTS ───────────────────────────────────────────────────────────────────

function getPosts() {
  return JSON.parse(localStorage.getItem('innershift_posts') || '[]');
}
function savePosts(posts) {
  localStorage.setItem('innershift_posts', JSON.stringify(posts));
}

function savePost(status) {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const category = document.getElementById('post-cat').value;
  const video = document.getElementById('post-video').value.trim();
  const summary = document.getElementById('ai-summary').textContent;
  const seoTitle = document.getElementById('seo-title').value.trim();
  const seoDesc = document.getElementById('seo-desc').value.trim();

  if (!title) { showToast('Inserisci un titolo!'); return; }
  if (!content) { showToast('Inserisci il contenuto!'); return; }

  const posts = getPosts();
  const post = {
    id: Date.now(),
    title,
    content,
    category,
    video,
    summary,
    seoTitle,
    seoDesc,
    status,
    date: new Date().toISOString()
  };
  posts.unshift(post);
  savePosts(posts);

  // Reset form
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-video').value = '';
  document.getElementById('ai-summary').textContent = 'La sintesi verrà generata automaticamente.';

  showToast(status === 'published' ? 'Articolo pubblicato!' : 'Bozza salvata!');
  showPanel('articoli', document.querySelector('[onclick*=articoli]'));
}

function deletePost(id) {
  if (!confirm('Eliminare questo articolo?')) return;
  const posts = getPosts().filter(p => p.id !== id);
  savePosts(posts);
  renderAllPosts();
  refreshDashboard();
  showToast('Articolo eliminato.');
}

function renderAllPosts() {
  const posts = getPosts();
  const list = document.getElementById('all-posts-list');
  if (!list) return;
  if (posts.length === 0) {
    list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun articolo ancora.</p>';
    return;
  }
  list.innerHTML = posts.map(p => `
    <div class="post-row">
      <div class="post-row-meta">
        <div class="post-row-title">${p.title}</div>
        <div class="post-row-date">${formatDate(p.date)} · ${p.category}</div>
      </div>
      <span class="badge ${p.status === 'published' ? 'badge-pub' : 'badge-draft'}">
        ${p.status === 'published' ? 'Pubblicato' : 'Bozza'}
      </span>
      <button class="btn-del" onclick="deletePost(${p.id})" title="Elimina">×</button>
    </div>
  `).join('');
}

// ─── AI SUMMARY ──────────────────────────────────────────────────────────────

function generateSummary() {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  if (!title && !content) { showToast('Scrivi prima il titolo o il contenuto!'); return; }

  const summaryEl = document.getElementById('ai-summary');
  summaryEl.textContent = 'Generando sintesi...';

  // Sintesi automatica locale (senza API esterna)
  setTimeout(() => {
    const words = (title + ' ' + content).split(' ').slice(0, 30).join(' ');
    const summaries = [
      `Un articolo su "${title}" che esplora ${content.substring(0, 80)}...`,
      `Guida pratica su ${title.toLowerCase()}: ${content.substring(0, 90).replace(/\n/g,' ')}...`,
      `${title} — riflessioni e strumenti pratici per chi vuole crescere e trasformarsi dall'interno.`
    ];
    summaryEl.textContent = summaries[Math.floor(Math.random() * summaries.length)];
  }, 1200);
}

// ─── SOCIAL SHARE ────────────────────────────────────────────────────────────

function sharePost(platform) {
  const title = document.getElementById('post-title').value || 'Nuovo articolo su Innershift';
  const url = 'https://innershift.vercel.app';
  const text = encodeURIComponent(`${title} — ${url}`);

  const links = {
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    X: `https://twitter.com/intent/tweet?text=${text}`,
    Instagram: null
  };

  if (platform === 'Instagram') {
    showToast('Instagram: copia il link e incollalo nella bio o nelle storie!');
    return;
  }
  window.open(links[platform], '_blank', 'width=600,height=400');
  showToast(`Aperta finestra di condivisione su ${platform}`);
}

// ─── EVENTI ──────────────────────────────────────────────────────────────────

function getEvents() {
  return JSON.parse(localStorage.getItem('innershift_events') || '[]');
}
function saveEvents(events) {
  localStorage.setItem('innershift_events', JSON.stringify(events));
}

function showAddEvent() {
  const form = document.getElementById('add-event-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveEvent() {
  const title = document.getElementById('ev-title').value.trim();
  const date = document.getElementById('ev-date').value;
  const time = document.getElementById('ev-time').value.trim();
  const link = document.getElementById('ev-link').value.trim();

  if (!title || !date) { showToast('Inserisci titolo e data!'); return; }

  const events = getEvents();
  events.push({ id: Date.now(), title, date, time, link });
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  saveEvents(events);

  document.getElementById('ev-title').value = '';
  document.getElementById('ev-date').value = '';
  document.getElementById('ev-time').value = '';
  document.getElementById('ev-link').value = '';
  document.getElementById('add-event-form').style.display = 'none';

  renderEvents();
  showToast('Evento aggiunto!');
}

function deleteEvent(id) {
  if (!confirm('Eliminare questo evento?')) return;
  saveEvents(getEvents().filter(e => e.id !== id));
  renderEvents();
  showToast('Evento eliminato.');
}

function renderEvents() {
  const events = getEvents();
  const list = document.getElementById('events-list-admin');
  if (!list) return;
  if (events.length === 0) {
    list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun evento ancora.</p>';
    return;
  }
  list.innerHTML = events.map(e => `
    <div class="post-row">
      <div class="post-row-meta">
        <div class="post-row-title">${e.title}</div>
        <div class="post-row-date">${formatDate(e.date)}${e.time ? ' · ' + e.time : ''}</div>
      </div>
      ${e.link ? `<a href="${e.link}" target="_blank" style="font-size:12px;color:#8B6F4E;">Link →</a>` : ''}
      <button class="btn-del" onclick="deleteEvent(${e.id})" title="Elimina">×</button>
    </div>
  `).join('');
}

// ─── MEDIA / FILE ─────────────────────────────────────────────────────────────

function getFiles() {
  return JSON.parse(localStorage.getItem('innershift_files') || '[]');
}
function saveFilesList(files) {
  localStorage.setItem('innershift_files', JSON.stringify(files));
}

function handleFile(input) {
  const files = getFiles();
  Array.from(input.files).forEach(f => {
    files.unshift({ id: Date.now() + Math.random(), name: f.name, size: formatSize(f.size), type: f.type, date: new Date().toISOString() });
  });
  saveFilesList(files);
  renderFiles();
  showToast(`${input.files.length} file caricato/i!`);
  input.value = '';
}

function deleteFile(id) {
  if (!confirm('Eliminare questo file?')) return;
  saveFilesList(getFiles().filter(f => f.id !== id));
  renderFiles();
  showToast('File eliminato.');
}

function renderFiles() {
  const files = getFiles();
  const list = document.getElementById('files-list');
  if (!list) return;
  if (files.length === 0) {
    list.innerHTML = '<p style="color:#888;font-size:13px;padding:16px 0;">Nessun file ancora.</p>';
    return;
  }
  list.innerHTML = files.map(f => `
    <div class="post-row">
      <div class="post-row-meta">
        <div class="post-row-title">${f.name}</div>
        <div class="post-row-date">${f.size} · ${formatDate(f.date)}</div>
      </div>
      <button class="btn-del" onclick="deleteFile(${f.id})" title="Elimina">×</button>
    </div>
  `).join('');
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function refreshDashboard() {
  const posts = getPosts();
  const published = posts.filter(p => p.status === 'published');
  const drafts = posts.filter(p => p.status === 'draft');
  const events = getEvents();
  const files = getFiles();

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
      recentList.innerHTML = posts.slice(0, 5).map(p => `
        <div class="post-row">
          <div class="post-row-meta">
            <div class="post-row-title">${p.title}</div>
            <div class="post-row-date">${formatDate(p.date)} · ${p.category}</div>
          </div>
          <span class="badge ${p.status === 'published' ? 'badge-pub' : 'badge-draft'}">
            ${p.status === 'published' ? 'Pubblicato' : 'Bozza'}
          </span>
        </div>
      `).join('');
    }
  }
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
