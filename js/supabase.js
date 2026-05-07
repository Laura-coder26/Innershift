// Innershift — supabase.js
// Connessione a Supabase per gestione contenuti

const SUPABASE_URL = 'https://akopbkorpqkszvcgkfzj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_lnt5KwN1F-5NKFOR6Yk05g_M9UVH1NG';

async function sbFetch(table, options = {}) {
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (options.filter) url += `?${options.filter}`;
  if (options.select) url += (url.includes('?') ? '&' : '?') + `select=${options.select}`;
  if (options.order) url += (url.includes('?') ? '&' : '?') + `order=${options.order}`;

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.method === 'POST' ? 'return=representation' : ''
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return [];
  return res.json();
}

async function sbInsert(table, data) {
  return sbFetch(table, { method: 'POST', body: data });
}

async function sbDelete(table, id) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  return res.ok;
}

async function sbUpsert(table, key, value) {
  return sbFetch(table, {
    method: 'POST',
    body: { key, value, updated_at: new Date().toISOString() },
  });
}
