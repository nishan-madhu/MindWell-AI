// All interface text lives here. Add a language by adding a new key.
const I18N = {
  en: {
    'app.name': 'MindWell AI',
    'nav.home': 'Home', 'nav.chat': 'Chat', 'nav.games': 'Games', 'nav.breathing': 'Breathing', 'nav.mood': 'Mood',
    'footer': 'MindWell AI is a relaxation and wellness tool. It is not a medical service and does not replace professional mental-health care.',
    'home.title': 'A calm corner to play, breathe and talk',
    'home.sub': 'Choose what you enjoy, play gentle games with no losing, and chat with a friendly helper. Everything is optional.',
    'home.chat': 'Start chatting', 'home.games': 'Play games', 'home.breath': 'Breathe', 'home.mood': 'Check in',
    'home.card.games': 'Games with no pressure', 'home.card.gamesText': 'Catch your favourite stickers, match cards, or grow a garden.',
    'home.card.breath': 'Breathing circle', 'home.card.breathText': 'Follow a slow, soft circle. Stop any time.',
    'home.card.mood': 'Mood check-in', 'home.card.moodText': 'Tell us how you feel, or skip it. Nothing is saved.',
    'interests.title': 'Your favourite things', 'interests.hint': 'Pick any you like, or none. This only stays on your device.',
    'interests.flowers': 'Flowers', 'interests.animals': 'Animals', 'interests.music': 'Music', 'interests.nature': 'Nature', 'interests.drawing': 'Drawing', 'interests.sky': 'Sky',
    'common.skip': 'Skip', 'common.pause': 'Pause', 'common.resume': 'Resume', 'common.restart': 'Restart', 'common.mute': 'Mute', 'common.unmute': 'Unmute',
    'common.reset': 'Reset', 'common.exit': 'Exit', 'common.start': 'Start', 'common.stop': 'Stop', 'common.send': 'Send', 'common.clear': 'Clear', 'common.save': 'Save garden',
    'common.back': 'Back to games', 'common.playAgain': 'Play again', 'common.clearData': 'Clear my saved choices',
    'mood.title': 'How are you feeling today?', 'mood.hint': 'Optional. Your answer is not saved or sent anywhere.',
    'mood.great': 'Great', 'mood.good': 'Good', 'mood.okay': 'Okay', 'mood.low': 'A bit low', 'mood.hard': 'Hard',
    'mood.reply.great': 'That is lovely to hear. Want to play something fun?',
    'mood.reply.good': 'Nice. A little game or a calm breath could make it even better.',
    'mood.reply.okay': 'Okay is fine. You could try the breathing circle or a gentle game.',
    'mood.reply.low': 'Thank you for sharing. Be kind to yourself. A slow breath or a gentle game might help, and talking to someone you trust can too.',
    'mood.reply.hard': 'I am sorry it feels hard. You are not alone. Please consider talking to someone you trust. Breathing or chatting here is also okay.',
    'mood.hardHelp': 'If you feel unsafe or might hurt yourself, please contact local emergency services or a crisis line right now.',
    'chat.title': 'Chat with MindWell', 'chat.placeholder': 'Type here (you can skip any question)…', 'chat.typing': 'Thinking…',
    'chat.hello': 'Hello! I am here to chat and help you relax. What are some things you enjoy, like flowers, animals, music, nature or drawing? You can skip if you prefer.',
    'chat.privacy': 'Your chat is not saved. Closing this page clears it.',
    'chat.fallback1': 'Thank you for sharing. Would you like to try a gentle game, or take a slow breath together?',
    'chat.fallback2': 'I am listening. There is no hurry. We could play Happy Catch, or you could tell me more if you like.',
    'chat.fallback3': 'That sounds like a lot. Take your time. A breathing circle or a calm game is here whenever you want it.',
    'chat.offline': '(Offline mode: using built-in gentle replies.)',
    'crisis.title': 'You matter, and help is available',
    'crisis.body': 'I am really sorry you are going through this. You do not have to face it alone. Please reach out to someone you trust, or contact emergency or crisis support right now.',
    'crisis.lines': 'Sri Lanka: National Mental Health Helpline 1333 · Police emergency 119 · Ambulance 1990. If you are elsewhere, call your local emergency number.',
    'crisis.verify': 'Please check that these numbers are current in your area.',
    'games.title': 'Gentle games', 'games.sub': 'No timers you cannot turn off, no points lost, no losing.',
    'catch.name': 'Happy Catch & Collect', 'catch.desc': 'Guide the monster to catch your favourite stickers for the princess’s basket.',
    'memory.name': 'Memory Match', 'memory.desc': 'Find matching pairs at your own pace.',
    'garden.name': 'Happy Garden', 'garden.desc': 'Decorate a garden with your favourite things.',
    'catch.relaxed': 'Relaxed mode (no timer)', 'catch.timed': 'Timed mode (60 seconds, no penalties)',
    'catch.intro': 'Move the monster with ← → keys, A / D, the buttons, or by dragging. Catch your favourite stickers. Missing one is perfectly fine.',
    'catch.score': 'Collected', 'catch.stars': 'Stars', 'catch.time': 'Time', 'catch.basket': 'Princess’s basket', 'catch.finish': 'Finish',
    'catch.endTitle': 'Wonderful!', 'catch.endBody': 'You collected {n} stickers and earned {s} stars. Thank you for playing.',
    'catch.badge1': 'Badge: Sticker Friend', 'catch.badge2': 'Badge: Happy Collector', 'catch.badge3': 'Badge: Super Collector',
    'catch.praise1': 'Lovely catch!', 'catch.praise2': 'You are doing great!', 'catch.praise3': 'So many happy things!',
    'catch.left': 'Left', 'catch.right': 'Right',
    'memory.moves': 'Tries', 'memory.found': 'Pairs', 'memory.done': 'You found every pair. Well done! Wrong guesses never cost anything.',
    'garden.pick': 'Choose something, then tap a spot.', 'garden.eraser': 'Eraser', 'garden.saved': 'Saved on this device.',
    'breath.title': 'Breathing circle', 'breath.hint': 'Breathe in as the circle grows, out as it shrinks. Stop whenever you like.',
    'breath.ready': 'Ready', 'breath.in': 'Breathe in', 'breath.hold': 'Hold gently', 'breath.out': 'Breathe out', 'breath.stopped': 'Stopped. Well done.'
  },
  si: {
    'app.name': 'MindWell AI',
    'nav.home': 'මුල් පිටුව', 'nav.chat': 'කතාබහ', 'nav.games': 'ක්‍රීඩා', 'nav.breathing': 'හුස්ම ගැනීම', 'nav.mood': 'මනෝභාවය',
    'footer': 'MindWell AI යනු ලිහිල් වීමට සහ යහපැවැත්මට ඇති මෙවලමකි. එය වෛද්‍ය සේවාවක් නොවන අතර වෘත්තීය මානසික සෞඛ්‍ය සත්කාරයට විකල්පයක් නොවේ.',
    'home.title': 'සෙල්ලම් කරන්න, හුස්ම ගන්න, කතා කරන්න – සන්සුන් ඉඩක්',
    'home.sub': 'ඔබ කැමති දේ තෝරන්න, පරාජය නැති සරල ක්‍රීඩා කරන්න, මිත්‍රශීලී සහායකයා සමඟ කතා කරන්න. සියල්ල ඔබේ කැමැත්තෙනි.',
    'home.chat': 'කතාබහ ආරම්භ කරන්න', 'home.games': 'ක්‍රීඩා කරන්න', 'home.breath': 'හුස්ම ගන්න', 'home.mood': 'මනෝභාවය බලන්න',
    'home.card.games': 'පීඩනයක් නැති ක්‍රීඩා', 'home.card.gamesText': 'ඔබේ ප්‍රියතම ස්ටිකර් අල්ලන්න, කාඩ් ගළපන්න, හෝ උයනක් හදන්න.',
    'home.card.breath': 'හුස්ම ගැනීමේ වෘත්තය', 'home.card.breathText': 'සෙමින් විශාල වන කුඩා වන වෘත්තය අනුගමනය කරන්න. ඕනෑම වේලාවක නවත්වන්න.',
    'home.card.mood': 'මනෝභාව පරීක්ෂාව', 'home.card.moodText': 'ඔබට දැනෙන ආකාරය කියන්න, නැතහොත් මඟ හරින්න. කිසිවක් සුරැකෙන්නේ නැත.',
    'interests.title': 'ඔබේ ප්‍රියතම දේවල්', 'interests.hint': 'කැමති ඒවා තෝරන්න, නැතහොත් කිසිවක් නොතෝරන්න. මෙය ඔබේ උපාංගයේ පමණක් පවතී.',
    'interests.flowers': 'මල්', 'interests.animals': 'සතුන්', 'interests.music': 'සංගීතය', 'interests.nature': 'ස්වභාවධර්මය', 'interests.drawing': 'චිත්‍ර ඇඳීම', 'interests.sky': 'අහස',
    'common.skip': 'මඟ හරින්න', 'common.pause': 'විරාමය', 'common.resume': 'ඉදිරියට', 'common.restart': 'නැවත ආරම්භ', 'common.mute': 'නිශ්ශබ්ද', 'common.unmute': 'ශබ්ද',
    'common.reset': 'යළි සකසන්න', 'common.exit': 'ඉවත් වන්න', 'common.start': 'ආරම්භ කරන්න', 'common.stop': 'නවත්වන්න', 'common.send': 'යවන්න', 'common.clear': 'මකන්න', 'common.save': 'උයන සුරකින්න',
    'common.back': 'ක්‍රීඩා වෙත ආපසු', 'common.playAgain': 'නැවත සෙල්ලම් කරන්න', 'common.clearData': 'මගේ සුරැකි තේරීම් මකන්න',
    'mood.title': 'අද ඔබට කොහොමද?', 'mood.hint': 'අනිවාර්ය නැත. ඔබේ පිළිතුර කොතැනකවත් සුරැකෙන්නේ හෝ යැවෙන්නේ නැත.',
    'mood.great': 'ඉතා හොඳයි', 'mood.good': 'හොඳයි', 'mood.okay': 'සාමාන්‍යයි', 'mood.low': 'ටිකක් දුකයි', 'mood.hard': 'අමාරුයි',
    'mood.reply.great': 'ඒක අහන්න ලොකු සතුටක්. විනෝදජනක ක්‍රීඩාවක් කරමුද?',
    'mood.reply.good': 'හොඳයි. කුඩා ක්‍රීඩාවක් හෝ සන්සුන් හුස්මක් තවත් හොඳ කරවනු ඇත.',
    'mood.reply.okay': 'සාමාන්‍යයි කියන්නෙත් කමක් නැහැ. හුස්ම ගැනීමේ වෘත්තය හෝ සරල ක්‍රීඩාවක් උත්සාහ කළ හැකියි.',
    'mood.reply.low': 'බෙදාගත්තාට ස්තූතියි. ඔබටම කරුණාවෙන් සලකන්න. සෙමින් හුස්මක් හෝ සරල ක්‍රීඩාවක් උපකාරී විය හැකියි. විශ්වාසවන්ත කෙනෙකු සමඟ කතා කිරීමත් උදව් වේ.',
    'mood.reply.hard': 'ඒක අමාරු බව දැනෙන එක ගැන මම කණගාටු වෙනවා. ඔබ තනි නොවෙයි. විශ්වාසවන්ත කෙනෙකු සමඟ කතා කරන්න. මෙහි හුස්ම ගැනීමත් කතාබහත් කමක් නැහැ.',
    'mood.hardHelp': 'ඔබට අනාරක්ෂිත බවක් දැනෙනවා නම් හෝ ඔබටම හානි කරගන්නට සිතෙනවා නම්, කරුණාකර දැන්ම හදිසි සේවාවකට හෝ උපකාරක දුරකථන සේවාවකට අමතන්න.',
    'chat.title': 'MindWell සමඟ කතාබහ', 'chat.placeholder': 'මෙහි ලියන්න (ඕනෑම ප්‍රශ්නයක් මඟ හරින්න පුළුවන්)…', 'chat.typing': 'සිතමින්…',
    'chat.hello': 'ආයුබෝවන්! මම මෙහි ඉන්නේ ඔබ සමඟ කතා කරන්නත් ලිහිල් වීමට උදව් කරන්නත්. මල්, සතුන්, සංගීතය, ස්වභාවධර්මය, චිත්‍ර ඇඳීම වගේ ඔබ කැමති දේවල් මොනවාද? කැමති නැත්නම් මඟ හරින්න.',
    'chat.privacy': 'ඔබේ කතාබහ සුරැකෙන්නේ නැත. මෙම පිටුව වසා දැමූ විට එය මැකී යයි.',
    'chat.fallback1': 'බෙදාගත්තාට ස්තූතියි. සරල ක්‍රීඩාවක් කරමුද, නැතිනම් එකට සෙමින් හුස්මක් ගමුද?',
    'chat.fallback2': 'මම අහගෙන ඉන්නවා. ඉක්මන් කරන්න දෙයක් නැහැ. Happy Catch සෙල්ලම් කළ හැකියි, නැතිනම් ඔබට කැමති නම් තව කියන්න.',
    'chat.fallback3': 'ඒක ගොඩක් දෙයක් වගේ. ඔබේ වේලාව ගන්න. ඔබට ඕනෑ වෙලාවක හුස්ම ගැනීමේ වෘත්තය හෝ සන්සුන් ක්‍රීඩාවක් මෙහි තියෙනවා.',
    'chat.offline': '(නොබැඳි ක්‍රමය: ඇතුළත් කළ මෘදු පිළිතුරු භාවිත වේ.)',
    'crisis.title': 'ඔබ වැදගත්, උදව් ලබාගත හැකියි',
    'crisis.body': 'ඔබ මේ අත්විඳින දේ ගැන මම ඉතාම කණගාටු වෙනවා. ඔබට තනියම මේක දරාගන්න ඕනෑ නැහැ. කරුණාකර ඔබ විශ්වාස කරන කෙනෙකුට කතා කරන්න, නැතිනම් දැන්ම හදිසි හෝ උපකාරක සේවාවකට අමතන්න.',
    'crisis.lines': 'ශ්‍රී ලංකාව: ජාතික මානසික සෞඛ්‍ය උපකාරක අංකය 1333 · පොලිස් හදිසි 119 · ගිලන්රථ 1990. ඔබ වෙනත් රටක සිටී නම් ඔබේ ප්‍රදේශයේ හදිසි අංකයට අමතන්න.',
    'crisis.verify': 'මෙම අංක ඔබේ ප්‍රදේශයේ නිවැරදි දැයි කරුණාකර තහවුරු කරගන්න.',
    'games.title': 'සරල ක්‍රීඩා', 'games.sub': 'අක්‍රිය කළ නොහැකි කාල සීමා නැත, ලකුණු අඩු වීමක් නැත, පරාජයක් නැත.',
    'catch.name': 'Happy Catch & Collect', 'catch.desc': 'රාජකුමාරියගේ කූඩයට ඔබේ ප්‍රියතම ස්ටිකර් අල්ලන්න රාක්ෂයාට මඟ පෙන්වන්න.',
    'memory.name': 'Memory Match', 'memory.desc': 'ඔබේ වේගයෙන් ගැළපෙන කාඩ් යුගල සොයන්න.',
    'garden.name': 'Happy Garden', 'garden.desc': 'ඔබේ ප්‍රියතම දේවලින් උයනක් සරසන්න.',
    'catch.relaxed': 'ලිහිල් ක්‍රමය (කාලයක් නැත)', 'catch.timed': 'කාල ක්‍රමය (තත්පර 60, දඬුවම් නැත)',
    'catch.intro': '← → යතුරු, A / D, බොත්තම් හෝ ඇදීමෙන් රාක්ෂයා චලනය කරන්න. ඔබේ ප්‍රියතම ස්ටිකර් අල්ලන්න. එකක් මග හැරුණත් කමක් නැත.',
    'catch.score': 'එකතු කළ', 'catch.stars': 'තරු', 'catch.time': 'කාලය', 'catch.basket': 'රාජකුමාරියගේ කූඩය', 'catch.finish': 'අවසන් කරන්න',
    'catch.endTitle': 'අපූරුයි!', 'catch.endBody': 'ඔබ ස්ටිකර් {n} ක් එකතු කර තරු {s} ක් දිනා ගත්තා. සෙල්ලම් කළාට ස්තූතියි.',
    'catch.badge1': 'ලාංඡනය: ස්ටිකර් මිතුරා', 'catch.badge2': 'ලාංඡනය: සතුටු එකතුකරු', 'catch.badge3': 'ලාංඡනය: සුපිරි එකතුකරු',
    'catch.praise1': 'ලස්සන අල්ලීමක්!', 'catch.praise2': 'ඔබ හොඳට කරනවා!', 'catch.praise3': 'සතුටු දේවල් කොතරම්ද!',
    'catch.left': 'වමට', 'catch.right': 'දකුණට',
    'memory.moves': 'උත්සාහ', 'memory.found': 'යුගල', 'memory.done': 'ඔබ සියලු යුගල සොයා ගත්තා. අගෙයි! වැරදි අනුමානවලට කිසිම පාඩුවක් නැත.',
    'garden.pick': 'දෙයක් තෝරා, පසුව තැනක් ඔබන්න.', 'garden.eraser': 'මකනය', 'garden.saved': 'මෙම උපාංගයේ සුරැකිණි.',
    'breath.title': 'හුස්ම ගැනීමේ වෘත්තය', 'breath.hint': 'වෘත්තය විශාල වන විට හුස්ම ඇතුළට, කුඩා වන විට පිටතට ගන්න. ඕනෑම වේලාවක නවත්වන්න.',
    'breath.ready': 'සූදානම්', 'breath.in': 'හුස්ම ඇතුළට ගන්න', 'breath.hold': 'සෙමින් රඳවන්න', 'breath.out': 'හුස්ම පිටතට හරින්න', 'breath.stopped': 'නවත්වා ඇත. අගෙයි.'
  }
};

const Lang = {
  current: Store.get('lang', null) || ((navigator.language || '').toLowerCase().startsWith('si') ? 'si' : 'en'),
  t(key, vars) {
    let s = (I18N[this.current] && I18N[this.current][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  },
  set(code) {
    this.current = code === 'si' ? 'si' : 'en';
    Store.set('lang', this.current);
    this.apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: this.current }));
  },
  apply() {
    document.documentElement.lang = this.current;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = this.t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = this.t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', this.t(el.dataset.i18nAria)); });
    document.querySelectorAll('.lang-switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === this.current)));
  }
};
const t = (k, v) => Lang.t(k, v);
