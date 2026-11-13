// Calls the AI API from the backend only. The API key never reaches the browser.
// To use another provider, change the fetch() call below.

const API_URL = 'https://api.anthropic.com/v1/messages';

function buildSystemPrompt(lang, interests) {
  const langRule =
    lang === 'si'
      ? 'Reply in simple, warm, natural Sinhala (සිංහල). Keep sentences short and easy to read.'
      : 'Reply in simple, warm English. Keep sentences short.';
  const interestLine = interests.length
    ? `The user has shared these favourite things (voluntarily): ${interests.join(', ')}. You may gently suggest related games or calm activities.`
    : 'The user has not shared interests. You may gently ask, but never pressure them.';

  return `You are MindWell, a gentle, friendly wellness companion inside a relaxation and mini-game app.
${langRule}
${interestLine}

Rules:
- You are NOT a therapist or doctor. Never diagnose any condition. Never claim games or chat cure or treat mental illness.
- Be kind, calm, and non-judgmental. Never shame, pressure, or give orders. Keep replies to 2-4 short sentences.
- Ask at most one gentle question at a time. The user may skip any question.
- You can suggest: the Happy Catch & Collect game, Memory Match, Happy Garden, a breathing circle, or a mood check-in.
- If the user seems very distressed, hopeless, or mentions harming themselves, respond with compassion, encourage them to contact a trusted person or local emergency/crisis services, and do NOT just suggest a game.
- Do not ask for or store personal identifying details.`;
}

async function getReply(messages, lang, interests) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null; // frontend falls back to built-in replies

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'claude-sonnet-5-5',
      max_tokens: 400,
      system: buildSystemPrompt(lang, interests),
      messages
    })
  });

  if (!res.ok) throw new Error(`AI API status ${res.status}`);
  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
  return text || null;
}

module.exports = { getReply };
