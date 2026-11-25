/* Boomtown Athletics help chat · v0.50.0 · 2026-11-25
   One shared file, loaded with <script src="assets/js/chat.js" defer> on every public page.
   No server, no AI, no tracking: it matches the question against the answers below in the
   visitor's own browser. Anything it cannot answer becomes a pre-filled email to admin@,
   and those emails are the log of questions still missing an answer.

   TO ADD AN ANSWER: copy any block in FAQ, change `a` (the answer), `k` (words or phrases a
   visitor might type) and `l` (optional buttons: [label, link]). Keep answers to what is
   already public on the website; no staff phone numbers, personal emails or prices that
   are not published.

   Safety: everything is rendered with textContent; links are only created for https:,
   mailto: or same-site paths (same rule as the schedule tables, CLAUDE.md 6a). */
(function () {
  "use strict";
  var BROWSER = typeof document !== "undefined";
  if (BROWSER) { if (window.__btChat) return; window.__btChat = 1; }

  var EMAIL = "admin@boomtownathletics.com";
  var CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRH7LfAZ_IHxc3cntV3yGVJtFa5vlCADbHrcq_Mc-yKj-EEt4X2pXrlpWgPH18eZPvoLA19NvHwPpds/pub?gid=2097603747&single=true&output=csv";
  var WAIVER = "https://forms.gle/4vAwn3prUqkBDKqVA", SIGNIN = "https://forms.gle/vwEY2aC4SA9SrZPQA";
  var MAIL_LIST = "https://forms.gle/PPFgrps7jkTrPr4DA", ADULT_FORM = "https://forms.gle/ykBz3SNVnfopgwmB7";
  var COBO = "https://www.coloradoboom.com/programs.html#dev-training";

  /* k: keywords/phrases (lower case). A phrase match counts double; a leading ~ marks a generic word worth half,
     so specific topics win ties. Ties go to the entry listed first. "live" = answered from the sheet. */
  var FAQ = [
    { t: "Upcoming tournaments", live: "tournament",
      k: ["next tournament", "upcoming tournament", "tournaments", "tournament", "events", "event", "this weekend", "revco", "qualifier", "usav", "6s", "when is the next"],
      a: "Here are the next tournaments at Boomtown FieldhouseUSA:", l: [["Full schedule", "schedule.html"], ["Formats & rules", "tournaments.html#formats"]] },
    { t: "Tournament formats",
      k: ["format", "formats", "reverse coed", "reverse co-ed", "revco rules", "4s", "6s", "doubles", "rules", "rule", "scoring", "side out", "rally scoring", "net height"],
      a: "We run Reverse Co-Ed 4s (RevCo), gendered 6s, women's and gendered 4s, and short-court doubles, following USAV and AVP rules with Boomtown modifications. Match (side-out) scoring is the default, and points per game are announced per event.", l: [["Formats & rules", "tournaments.html#formats"]] },
    { t: "Sanctioning",
      k: ["sanctioned", "sanction", "usav", "avp", "aau", "qualifier points", "bid", "bids"],
      a: "Boomtown events run under USAV, AVP and AAU, and we host USAV-sanctioned qualifier tournaments.", l: [["Tournaments", "tournaments.html"]] },
    { t: "Drop-in / open play",
      k: ["drop in", "drop-in", "dropin", "open gym", "open play", "pickup", "pick up", "king of the court", "just play", "play tonight", "tonight"],
      a: "Drop-in runs Thursday through Monday, 7:00–11:00 PM. It's $10 per person (plus fees) for a one-day membership, ages 14 & up, all levels. Show up, pay at the door and play. Sign the one-time waiver before your first night to skip the line.", l: [["Drop-in details", "drop-in.html"], ["Digital sign-in", SIGNIN]] },
    { t: "Waiver",
      k: ["waiver", "liability", "sign in", "sign-in", "release form"],
      a: "Every player signs the Boomtown liability waiver once. For drop-in nights there is also a quick digital sign-in.", l: [["Sign the waiver", WAIVER], ["Drop-in sign-in", SIGNIN]] },
    { t: "Adult training",
      k: ["adult training", "adult", "adults", "~training", "~clinic", "~coaching", "~learn", "~beginner", "~beginners", "~improve", "~skills", "~practice"],
      a: "Coached adult training runs Fridays 7–8:30 PM and Sundays 5:30–7 PM at Boomtown FieldhouseUSA: 90 minutes of training, then play time. It's $35 per session, which includes the drop-in fee. Beginners to former college players are welcome; coaches split groups by level. You don't need a team.", l: [["Sign up", ADULT_FORM], ["Training page", "training.html"]] },
    { t: "Private lessons",
      k: ["private lesson", "private lessons", "one on one", "1 on 1", "1-on-1", "small group", "team practice", "personal coach"],
      a: "Private and small-group lessons are available by request. Email zhu@boomtownvball.com with your level, group size and the days that work for you.", l: [["Email for a lesson", "mailto:zhu@boomtownvball.com?subject=Private%20lesson%20request"]] },
    { t: "Youth / kids training",
      k: ["youth", "kids", "kid", "child", "children", "junior", "juniors", "teen", "teens", "son", "daughter", "youth training", "kids training", "little spikers", "my spark", "myspark", "club volleyball", "colorado boom", "high school"],
      a: "Youth training runs through our partner club, Colorado Boom, on Tuesdays and Thursdays from 5:00 PM: Little Spikers (ages 6–9), Developmental (8–16) and Advanced Skills (14+). It's $295/month for twice a week or $150/month for once a week, and the first week is free. My Spark Denver is accepted. Strong high-school players can also join adult sessions; email first.", l: [["Youth programs", COBO], ["Training page", "training.html#youth"]] },
    { t: "Women's league / Queens Club",
      k: ["women", "womens", "women's", "ladies", "queens", "queens club", "girls league", "female"],
      a: "Queens Club is our women's 4s league: Tuesdays A/BB and Wednesdays AA, 7–9:30 PM, and Sundays A/BB/B rotating pairs, 5–7 PM. The season runs October–April. Tuesday and Wednesday need qualification through the pre-season (Aug–Oct); Sunday is open with rolling registration.", l: [["Women's league", "womens-league.html"]] },
    { t: "Men's league / Kings Club",
      k: ["men", "mens", "men's", "guys", "kings", "kings club"],
      a: "Kings Club is our men's 4s league, Wednesdays A/AA, 7–9:30 PM. No qualifying, you just sign up, but spots are limited. It's competitive play, not recreational, and teams are expected to play all three seasons.", l: [["Men's league", "mens-league.html"]] },
    { t: "Co-ed leagues",
      k: ["coed", "co-ed", "co ed", "mixed", "volo", "match point", "mps", "social league", "rec league", "recreational"],
      a: "Co-ed leagues at Boomtown are run by our partners. Match Point Social runs competitive, skill-matched co-ed indoor leagues here, and Volo runs co-ed leagues for every level, from first-timers to Advanced.", l: [["Co-ed leagues", "co-ed-leagues.html"]] },
    { t: "League registration",
      k: ["league", "leagues", "join a league", "sign up league", "register league", "season", "seasons", "qualify", "qualification", "pre-season", "preseason", "free agent", "need a team", "find a team", "no team"],
      a: "League registration links are on each league page and in the pop-up on the home page. Women: Queens Club (Tue, Wed, Sun). Men: Kings Club (Wed). Co-ed: Match Point Social or Volo. No team? Sunday women's rotating pairs and drop-in nights are the easiest way in, or email us and we'll help you find a team.", l: [["Women's", "womens-league.html"], ["Men's", "mens-league.html"], ["Co-ed", "co-ed-leagues.html"]] },
    { t: "Skill levels",
      k: ["skill level", "level", "division", "divisions", "bb", "aa", "open level", "b level", "what level", "am i good enough"],
      a: "Pick your division by your current consistency, not your best-ever game. If you're between two levels, start lower. BB is solid fundamentals that are still developing, A is consistent in every skill and runs basic systems, AA and Open bring club or college experience. Teams can move up or down during a season.", l: [["Skill levels", "skill-levels.html"]] },
    { t: "Tournament cost & fees",
      k: ["tournament cost", "tournament price", "entry fee", "membership fee", "membership fees", "team fee", "~how much", "~cost", "~price", "~fee", "~pay", "~tournament"],
      a: "There are no membership fees to play Boomtown tournaments. You register and pay per event through that event's registration link on the schedule. The entry price is shown on each event's form.", l: [["Schedule & registration", "schedule.html"]] },
    { t: "Location & parking",
      k: ["where", "address", "location", "located", "directions", "parking", "park", "map", "find you", "aurora", "fieldhouse"],
      a: "Boomtown FieldhouseUSA, 14200 E Alameda Ave, Aurora, CO 80012, in the Denver metro. Parking is free and plentiful. Lock your car and keep valuables out of sight.", l: [["Facility map", "facility-layout.html"], ["Google Maps", "https://www.google.com/maps/search/?api=1&query=14200+E+Alameda+Ave+Aurora+CO+80012"]] },
    { t: "Hours",
      k: ["hours", "~open", "close", "closing", "~what time", "schedule today", "holiday", "thanksgiving", "christmas"],
      a: "Volleyball runs mostly in the evenings: drop-in Thursday–Monday 7–11 PM, leagues Tue/Wed 7–9:30 PM and Sunday 5–7 PM, adult training Friday 7–8:30 PM and Sunday 5:30–7 PM, and tournaments on weekends. For holiday changes, check Instagram or the Facebook group the day of.", l: [["Schedule", "schedule.html"], ["Instagram", "https://www.instagram.com/boomtownvb"]] },
    { t: "Food, drink & bar",
      k: ["food", "drink", "drinks", "eat", "snack", "snacks", "~water", "bar", "alcohol", "beer", "cafe", "coffee", "starbucks", "cooler", "kitchen"],
      a: "There's a bar & café on site; alcohol stays in the bar seating area. No outside commercial food or drink (coffee included) and no coolers. Only sealed, clear water is allowed on the courts.", l: [["Facility rules", "facility-rules.html"]] },
    { t: "What to bring",
      k: ["~bring", "what to bring", "wear", "shoes", "knee pads", "kneepads", "ball", "volleyballs", "equipment", "gear", "need to bring"],
      a: "Court shoes, knee pads and water (sealed, clear). Volleyballs are provided for training, leagues and tournaments. There's no athletic trainer or ice on site, so bring your own tape or ice if you need it.", l: [["Facility rules", "facility-rules.html"]] },
    { t: "Ages & kids at the facility",
      k: ["age", "ages", "how old", "minimum age", "under 14", "14", "bring my kids", "spectator", "spectators", "watch", "watching"],
      a: "Drop-in is ages 14 & up; under 14 only with a parent present who has also paid entry. Spectators pay to enter on drop-in nights. Children must be supervised at all times anywhere in the facility.", l: [["Drop-in rules", "drop-in.html"], ["Facility rules", "facility-rules.html"]] },
    { t: "Pets",
      k: ["dog", "dogs", "pet", "pets", "animal", "service animal"],
      a: "No animals except service animals as defined by law. If you're bringing a service animal, let us know ahead of time; service animals stay off the playing surfaces.", l: [["Email us", "mailto:" + EMAIL + "?subject=Service%20animal"]] },
    { t: "Lost & found",
      k: ["lost", "found", "lost and found", "left my", "forgot my", "missing"],
      a: "The facility doesn't keep a lost & found. Unclaimed items are cleared nightly, so please keep track of your gear. You can still submit the lost & found form.", l: [["Lost & found form", "https://forms.gle/wkkn4TCwwnCsuoRd6"]] },
    { t: "Contact",
      k: ["contact", "email", "phone", "call", "talk to", "speak to", "human", "person", "staff", "manager", "question"],
      a: "Email admin@boomtownathletics.com and we'll get back to you. For training and lessons, email zhu@boomtownvball.com. Night-of updates go out on Instagram (@boomtownvb) and the Facebook group.", l: [["Email us", "mailto:" + EMAIL], ["Contact page", "contact.html"]] },
    { t: "Sponsorship & partners",
      k: ["sponsor", "sponsorship", "partner", "partnership", "advertise", "vendor", "brand"],
      a: "For sponsorships and partnerships, email admin@boomtownathletics.com with your company and what you have in mind.", l: [["Email about sponsorship", "mailto:" + EMAIL + "?subject=Sponsorship"]] },
    { t: "Host an event / rent courts",
      k: ["rent", "rental", "book a court", "court rental", "host", "hosting", "my own tournament", "birthday", "party", "private event", "corporate", "team building", "pickleball", "basketball"],
      a: "Court rentals and private events are booked through the facility, Boomtown FieldhouseUSA. The courts convert to basketball and pickleball too.", l: [["FieldhouseUSA Aurora", "https://aurorafieldhouseusa.com/"], ["Email us", "mailto:" + EMAIL + "?subject=Event%20or%20rental%20question"]] },
    { t: "Mailing list",
      k: ["newsletter", "mailing list", "updates", "email list", "notify", "announcements"],
      a: "Join the mailing list for the month's tournaments, leagues and open-gym nights, plus first access to registration.", l: [["Join the mailing list", MAIL_LIST]] },
    { t: "Refunds & cancellations",
      k: ["refund", "refunds", "cancel", "cancellation", "money back", "credit", "transfer", "weather", "snow"],
      a: "Refunds, credits and weather cancellations depend on the event. Email admin@boomtownathletics.com with your name and the event and we'll sort it out. Weather updates go out on Instagram and the Facebook group.", l: [["Email us", "mailto:" + EMAIL + "?subject=Refund%20or%20cancellation"]] },
    { t: "Jobs & refs",
      k: ["job", "jobs", "hiring", "work", "ref", "refs", "referee", "officiate", "volunteer", "coach for you"],
      a: "We're always glad to hear from refs, coaches and event staff. Email admin@boomtownathletics.com with your experience and availability.", l: [["Email us", "mailto:" + EMAIL + "?subject=Work%20at%20Boomtown"]] },
    { t: "Merch & store",
      k: ["merch", "shirt", "shirts", "store", "shop", "apparel", "buy"],
      a: "Boomtown gear is in our online store.", l: [["Online store", "https://boomtownathletics.square.site/"]] }
  ];
  var GREET = ["hi", "hello", "hey", "yo", "sup", "good morning", "good evening"];
  var THANKS = ["thanks", "thank you", "thx", "ty", "appreciate"];
  var CHIPS = ["Next tournament", "Drop-in times", "Adult training", "Youth programs", "Join a league", "Where are you?"];

  /* ---------- matching ---------- */
  /* lower-case, drop punctuation, and fold plurals ("leagues" -> "league") on both sides */
  function norm(s) {
    return " " + String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9#&+ -]/g, " ").split(/\s+/)
      .map(function (w) { return w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w; }).join(" ").trim() + " ";
  }
  function has(text, kw) { return text.indexOf(norm(kw)) > -1; }
  function best(q) {
    var t = norm(q), top = null, score = 0;
    FAQ.forEach(function (f) {
      var s = 0, seen = {};
      f.k.forEach(function (kw) {
        var w = kw.charAt(0) === "~" ? 0.5 : 1, n = norm(kw.replace(/^~/, ""));
        if (seen[n] || t.indexOf(n) < 0) return; seen[n] = 1;
        s += w * (n.trim().indexOf(" ") > -1 ? 2 : 1);
      });
      if (has(t, f.t)) s += 2;
      if (s > score) { score = s; top = f; }
    });
    return score ? top : null;
  }

  /* ---------- live events from the published Events sheet ---------- */
  function parseCSV(text) {
    var rows = [], row = [], cell = "", q = false, i, c;
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
      else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }
  function upcoming(type) {
    return fetch(CSV, { cache: "no-store" }).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (txt) {
      var rows = parseCSV(txt), h = rows.shift().map(function (x) { return x.trim().toLowerCase(); }), ix = {};
      h.forEach(function (n, i) { ix[n] = i; });
      var today = new Date(); today.setHours(0, 0, 0, 0);
      return rows.map(function (r) {
        var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec((r[ix.start_date] || "").trim());
        return { type: (r[ix.type] || "").trim().toLowerCase(), title: (r[ix.title] || "").trim(), time: (r[ix.time] || "").trim(),
          link: (r[ix.registration_link] || "").trim(), status: (r[ix.status] || "").trim().toLowerCase(), d: m ? new Date(+m[1], +m[2] - 1, +m[3]) : null };
      }).filter(function (e) { return e.d && e.d >= today && e.type === type && e.status !== "past"; })
        .sort(function (a, b) { return a.d - b.d; }).slice(0, 4);
    });
  }

  /* ---------- UI ---------- */
  var css = "#btc-btn{position:fixed;left:16px;bottom:16px;z-index:100;display:flex;align-items:center;gap:8px;min-height:48px;padding:10px 16px;border:2px solid #0a0a0b;border-radius:999px;background:#F8C400;color:#0a0a0b;font:800 13px/1 Archivo,system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.45)}" +
    "#btc-btn:hover{background:#ffd633}#btc-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}#btc-btn svg{width:20px;height:20px}" +
    "#btc{position:fixed;left:16px;bottom:16px;z-index:101;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100dvh - 32px));display:flex;flex-direction:column;background:#0a0a0b;color:#fff;border:1px solid rgba(248,196,0,.55);border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.6);font:15px/1.45 Archivo,system-ui,sans-serif;overflow:hidden}" +
    "#btc[hidden]{display:none}#btc header{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#141417;border-bottom:1px solid rgba(255,255,255,.12)}" +
    "#btc header b{flex:1;font-family:Anton,sans-serif;font-weight:400;font-size:20px;letter-spacing:.5px;text-transform:uppercase;color:#F8C400}" +
    "#btc .x{min-width:44px;min-height:44px;border:0;background:none;color:#fff;font-size:20px;cursor:pointer}#btc .x:focus-visible{outline:2px solid #F8C400}" +
    "#btc-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}" +
    ".btc-m{max-width:88%;padding:10px 12px;border-radius:10px;white-space:pre-line;overflow-wrap:anywhere}" +
    ".btc-bot{align-self:flex-start;background:#1c1c20;border:1px solid rgba(255,255,255,.1)}.btc-me{align-self:flex-end;background:#F8C400;color:#0a0a0b;font-weight:600}" +
    ".btc-ls{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.btc-ls a{display:inline-flex;align-items:center;min-height:36px;padding:6px 10px;border:1px solid #F8C400;border-radius:4px;color:#F8C400;font-size:13px;font-weight:700;text-decoration:none}" +
    ".btc-ls a:hover{background:#F8C400;color:#0a0a0b}.btc-ev{display:block;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.1)}.btc-ev a{margin-left:6px;color:#F8C400;font-weight:700}" +
    "#btc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}#btc-chips button{min-height:36px;padding:6px 10px;border:1px solid rgba(255,255,255,.3);border-radius:999px;background:none;color:#fff;font:600 13px Archivo,system-ui,sans-serif;cursor:pointer}" +
    "#btc-chips button:hover{border-color:#F8C400;color:#F8C400}#btc form{display:flex;gap:8px;padding:10px 14px 14px;border-top:1px solid rgba(255,255,255,.12)}" +
    "#btc input{flex:1;min-width:0;min-height:44px;padding:8px 12px;border:1px solid rgba(255,255,255,.3);border-radius:6px;background:#141417;color:#fff;font:inherit}#btc input:focus{outline:2px solid #F8C400;border-color:#F8C400}" +
    "#btc form button{min-height:44px;padding:0 16px;border:0;border-radius:6px;background:#F8C400;color:#0a0a0b;font:800 13px Archivo,system-ui,sans-serif;text-transform:uppercase;cursor:pointer}" +
    ".btc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}" +
    "@media print{#btc,#btc-btn{display:none!important}}";

  function el(tag, attrs, text) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; }
  function safe(u) { return /^(https:\/\/|mailto:)/i.test(u) || /^[a-z0-9-]+\.html(#[\w-]+)?$/i.test(u); }
  function linkTo(label, url) {
    if (!safe(url)) return null;
    var a = el("a", { href: url }, label);
    if (/^https:/i.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function init() {
    var st = el("style"); st.textContent = css; document.head.appendChild(st);
    var btn = el("button", { id: "btc-btn", type: "button", "aria-expanded": "false", "aria-controls": "btc" });
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>';
    btn.appendChild(el("span", null, "Questions?"));
    var box = el("div", { id: "btc", role: "dialog", "aria-modal": "false", "aria-labelledby": "btc-t", hidden: "" });
    var head = el("header"); head.appendChild(el("b", { id: "btc-t" }, "Ask Boomtown"));
    var x = el("button", { class: "x", type: "button", "aria-label": "Close chat" }, "✕"); head.appendChild(x);
    var log = el("div", { id: "btc-log", role: "log", "aria-live": "polite" });
    var chips = el("div", { id: "btc-chips" });
    var form = el("form"); var lab = el("label", { for: "btc-in", class: "btc-sr" }, "Type your question");
    var input = el("input", { id: "btc-in", type: "text", autocomplete: "off", maxlength: "300", placeholder: "Ask about tournaments, leagues, drop-in…" });
    form.appendChild(lab); form.appendChild(input); form.appendChild(el("button", { type: "submit" }, "Ask"));
    box.appendChild(head); box.appendChild(log); box.appendChild(chips); box.appendChild(form);
    document.body.appendChild(btn); document.body.appendChild(box);

    function say(text, who, links) {
      var m = el("div", { class: "btc-m " + (who === "me" ? "btc-me" : "btc-bot") }, text);
      if (links && links.length) {
        var row = el("div", { class: "btc-ls" });
        links.forEach(function (l) { var a = linkTo(l[0], l[1]); if (a) row.appendChild(a); });
        m.appendChild(row);
      }
      log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
    }
    function ask(q) {
      q = String(q).trim(); if (!q) return;
      say(q, "me");
      var t = norm(q);
      if (THANKS.some(function (w) { return has(t, w); }) && t.length < 30) { say("You're welcome! See you on the court."); return; }
      var f = best(q);
      if (!f && GREET.some(function (w) { return has(t, w); }) && t.length < 25) { say("Hi! Ask me about tournaments, leagues, drop-in, training, or the facility."); return; }
      if (!f) {
        say("I don't have an answer for that one yet. Send it to us and we'll reply by email, and we'll add the answer here for the next person.", "bot",
          [["Email my question", "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Website question") + "&body=" + encodeURIComponent("My question: " + q + "\n\nPage: " + location.pathname + "\n\n")], ["Contact page", "contact.html"]]);
        return;
      }
      var m = say(f.a, "bot", f.l);
      if (f.live) {
        var wait = el("span", { class: "btc-ev" }, "Checking the schedule…"); m.insertBefore(wait, m.lastChild);
        upcoming(f.live).then(function (list) {
          wait.remove();
          if (!list.length) { m.insertBefore(el("span", { class: "btc-ev" }, "Nothing is posted yet. Check back soon or join the mailing list."), m.lastChild); return; }
          list.forEach(function (e) {
            var s = el("span", { class: "btc-ev" }, e.d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + " · " + e.title + (e.time ? " · " + e.time : ""));
            var a = /^https:\/\//i.test(e.link) ? linkTo("Register", e.link) : null; if (a) s.appendChild(a);
            m.insertBefore(s, m.lastChild);
          });
        }).catch(function () { wait.textContent = "I couldn't load the live schedule. The full schedule page has every date."; });
      }
    }
    CHIPS.forEach(function (c) { var b = el("button", { type: "button" }, c); b.addEventListener("click", function () { ask(c); input.focus(); }); chips.appendChild(b); });

    var greeted = false;
    function open() {
      box.hidden = false; btn.hidden = true; btn.setAttribute("aria-expanded", "true");
      if (!greeted) { greeted = true; say("Hi! I can answer questions about tournaments, leagues, drop-in, training and the facility. Pick a topic or type a question."); }
      input.focus();
    }
    function shut() { box.hidden = true; btn.hidden = false; btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    btn.addEventListener("click", open); x.addEventListener("click", shut);
    box.addEventListener("keydown", function (e) { if (e.key === "Escape") shut(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); input.value = ""; });
  }
  if (BROWSER) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init(); }

  /* test hook for scripts/chat-check.js */
  if (typeof module !== "undefined") module.exports = { best: best, norm: norm, parseCSV: parseCSV, FAQ: FAQ };
})();
