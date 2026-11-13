(function () {
  const circle = $('#breath-circle'), label = $('#breath-label');
  const startBtn = $('#breath-start'), stopBtn = $('#breath-stop');
  // 4s in, 2s hold, 6s out: slow and comfortable.
  const phases = [
    { key: 'breath.in', ms: 4000, scale: 2.2 },
    { key: 'breath.hold', ms: 2000, scale: 2.2 },
    { key: 'breath.out', ms: 6000, scale: 1 }
  ];
  let timer = null, i = 0, running = false;

  function step() {
    if (!running) return;
    const p = phases[i % phases.length];
    circle.style.transition = `transform ${p.ms}ms ease-in-out`;
    circle.style.transform = `scale(${p.scale})`;
    label.textContent = t(p.key);
    timer = setTimeout(() => { i++; step(); }, p.ms);
  }
  function start() { if (running) return; running = true; i = 0; startBtn.disabled = true; stopBtn.disabled = false; step(); }
  function stop() {
    running = false; clearTimeout(timer);
    circle.style.transition = 'transform 1.5s ease-in-out'; circle.style.transform = 'scale(1)';
    label.textContent = t('breath.stopped'); startBtn.disabled = false; stopBtn.disabled = true;
  }
  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stop(); });
  document.addEventListener('langchange', () => { if (!running) label.textContent = t('breath.ready'); });
  label.textContent = t('breath.ready'); stopBtn.disabled = true;
})();
