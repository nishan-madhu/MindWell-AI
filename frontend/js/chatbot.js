(function () {
  const log = $('#chat-log'), form = $('#chat-form'), input = $('#chat-input');
  let history = []; // in memory only, never saved
  let fallbackIdx = 0;
  let busy = false;

  // Client-side crisis check (the server checks too).
  const CRISIS = [/suicid/i, /kill myself/i, /end my life/i, /want to die/i, /wanna die/i, /don'?t want to live/i,
    /better off dead/i, /hurt myself/i, /harm myself/i, /self[- ]?harm/i, /cut myself/i,
    /ආත්මඝාත/, /මැරෙන්න ඕන/, /මැරෙන්න කැමති/, /ජීවිතය අවසන්/, /ජීවත් වෙන්න ඕන නෑ/];
  const isCrisis = (s) => CRISIS.some((re) => re.test(s));

  function add(role, text, cls) {
    const d = document.createElement('div');
    d.className = 'msg ' + role + (cls ? ' ' + cls : '');
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  function showCrisis() {
    const c = document.createElement('div');
    c.className = 'crisis-card';
    c.setAttribute('role', 'alert');
    c.innerHTML = '<h3></h3><p></p><p></p><p class="muted"></p>';
    const [h, p1, p2, p3] = c.children;
    h.textContent = t('crisis.title'); p1.textContent = t('crisis.body');
    p2.textContent = t('crisis.lines'); p3.textContent = t('crisis.verify');
    log.appendChild(c);
    log.scrollTop = log.scrollHeight;
  }

  function fallbackReply() {
    const keys = ['chat.fallback1', 'chat.fallback2', 'chat.fallback3'];
    return t(keys[fallbackIdx++ % keys.length]);
  }

  async function send(text) {
    add('user', text);
    history.push({ role: 'user', content: text });
    if (isCrisis(text)) { showCrisis(); return; }

    const typing = add('bot', t('chat.typing'), 'typing');
    busy = true;
    try {
      const interests = Prefs.getSelected().map((k) => t('interests.' + k));
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, lang: Lang.current, interests })
      });
      const data = await r.json();
      typing.remove();
      if (data.crisis) { showCrisis(); }
      else if (data.reply) { add('bot', data.reply); history.push({ role: 'assistant', content: data.reply }); }
      else { const f = fallbackReply(); add('bot', f); history.push({ role: 'assistant', content: f }); }
    } catch {
      typing.remove();
      const f = fallbackReply(); add('bot', f); history.push({ role: 'assistant', content: f });
    } finally { busy = false; }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    send(text);
  });

  $('#chat-reset').addEventListener('click', () => { history = []; log.innerHTML = ''; add('bot', t('chat.hello')); });

  add('bot', t('chat.hello'));
  Prefs.renderPicker($('#interest-picker'));
})();
