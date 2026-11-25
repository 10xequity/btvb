// Self-check for assets/js/chat.js answer matching. Run: node scripts/chat-check.js
const { best, parseCSV } = require('../assets/js/chat.js');
const cases = [
  ['when is the next tournament?', 'Upcoming tournaments'],
  ['how much is a tournament', 'Tournament cost & fees'],
  ['how much is drop in', 'Drop-in / open play'],
  ['what time is open gym tonight', 'Drop-in / open play'],
  ['do you have training for kids?', 'Youth / kids training'],
  ['how much is youth training', 'Youth / kids training'],
  ['adult training times', 'Adult training'],
  ['I am a beginner, can I play?', 'Adult training'],
  ['womens league', "Women's league / Queens Club"],
  ["where does the women's league play", "Women's league / Queens Club"],
  ['mens league nights', "Men's league / Kings Club"],
  ['is there a coed league', 'Co-ed leagues'],
  ['where are you located', 'Location & parking'],
  ['is parking free', 'Location & parking'],
  ['can I bring a cooler with food', 'Food, drink & bar'],
  ['i lost my water bottle', 'Lost & found'],
  ['can I bring my dog', 'Pets'],
  ['do I need a waiver', 'Waiver'],
  ['I want to sponsor', 'Sponsorship & partners'],
  ['can I rent a court for a birthday party', 'Host an event / rent courts'],
  ['what level should I play', 'Skill levels'],
  ['private lessons', 'Private lessons'],
  ['can I get a refund', 'Refunds & cancellations'],
  ['do you accept my spark', 'Youth / kids training'],
];
let fail = 0;
for (const [q, want] of cases) { const got = (best(q) || {}).t || '(none)'; if (got !== want) { fail++; console.log('FAIL', JSON.stringify(q), '->', got, '| want', want); } }
for (const q of ['what is the wifi password', 'xyzzy']) { const f = best(q); if (f) { fail++; console.log('FAIL should fall back to email:', q, '->', f.t); } }
const rows = parseCSV('a,b\n"x, y","he said ""hi"""\r\n1,2');
if (rows[1][0] !== 'x, y' || rows[1][1] !== 'he said "hi"' || rows[2][1] !== '2') { fail++; console.log('FAIL csv', JSON.stringify(rows)); }
console.log(fail ? fail + ' failed' : 'chat-check: all ' + (cases.length + 3) + ' passed');
process.exit(fail ? 1 : 0);
