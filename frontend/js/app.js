// Shared header, footer, language switch. Each page has <body data-page="...">.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

(function initShell() {
  const page = document.body.dataset.page || 'home';
  const links = [
    ['home', 'index.html', 'nav.home'], ['chat', 'chatbot.html', 'nav.chat'], ['games', 'games.html', 'nav.games'],
    ['breathing', 'breathing.html', 'nav.breathing'], ['mood', 'mood.html', 'nav.mood']
  ];
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<a class="brand" href="index.html"><span class="dot" aria-hidden="true"></span><span data-i18n="app.name"></span></a>' +
    '<nav class="site-nav" aria-label="Main">' +
    links.map(([id, href, key]) => `<a href="${href}" data-i18n="${key}" ${id === page || (page === 'game' && id === 'games') ? 'aria-current="page"' : ''}></a>`).join('') +
    '</nav>' +
    '<div class="lang-switch" role="group" aria-label="Language">' +
    '<button type="button" data-lang="en">English</button><button type="button" data-lang="si">සිංහල</button></div>';
  document.body.prepend(header);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = '<p data-i18n="footer"></p>';
  document.body.appendChild(footer);

  $$('.lang-switch button', header).forEach((b) => b.addEventListener('click', () => Lang.set(b.dataset.lang)));
  Lang.apply();
})();

// Gentle sound (WebAudio, no files needed). Respects mute.
const Sound = {
  muted: Store.get('muted', false),
  ctx: null,
  toggle() { this.muted = !this.muted; Store.set('muted', this.muted); return this.muted; },
  chime(freq = 660) {
    if (this.muted) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
      o.connect(g); g.connect(this.ctx.destination); o.start(); o.stop(this.ctx.currentTime + 0.4);
    } catch { /* audio not available */ }
  }
};
