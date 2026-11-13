(function () {
  const grid = $('#memory-grid'), info = $('#memory-info'), msg = $('#memory-msg');
  let first = null, lock = false, tries = 0, found = 0, total = 8;

  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function render() { info.textContent = `${t('memory.moves')}: ${tries} · ${t('memory.found')}: ${found}/${total}`; }

  function newGame() {
    grid.innerHTML = ''; msg.textContent = ''; first = null; lock = false; tries = 0; found = 0;
    let pool = [...new Set(Prefs.getEmojis())];
    if (pool.length < total) pool = [...pool, ...shuffle(Prefs.getAllEmojis().filter((e) => !pool.includes(e)))];
    const picks = shuffle(pool).slice(0, total);
    shuffle([...picks, ...picks]).forEach((em) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'card'; b.dataset.em = em;
      b.innerHTML = '<span class="back" aria-hidden="true">✿</span>';
      b.setAttribute('aria-label', 'card');
      b.addEventListener('click', () => flip(b));
      grid.appendChild(b);
    });
    render();
  }

  function flip(b) {
    if (lock || b.classList.contains('up') || b.classList.contains('done')) return;
    b.classList.add('up'); b.textContent = b.dataset.em;
    if (!first) { first = b; return; }
    tries++; lock = true;
    if (first.dataset.em === b.dataset.em) {
      first.classList.replace('up', 'done'); b.classList.replace('up', 'done');
      found++; Sound.chime(784); first = null; lock = false; render();
      if (found === total) msg.textContent = t('memory.done');
    } else {
      const a = first; first = null; // wrong match: no penalty, just flip back
      setTimeout(() => {
        [a, b].forEach((c) => { c.classList.remove('up'); c.innerHTML = '<span class="back" aria-hidden="true">✿</span>'; });
        lock = false; render();
      }, 900);
    }
    render();
  }

  $('#memory-restart').addEventListener('click', newGame);
  document.addEventListener('langchange', render);
  document.addEventListener('prefschange', newGame);
  Prefs.renderPicker($('#interest-picker'));
  newGame();
})();
