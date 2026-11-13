const express = require('express');
const { getReply } = require('../services/aiService');

const router = express.Router();

// Simple in-memory rate limit (per IP, 30 requests / minute)
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || 'unknown';
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > 30) return res.status(429).json({ error: 'too_many_requests' });
  next();
}

// Crisis detection (English + Sinhala). Conservative on purpose.
const CRISIS_PATTERNS = [
  /suicid/i, /kill myself/i, /end my life/i, /want to die/i, /wanna die/i,
  /don'?t want to live/i, /better off dead/i, /hurt myself/i, /harm myself/i,
  /self[- ]?harm/i, /cut myself/i, /no reason to live/i,
  /ආත්මඝාත/, /මැරෙන්න ඕන/, /මැරෙන්න කැමති/, /මැරෙනවා/, /ජීවිතය අවසන්/,
  /මගේ ජීවිතය නැති කර/, /තමන්ටම රිදවා/, /ජීවත් වෙන්න ඕන නෑ/, /ජීවත් වෙන්න අවශ්‍ය නැහැ/
];
function isCrisis(text) {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

router.post('/', rateLimit, async (req, res) => {
  try {
    const { messages, lang, interests } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages_required' });
    }
    const clean = messages
      .slice(-10)
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));

    const userMsgs = clean.filter((m) => m.role === 'user');
    if (userMsgs.length === 0) return res.status(400).json({ error: 'user_message_required' });

    // Safety first: for crisis messages, do not just launch a game or chat normally.
    if (userMsgs.slice(-2).some((m) => isCrisis(m.content))) {
      return res.json({ crisis: true });
    }

    const language = lang === 'si' ? 'si' : 'en';
    const safeInterests = Array.isArray(interests)
      ? interests.filter((i) => typeof i === 'string').slice(0, 8)
      : [];

    const reply = await getReply(clean, language, safeInterests);
    if (!reply) return res.json({ fallback: true });
    res.json({ reply });
  } catch (err) {
    // Never log message contents (privacy).
    console.error('Chat error:', err.message);
    res.json({ fallback: true });
  }
});

module.exports = router;
