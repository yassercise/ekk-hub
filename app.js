import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(fbApp);

/* ============================================================
   SEED DATA
   ============================================================ */

const RAW_TASKS_KDR = JSON.parse(`[{"id":"t1","title":"Finalize Launch Video","cat":"Video Production","owner":"Videography","priority":"high","status":"progress","due":"2026-08-02","notes":"","subtasks":[{"id":"s1","text":"Swap vehicle CGI animation","done":true},{"id":"s17860042296393v4","text":"Review Video & Send Feedback","done":false}],"deps":["t1784183589084uznq"],"links":[]},{"id":"t2","title":"Finalize Influencer Selection","cat":"Influencers","owner":"Yasir","priority":"high","status":"progress","due":"2026-07-28","notes":"","subtasks":[{"id":"s178418572598187q","text":"Contact Eman to Inquire on GCC Influencers","done":true},{"id":"s17852206933576hb","text":"Send GCC Influencer Brief to Eman","done":true},{"id":"s1785650674992xkj","text":"Send Full Bahrain Influencer List to Hasan","done":true},{"id":"s1785650690900n9s","text":"Get 5osh Fkra Quotations Approved","done":true}],"deps":[],"links":[]},{"id":"t1784183589084uznq","title":"Secure Brand Prize Sponsorship","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"done","due":"2026-08-10","notes":"","subtasks":[{"id":"a1","text":"Send Proposal to Automotive Brands","done":true},{"id":"a2","text":"Meet With Team to Discuss Proposal","done":true},{"id":"a3","text":"Get Confirmation from Teams on Sponsorships","done":true},{"id":"a4","text":"Meet With Teams on Prize Restructure","done":true},{"id":"a5","text":"Confirm New Prize Structure","done":true},{"id":"a6","text":"Create Quotations to Each Brand On Sponsorship","done":true},{"id":"a7","text":"Send Quotation to Suresh for Review & Confirmation With Legal","done":true},{"id":"a8","text":"Send Quotations to Automotive Brands","done":true},{"id":"a9","text":"Receive LPOs from all Brands","done":true}],"deps":[],"links":[]},{"id":"t5","title":"Allign With Automotive Brand on Timeline & Activations","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"done","due":"2026-07-16","notes":"Deepal=Platinum, Jetour=Gold, Toyota=Gold, Lexus=Gold, iCAUR=Silver. All raffle sponsors.","subtasks":[{"id":"s1","text":"Have Meeting With All Brands on Timeline","done":true}],"deps":[],"links":[]},{"id":"t7","title":"Setup CRM Email Flow & Database","cat":"Email / CRM","owner":"CRM","priority":"high","status":"progress","due":"2026-08-08","notes":"","subtasks":[{"id":"b1","text":"Send Email to CRM Team to Brief Them on Project","done":true},{"id":"b2","text":"Meet With CRM Team","done":true},{"id":"b3","text":"Contact Digital Solutions to Edit Welcome Email","done":true},{"id":"b4","text":"Edit Welcome Email Content & Send to Sree","done":true},{"id":"b5","text":"Test Registration & Welcome Email","done":true},{"id":"b6","text":"Send Campaign Brief to CRM Team With Visuals, Texts & Overall Details","done":false}],"deps":[],"links":[]},{"id":"t8","title":"Create 1st Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"high","status":"done","due":"2026-07-09","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t11","title":"Plan & Setup BSC event activation (Aug 14-20)","cat":"Bahrain Sports City","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-13","notes":"iCAUR exclusive branding at eSports section. Game playable on screens. Possible booth setup.","subtasks":[{"id":"c1","text":"Go to Sports City for Sight Visit","done":false},{"id":"c2","text":"Design BSC event banners","done":false},{"id":"c3","text":"Set up screens and game terminals","done":false},{"id":"c4","text":"Brief Videography Team to Shoot Recap Video","done":false}],"deps":[],"links":[]},{"id":"t13","title":"Brief Creative Team on Designs","cat":"Design","owner":"Yasir","priority":"high","status":"done","due":"2026-07-15","notes":"","subtasks":[{"id":"d1","text":"Meet With Creative Team","done":true},{"id":"d2","text":"Create & Send Detailed Brief to Ismael","done":true},{"id":"d3","text":"Send Creative Brief to Miracle","done":true}],"deps":[],"links":[]},{"id":"t1783939377826t96r","title":"Create 2nd Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"high","status":"done","due":"2026-07-16","notes":"","subtasks":[{"id":"e1","text":"Create Artwork","done":true},{"id":"e2","text":"Send to Georgiana for Approval","done":true},{"id":"e3","text":"Create Caption","done":true},{"id":"e4","text":"Publish the Post","done":true}],"deps":[],"links":[]},{"id":"t1783939422159rsgh","title":"Create 3rd Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"low","status":"done","due":"2026-07-23","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783939440325eshi","title":"Create 4th Pre-Teaser Post","cat":"Pre-Teaser Phase","owner":"Yasir","priority":"low","status":"done","due":"2026-07-30","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t17839405220978x5t","title":"Publish 1st Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"done","due":"2026-08-04","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783940566379extm","title":"Publish 2nd Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-06","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1783940595862i6ww","title":"Publish 3rd Teaser Post","cat":"Teaser Phase","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-11","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t178591983618073o5","title":"Teaser Phase Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"done","due":"","notes":"","subtasks":[{"id":"f1","text":"Review & Leave Feedback on Artwork","done":true},{"id":"f2","text":"Request Various Sizes for Artwork","done":true},{"id":"f3","text":"Confirm & Approve Artworks","done":true}],"deps":[],"links":[]},{"id":"t1785220358635oxpx","title":"Main Campaign Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"done","due":"2026-07-30","notes":"","subtasks":[{"id":"g1","text":"Have Meeting With Miracle to Review Visual Concepts","done":true},{"id":"g2","text":"Review With Georgiana & Send Feedback","done":true},{"id":"g3","text":"Inform Miracle to Design Main Visual in Various Formats","done":true},{"id":"g4","text":"Review & Send Feedback for Edits","done":true},{"id":"g5","text":"Confirm & Approve Main Visuals","done":true}],"deps":[],"links":[]},{"id":"t1785918663067rqu8","title":"Khosh Fkra Video","cat":"Influencers","owner":"Yasir","priority":"high","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"h1","text":"Send Supplier Details to Sreejith","done":true},{"id":"h2","text":"Have Meeting With Khosh Fkra Team","done":false}],"deps":[],"links":[]},{"id":"t1785918678350sepr","title":"Gulf Insider Video","cat":"Influencers","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"i1","text":"Confirm Video Concept","done":true},{"id":"i2","text":"Send Video Feedback to Hasan","done":true},{"id":"i3","text":"Brief Script & Idea With Georgiana","done":true}],"deps":[],"links":[]},{"id":"t1785918693300ctvs","title":"Tekken Master Video","cat":"Influencers","owner":"Yasir","priority":"medium","status":"todo","due":"2026-08-11","notes":"","subtasks":[],"deps":[],"links":[]},{"id":"t1785918861149wbjq","title":"KDR Sports City Media Launch","cat":"Bahrain Sports City","owner":"Corporate Comms","priority":"high","status":"progress","due":"2026-08-10","notes":"","subtasks":[{"id":"j1","text":"Contact Hasan to Arrange for Media Coverage","done":true},{"id":"j2","text":"Receive Media Agency Quotations from Hasan","done":false}],"deps":[],"links":[]},{"id":"t1785919069225rkuk","title":"Teaser Phase Sponsor Ads","cat":"Sponsored Ads","owner":"Yasir","priority":"medium","status":"progress","due":"2026-08-05","notes":"","subtasks":[{"id":"k1","text":"Have Meeting With Digital Ads Team","done":true},{"id":"k2","text":"Create Media Plan & Get Approval","done":true},{"id":"k3","text":"Send Sreejith Media Plan Quotation for PR","done":true},{"id":"k4","text":"Send PR to Marketing Accounts for LPO","done":true},{"id":"k5","text":"Send LPO to Digital Ads Team Alongside Teaser 1 Link","done":true},{"id":"k6","text":"Brief & Discuss Sponsored Ad Audience Change With Georgiana","done":true},{"id":"k7","text":"Send Email Reply on Change to Nada","done":true}],"deps":[],"links":[]},{"id":"t1785919211306x7ln","title":"Terms & Conditions","cat":"Game","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"l1","text":"Review Current Terms & Conditions","done":true},{"id":"l2","text":"Edit Terms & Conditions to Include 3 New Clauses","done":true},{"id":"l3","text":"Review Updated Terms & Conditions With Matthew & Georgiana","done":true},{"id":"l4","text":"Send Updated Document to Legal for Review","done":true},{"id":"l5","text":"Confirm Prize Money Details & Make Edits to Document","done":false},{"id":"l6","text":"Send Final Terms & Conditions to Digital Solutions","done":false}],"deps":[],"links":[]},{"id":"t1785919334521cexw","title":"In-Game Banners (TyrePlus)","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"m1","text":"Send Banner Selection Document to TyrePlus","done":true},{"id":"m2","text":"Receive Selected Banners & LPO","done":true},{"id":"m3","text":"Send Reference Sizes for Banners & Request Artwork from TyrePlus","done":true},{"id":"m4","text":"Receive 4 Banner Artwork From TyrePlus","done":false},{"id":"m5","text":"Send Banner Artworks to Sree","done":false}],"deps":[],"links":[]},{"id":"t1785919344187hjxf","title":"In-Game Banners (KVL & KPV)","cat":"Brand Collaborations","owner":"Yasir","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"n1","text":"Confirm KVL & KPV Banner Selections","done":true},{"id":"n2","text":"Send Email to Suresh to Create LPO","done":true},{"id":"n3","text":"Create Banner Artwork for KPV","done":false},{"id":"n4","text":"Create Banner Artwork for KVL","done":false}],"deps":[],"links":[]},{"id":"t1785919934428k67w","title":"Landing Page","cat":"Game","owner":"Digital Solutions","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"o1","text":"Review & Approve Concept & Content of Landing Page With Georgiana","done":true},{"id":"o2","text":"Send Content & Assets to Sree for Landing Page","done":false}],"deps":[],"links":[]},{"id":"t1785920002300yvxn","title":"Individual Vehicle Visuals","cat":"Design","owner":"Design Team","priority":"high","status":"progress","due":"","notes":"","subtasks":[{"id":"p1","text":"Review & Leave Feedback on Artwork","done":true},{"id":"p2","text":"Review Updated Artwork With Georgiana","done":false},{"id":"p3","text":"Send Artwork to Each Automotive Brand for Approval","done":false}],"deps":[],"links":[]},{"id":"t1785920254959t22m","title":"Website Banner","cat":"Game","owner":"Digital Solutions","priority":"high","status":"todo","due":"","notes":"","subtasks":[{"id":"q1","text":"Send Main Visual as Landscape to Digital Solutions to Keep as Website Banner","done":false}],"deps":[],"links":[]}]`);

const RAW_TIMELINE_KDR = JSON.parse(`[{"task":"Weekly build-up post #1 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-09"]},{"task":"Weekly build-up post #2 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-16"]},{"task":"Weekly build-up post #3 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-23"]},{"task":"Weekly build-up post #4 (cryptic)","owner":"Yasir","cat":"Pre-Launch Content","dates":["2026-07-30"]},{"task":"Teaser post #1 — Helmet","owner":"Design Team","cat":"Teaser Phase","dates":["2026-08-04"]},{"task":"Teaser post #2 — Circuit","owner":"Design Team","cat":"Teaser Phase","dates":["2026-08-06"]},{"cat":"Teaser Phase","task":"Teaser post #3 — Tomorrow.","owner":"Design Team","dates":["2026-08-11"]},{"cat":"Launch","task":"Game goes LIVE","owner":"Digital Solutions","dates":["2026-08-12"]},{"task":"Launch video posted — KDR channels","owner":"Yasir","cat":"Launch","dates":["2026-08-12"]},{"task":"KDR launch post","owner":"Design Team","cat":"Launch","dates":["2026-08-12"]},{"task":"Deepal — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"Deepal Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Jetour — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"task":"Jetour Races Completed With Vehicle Post","owner":"Design Team","cat":"Brand Collaborations","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"iCAUR — collab post live","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"iCAUR Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Toyota — collab post","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Brand Collaborations","task":"Toyota Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]},{"task":"Lexus — collab post","owner":"Corporate Comms","cat":"Brand Collaborations","dates":["2026-08-12"]},{"cat":"Influencers","task":"Tekkenmaster — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"5osh Fkra — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"Charlie / Gulf Insider — reel + story live","owner":"Corporate Comms","dates":["2026-08-12"]},{"cat":"Influencers","task":"GCC Influencer #1 (Qatar) — reel live","owner":"Corporate Comms","dates":["2026-08-14"]},{"cat":"Influencers","task":"GCC Influencer #2 (Kuwait) — reel live","owner":"Corporate Comms","dates":["2026-08-16"]},{"cat":"Influencers","task":"Influencer follow-up story (leaderboard)","owner":"Corporate Comms","dates":["2026-08-26"]},{"cat":"Bahrain Sports City","task":"BSC Event — KDR booth activation","owner":"Design Team","dates":["2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21"]},{"cat":"Bahrain Sports City","task":"BSC social coverage posts","owner":"Design Team","dates":["2026-08-14","2026-08-17","2026-08-19","2026-08-21"]},{"cat":"Competition & Leaderboard","task":"Leaderboard competition open","owner":"Digital Solutions","dates":["2026-08-12","2026-08-13","2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21","2026-08-22","2026-08-23","2026-08-24","2026-08-25","2026-08-26","2026-08-27","2026-08-28","2026-08-29","2026-08-30","2026-08-31","2026-09-01","2026-09-02","2026-09-03","2026-09-04","2026-09-05","2026-09-06","2026-09-07","2026-09-08","2026-09-09","2026-09-10","2026-09-11","2026-09-12"]},{"task":"Leaderboard update post — Week 1","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-08-20"]},{"task":"Leaderboard update post — Week 2","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-08-27"]},{"task":"Leaderboard update post — Week 3","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-03"]},{"task":"Last chance urgency posts","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-10"]},{"cat":"Competition & Leaderboard","task":"Leaderboard closes","owner":"Digital Solutions","dates":["2026-09-12"]},{"task":"Winners announced — collab post","owner":"Design Team","cat":"Competition & Leaderboard","dates":["2026-09-13"]},{"cat":"UGC","task":"UGC bonus draw open","owner":"Design Team","dates":["2026-08-12"]},{"cat":"UGC","task":"UGC reshares — ongoing","owner":"KDR Channel","dates":["2026-08-13","2026-08-20","2026-08-27","2026-09-03","2026-09-10"]},{"task":"UGC bonus draw winner announced","owner":"Design Team","cat":"UGC","dates":["2026-09-13"]},{"cat":"Email / CRM","task":"Email 1 — Welcome (auto on sign-up)","owner":"CRM","dates":["2026-08-12"]},{"cat":"Email / CRM","task":"Email 2 — Midway leaderboard update","owner":"CRM","dates":["2026-08-26"]},{"task":"Email 3 — Last chance","owner":"CRM","cat":"Email / CRM","dates":["2026-09-10"]},{"task":"Email 4 — Winners + consolation offer","owner":"CRM","cat":"Email / CRM","dates":["2026-09-13"]},{"cat":"Post-Campaign","task":"Campaign performance report","owner":"Design Team","dates":["2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25"]},{"cat":"Post-Campaign","task":"CRM database handoff to rental team","owner":"CRM","dates":["2026-09-16","2026-09-17","2026-09-18","2026-09-21"]},{"cat":"Brand Collaborations","task":"Lexus Races Completed With Vehicle Post","owner":"Design Team","dates":["2026-08-19","2026-08-26","2026-09-02","2026-09-09"]}]`);

const SEED = {
  kdr: { projects: [{ id: 'racing-game', name: 'Racing Game — Marketing Campaign', period: 'Aug 12 – Dec 15', type: 'Campaign' }], tasks: RAW_TASKS_KDR, timeline: RAW_TIMELINE_KDR },
  kvl: { projects: [], tasks: [], timeline: [] },
  kpv: { projects: [], tasks: [], timeline: [] }
};
const BRAND_KEYS = ['kdr', 'kvl', 'kpv'];
const BRAND_META = {
  kdr: { color: '#FF7A45', soft: 'rgba(255,122,69,0.12)', label: 'KDR · DAILY RENTAL' },
  kvl: { color: '#5B6EF5', soft: 'rgba(91,110,245,0.12)', label: 'KVL · VEHICLE LEASING' },
  kpv: { color: '#16A863', soft: 'rgba(22,168,99,0.12)', label: 'KPV · PRE-OWNED VEHICLES' }
};
const NEUTRAL = { color: '#6D6AFB', soft: 'rgba(109,106,251,0.12)' };

/* ============================================================
   DATA LAYER (Firestore, per-brand doc + one shared "todos" doc)
   ============================================================ */

const Store = {
  async loadAll() {
    const result = {};
    for (const brandKey of BRAND_KEYS) {
      const ref = doc(db, 'ekkhub', brandKey);
      const snap = await getDoc(ref);
      let data;
      if (snap.exists()) {
        data = snap.data();
        if (!data.projects && data.campaigns) { data.projects = data.campaigns; }
        if (!data.projects) data.projects = [];
      } else {
        data = structuredClone(SEED[brandKey]);
        await setDoc(ref, data);
      }
      result[brandKey] = data;
    }
    const todosRef = doc(db, 'ekkhub', 'todos');
    const todosSnap = await getDoc(todosRef);
    if (todosSnap.exists()) { result.todos = todosSnap.data().items || []; }
    else { result.todos = []; await setDoc(todosRef, { items: [] }); }
    return result;
  },
  async saveBrand(brandKey) { await setDoc(doc(db, 'ekkhub', brandKey), DATA[brandKey]); },
  async saveTodos() { await setDoc(doc(db, 'ekkhub', 'todos'), { items: DATA.todos }); }
};

let DATA = null;

/* ============================================================
   STATE + DATE HELPERS
   ============================================================ */

const state = { brand: 'kdr', view: 'global-overview', projectId: null, projectTab: 'timeline', taskFilter: 'all', expandedTask: null, selectedDate: null };

function fmt(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function todayISO() { return fmt(new Date()); }
function parseISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(dISOorDate, n) { const d = typeof dISOorDate === 'string' ? parseISO(dISOorDate) : new Date(dISOorDate); d.setDate(d.getDate() + n); return d; }
function daysBetween(a, b) { return Math.round((b - a) / 86400000); }
function isOverdue(due) { return due && due < todayISO(); }
function weekStartOf(dateISO) { const d = parseISO(dateISO); return addDays(d, -d.getDay()); } // Sunday
function inRange(dISO, startISO, endISO) { return dISO >= startISO && dISO <= endISO; }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

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

/* ============================================================
   SOUND + CURSOR + RIPPLE
   ============================================================ */

let audioCtx;
function tone(freq, dur, vol) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq; gain.gain.value = vol;
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) { /* audio unsupported, ignore */ }
}
const clickTick = () => tone(600, 0.05, 0.025);
const completeChime = () => { tone(660, 0.09, 0.05); setTimeout(() => tone(880, 0.12, 0.05), 70); };
const uncheckTick = () => tone(320, 0.08, 0.035);

function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
  const hoverables = 'button, .campaign-row, .task-row, .check, .subtask-check, .nav-item, .brand-tab, .filter-tab, .view-tab, .day-tab, .task-complete-btn';
  document.addEventListener('mouseover', (e) => { if (e.target.closest(hoverables)) ring.classList.add('hover'); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest(hoverables)) ring.classList.remove('hover'); });
}

function initRipple() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, .campaign-row, .day-tab, .nav-item, .brand-tab');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    const prevPosition = getComputedStyle(el).position;
    if (prevPosition === 'static') el.style.position = 'relative';
    el.style.overflow = el.style.overflow || 'hidden';
    el.appendChild(r);
    setTimeout(() => r.remove(), 560);
  });
}

/* ============================================================
   STATS
   ============================================================ */

function computeStats(brandKey) {
  const tasks = DATA[brandKey].tasks;
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const dueToday = tasks.filter(t => t.due === todayISO() && t.status !== 'done').length;
  const overdue = tasks.filter(t => isOverdue(t.due) && t.status !== 'done').length;
  return { activeProjects: DATA[brandKey].projects.length, pctDone: total ? Math.round((done / total) * 100) : 0, dueToday, overdue, total, done };
}
function computeGlobalStats() {
  let totalProjects = 0, totalTasks = 0, totalDone = 0, dueToday = 0, overdue = 0;
  BRAND_KEYS.forEach(b => { const s = computeStats(b); totalProjects += s.activeProjects; totalTasks += s.total; totalDone += s.done; dueToday += s.dueToday; overdue += s.overdue; });
  return { totalProjects, pctDone: totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0, dueToday, overdue };
}
function computeStatusBreakdown(brandKey) {
  const tasks = DATA[brandKey].tasks;
  const c = { todo: 0, progress: 0, done: 0 };
  tasks.forEach(t => c[t.status]++);
  return { ...c, total: tasks.length };
}
function computeHealth(brandKey) {
  const tasks = DATA[brandKey].tasks;
  const byCat = {};
  tasks.forEach(t => { byCat[t.cat] = byCat[t.cat] || { done: 0, total: 0 }; byCat[t.cat].total++; if (t.status === 'done') byCat[t.cat].done++; });
  return Object.entries(byCat).map(([name, v]) => ({ name, pct: Math.round((v.done / v.total) * 100) }));
}

/* ============================================================
   DAILY TO-DO: items for a given date, completion tracking
   ============================================================ */

function itemsForDate(dateISO) {
  const items = [];
  (DATA.todos || []).forEach(t => { if (t.date === dateISO) items.push({ kind: 'todo', ref: t, brand: t.brand || null }); });
  BRAND_KEYS.forEach(brandKey => {
    DATA[brandKey].tasks.forEach(t => {
      if (t.due === dateISO) items.push({ kind: 'task', ref: t, brand: brandKey, overdue: false });
      else if (dateISO === todayISO() && isOverdue(t.due) && t.status !== 'done') items.push({ kind: 'task', ref: t, brand: brandKey, overdue: true });
    });
  });
  const isDone = (it) => it.kind === 'todo' ? it.ref.done : it.ref.status === 'done';
  const active = items.filter(it => !isDone(it));
  const done = items.filter(it => isDone(it));
  active.sort((a, b) => (b.overdue ? 1 : 0) - (a.overdue ? 1 : 0));
  return { active, done };
}

function toggleItem(item) {
  if (item.kind === 'todo') {
    item.ref.done = !item.ref.done;
    item.ref.completedAt = item.ref.done ? todayISO() : null;
    Store.saveTodos();
    item.ref.done ? completeChime() : uncheckTick();
  } else {
    const t = item.ref;
    if (t.status === 'done') { t.status = t._prevStatus || 'progress'; t.completedAt = null; uncheckTick(); }
    else { t._prevStatus = t.status; t.status = 'done'; t.completedAt = todayISO(); completeChime(); }
    Store.saveBrand(item.brand);
  }
}

function completedCountInRange(startISO, endISO) {
  let n = 0;
  (DATA.todos || []).forEach(t => { if (t.completedAt && inRange(t.completedAt, startISO, endISO)) n++; });
  BRAND_KEYS.forEach(b => DATA[b].tasks.forEach(t => { if (t.completedAt && inRange(t.completedAt, startISO, endISO)) n++; }));
  return n;
}

/* ============================================================
   SIDEBAR SYNC
   ============================================================ */

function slidePill(pillEl, activeEl, container) {
  if (!activeEl) { pillEl.style.opacity = '0'; return; }
  pillEl.style.opacity = '1';
  const cRect = container.getBoundingClientRect(), aRect = activeEl.getBoundingClientRect();
  pillEl.style.transform = `translateY(${aRect.top - cRect.top}px)`;
  pillEl.style.height = aRect.height + 'px';
}

function syncSidebar() {
  const brandActive = (state.view === 'overview' || state.view === 'all' || state.view === 'project');
  document.querySelectorAll('.brand-tab').forEach(t => t.classList.toggle('active', brandActive && t.dataset.brand === state.brand));
  document.querySelectorAll('.nav-item').forEach(t => t.classList.toggle('active', (t.dataset.nav === 'overview' && state.view === 'global-overview') || (t.dataset.nav === 'todo' && state.view === 'todo') || (t.dataset.nav === 'all' && (state.view === 'all' || state.view === 'project'))));

  const brandRail = document.getElementById('brandRail'), brandPill = document.getElementById('brandPill');
  slidePill(brandPill, brandActive ? document.querySelector('.brand-tab.active') : null, brandRail);
  const mainNav = document.getElementById('mainNav'), navPill = document.getElementById('navPill');
  slidePill(navPill, document.querySelector('.nav-item.active'), mainNav);

  const root = document.documentElement;
  const meta = brandActive ? BRAND_META[state.brand] : NEUTRAL;
  root.style.setProperty('--accent', meta.color);
  root.style.setProperty('--accent-soft', meta.soft);
}

/* ============================================================
   SHARED RENDER HELPERS
   ============================================================ */

function countUp(el, target, suffix) {
  const t0 = performance.now(), duration = 700;
  function tick(now) {
    const p = Math.min((now - t0) / duration, 1), eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + (suffix || '');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function statCardsHTML(defs) {
  return defs.map(() => `<div class="card stat-card hoverable"><div class="stat-label"></div><div class="stat-value"><span class="cu">0</span></div></div>`).join('');
}
function fillStatCards(container, defs) {
  container.innerHTML = '';
  defs.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card stat-card hoverable';
    card.innerHTML = `<div class="stat-label">${s.label}</div><div class="stat-value"><span class="cu">0</span></div>`;
    container.appendChild(card);
    countUp(card.querySelector('.cu'), s.value, s.suffix);
  });
}

function statusBreakdownHTML(sb) {
  const pct = (n) => sb.total ? (n / sb.total) * 100 : 0;
  return `
    <div class="status-bar">
      <div class="status-seg done" style="width:0%" data-w="${pct(sb.done)}"></div>
      <div class="status-seg progress" style="width:0%" data-w="${pct(sb.progress)}"></div>
      <div class="status-seg todo" style="width:0%" data-w="${pct(sb.todo)}"></div>
    </div>
    <div class="status-legend">
      <div class="status-legend-item"><div class="sw" style="background:var(--kpv)"></div>Done · ${sb.done}</div>
      <div class="status-legend-item"><div class="sw" style="background:var(--accent)"></div>In Progress · ${sb.progress}</div>
      <div class="status-legend-item"><div class="sw" style="background:var(--text-faint)"></div>To Do · ${sb.todo}</div>
    </div>`;
}
function animateStatusBars(root) {
  root.querySelectorAll('.status-seg').forEach(seg => requestAnimationFrame(() => { seg.style.width = seg.dataset.w + '%'; }));
}

/* ============================================================
   VIEW: GLOBAL OVERVIEW (all brands at once)
   ============================================================ */

function renderGlobalOverview() {
  const g = computeGlobalStats();
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <div class="stat-row" id="statRow"></div>
    <div class="brand-grid" id="brandGrid"></div>`;
  fillStatCards(document.getElementById('statRow'), [
    { label: 'Total projects', value: g.totalProjects },
    { label: 'Overall completion', value: g.pctDone, suffix: '%' },
    { label: 'Due today', value: g.dueToday },
    { label: 'Overdue', value: g.overdue }
  ]);

  const grid = document.getElementById('brandGrid');
  BRAND_KEYS.forEach(brandKey => {
    const meta = BRAND_META[brandKey];
    const s = computeStats(brandKey);
    const topProject = DATA[brandKey].projects[0];
    const card = document.createElement('div');
    card.className = 'card brand-card hoverable';
    card.innerHTML = `
      <div class="brand-card-head"><div class="dot" style="background:${meta.color}"></div><div class="bname">${brandKey.toUpperCase()}</div></div>
      <div class="brand-mini-stats">
        <div class="brand-mini-stat"><div class="l">Projects</div><div class="v">${s.activeProjects}</div></div>
        <div class="brand-mini-stat"><div class="l">Completed</div><div class="v">${s.pctDone}%</div></div>
        <div class="brand-mini-stat"><div class="l">Due today</div><div class="v">${s.dueToday}</div></div>
        <div class="brand-mini-stat"><div class="l">Overdue</div><div class="v" style="color:${s.overdue ? 'var(--behind-text)' : 'var(--text)'}">${s.overdue}</div></div>
      </div>
      ${topProject ? `<div class="brand-card-top-project">Top project: <b>${topProject.name}</b></div>` : `<div class="brand-card-top-project">No active projects yet.</div>`}
      <div class="brand-card-cta" style="color:${meta.color}">View ${brandKey.toUpperCase()} →</div>`;
    card.addEventListener('click', () => { state.brand = brandKey; navigate('overview'); });
    grid.appendChild(card);
  });
}

/* ============================================================
   VIEW: BRAND OVERVIEW
   ============================================================ */

function renderBrandOverview() {
  const meta = BRAND_META[state.brand];
  const stats = computeStats(state.brand);
  const sb = computeStatusBreakdown(state.brand);
  const health = computeHealth(state.brand);
  const projects = brandData().projects;
  const { active } = { active: itemsForDate(todayISO()).active.filter(it => it.brand === state.brand) };

  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <div class="stat-row" id="statRow"></div>
    <div class="grid-2">
      <div class="card panel-card hoverable">
        <div class="card-title">Task status</div>
        <div class="card-sub">${stats.done} of ${stats.total} tasks done</div>
        ${statusBreakdownHTML(sb)}
      </div>
      <div class="card panel-card hoverable">
        <div class="card-title" style="margin-bottom:10px;">Task health by category</div>
        <div id="healthRows"></div>
      </div>
    </div>
    <div class="card campaign-card">
      <div style="padding:14px 20px 0;"><div class="section-title" style="margin:0 0 2px;">Projects</div></div>
      <div class="campaign-head-row"><div>Project</div><div>Progress</div><div>Status</div><div style="text-align:right;">Days left</div></div>
      <div id="projectList"></div>
    </div>
    <div class="card todo-card">
      <div style="padding:14px 20px 0;"><div class="section-title" style="margin:0 0 2px;">Due today &amp; overdue</div></div>
      <div id="todoPreview"></div>
    </div>`;

  fillStatCards(document.getElementById('statRow'), [
    { label: 'Active projects', value: stats.activeProjects },
    { label: 'Tasks completed', value: stats.pctDone, suffix: '%' },
    { label: 'Due today', value: stats.dueToday },
    { label: 'Overdue', value: stats.overdue }
  ]);
  animateStatusBars(mount);

  const healthRows = document.getElementById('healthRows');
  if (!health.length) { healthRows.innerHTML = `<div style="font-size:12.5px;color:var(--text-dim);padding:8px 0;">No categories tracked yet.</div>`; }
  else {
    health.forEach(h => {
      const row = document.createElement('div');
      row.className = 'health-row';
      row.innerHTML = `<div><div class="health-name">${h.name}</div><div class="health-bar-track"><div class="health-bar-fill" style="width:0%"></div></div></div><div class="health-pct">${h.pct}%</div>`;
      healthRows.appendChild(row);
      requestAnimationFrame(() => { row.querySelector('.health-bar-fill').style.width = h.pct + '%'; });
    });
  }

  const projectList = document.getElementById('projectList');
  if (!projects.length) { projectList.innerHTML = `<div class="empty-row"><div class="t">Nothing running yet</div><div class="s">Start a project to see its timeline and tasks here.</div><button>New project</button></div>`; }
  else {
    projects.forEach(p => {
      const pct = stats.pctDone;
      const dates = DATA[state.brand].timeline.flatMap(t => t.dates).sort();
      const endDate = dates.length ? parseISO(dates[dates.length - 1]) : null;
      const daysLeft = endDate ? daysBetween(parseISO(todayISO()), endDate) : null;
      const row = document.createElement('div');
      row.className = 'campaign-row';
      row.innerHTML = `
        <div><div class="campaign-name">${p.name}<span class="project-type-pill">${p.type || 'Project'}</span></div><div class="campaign-cat">Live · ${p.period}</div></div>
        <div><div class="progress-track"><div class="progress-fill" style="width:0%"></div></div><div class="progress-label">${pct}%</div></div>
        <div><span class="status-pill ${pct >= 50 ? 'good' : 'risk'}">${pct >= 50 ? 'On track' : 'At risk'}</span></div>
        <div style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;">${daysLeft === null ? '—' : daysLeft > 0 ? daysLeft + 'd' : 'Ended'}</div>`;
      row.addEventListener('click', () => navigate('project', { projectId: p.id }));
      projectList.appendChild(row);
      requestAnimationFrame(() => { row.querySelector('.progress-fill').style.width = pct + '%'; });
    });
  }

  renderTodoRows(document.getElementById('todoPreview'), active.slice(0, 4), true);
}

/* ============================================================
   VIEW: DAILY TO-DO (day navigation, week strip, counters)
   ============================================================ */

function renderTodoRows(container, items, showBrandTag) {
  if (!items.length) { container.innerHTML = `<div style="padding:20px; font-size:12.5px; color:var(--text-dim);">Nothing here.</div>`; return; }
  container.innerHTML = '';
  items.forEach(item => {
    const isTask = item.kind === 'task';
    const title = isTask ? item.ref.title : item.ref.text;
    const meta = item.brand ? BRAND_META[item.brand] : null;
    const row = document.createElement('div');
    row.className = 'todo-row';
    row.innerHTML = `
      <div class="check"></div>
      <div class="todo-title">${title}</div>
      ${isTask && item.overdue ? `<div class="todo-due">Overdue</div>` : ''}
      ${showBrandTag && meta ? `<div class="todo-brand-tag" style="background:${meta.soft}; color:${meta.color};">${item.brand.toUpperCase()}</div>` : ''}`;
    row.querySelector('.check').addEventListener('click', () => { toggleItem(item); renderCurrentView(); });
    container.appendChild(row);
  });
}

function renderDailyTodo() {
  if (!state.selectedDate) state.selectedDate = todayISO();
  const weekStart = weekStartOf(state.selectedDate);
  const weekEnd = fmt(addDays(weekStart, 4));
  const monthStart = state.selectedDate.slice(0, 7) + '-01';
  const now = parseISO(state.selectedDate);
  const monthEnd = fmt(new Date(now.getFullYear(), now.getMonth() + 1, 0));

  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <div class="card week-strip-card">
      <button class="week-nav-btn" id="weekPrev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="week-days" id="weekDays"></div>
      <button class="week-nav-btn" id="weekNext"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
      <button class="today-jump-btn" id="jumpToday">Today</button>
    </div>
    <div class="todo-counters" id="counters"></div>
    <div class="card todo-card">
      <div class="add-todo-row">
        <input type="text" id="newTodoInput" placeholder="Add a task for ${state.selectedDate === todayISO() ? 'today' : parseISO(state.selectedDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}…">
        <button id="addTodoBtn">Add</button>
      </div>
      <div class="todo-section-label">Active</div>
      <div id="activeList"></div>
      <div class="todo-section-label">Completed</div>
      <div id="doneList"></div>
    </div>`;

  const weekDays = document.getElementById('weekDays');
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  for (let i = 0; i < 5; i++) {
    const dISO = fmt(addDays(weekStart, i));
    const { active } = itemsForDate(dISO);
    const tab = document.createElement('button');
    tab.className = 'day-tab' + (dISO === state.selectedDate ? ' active' : '') + (dISO === todayISO() ? ' today-marker' : '');
    tab.innerHTML = `<div class="dname">${dayNames[i]}</div><div class="dnum">${parseISO(dISO).getDate()}</div><div class="dcount">${active.length ? active.length + ' open' : '—'}</div>`;
    tab.addEventListener('click', () => { state.selectedDate = dISO; navigate('todo'); });
    weekDays.appendChild(tab);
  }
  document.getElementById('weekPrev').addEventListener('click', () => { state.selectedDate = fmt(addDays(state.selectedDate, -7)); navigate('todo'); });
  document.getElementById('weekNext').addEventListener('click', () => { state.selectedDate = fmt(addDays(state.selectedDate, 7)); navigate('todo'); });
  document.getElementById('jumpToday').addEventListener('click', () => { state.selectedDate = todayISO(); navigate('todo'); });

  fillStatCards(document.getElementById('counters'), [
    { label: 'Completed today', value: completedCountInRange(todayISO(), todayISO()) },
    { label: 'Completed this week', value: completedCountInRange(weekStart instanceof Date ? fmt(weekStart) : weekStart, weekEnd) },
    { label: 'Completed this month', value: completedCountInRange(monthStart, monthEnd) }
  ]);

  document.getElementById('addTodoBtn').addEventListener('click', addTodoFromInput);
  document.getElementById('newTodoInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodoFromInput(); });

  const { active, done } = itemsForDate(state.selectedDate);
  renderTodoRows(document.getElementById('activeList'), active, true);
  const doneContainer = document.getElementById('doneList');
  if (!done.length) { doneContainer.innerHTML = `<div style="padding:12px 20px; font-size:12.5px; color:var(--text-dim);">Nothing completed for this day yet.</div>`; }
  else {
    doneContainer.innerHTML = '';
    done.forEach(item => {
      const isTask = item.kind === 'task';
      const title = isTask ? item.ref.title : item.ref.text;
      const meta = item.brand ? BRAND_META[item.brand] : null;
      const row = document.createElement('div');
      row.className = 'todo-row is-done';
      row.innerHTML = `<div class="check checked">✓</div><div class="todo-title">${title}</div>${meta ? `<div class="todo-brand-tag" style="background:${meta.soft}; color:${meta.color};">${item.brand.toUpperCase()}</div>` : ''}`;
      row.querySelector('.check').addEventListener('click', () => { toggleItem(item); navigate('todo'); });
      doneContainer.appendChild(row);
    });
  }
}

function addTodoFromInput() {
  const input = document.getElementById('newTodoInput');
  const text = input.value.trim();
  if (!text) return;
  DATA.todos = DATA.todos || [];
  DATA.todos.push({ id: uid(), text, date: state.selectedDate, done: false, completedAt: null, brand: null });
  Store.saveTodos();
  clickTick();
  navigate('todo');
}

/* ============================================================
   VIEW: ALL PROJECTS
   ============================================================ */

function renderAllProjects() {
  const projects = brandData().projects;
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `<div class="card campaign-card">
    <div style="padding:14px 20px 0;"><div class="section-title">All projects — ${state.brand.toUpperCase()}</div></div>
    <div class="campaign-head-row"><div>Project</div><div>Progress</div><div>Status</div><div style="text-align:right;">Days left</div></div>
    <div id="projectListFull"></div></div>`;
  const list = document.getElementById('projectListFull');
  if (!projects.length) { list.innerHTML = `<div class="empty-row"><div class="t">Nothing running yet</div><div class="s">Start a project to see it here.</div><button>New project</button></div>`; return; }
  const stats = computeStats(state.brand);
  projects.forEach(p => {
    const dates = DATA[state.brand].timeline.flatMap(t => t.dates).sort();
    const endDate = dates.length ? parseISO(dates[dates.length - 1]) : null;
    const daysLeft = endDate ? daysBetween(parseISO(todayISO()), endDate) : null;
    const row = document.createElement('div');
    row.className = 'campaign-row';
    row.innerHTML = `
      <div><div class="campaign-name">${p.name}<span class="project-type-pill">${p.type || 'Project'}</span></div><div class="campaign-cat">Live · ${p.period}</div></div>
      <div><div class="progress-track"><div class="progress-fill" style="width:${stats.pctDone}%"></div></div><div class="progress-label">${stats.pctDone}%</div></div>
      <div><span class="status-pill ${stats.pctDone >= 50 ? 'good' : 'risk'}">${stats.pctDone >= 50 ? 'On track' : 'At risk'}</span></div>
      <div style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;">${daysLeft === null ? '—' : daysLeft > 0 ? daysLeft + 'd' : 'Ended'}</div>`;
    row.addEventListener('click', () => navigate('project', { projectId: p.id }));
    list.appendChild(row);
  });
}

/* ============================================================
   VIEW: PROJECT DETAIL (Timeline / Tasks)
   ============================================================ */

function renderProjectDetail() {
  const mount = document.getElementById('viewMount');
  mount.innerHTML = `
    <button class="back-link" id="backLink">← Overview</button>
    <div class="view-tabs">
      <button class="view-tab ${state.projectTab === 'timeline' ? 'active' : ''}" data-tab="timeline">Timeline</button>
      <button class="view-tab ${state.projectTab === 'tasks' ? 'active' : ''}" data-tab="tasks">Tasks</button>
    </div>
    <div id="tabMount"></div>`;
  document.getElementById('backLink').addEventListener('click', () => navigate('overview'));
  mount.querySelectorAll('.view-tab').forEach(tab => tab.addEventListener('click', () => { state.projectTab = tab.dataset.tab; renderProjectDetail(); }));
  if (state.projectTab === 'timeline') renderGantt(); else renderTaskTracker();
}

function renderGantt() {
  const tabMount = document.getElementById('tabMount');
  const timeline = brandData().timeline;
  if (!timeline.length) { tabMount.innerHTML = `<div class="card"><div class="empty-page"><div class="t">No timeline yet</div><div class="s">Add scheduled items to see the Gantt view.</div></div></div>`; return; }

  const allDates = timeline.flatMap(t => t.dates).sort();
  const rangeStart = parseISO(allDates[0]), rangeEnd = parseISO(allDates[allDates.length - 1]);
  const dayWidth = 14;
  const totalDays = daysBetween(rangeStart, rangeEnd) + 1;
  const canvasWidth = totalDays * dayWidth;
  const labelWidth = 200;

  const rows = [];
  const seenCats = new Set();
  timeline.forEach(item => {
    if (!seenCats.has(item.cat)) { seenCats.add(item.cat); rows.push({ type: 'cat', label: item.cat }); }
    rows.push({ type: 'task', item });
  });

  let rowsHTML = '';
  rows.forEach(r => {
    if (r.type === 'cat') {
      rowsHTML += `<div class="gantt-row cat-row"><div class="gantt-label">${r.label}</div><div class="gantt-track" style="width:${canvasWidth}px;"></div></div>`;
    } else {
      const runs = groupConsecutive(r.item.dates);
      let barsHTML = '';
      runs.forEach(([s, e]) => {
        const left = daysBetween(rangeStart, parseISO(s)) * dayWidth;
        const width = (daysBetween(parseISO(s), parseISO(e)) + 1) * dayWidth - 3;
        barsHTML += `<div class="gantt-bar" style="left:${left}px; width:${Math.max(width, 5)}px;"></div>`;
      });
      rowsHTML += `<div class="gantt-row"><div class="gantt-label">${r.item.task}</div><div class="gantt-track" style="width:${canvasWidth}px;">${barsHTML}</div></div>`;
    }
  });

  let gridHTML = '';
  let cursor = new Date(rangeStart); cursor.setDate(1);
  if (cursor < rangeStart) cursor.setMonth(cursor.getMonth() + 1);
  while (cursor <= rangeEnd) {
    const x = labelWidth + daysBetween(rangeStart, cursor) * dayWidth;
    gridHTML += `<div class="gantt-month-line" style="left:${x}px;"></div><div class="gantt-month-label" style="left:${x + 5}px;">${cursor.toLocaleDateString('en-GB', { month: 'short' })}</div>`;
    cursor.setMonth(cursor.getMonth() + 1);
  }
  const todayOffset = daysBetween(rangeStart, parseISO(todayISO()));
  let todayLineHTML = '';
  if (todayOffset >= 0 && todayOffset <= totalDays) {
    todayLineHTML = `<div class="gantt-today-line" style="left:${labelWidth + todayOffset * dayWidth}px;"></div>`;
  }

  tabMount.innerHTML = `
    <div class="card gantt-card">
      <div class="gantt-wrap">
        <div class="gantt-header-row"><div class="gantt-header-label">Task</div><div style="width:${canvasWidth}px;"></div></div>
        ${gridHTML}${todayLineHTML}
        ${rowsHTML}
      </div>
    </div>`;
}

function renderTaskTracker() {
  const tabMount = document.getElementById('tabMount');
  const tasks = brandData().tasks;
  const filtered = state.taskFilter === 'all' ? [...tasks].sort((a, b) => (a.status === 'done') - (b.status === 'done')) : tasks.filter(t => t.status === state.taskFilter);

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
    const isDone = t.status === 'done';
    const item = document.createElement('div');
    item.className = 'task-item' + (isDone ? ' is-done' : '');
    item.innerHTML = `
      <div class="task-row">
        <div class="task-complete-btn ${isDone ? 'done' : ''}" data-task="${t.id}">${isDone ? '✓' : ''}</div>
        <div class="task-title-cell"><div class="t-title">${t.title}</div><div class="t-cat">${t.cat} · ${t.owner}</div></div>
        <div><span class="priority-pill ${t.priority}">${t.priority}</span></div>
        <div><span class="status-pill ${t.status}">${t.status === 'todo' ? 'To Do' : t.status === 'progress' ? 'In Progress' : 'Done'}</span></div>
        <div class="task-due ${isOverdue(t.due) && t.status !== 'done' ? 'overdue' : ''}">${t.due || '—'}</div>
        <div class="task-sub-count">${t.subtasks.length ? doneCount + '/' + t.subtasks.length : '—'}</div>
      </div>
      <div class="task-detail ${isOpen ? 'open' : ''}" id="detail-${t.id}">
        <div class="task-detail-grid">
          <div><div class="detail-block-title">Subtasks</div><div id="subtasks-${t.id}"></div></div>
          <div>
            <div class="detail-block-title">Notes</div>
            <div class="detail-notes">${t.notes || 'No notes.'}</div>
            ${t.deps.length ? `<div class="detail-block-title" style="margin-top:16px;">Depends on</div>${t.deps.map(id => { const dt = tasks.find(x => x.id === id); return dt ? `<span class="dep-chip">${dt.title}</span>` : ''; }).join('')}` : ''}
          </div>
        </div>
      </div>`;

    item.querySelector('.task-title-cell').addEventListener('click', () => { state.expandedTask = isOpen ? null : t.id; renderTaskTracker(); });
    item.querySelector('.task-complete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleItem({ kind: 'task', ref: t, brand: state.brand });
      item.classList.add('completing');
      setTimeout(() => renderTaskTracker(), 340);
    });
    list.appendChild(item);

    if (isOpen) {
      const sub = item.querySelector(`#subtasks-${t.id}`);
      if (!t.subtasks.length) sub.innerHTML = `<div style="font-size:12.5px;color:var(--text-dim);">No subtasks.</div>`;
      t.subtasks.forEach(s => {
        const row = document.createElement('div');
        row.className = `subtask-row ${s.done ? 'done' : ''}`;
        row.innerHTML = `<div class="subtask-check" style="background:${s.done ? 'var(--accent)' : 'transparent'}; border-color:${s.done ? 'var(--accent)' : ''};">${s.done ? '✓' : ''}</div><div class="subtask-text">${s.text}</div>`;
        row.querySelector('.subtask-check').addEventListener('click', (e) => { e.stopPropagation(); s.done = !s.done; Store.saveBrand(state.brand); clickTick(); renderTaskTracker(); });
        sub.appendChild(row);
      });
    }
  });
}

/* ============================================================
   ROUTER
   ============================================================ */

function renderCurrentView() {
  if (state.view === 'global-overview') renderGlobalOverview();
  else if (state.view === 'overview') renderBrandOverview();
  else if (state.view === 'todo') renderDailyTodo();
  else if (state.view === 'all') renderAllProjects();
  else if (state.view === 'project') renderProjectDetail();
}

function navigate(view, opts = {}) {
  state.view = view;
  if (opts.projectId) { state.projectId = opts.projectId; state.projectTab = 'timeline'; }
  const mount = document.getElementById('viewMount');
  const brandActive = (view === 'overview' || view === 'all' || view === 'project');

  document.getElementById('brandEyebrow').textContent = brandActive ? BRAND_META[state.brand].label : (view === 'global-overview' ? 'ALL BRANDS' : '');
  document.getElementById('mainTitle').textContent =
    view === 'global-overview' ? 'Overview' :
    view === 'overview' ? 'Overview' :
    view === 'todo' ? 'Daily To-Do' :
    view === 'all' ? 'All Projects' :
    (brandData().projects.find(p => p.id === state.projectId) || {}).name || 'Project';

  renderCurrentView();
  mount.classList.remove('view-fade'); void mount.offsetWidth; mount.classList.add('view-fade');
  syncSidebar();
}

/* ============================================================
   INIT
   ============================================================ */

window.addEventListener('load', async () => {
  document.getElementById('dateLabel').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  initCursor();
  initRipple();

  document.querySelectorAll('.brand-tab').forEach(tab => tab.addEventListener('click', () => { state.brand = tab.dataset.brand; clickTick(); navigate('overview'); }));
  document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => { clickTick(); navigate(item.dataset.nav === 'overview' ? 'global-overview' : item.dataset.nav); }));

  document.getElementById('viewMount').innerHTML = `<div style="padding:40px; color:var(--text-dim); font-size:13px;">Loading your data…</div>`;
  await signInAnonymously(auth);
  DATA = await Store.loadAll();
  state.selectedDate = todayISO();
  navigate('global-overview');
});
