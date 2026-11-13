// Interests chosen voluntarily by the user. Stored only on this device.
const INTERESTS = {
  flowers: ['🌸', '🌷', '🌻', '🌼'],
  animals: ['🐶', '🐱', '🐰', '🦋'],
  music: ['🎵', '🎶', '🎸', '🥁'],
  nature: ['🌿', '🌳', '🌈', '🍃'],
  drawing: ['🎨', '🖌️', '✏️', '🖍️'],
  sky: ['⭐', '🌙', '✨', '☁️']
};

const Prefs = {
  getSelected() { return Store.get('interests', []); },
  setSelected(list) { Store.set('interests', list); },
  // Emojis for the user's picks; falls back to everything if they picked nothing.
  getEmojis() {
    const sel = this.getSelected();
    const keys = sel.length ? sel : Object.keys(INTERESTS);
    return keys.flatMap((k) => INTERESTS[k] || []);
  },
  getAllEmojis() { return Object.values(INTERESTS).flat(); },
  renderPicker(container) {
    const draw = () => {
      const sel = this.getSelected();
      container.innerHTML = '';
      Object.keys(INTERESTS).forEach((key) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.setAttribute('aria-pressed', String(sel.includes(key)));
        b.textContent = INTERESTS[key][0] + ' ' + t('interests.' + key);
        b.addEventListener('click', () => {
          const cur = this.getSelected();
          this.setSelected(cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]);
          draw();
          document.dispatchEvent(new CustomEvent('prefschange'));
        });
        container.appendChild(b);
      });
    };
    draw();
    document.addEventListener('langchange', draw);
  }
};
