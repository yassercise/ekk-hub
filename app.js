import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0QDm49wVArv6oJA4YNGdRCXDe9OEtkI0",
  authDomain: "ekk-hub.firebaseapp.com",
  projectId: "ekk-hub",
  storageBucket: "ekk-hub.firebasestorage.app",
  messagingSenderId: "68211752660",
  appId: "1:68211752660:web:1098c3baed22cae8b7c541"
};

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);

/* ============================================================
   DATA LAYER
   Backed by Firestore now. One document per brand, in the
   "ekkhub" collection. If a brand's document doesn't exist yet
   (first run), it's seeded from SEED and written back.
   ============================================================ */

const RAW_TASKS_KDR = JSON.parse(`[{"id":"t1","title":"Finalize Launch Video","cat":"Video Production","owner":"Videography","priority":"high","status":"progress","due":"2026-08-02","notes":"","subtasks":[{"id":"s1","text":"Swap vehicle CGI animation","done":true},{"id":"s17860042296393v4","text":"Review Video & Send Feedback","done":false}],"deps":["t1784183589084uznq"],"links":[]},{"id":"t2","title":"Finalize Influencer Selection","cat":"Influencers","owner":"Yasir","priority":"high","status":"progress","due":"2026-07-28","notes":"","subtasks":[{"id":"s178418572598187q","text":"Contact Eman to Inquire on GCC Influencers","done":true},{"id":"s17852206933576hb","text":"Send GCC Influencer Brief to Eman","done":true},{"id":"s1785650674992xkj","text":"Send Full Bahrain Influencer List to Hasan","done":true},{"id":"s1785650690900n9s","text":"Get 5osh Fkra Quotations Approved","done":true}],"deps":[],"links":[]},{"id":"t1784183589084uznq","title":"Secure Brand Prize Sponsorship","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"done","due":"2026-08-10","notes":"","subtasks":[{"id":"a1","text":"Send Proposal to Automotive Brands","done":true},{"id":"a2","text":"Meet With Team to Discuss Proposal","done":true},{"id":"a3","text":"Get Confirmation from Teams on Sponsorships","done":true},{"id":"a4","text":"Meet With Teams on Prize Restructure","done":true},{"id":"a5","text":"Confirm New Prize Structure","done":true},{"id":"a6","text":"Create Quotations to Each Brand On Sponsorship","done":true},{"id":"a7","text":"Send Quotation to Suresh for Review & Confirmation With Legal","done":true},{"id":"a8","text":"Send Quotations to Automotive Brands","done":true},{"id":"a9","text":"Receive LPOs from all Brands","done":true}],"deps":[],"links":[]},{"id":"t5","title":"Allign With Automotive Brand on Timeline & Activations","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"done","due":"2026-07-16","notes":"Deepal=Platinum, Jetour=Gold, Toyota=Gold, Lexus=Gold, iCAUR=Silver. All raffle sponsors.","subtasks":[{"id":"s1","text":"Have Meeting With All Brands on Timeline","done":true}],"deps":[],"links":[]},{"id":"t7","title":"Setup CRM Email Flow & Database","cat":"Email / CRM","owner":"CRM","priority":"high","status":"progress","due":"2026-08-08","notes":"","subtasks":[{"id":"b1","text":"Send Email to CRM Team to Brief Them on Project","done":true},{"id":"b2","text":"Meet With CRM Team","done":true},{"id":"b3","text":"Contact Digital Solutions to Edit Welcome Email","done":true},{"id":"b4","text":"Edit Welcome Email Content & Send to Sree","done":true},{"id":"b5","text":"Test Registration & Welcome Email","done":true},{"id":"b6","text":"Send Campaign Brief to CRM Team With Visuals, Texts & Overall Details","done":false}],"deps":[],"links":[]},{"id":"t8","title":"Create 1st Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"high","status":"done","due":"2026-07-09","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t11","title":"Plan & Setup BSC event activation (Aug 14-20)","cat":"Bahrain Sports City","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-13","notes":"iCAUR exclusive branding at eSports section. Game playable on screens. Possible booth setup.","subtasks":[{"id":"c1","text":"Go to Sports City for Sight Visit","done":false},{"id":"c2","text":"Design BSC event banners","done":false},{"id":"c3","text":"Set up screens and game terminals","done":false},{"id":"c4","text":"Brief Videography Team to Shoot Recap Video","done":false}],"deps":[],"links":[]},{"id":"t13","title":"Brief Creative Team on Designs","cat":"Design","owner":"Yasir","priority":"high","status":"done","due":"2026-07-15","notes":"","subtasks":[{"id":"d1","text":"Meet With Creative Team","done":true},{"id":"d2","text":"Create & Send Detailed Brief to Ismael","done":true},{"id":"d3","text":"Send Creative Brief to Miracle","done":true}],"deps":[],"links":[]},{"id":"t1783939377826t96r","title":"Create 2nd Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"high","status":"done","due":"2026-07-16","notes":"","subtasks":[{"id":"e1","text":"Create Artwork","done":true},{"id":"e2","text":"Send to Georgiana for Approval","done":true},{"id":"e3","text":"Create Caption","done":true},{"id":"e4","text":"Publish the Post","done":true}],"deps":[],"links":[]},{"id":"t1783939422159rsgh","title":"Create 3rd Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"low","status":"done","due":"2026-07-23","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783939440325eshi","title":"Create 4th Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"low","status":"done","due":"2026-07-30","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t17839405220978x5t","title":"Publish 1st Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"done","due":"2026-08-04","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783940566379extm","title":"Publish 2nd Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-06","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783940595862i6ww","title":"Publish 3rd Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-11","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t178591983618073o5","title":"Teaser Phase Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"done","due":"","notes":"","subtasks":[{"id":"f1","text":"Review & Leave Feedback on Artwork","done":true},{"id":"f2","text":"Request Various Sizes for Artwork","done":true},{"id":"f3","text":"Confirm & Approve Artworks","done":true}],"deps":[],"links":[]},{"id":"t1785220358635oxpx","title":"Main Campaign Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"done","due":"2026-07-30","notes":"","subtasks":[{"id":"g1","text":"Have Meeting With Miracle to Review Visual Concepts","done":true},{"id":"g2","text":"Review With Georgiana & Send Feedback","done":true},{"id":"g3","text":"Inform Miracle to Design Main Visual in Various Formats","done":true},{"id":"g4","text":"Review & Send Feedback for Edits","done":true},{"id":"g5","text":"Confirm & Approve Main Visuals","done":true}],"deps":[],"links":[]},{"id":"t1785918663067rqu8","title":"Khosh Fkra Video","cat":"Influencers","owner":"Yasir","priority":"high","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"h1","text":"Send Supplier Details to Sreejith","done":true},{"id":"h2","text":"Have Meeting With Khosh Fkra Team","done":false}],"deps":[],"links":[]},{"id":"t1785918678350sepr","title":"Gulf Insider Video","cat":"Influencers","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"i1","text":"Confirm Video Concept","done":true},{"id":"i2","text":"Send Video Feedback to Hasan","done":true},{"id":"i3","text":"Brief Script & Idea With Georgiana","done":true}],"deps":[],"links":[]},{"id":"t1785918693300ctvs","title":"Tekken Master Video","cat":"Influencers","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-11","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1785918861149wbjq","title":"KDR Sports City Media Launch","cat":"Bahrain Sports City","owner":"Corporate Comms","priority":"high","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"j1","text":"Contact Hasan to Arrange for Media Coverage","done":true},{"id":"j2","text":"Receive Media Agency Quotations from Hasan","done":false}],"deps":[],"links":[]},{"id":"t1785919069225rkuk","title":"Teaser Phase Sponsor Ads","cat":"Sponsored Ads","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-05","notes":"","subtasks":[{"id":"k1","text":"Have Meeting With Digital Ads Team","done":true},{"id":"k2","text":"Create Media Plan & Get Approval","done":true},{"id":"k3","text":"Send Sreejith Media Plan Quotation for PR","done":true},{"id":"k4","text":"Send PR to Marketing Accounts for LPO","done":true},{"id":"k5","text":"Send LPO to Digital Ads Team Alongside Teaser 1 Link","done":true},{"id":"k6","text":"Brief & Discuss Sponsored Ad Audience Change With Georgiana","done":true},{"id":"k7","text":"Send Email Reply on Change to Nada","done":true}],"deps":[],"links":[]},{"id":"t1785919211306x7ln","title":"Terms & Conditions","cat":"Game","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"l1","text":"Review Current Terms & Conditions","done":true},{"id":"l2","text":"Edit Terms & Conditions to Include 3 New Clauses","done":true},{"id":"l3","text":"Review Updated Terms & Conditions With Matthew & Georgiana","done":true},{"id":"l4","text":"Send Updated Document to Legal for Review","done":true},{"id":"l5","text":"Confirm Prize Money Details & Make Edits to Document","done":false},{"id":"l6","text":"Send Final Terms & Conditions to Digital Solutions","done":false}],"deps":[],"links":[]},{"id":"t1785919334521cexw","title":"In-Game Banners (TyrePlus)","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"m1","text":"Send Banner Selection Document to TyrePlus","done":true},{"id":"m2","text":"Receive Selected Banners & LPO","done":true},{"id":"m3","text":"Send Reference Sizes for Banners & Request Artwork from TyrePlus","done":true},{"id":"m4","text":"Receive 4 Banner Artwork From TyrePlus","done":false},{"id":"m5","text":"Send Banner Artworks to Sree","done":false}],"deps":[],"links":[]},{"id":"t1785919344187hjxf","title":"In-Game Banners (KVL & KPV)","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"n1","text":"Confirm KVL & KPV Banner Selections","done":true},{"id":"n2","text":"Send Email to Suresh to Create LPO","done":true},{"id":"n3","text":"Create Banner Artwork for KPV","done":false},{"id":"n4","text":"Create Banner Artwork for KVL","done":false}],"deps":[],"links":[]},{"id":"t1785919934428k67w","title":"Landing Page","cat":"Game","owner":"Digital Solutions","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"o1","text":"Review & Approve Concept & Content of Landing Page With Georgiana","done":true},{"id":"o2","text":"Send Content & Assets to Sree for Landing Page","done":false}],"deps":[],"links":[]},{"id":"t1785920002300yvxn","title":"Individual Vehicle Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"p1","text":"Review & Leave Feedback on Artwork","done":true},{"id":"p2","text":"Review Updated Artwork With Georgiana","done":false},{"id":"p3","text":"Send Artwork to Each Automotive Brand for Approval","done":false}],"deps":[],"links":[]},{"id":"t1785920254959t22m","title":"Website Banner","cat":"Game","owner":"Digital Solutions","priority":"high","status":"todo","due":"","notes":"","subtasks":[{"id":"q1","text":"Send Main Visual as Landscape to Digital Solutions to Keep as Website Banner","done":false}],"deps":[],"links":[]}]`);

const RAW_TIMELINE_KDR = JSON.parse(`[{"task":"Weekly build-up post #1 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-09"]},{"task":"Weekly build-up post #2 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-16"]},{"task":"Weekly build-up post #3 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-23"]},{"task":"Weekly build-up post #4 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-30"]},{"task":"Teaser post #1 — Helmet","owner":"Design Team","cat":"Teaser Phase","dates":["2026-08-04"]},{"task":"Teaser post #2 — Circuit","owner":"Design Team","cat":"Teaser Phase","dates":["2026-08-06"]},{"cat":"Teaser Phase","task":"Teaser post #3 — Tomorrow.","owner":"Design Team","dates":["2026-08-11"]},{"cat":"Launch","task":"Game goes LIVE","owner":"Digital Solutions","dates":["2026-08-12"]},{"task":"Launch video posted — KDR channels","owner":"Yasir","cat":"Launch","dates":["2026-08-12"]},{"task":"KDR launch post","owner":"Design Team","cat":"Launch","dates":["2026-08-12"]},{"task":"Deepal — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"Deepal Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Jetour — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"task":"Jetour Races Completed With Vehicle Post","owner":"Design Team","cat":"Brand Collaborations","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"iCAUR — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"iCAUR Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Toyota — collab post","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"Toyota Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Lexus — collab post","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Influencers","task":"Tekkenmaster — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"5osh Fkra — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"Charlie / Gulf Insider — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"GCC Influencer #1 (Qatar) — reel live","owner":"Corporate Comms","dates":["2026-08-14"]},{"cat":"Influencers","task":"GCC Influencer #2 (Kuwait) — reel live","owner":"Corporate Comms","dates":["2026-08-16"]},{"cat":"Influencers","task":"Influencer follow-up story (leaderboard)","owner":"Corporate Comms","dates":["2026-08-26"]},{"cat":"Bahrain Sports City","task":"BSC Event — KDR booth activation","owner":"Design Team","dates":["2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21"]},{"cat":"Bahrain Sports City","task":"BSC social coverage posts","owner":"Design Team","dates":["2026-08-14","2026-08-17","2026-08-19","2026-08-21"]},{"cat":"Competition & Leaderboard","task":"Leaderboard competition open","owner":"Digital Solutions","dates":["2026-08-12","2026-08-13","2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21","2026-08-22","2026-08-23","2026-08-24","2026-08-25","2026-08-26","2026-08-27","2026-08-28","2026-08-29","2026-08-30","2026-08-31","2026-09-01","2026-09-02","2026-09-03","2026-09-04","2026-09-05","2026-09-06","2026-09-07","2026-09-08","2026-09-09","2026-09-10","2026-09-11","2026-09-12"]},{"task":"Leaderboard update post — Week 1","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-08-20"]},{"task":"Leaderboard update post — Week 2","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-08-27"]},{"task":"Leaderboard update post — Week 3","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-03"]},{"task":"Last chance urgency posts","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-10"]},{"cat":"Competition & Leaderboard","task":"Leaderboard closes","owner":"Digital Solutions","dates":["2026-09-12"]},{"task":"Winners announced — collab post","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-13"]},{"cat":"UGC","task":"UGC bonus draw open","owner":"Design Team","dates":["2026-08-12"]},{"cat":"UGC","task":"UGC reshares — ongoing","owner":"KDR Channel","dates":["2026-08-13","2026-08-20","2026-08-27","2026-09-03","2026-09-10"]},{"task":"UGC bonus draw winner announced","owner":"Design Team","cat":"UGC","dates":["2026-09-13"]},{"cat":"Email / CRM","task":"Email 1 — Welcome (auto on sign-up)","owner":"CRM","dates":["2026-08-12"]},{"cat":"Email / CRM","task":"Email 2 — Midway leaderboard update","owner":"CRM","dates":["2026-08-26"]},{"task":"Email 3 — Last chance","owner":"CRM","cat":"Email / CRM","dates":["2026-09-10"]},{"task":"Email 4 — Winners + consolation offer","owner":"CRM","cat":"Email / CRM","dates":["2026-09-13"]},{"cat":"Post-Campaign","task":"Campaign performance report","owner":"Design Team","dates":["2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25"]},{"cat":"Post-Campaign","task":"CRM database handoff to rental team","owner":"CRM","dates":["2026-09-16","2026-09-17","2026-09-18","2026-09-21"]},{"cat":"Brand Collaborations","task":"Lexus Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]}]`);

const SEED = {
  kdr: {
    campaigns: [{ id: 'racing-game', name: 'Racing Game — Marketing Campaign', period: 'Aug 12 – Dec 15' }],
    tasks: RAW_TASKS_KDR,
    timeline: RAW_TIMELINE_KDR
  },
  kvl: { campaigns: [], tasks: [], timeline: [] },
  kpv: { campaigns: [], tasks: [], timeline: [] }
};

const BRAND_META = {
  kdr: { color: '#FF7A45', soft: 'rgba(255,122,69,0.12)', label: 'KDR · DAILY RENTAL' },
  kvl: { color: '#5B6EF5', soft: 'rgba(91,110,245,0.12)', label: 'KVL · VEHICLE LEASING' },
  kpv: { color: '#16A863', soft: 'rgba(22,168,99,0.12)', label: 'KPV · PRE-OWNED VEHICLES' }
};

const Store = {
  async loadAll() {
    const result = {};
    for (const brandKey of Object.keys(SEED)) {
      const ref = doc(db, 'ekkhub', brandKey);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        result[brandKey] = snap.data();
      } else {
        result[brandKey] = structuredClone(SEED[brandKey]);
        await setDoc(ref, result[brandKey]);
      }
    }
    return result;
  },
  async saveBrand(brandKey) {
    await setDoc(doc(db, 'ekkhub', brandKey), DATA[brandKey]);
  }
};

let DATA = null;

/* ============================================================
   STATE + HELPERS
   ============================================================ */

const state = { brand: 'kdr', view: 'overview', campaignId: null, campaignTab: 'timeline', taskFilter: 'all', expandedTask: null };

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}
function parseISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function daysBetween(a, b) { return Math.round((b - a) / 86400000); }
function isOverdue(due) { return due && due < todayISO(); }

function groupConsecutive(dates) {
  const ds = [...dates].sort();
  const runs = [];
  let start = ds[0], prev = ds[0];
  for (let i = 1; i < ds.length; i++) {
    const d = ds[i];
    if (daysBetween(parseISO(prev), parseISO(d)) === 1) { prev = d; }
    else { runs.push([start, prev]); start = d; prev = d; }
  }
  runs.push([start, prev]);
  return runs;
}

function brandData() { return DATA[state.brand]; }

function computeStats(brandKey) {
  const d = DATA[brandKey];
  const tasks = d.tasks;
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const dueToday = tasks.filter(t => t.due === todayISO() && t.status !== 'done').length;
  const overdue = tasks.filter(t => isOverdue(t.due) && t.status !== 'done').length;
  return {
    activeCampaigns: d.campaigns.length,
    pctDone: total ? Math.round((done / total) * 100) : 0,
    dueToday, overdue, total, done
  };
}

function computeHealth(brandKey) {
  const tasks = DATA[brandKey].tasks;
  const byCat = {};
  tasks.forEach(t => {
    byCat[t.cat] = byCat[t.cat] || { done: 0, total: 0 };
    byCat[t.cat].total++;
    if (t.status === 'done') byCat[t.cat].done++;
  });
  return Object.entries(byCat).map(([name, v]) => ({ name, pct: Math.round((v.done / v.total) * 100) }));
}

function allDueOrOverdue() {
  const items = [];
  Object.keys(DATA).forEach(brandKey => {
    DATA[brandKey].tasks.forEach(t => {
      if (t.status !== 'done' && t.due && t.due <= todayISO()) {
        items.push({ brand: brandKey, task: t });
      }
    });
  });
  items.sort((a, b) => a.task.due.localeCompare(b.task.due));
  return items;
}

/* ============================================================
   RENDER: SIDEBAR ACTIVE STATES
   ============================================================ */

function slidePill(pillEl, activeEl, container) {
  const cRect = container.getBoundingClientRect();
  const aRect = activeEl.getBoundingClientRect();
  pillEl.style.transform = `translateY(${aRect.top - cRect.top}px)`;
  pillEl.style.height = aRect.height + 'px';
}

function syncSidebar() {
  document.querySelectorAll('.brand-tab').forEach(t => t.classList.toggle('active', t.dataset.brand === state.brand));
  document.querySelectorAll('.nav-item').forEach(t => t.classList.toggle('active', t.dataset.nav === state.view || (state.view === 'campaign' && t.dataset.nav === 'all')));
  const brandRail = document.getElementById('brandRail');
  const brandPill = document.getElementById('brandPill');
  slidePill(brandPill, document.querySelector('.brand-tab.active'), brandRail);
  const mainNav = document.getElementById('mainNav');
  const navPill = document.getElementById('navPill');
  const activeNav = document.querySelector('.nav-item.active') || document.querySelector('.nav-item[data-nav="overview"]');
  slidePill(navPill, activeNav, mainNav);

  const root = document.documentElement;
  const meta = BRAND_META[state.brand];
  root.style.setProperty('--accent', meta.color);
  root.style.setProperty('--accent-soft', meta.soft);
}

/* ============================================================
   VIEW: OVERVIEW
   ============================================================ */

function countUp(el, target, suffix) {
  const t0 = performance.now();
  const duration = 700;
  function tick(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + (suffix || '');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function buildSparkline(data) {
  const w = 460, h = 140, pad = 10;
  const max = Math.max(...data, 1);
  const stepX = (w - pad * 2) / Math.max(data.length - 1, 1);
  const pts = data.map((v, i) => [pad + i * stepX, h - pad - (v / max) * (h - pad * 2)]);
  let line = `M ${pts[0][0]} ${pts[0][1]}`;
  pts.slice(1).forEach(p => line += ` L ${p[0]} ${p[1]}`);
  const fill = line + ` L ${pts[pts.length - 1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  return { line, fill };
}

function scheduleDensity(brandKey) {
  // Real, derived data: cumulative count of scheduled timeline items across campaign weeks.
  const tl = DATA[brandKey].timeline;
  if (!tl.length) return [0, 0, 0, 0, 0, 0];
  const allDates = tl.flatMap(t => t.dates).sort();
  const start = parseISO(allDates[0]);
  const end = parseISO(allDates[allDates.length - 1]);
  const totalDays = Math.max(daysBetween(start, end), 1);
  const buckets = 6;
  const counts = new Array(buckets).fill(0);
  allDates.forEach(d => {
    const offset = daysBetween(start, parseISO(d));
    const idx = Math.min(Math.floor((offset / totalDays) * buckets), buckets - 1);
    counts[idx]++;
  });
  let running = 0;
  return counts.map(c => (running += c));
}

function renderOverview() {
  const meta = BRAND_META[state.brand];
  const stats = computeStats(state.brand);
  const health = computeHealth(state.brand);
  const campaigns = brandData().campaigns;
  const todos = allDueOrOverdue().filter(x => x.brand === state.brand);

  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <div class="stat-row" id="statRow"></div>
    <div class="grid-2">
      <div class="card chart-card hoverable">
        <div class="card-title">Scheduled activity</div>
        <div class="card-sub">Cumulative items across the campaign timeline</div>
        <svg viewBox="0 0 460 140" width="100%" height="140" style="margin-top:10px;">
          <defs><linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop id="fillStop1" offset="0%" stop-color="${meta.color}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${meta.color}" stop-opacity="0"/>
          </linearGradient></defs>
          <path id="chartFill" fill="url(#fillGrad)" d=""/>
          <path id="chartPath" fill="none" stroke="${meta.color}" stroke-width="2.5" stroke-linecap="round" d=""/>
        </svg>
      </div>
      <div class="card health-card hoverable">
        <div class="card-title" style="margin-bottom:10px;">Task health by category</div>
        <div id="healthRows"></div>
      </div>
    </div>
    <div class="card campaign-card">
      <div style="padding:14px 20px 0;"><div class="section-title" style="margin:0 0 2px;">Campaigns</div></div>
      <div class="campaign-head-row"><div>Campaign</div><div>Progress</div><div>Status</div><div style="text-align:right;">Days left</div></div>
      <div id="campaignList"></div>
    </div>
    <div class="card todo-card">
      <div style="padding:14px 20px 0;"><div class="section-title" style="margin:0 0 2px;">Due today &amp; overdue</div></div>
      <div id="todoPreview"></div>
    </div>`;

  const statRow = document.getElementById('statRow');
  const statDefs = [
    { label: 'Active campaigns', value: stats.activeCampaigns },
    { label: 'Tasks completed', value: stats.pctDone, suffix: '%' },
    { label: 'Due today', value: stats.dueToday },
    { label: 'Overdue', value: stats.overdue }
  ];
  statDefs.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card stat-card hoverable';
    card.innerHTML = `<div class="stat-label">${s.label}</div><div class="stat-value"><span class="cu">0</span></div>`;
    statRow.appendChild(card);
    countUp(card.querySelector('.cu'), s.value, s.suffix);
  });

  const spark = scheduleDensity(state.brand);
  const { line, fill } = buildSparkline(spark);
  const chartPath = document.getElementById('chartPath');
  const chartFill = document.getElementById('chartFill');
  chartPath.setAttribute('d', line);
  chartFill.setAttribute('d', fill);
  const len = chartPath.getTotalLength ? chartPath.getTotalLength() : 500;
  chartPath.style.strokeDasharray = len;
  chartPath.style.strokeDashoffset = len;
  chartPath.getBoundingClientRect();
  chartPath.style.transition = 'stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)';
  requestAnimationFrame(() => { chartPath.style.strokeDashoffset = 0; });

  const healthRows = document.getElementById('healthRows');
  if (!health.length) {
    healthRows.innerHTML = `<div style="font-size:12.5px;color:var(--text-dim);padding:8px 0;">No categories tracked yet.</div>`;
  } else {
    health.forEach(h => {
      const row = document.createElement('div');
      row.className = 'health-row';
      row.innerHTML = `<div><div class="health-name">${h.name}</div><div class="health-bar-track"><div class="health-bar-fill" style="width:0%"></div></div></div><div class="health-pct">${h.pct}%</div>`;
      healthRows.appendChild(row);
      requestAnimationFrame(() => { row.querySelector('.health-bar-fill').style.width = h.pct + '%'; });
    });
  }

  const campaignList = document.getElementById('campaignList');
  if (!campaigns.length) {
    campaignList.innerHTML = `<div class="empty-row"><div class="t">Nothing running yet</div><div class="s">Start a campaign to see its timeline and tasks here.</div><button>New campaign</button></div>`;
  } else {
    campaigns.forEach(c => {
      const pct = stats.pctDone;
      const endDate = parseISO(DATA[state.brand].timeline.flatMap(t => t.dates).sort().slice(-1)[0]);
      const daysLeft = daysBetween(parseISO(todayISO()), endDate);
      const row = document.createElement('div');
      row.className = 'campaign-row';
      row.dataset.campaign = c.id;
      row.innerHTML = `
        <div><div class="campaign-name">${c.name}</div><div class="campaign-cat">Live · ${c.period}</div></div>
        <div><div class="progress-track"><div class="progress-fill" style="width:0%"></div></div><div class="progress-label">${pct}%</div></div>
        <div><span class="status-pill ${pct >= 50 ? 'good' : 'risk'}">${pct >= 50 ? 'On track' : 'At risk'}</span></div>
        <div style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;">${daysLeft > 0 ? daysLeft + 'd' : 'Ended'}</div>`;
      row.addEventListener('click', () => navigate('campaign', { campaignId: c.id }));
      campaignList.appendChild(row);
      requestAnimationFrame(() => { row.querySelector('.progress-fill').style.width = pct + '%'; });
    });
  }

  renderTodoRows(document.getElementById('todoPreview'), todos.slice(0, 4), true);
}

/* ============================================================
   VIEW: TODO ROWS (shared by overview preview + full to-do page)
   ============================================================ */

function renderTodoRows(container, items, brandTagVisible) {
  if (!items.length) {
    container.innerHTML = `<div style="padding:20px; font-size:12.5px; color:var(--text-dim);">Nothing due right now.</div>`;
    return;
  }
  container.innerHTML = '';
  items.forEach(({ brand, task }) => {
    const meta = BRAND_META[brand];
    const row = document.createElement('div');
    row.className = 'todo-row';
    row.innerHTML = `
      <div class="check" data-task="${task.id}" data-brand="${brand}"></div>
      <div class="todo-title">${task.title}</div>
      <div class="todo-due">${task.due === todayISO() ? 'Today' : 'Overdue'}</div>
      ${brandTagVisible ? `<div class="todo-brand-tag" style="background:${meta.soft}; color:${meta.color};">${brand.toUpperCase()}</div>` : ''}`;
    row.querySelector('.check').addEventListener('click', function () {
      const t = DATA[brand].tasks.find(x => x.id === task.id);
      t.status = 'done';
      Store.saveBrand(brand);
      this.style.background = meta.color;
      this.style.borderColor = meta.color;
      this.innerHTML = '✓';
      row.style.opacity = '0.45';
    });
    container.appendChild(row);
  });
}

function renderTodoPage() {
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `<div class="card todo-card"><div style="padding:14px 20px 0;"><div class="section-title">Due today &amp; overdue — all brands</div></div><div id="todoFull"></div></div>`;
  renderTodoRows(document.getElementById('todoFull'), allDueOrOverdue(), true);
}

/* ============================================================
   VIEW: ALL CAMPAIGNS
   ============================================================ */

function renderAllCampaigns() {
  const campaigns = brandData().campaigns;
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `<div class="card campaign-card">
    <div style="padding:14px 20px 0;"><div class="section-title">All campaigns — ${state.brand.toUpperCase()}</div></div>
    <div class="campaign-head-row"><div>Campaign</div><div>Progress</div><div>Status</div><div style="text-align:right;">Days left</div></div>
    <div id="campaignListFull"></div></div>`;
  const list = document.getElementById('campaignListFull');
  if (!campaigns.length) {
    list.innerHTML = `<div class="empty-row"><div class="t">Nothing running yet</div><div class="s">Start a campaign to see it here.</div><button>New campaign</button></div>`;
    return;
  }
  const stats = computeStats(state.brand);
  campaigns.forEach(c => {
    const endDate = parseISO(DATA[state.brand].timeline.flatMap(t => t.dates).sort().slice(-1)[0]);
    const daysLeft = daysBetween(parseISO(todayISO()), endDate);
    const row = document.createElement('div');
    row.className = 'campaign-row';
    row.innerHTML = `
      <div><div class="campaign-name">${c.name}</div><div class="campaign-cat">Live · ${c.period}</div></div>
      <div><div class="progress-track"><div class="progress-fill" style="width:${stats.pctDone}%"></div></div><div class="progress-label">${stats.pctDone}%</div></div>
      <div><span class="status-pill ${stats.pctDone >= 50 ? 'good' : 'risk'}">${stats.pctDone >= 50 ? 'On track' : 'At risk'}</span></div>
      <div style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;">${daysLeft > 0 ? daysLeft + 'd' : 'Ended'}</div>`;
    row.addEventListener('click', () => navigate('campaign', { campaignId: c.id }));
    list.appendChild(row);
  });
}

/* ============================================================
   VIEW: CAMPAIGN DETAIL (Timeline / Tasks)
   ============================================================ */

function renderCampaignDetail() {
  const campaign = brandData().campaigns.find(c => c.id === state.campaignId) || brandData().campaigns[0];
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <div class="back-link" id="backLink">← Overview</div>
    <div class="view-tabs">
      <button class="view-tab ${state.campaignTab === 'timeline' ? 'active' : ''}" data-tab="timeline">Timeline</button>
      <button class="view-tab ${state.campaignTab === 'tasks' ? 'active' : ''}" data-tab="tasks">Tasks</button>
    </div>
    <div id="tabMount"></div>`;

  document.getElementById('backLink').addEventListener('click', () => navigate('overview'));
  mount.querySelectorAll('.view-tab').forEach(tab => {
    tab.addEventListener('click', () => { state.campaignTab = tab.dataset.tab; renderCampaignDetail(); });
  });

  if (state.campaignTab === 'timeline') renderGantt(); else renderTaskTracker();
}

function renderGantt() {
  const tabMount = document.getElementById('tabMount');
  const timeline = brandData().timeline;
  if (!timeline.length) {
    tabMount.innerHTML = `<div class="card"><div class="empty-page"><div class="t">No timeline yet</div><div class="s">Add scheduled items to see the Gantt view.</div></div></div>`;
    return;
  }

  const allDates = timeline.flatMap(t => t.dates).sort();
  const rangeStart = parseISO(allDates[0]);
  const rangeEnd = parseISO(allDates[allDates.length - 1]);
  const dayWidth = 24;
  const totalDays = daysBetween(rangeStart, rangeEnd) + 1;
  const canvasWidth = totalDays * dayWidth;

  // Build rows preserving first-seen category order
  const rows = [];
  const seenCats = new Set();
  timeline.forEach(item => {
    if (!seenCats.has(item.cat)) { seenCats.add(item.cat); rows.push({ type: 'cat', label: item.cat }); }
    rows.push({ type: 'task', item });
  });

  let sidebarHTML = `<div class="gantt-sidebar-head">Task</div>`;
  let canvasRowsHTML = '';
  let cumulativeTop = 40; // header height

  rows.forEach(r => {
    if (r.type === 'cat') {
      sidebarHTML += `<div class="gantt-cat-label">${r.label}</div>`;
      canvasRowsHTML += `<div style="height:28px;"></div>`;
      cumulativeTop += 28;
    } else {
      sidebarHTML += `<div class="gantt-task-label">${r.item.task}</div>`;
      const runs = groupConsecutive(r.item.dates);
      let barsHTML = '';
      runs.forEach(([s, e]) => {
        const left = daysBetween(rangeStart, parseISO(s)) * dayWidth;
        const width = (daysBetween(parseISO(s), parseISO(e)) + 1) * dayWidth - 4;
        barsHTML += `<div class="gantt-bar" style="left:${left}px; width:${Math.max(width, 6)}px;"></div>`;
      });
      canvasRowsHTML += `<div class="gantt-row-bg">${barsHTML}</div>`;
      cumulativeTop += 34;
    }
  });

  // Month gridlines
  let gridHTML = '';
  let cursor = new Date(rangeStart);
  cursor.setDate(1);
  if (cursor < rangeStart) cursor.setMonth(cursor.getMonth() + 1);
  while (cursor <= rangeEnd) {
    const x = daysBetween(rangeStart, cursor) * dayWidth;
    gridHTML += `<div class="gantt-month-line" style="left:${x}px; height:${cumulativeTop}px;"></div>
                 <div class="gantt-month-label" style="left:${x + 6}px;">${cursor.toLocaleDateString('en-GB', { month: 'short' })}</div>`;
    cursor.setMonth(cursor.getMonth() + 1);
  }
  const todayOffset = daysBetween(rangeStart, parseISO(todayISO()));
  let todayLineHTML = '';
  if (todayOffset >= 0 && todayOffset <= totalDays) {
    todayLineHTML = `<div class="gantt-today-line" style="left:${todayOffset * dayWidth}px; height:${cumulativeTop}px;"></div>`;
  }

  tabMount.innerHTML = `
    <div class="gantt-wrap">
      <div class="gantt-sidebar">${sidebarHTML}</div>
      <div class="gantt-scroll">
        <div class="gantt-scroll-head" style="width:${canvasWidth}px;"></div>
        <div class="gantt-canvas" style="width:${canvasWidth}px;">
          ${gridHTML}${todayLineHTML}
          ${canvasRowsHTML}
        </div>
      </div>
    </div>`;
}

function renderTaskTracker() {
  const tabMount = document.getElementById('tabMount');
  const tasks = brandData().tasks;
  const filtered = state.taskFilter === 'all' ? tasks : tasks.filter(t => t.status === state.taskFilter);

  tabMount.innerHTML = `
    <div class="filter-tabs">
      <button class="filter-tab ${state.taskFilter === 'all' ? 'active' : ''}" data-f="all">All</button>
      <button class="filter-tab ${state.taskFilter === 'todo' ? 'active' : ''}" data-f="todo">To Do</button>
      <button class="filter-tab ${state.taskFilter === 'progress' ? 'active' : ''}" data-f="progress">In Progress</button>
      <button class="filter-tab ${state.taskFilter === 'done' ? 'active' : ''}" data-f="done">Done</button>
    </div>
    <div class="task-list" id="taskList"></div>`;

  tabMount.querySelectorAll('.filter-tab').forEach(f => f.addEventListener('click', () => { state.taskFilter = f.dataset.f; renderTaskTracker(); }));

  const list = document.getElementById('taskList');
  filtered.forEach(t => {
    const doneCount = t.subtasks.filter(s => s.done).length;
    const isOpen = state.expandedTask === t.id;
    const item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML = `
      <div class="task-row" data-task="${t.id}">
        <div class="task-title-cell"><div class="t-title">${t.title}</div><div class="t-cat">${t.cat} · ${t.owner}</div></div>
        <div><span class="priority-pill ${t.priority}">${t.priority}</span></div>
        <div><span class="status-pill ${t.status}">${t.status === 'todo' ? 'To Do' : t.status === 'progress' ? 'In Progress' : 'Done'}</span></div>
        <div class="task-due ${isOverdue(t.due) && t.status !== 'done' ? 'overdue' : ''}">${t.due || '—'}</div>
        <div class="task-sub-count">${t.subtasks.length ? doneCount + '/' + t.subtasks.length : '—'}</div>
      </div>
      <div class="task-detail ${isOpen ? 'open' : ''}" id="detail-${t.id}">
        <div class="task-detail-grid">
          <div>
            <div class="detail-block-title">Subtasks</div>
            <div id="subtasks-${t.id}"></div>
          </div>
          <div>
            <div class="detail-block-title">Notes</div>
            <div class="detail-notes">${t.notes || 'No notes.'}</div>
            ${t.deps.length ? `<div class="detail-block-title" style="margin-top:16px;">Depends on</div>${t.deps.map(id => { const dt = tasks.find(x => x.id === id); return dt ? `<span class="dep-chip">${dt.title}</span>` : ''; }).join('')}` : ''}
          </div>
        </div>
      </div>`;
    item.querySelector('.task-row').addEventListener('click', () => {
      state.expandedTask = isOpen ? null : t.id;
      renderTaskTracker();
    });
    list.appendChild(item);

    if (isOpen) {
      const sub = item.querySelector(`#subtasks-${t.id}`);
      if (!t.subtasks.length) sub.innerHTML = `<div style="font-size:12.5px;color:var(--text-dim);">No subtasks.</div>`;
      t.subtasks.forEach(s => {
        const row = document.createElement('div');
        row.className = `subtask-row ${s.done ? 'done' : ''}`;
        row.innerHTML = `<div class="subtask-check" style="background:${s.done ? 'var(--accent)' : 'transparent'}; border-color:${s.done ? 'var(--accent)' : ''};">${s.done ? '✓' : ''}</div><div class="subtask-text">${s.text}</div>`;
        row.querySelector('.subtask-check').addEventListener('click', (e) => {
          e.stopPropagation();
          s.done = !s.done;
          Store.saveBrand(state.brand);
          renderTaskTracker();
        });
        sub.appendChild(row);
      });
    }
  });
}

/* ============================================================
   ROUTER
   ============================================================ */

function navigate(view, opts = {}) {
  state.view = view;
  if (opts.campaignId) { state.campaignId = opts.campaignId; state.campaignTab = 'timeline'; }
  document.getElementById('brandEyebrow').textContent = BRAND_META[state.brand].label;
  document.getElementById('mainTitle').textContent = view === 'overview' ? 'Overview' : view === 'todo' ? 'Daily To-Do' : view === 'all' ? 'All Campaigns' : (brandData().campaigns.find(c => c.id === state.campaignId) || {}).name || 'Campaign';

  if (view === 'overview') renderOverview();
  else if (view === 'todo') renderTodoPage();
  else if (view === 'all') renderAllCampaigns();
  else if (view === 'campaign') renderCampaignDetail();

  syncSidebar();
}

/* ============================================================
   INIT
   ============================================================ */

window.addEventListener('load', async () => {
  document.getElementById('dateLabel').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  document.querySelectorAll('.brand-tab').forEach(tab => {
    tab.addEventListener('click', () => { state.brand = tab.dataset.brand; navigate('overview'); });
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.nav));
  });

  document.getElementById('viewMount').innerHTML = `<div style="padding:40px; color:var(--text-dim); font-size:13px;">Loading your data…</div>`;
  DATA = await Store.loadAll();
  navigate('overview');
});
