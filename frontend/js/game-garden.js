(function () {
  const COLS = 6, ROWS = 5;
  const grid = $('#garden-grid'), palette = $('#palette'), msg = $('#garden-msg');
  let cells = Array(COLS * ROWS).fill('');
  let tool = null;

  function drawPalette() {
    palette.innerHTML = '';
    const items = [...new Set(Prefs.getEmojis())];
    if (!tool || (tool !== 'erase' && !items.includes(tool))) tool = items[0];
    items.forEach((em) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = em; b.setAttribute('aria-pressed', String(tool === em));
      b.addEventListener('click', () => { tool = em; drawPalette(); });
      palette.appendChild(b);
    });
    const e = document.createElement('button');
    e.type = 'button'; e.textContent = '🧽'; e.setAttribute('aria-label', t('garden.eraser')); e.title = t('garden.eraser');
    e.setAttribute('aria-pressed', String(tool === 'erase'));
    e.addEventListener('click', () => { tool = 'erase'; drawPalette(); });
    palette.appendChild(e);
  }

  function drawGrid() {
    grid.innerHTML = '';
    cells.forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'plot'; b.textContent = v; b.setAttribute('aria-label', 'plot ' + (i + 1));
      b.addEventListener('click', () => { cells[i] = tool === 'erase' ? '' : tool; Sound.chime(520); drawGrid(); });
      grid.appendChild(b);
    });
  }

  $('#garden-clear').addEventListener('click', () => { cells = Array(COLS * ROWS).fill(''); msg.textContent = ''; drawGrid(); });
  $('#garden-save').addEventListener('click', () => { Store.set('garden', cells); msg.textContent = t('garden.saved'); });
  document.addEventListener('prefschange', drawPalette);
  document.addEventListener('langchange', () => { drawPalette(); msg.textContent = ''; });

  const saved = Store.get('garden', null);
  if (Array.isArray(saved) && saved.length === COLS * ROWS) cells = saved;
  Prefs.renderPicker($('#interest-picker'));
  drawPalette(); drawGrid();
})();
