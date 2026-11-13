// Happy Catch & Collect: no penalties, no losing. Missed items just fade away.
(function () {
  const canvas = $('#game'), ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const overlay = $('#overlay'), ovTitle = $('#ov-title'), ovBody = $('#ov-body'), ovBadge = $('#ov-badge');
  const scoreEl = $('#hud-score'), starsEl = $('#hud-stars'), timeEl = $('#hud-time'), basketEl = $('#basket'), praiseEl = $('#praise');
  const pauseBtn = $('#btn-pause'), muteBtn = $('#btn-mute');

  const SOFT = ['☁️', '🍃', '🫧', '🌫️']; // "unwanted" stickers: harmless, fade away
  const player = { x: W / 2, w: 90, h: 70, speed: 6 };
  const keys = { left: false, right: false };
  let items = [], score = 0, mode = 'relaxed', timeLeft = 60, running = false, paused = false;
  let spawnT = 0, last = 0, lastSecond = 0, target = null, raf = null, praiseT = null;

  const favs = () => [...new Set(Prefs.getEmojis())];
  const rand = (a, b) => a + Math.random() * (b - a);

  function spawn() {
    const fav = Math.random() < 0.7;
    const pool = fav ? favs() : SOFT;
    items.push({ x: rand(30, W - 30), y: -30, vy: rand(1.2, 2.2), em: pool[Math.floor(Math.random() * pool.length)], fav, alpha: 1, caught: false, rot: rand(-0.4, 0.4) });
  }

  function drawMonster(x, y, t0) {
    const bob = Math.sin(t0 / 250) * 2;
    ctx.save(); ctx.translate(x, y + bob);
    ctx.fillStyle = '#9b7be0';
    ctx.beginPath(); ctx.ellipse(0, 0, 42, 34, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#b79cf0'; // ears
    ctx.beginPath(); ctx.arc(-28, -28, 10, 0, Math.PI * 2); ctx.arc(28, -28, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; // eyes
    ctx.beginPath(); ctx.arc(-14, -8, 10, 0, Math.PI * 2); ctx.arc(14, -8, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2b2340';
    ctx.beginPath(); ctx.arc(-12, -8, 5, 0, Math.PI * 2); ctx.arc(16, -8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2b2340'; ctx.lineWidth = 3; ctx.lineCap = 'round'; // smile
    ctx.beginPath(); ctx.arc(0, 6, 14, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    ctx.fillStyle = '#f28aa5'; // cheeks
    ctx.beginPath(); ctx.arc(-26, 8, 5, 0, Math.PI * 2); ctx.arc(26, 8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#d9cdfb'); g.addColorStop(1, '#fde7da');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#bfe8cf'; ctx.fillRect(0, H - 28, W, 28);
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(40, ts - last || 16); last = ts;
    drawBackground();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    if (running && !paused) {
      // movement
      if (keys.left) player.x -= player.speed;
      if (keys.right) player.x += player.speed;
      if (target !== null) player.x += Math.max(-player.speed * 1.5, Math.min(player.speed * 1.5, target - player.x));
      player.x = Math.max(player.w / 2, Math.min(W - player.w / 2, player.x));

      spawnT += dt;
      if (spawnT > 800) { spawnT = 0; spawn(); }

      const py = H - 28 - player.h / 2;
      items.forEach((it) => {
        it.y += it.vy * (dt / 16);
        if (it.y > H * 0.7) it.alpha = Math.max(0, it.alpha - 0.01 * (dt / 16)); // gentle fade, no penalty
        if (it.fav && !it.caught && Math.abs(it.x - player.x) < player.w / 2 + 8 && Math.abs(it.y - py) < 40) {
          it.caught = true; collect(it);
        }
      });
      items = items.filter((it) => !it.caught && it.y < H + 30 && it.alpha > 0);

      if (mode === 'timed') {
        const now = Math.floor(ts / 1000);
        if (now !== lastSecond) { lastSecond = now; timeLeft = Math.max(0, timeLeft - 1); renderHud(); if (timeLeft === 0) finish(); }
      }
    }

    items.forEach((it) => {
      ctx.save(); ctx.globalAlpha = it.alpha; ctx.translate(it.x, it.y); ctx.rotate(it.rot);
      ctx.font = '34px serif'; ctx.fillText(it.em, 0, 0); ctx.restore();
    });
    drawMonster(player.x, H - 28 - player.h / 2, ts);
  }

  function collect(it) {
    score++; Sound.chime(500 + (score % 5) * 110);
    const s = document.createElement('span'); s.textContent = it.em; basketEl.appendChild(s);
    if (basketEl.children.length > 40) basketEl.removeChild(basketEl.firstChild);
    if (score % 5 === 0) {
      praiseEl.textContent = t('catch.praise' + (1 + (score / 5) % 3));
      clearTimeout(praiseT); praiseT = setTimeout(() => { praiseEl.textContent = ''; }, 2200);
    }
    renderHud();
  }

  function renderHud() {
    scoreEl.textContent = `${t('catch.score')}: ${score}`;
    starsEl.textContent = `⭐ ${t('catch.stars')}: ${Math.floor(score / 10)}`;
    timeEl.textContent = mode === 'timed' ? `${t('catch.time')}: ${timeLeft}` : '';
  }

  function showOverlay(title, body, badge, showStartButtons) {
    ovTitle.textContent = title; ovBody.textContent = body; ovBadge.textContent = badge || '';
    $('#ov-modes').hidden = !showStartButtons;
    $('#ov-resume').hidden = showStartButtons;
    overlay.hidden = false;
  }

  function begin(m) {
    mode = m; score = 0; timeLeft = 60; items = []; basketEl.innerHTML = ''; praiseEl.textContent = '';
    lastSecond = Math.floor(performance.now() / 1000);
    running = true; paused = false; overlay.hidden = true; pauseBtn.textContent = t('common.pause'); renderHud();
  }

  function finish() {
    running = false;
    const stars = Math.floor(score / 10);
    const badge = score >= 30 ? t('catch.badge3') : score >= 15 ? t('catch.badge2') : score >= 5 ? t('catch.badge1') : '';
    showOverlay(t('catch.endTitle'), t('catch.endBody', { n: score, s: stars }), badge ? '🏅 ' + badge : '', true);
  }

  function togglePause() {
    if (!running) return;
    paused = !paused;
    pauseBtn.textContent = paused ? t('common.resume') : t('common.pause');
    if (paused) showOverlay(t('common.pause'), '', '', false); else overlay.hidden = true;
  }

  // controls
  document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'a', 'A'].includes(e.key)) { keys.left = true; target = null; e.preventDefault(); }
    if (['ArrowRight', 'd', 'D'].includes(e.key)) { keys.right = true; target = null; e.preventDefault(); }
    if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') togglePause();
  });
  document.addEventListener('keyup', (e) => {
    if (['ArrowLeft', 'a', 'A'].includes(e.key)) keys.left = false;
    if (['ArrowRight', 'd', 'D'].includes(e.key)) keys.right = false;
  });
  const hold = (btn, k) => {
    ['pointerdown'].forEach((ev) => btn.addEventListener(ev, (e) => { e.preventDefault(); keys[k] = true; target = null; }));
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, () => { keys[k] = false; }));
  };
  hold($('#btn-left'), 'left'); hold($('#btn-right'), 'right');
  const toCanvasX = (e) => { const r = canvas.getBoundingClientRect(); return (e.clientX - r.left) * (W / r.width); };
  canvas.addEventListener('pointerdown', (e) => { target = toCanvasX(e); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => { if (e.buttons || e.pointerType === 'mouse') target = toCanvasX(e); });
  canvas.addEventListener('pointerup', () => { target = null; });

  $('#btn-relaxed').addEventListener('click', () => begin('relaxed'));
  $('#btn-timed').addEventListener('click', () => begin('timed'));
  $('#ov-resume').addEventListener('click', togglePause);
  pauseBtn.addEventListener('click', togglePause);
  $('#btn-restart').addEventListener('click', () => begin(mode));
  $('#btn-finish').addEventListener('click', () => { if (running) finish(); });
  muteBtn.addEventListener('click', () => { muteBtn.textContent = Sound.toggle() ? t('common.unmute') : t('common.mute'); });

  function labels() {
    pauseBtn.textContent = paused ? t('common.resume') : t('common.pause');
    muteBtn.textContent = Sound.muted ? t('common.unmute') : t('common.mute');
    renderHud();
    if (!running && score === 0) { ovTitle.textContent = t('catch.name'); ovBody.textContent = t('catch.intro'); }
  }
  document.addEventListener('langchange', labels);
  document.addEventListener('prefschange', () => { items = []; });

  Prefs.renderPicker($('#interest-picker'));
  showOverlay(t('catch.name'), t('catch.intro'), '', true);
  labels();
  raf = requestAnimationFrame(frame);
})();
