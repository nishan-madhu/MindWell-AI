// Safe localStorage wrapper. Only NON-SENSITIVE preferences are stored.
// Chat messages and mood answers are NOT saved by default.
const Store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('mindwell:' + key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('mindwell:' + key, JSON.stringify(value)); } catch { /* ignore */ }
  },
  remove(key) {
    try { localStorage.removeItem('mindwell:' + key); } catch { /* ignore */ }
  },
  clearAll() {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith('mindwell:')).forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
  }
};
