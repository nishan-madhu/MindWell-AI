(function () {
  const out = $('#mood-reply'), help = $('#mood-help');
  let current = null;
  function show() {
    if (!current) { out.textContent = ''; help.textContent = ''; return; }
    out.textContent = t('mood.reply.' + current);
    help.textContent = (current === 'hard' || current === 'low') ? t('mood.hardHelp') : '';
  }
  $$('.mood-btn').forEach((b) => b.addEventListener('click', () => {
    current = b.dataset.mood;
    $$('.mood-btn').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    show(); // Not stored anywhere.
  }));
  $('#mood-skip').addEventListener('click', () => { window.location.href = 'games.html'; });
  document.addEventListener('langchange', show);
})();
