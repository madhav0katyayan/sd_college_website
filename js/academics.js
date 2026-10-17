/* ===========================================================
   SDCET Academics page — department / course detail drawer
   All course + department content lives in the DEPTS list just
   below. Clicking any course card, department tile or a menu link
   like  pages/academics.html#dept-cse  opens that department's
   panel. To add/change a department or course, edit DEPTS
   here AND the matching card in pages/academics.html.
   =========================================================== */
var DEPTS = [
 {
  "id": "ai",
  "abbr": "AI",
  "name": "Artificial Intelligence Engineering",
  "short": "AI Engineering",
  "c": "#34d399",
  "g1": "#231d5c",
  "g2": "#12a39a",
  "sub": "B.Tech",
  "progs": [
   {
    "id": "btech-ai",
    "level": "B.Tech",
    "name": "AI Engineering",
    "years": "4 Years"
   }
  ],
  "about": "Explores how to build intelligent systems that learn, reason and perceive — the engineering behind modern machine learning, language and vision applications.",
  "study": [
   "Python & Problem Solving",
   "Machine Learning",
   "Deep Learning",
   "Natural Language Processing",
   "Computer Vision",
   "AI Ethics & Applications"
  ],
  "careers": [
   "AI / ML engineer",
   "Data & automation roles",
   "Research & higher studies",
   "Start-up product teams"
  ],
  "img": "../images/academics/courses/ai.jpg"
 },
 {
  "id": "cse",
  "abbr": "CSE",
  "name": "Computer Science & Engineering",
  "short": "Computer Science & Engg.",
  "c": "#22c7b8",
  "g1": "#0f2c4f",
  "g2": "#0f7a72",
  "sub": "B.Tech · M.Tech · Diploma",
  "progs": [
   {
    "id": "btech-cse",
    "level": "B.Tech",
    "name": "Computer Science and Engineering",
    "years": "4 Years"
   },
   {
    "id": "mtech-cse",
    "level": "M.Tech",
    "name": "Computer Science Engineering",
    "years": "2 Years"
   },
   {
    "id": "dip-cse",
    "level": "Diploma",
    "name": "Computer Science & Engineering",
    "years": "3 Years"
   }
  ],
  "about": "Covers how software and computing systems are designed, built and secured — from writing efficient programs to building databases, networks and web applications.",
  "study": [
   "Programming & Data Structures",
   "Algorithms",
   "Database Systems",
   "Operating Systems",
   "Computer Networks",
   "Software Engineering"
  ],
  "careers": [
   "Software & web developer",
   "Systems and network engineer",
   "Database administrator",
   "Higher studies (M.Tech / MBA)"
  ],
  "img": "../images/academics/courses/cse.jpg"
 },
 {
  "id": "it",
  "abbr": "IT",
  "name": "Information Technology",
  "short": "Information Technology",
  "c": "#4f9dff",
  "g1": "#0f2c4f",
  "g2": "#1f5fa8",
  "sub": "B.Tech",
  "progs": [
   {
    "id": "btech-it",
    "level": "B.Tech",
    "name": "Information Technology",
    "years": "4 Years"
   }
  ],
  "about": "Established in 2000, a pioneer department conveying technical education of high quality — covering software development, information security, and network management for MNC and public-sector requirements.",
  "study": [
   "Software Development",
   "Information Security",
   "Computer Networks",
   "Database Management",
   "Operating Systems",
   "Web Technologies"
  ],
  "careers": [
   "Software developer",
   "Network & security engineer",
   "Public-sector IT roles (BSNL, ISRO, C-DAC)",
   "IT firms (Infosys, TCS, Wipro, IBM)"
  ]
 },
 {
  "id": "ds",
  "abbr": "DS",
  "name": "Data Science",
  "short": "Data Science",
  "c": "#a3e635",
  "g1": "#0a4f4a",
  "g2": "#3aa76d",
  "sub": "B.Tech",
  "progs": [
   {
    "id": "btech-ds",
    "level": "B.Tech",
    "name": "Data Science",
    "years": "4 Years"
   }
  ],
  "about": "Teaches how to collect, clean, analyse and visualise data, and how to turn it into predictions and decisions using statistics and machine learning.",
  "study": [
   "Statistics & Probability",
   "Python for Data Science",
   "Machine Learning",
   "Data Mining",
   "Big Data Analytics",
   "Data Visualisation"
  ],
  "careers": [
   "Data analyst",
   "Machine-learning engineer",
   "Business-intelligence developer",
   "Higher studies"
  ],
  "img": "../images/academics/courses/ds.jpg"
 },
 {
  "id": "ece",
  "abbr": "ECE",
  "name": "Electronics & Communication Engineering",
  "short": "Electronics & Comm. Engg.",
  "c": "#a78bfa",
  "g1": "#2e2a6b",
  "g2": "#6d5bd0",
  "sub": "B.Tech",
  "progs": [
   {
    "id": "btech-ece",
    "level": "B.Tech",
    "name": "Electronics and Communication Engineering",
    "years": "4 Years"
   }
  ],
  "about": "Focuses on electronic circuits, embedded systems and the communication technologies — wireless, optical and digital — that connect the modern world.",
  "study": [
   "Analog & Digital Electronics",
   "Signals & Systems",
   "Communication Systems",
   "Microprocessors & Embedded Systems",
   "VLSI Design",
   "Internet of Things"
  ],
  "careers": [
   "Embedded & electronics engineer",
   "Telecom / network engineer",
   "VLSI and hardware design",
   "Higher studies"
  ],
  "img": "../images/academics/courses/ece.jpg"
 },
 {
  "id": "ee",
  "abbr": "EE",
  "name": "Electrical Engineering",
  "short": "Electrical Engineering",
  "c": "#ffd23f",
  "g1": "#5c4600",
  "g2": "#c99a14",
  "sub": "B.Tech · Diploma",
  "progs": [
   {
    "id": "btech-ee",
    "level": "B.Tech",
    "name": "Electrical Engineering",
    "years": "4 Years"
   },
   {
    "id": "dip-ee",
    "level": "Diploma",
    "name": "Electrical Engineering",
    "years": "3 Years"
   }
  ],
  "about": "Deals with the generation, transmission and use of electrical power, electrical machines, control systems and modern power electronics.",
  "study": [
   "Circuit Theory",
   "Electrical Machines",
   "Power Systems",
   "Control Systems",
   "Power Electronics",
   "Electrical Measurements"
  ],
  "careers": [
   "Power-sector engineer",
   "Maintenance & plant engineer",
   "Control & automation engineer",
   "Higher studies"
  ],
  "img": "../images/academics/courses/ee.jpg"
 },
 {
  "id": "me",
  "abbr": "ME",
  "name": "Mechanical Engineering",
  "short": "Mechanical Engineering",
  "c": "#f5a524",
  "g1": "#5e3a0c",
  "g2": "#cf8618",
  "sub": "B.Tech · Diploma",
  "progs": [
   {
    "id": "btech-me",
    "level": "B.Tech",
    "name": "Mechanical Engineering",
    "years": "4 Years"
   },
   {
    "id": "dip-me",
    "level": "Diploma",
    "name": "Mechanical Engg. (Production)",
    "years": "3 Years"
   }
  ],
  "about": "Covers the design, analysis and manufacture of machines and thermal systems — engines, tools, production lines and everything that moves.",
  "study": [
   "Thermodynamics",
   "Fluid Mechanics",
   "Machine Design",
   "Manufacturing Processes",
   "CAD / CAM",
   "Production Planning"
  ],
  "careers": [
   "Design & manufacturing engineer",
   "Production / quality engineer",
   "Automobile & thermal industries",
   "Higher studies"
  ],
  "img": "../images/academics/courses/me.jpg"
 },
 {
  "id": "ce",
  "abbr": "CE",
  "name": "Civil Engineering",
  "short": "Civil Engineering",
  "c": "#b4c78f",
  "g1": "#2f4136",
  "g2": "#7d9468",
  "sub": "B.Tech · Diploma",
  "progs": [
   {
    "id": "btech-ce",
    "level": "B.Tech",
    "name": "Civil Engineering",
    "years": "4 Years"
   },
   {
    "id": "dip-ce",
    "level": "Diploma",
    "name": "Civil Engineering",
    "years": "3 Years"
   }
  ],
  "about": "Teaches how to plan, design and build the structures around us — buildings, roads, bridges, water systems and more.",
  "study": [
   "Structural Analysis",
   "Surveying",
   "Concrete Technology",
   "Geotechnical Engineering",
   "Transportation Engineering",
   "Environmental Engineering"
  ],
  "careers": [
   "Site & construction engineer",
   "Structural / design engineer",
   "Government & infrastructure projects",
   "Higher studies"
  ]
 },
 {
  "id": "mba",
  "abbr": "MBA",
  "name": "Master of Business Administration",
  "short": "Business Administration",
  "c": "#7dd3fc",
  "g1": "#123b5a",
  "g2": "#2a8fa8",
  "sub": "MBA",
  "progs": [
   {
    "id": "mba",
    "level": "MBA",
    "name": "Master of Business Administration (MBA)",
    "years": "2 Years"
   }
  ],
  "about": "A management programme that builds leadership and decision-making skills across marketing, finance, human resources and operations.",
  "study": [
   "Principles of Management",
   "Marketing Management",
   "Financial Management",
   "Human Resource Management",
   "Operations Management",
   "Business Analytics"
  ],
  "careers": [
   "Management trainee",
   "Marketing / sales manager",
   "Finance & HR roles",
   "Entrepreneurship"
  ]
 },
 {
  "id": "ash",
  "abbr": "ASH",
  "name": "Applied Science & Humanities",
  "short": "Applied Science & Humanities",
  "c": "#cbd5e1",
  "g1": "#334155",
  "g2": "#64748b",
  "sub": "First-year foundation",
  "progs": [],
  "about": "The foundation department of the college. It teaches the core science, mathematics, communication and humanities subjects on which every first-year engineering student builds their technical career.",
  "study": [
   "Engineering Mathematics",
   "Engineering Physics",
   "Engineering Chemistry",
   "Professional Communication",
   "Environment & Ecology",
   "Human Values"
  ],
  "careers": [
   "Strong base for every B.Tech branch",
   "Preparation for competitive & higher-study exams",
   "Communication and soft-skill development"
  ],
  "supports": "All first-year B.Tech branches"
 }
];
// Departments that now have their own full detail page (instead of the
// side drawer below). Add an entry here once a department gets a page.
var FULL_PAGE = { ai: 'department-ai.html', cse: 'department-cse.html', it: 'department-it.html', ece: 'department-ece.html', ds: 'department-ds.html', ee: 'department-ee.html', me: 'department-me.html', ce: 'department-ce.html' };

(function academicsPage() {
  var drawer = document.getElementById('ac-drawer');
  if (!drawer) return;
  var sheet = drawer.querySelector('.ac-sheet');
  var body = drawer.querySelector('.ac-sheet-body');
  var byId = {}; DEPTS.forEach(function (d) { byId[d.id] = d; });
  var order = DEPTS.map(function (d) { return d.id; });
  var current = null, lastFocus = null;
  var ADMISSION = '../index.html#admissions';

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function rgba(h, a) { h = h.replace('#', ''); return 'rgba(' + parseInt(h.substr(0, 2), 16) + ',' + parseInt(h.substr(2, 2), 16) + ',' + parseInt(h.substr(4, 2), 16) + ',' + a + ')'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function progRows(d, sel) {
    if (!d.progs.length) {
      return '<div class="ac-prog sel"><span class="lv">Core</span><span class="nm">Foundation subjects<small>' + esc(d.supports) + '</small></span></div>';
    }
    return d.progs.map(function (p) {
      return '<div class="ac-prog' + (p.id === sel ? ' sel' : '') + '"><span class="lv">' + esc(p.level) + '</span>' +
        '<span class="nm">' + esc(p.name) + '<small>Duration · ' + esc(p.years) + '</small></span></div>';
    }).join('');
  }

  function render(id, prog) {
    var d = byId[id]; if (!d) return false;
    current = id;
    sheet.style.setProperty('--c', d.c); sheet.style.setProperty('--g1', d.g1); sheet.style.setProperty('--g2', d.g2);
    drawer.querySelector('.ac-sheet-abbr').textContent = d.abbr;
    drawer.querySelector('#ac-title').textContent = d.name;
    drawer.querySelector('.ac-sheet-head p').textContent = d.progs.length ? d.sub : 'Department of ' + d.name;
    var head = drawer.querySelector('.ac-sheet-head');
    head.style.background = d.img ? 'linear-gradient(160deg,' + rgba(d.g1, 0.9) + ',' + rgba(d.g2, 0.5) + '), url("' + d.img + '") center/cover' : '';
    drawer.querySelector('.ac-sheet-bg').innerHTML = d.img ? '' : document.querySelector('[data-icon="' + d.id + '"]').innerHTML;
    body.innerHTML =
      '<div class="ac-block"><h4>' + (d.progs.length ? 'Programmes offered' : 'Role in the college') + '</h4>' + progRows(d, prog) + '</div>' +
      '<div class="ac-block"><h4>About the department</h4><p>' + esc(d.about) + '</p></div>' +
      '<div class="ac-block"><h4>Typical subjects &amp; focus areas</h4><div class="ac-chips">' + d.study.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div></div>' +
      '<div class="ac-block"><h4>Where it can lead</h4><ul class="ac-list">' + d.careers.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="ac-block"><div class="ac-note"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/></svg><span>Faculty, syllabus, labs and achievements of this department will be added here soon. For the latest details call the admission office on <b>9258256931-38</b>.</span></div></div>';
    body.scrollTop = 0;
    var i = order.indexOf(id);
    drawer.querySelector('.ac-nav .prev').setAttribute('aria-label', 'Previous: ' + byId[order[(i + order.length - 1) % order.length]].abbr);
    drawer.querySelector('.ac-nav .next').setAttribute('aria-label', 'Next: ' + byId[order[(i + 1) % order.length]].abbr);
    return true;
  }

  function open(id, prog, fromHash) {
    if (!render(id, prog)) return;
    if (!drawer.classList.contains('open')) lastFocus = document.activeElement;
    drawer.classList.add('open');
    document.body.classList.add('ac-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (!fromHash && history.replaceState) history.replaceState(null, '', '#dept-' + id);
    setTimeout(function () { drawer.querySelector('.ac-close').focus(); }, 60);
  }
  function close() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    document.body.classList.remove('ac-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (/^#dept-/.test(location.hash) && history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) {
    var i = (order.indexOf(current) + d + order.length) % order.length;
    open(order[i], null);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-dept]');
    if (t) {
      e.preventDefault();
      var did = t.getAttribute('data-dept');
      if (FULL_PAGE[did]) { location.href = FULL_PAGE[did]; return; }
      open(did, t.getAttribute('data-prog'));
      return;
    }
    if (e.target.closest && e.target.closest('.ac-close, .ac-scrim, [data-ac-close]')) close();
    else if (e.target.closest && e.target.closest('.ac-nav .prev')) step(-1);
    else if (e.target.closest && e.target.closest('.ac-nav .next')) step(1);
  });
  document.addEventListener('keydown', function (e) {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') { // keep focus inside the panel
      var f = Array.prototype.filter.call(sheet.querySelectorAll('button, a[href]'), function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // deep links: academics.html#dept-cse (from the menu) — also when already on the page
  function fromHash() {
    var m = /^#dept-([a-z]+)$/.exec(location.hash);
    if (m && FULL_PAGE[m[1]]) { location.replace(FULL_PAGE[m[1]]); return; }
    if (m && byId[m[1]]) open(m[1], null, true);
    else if (drawer.classList.contains('open') && !location.hash) { /* keep */ }
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // "coming soon" links (ERP / E-Brochure until the real URLs are added)
  var toast = document.getElementById('ac-toast'), tt = null;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-soon]');
    if (!a) return;
    e.preventDefault();
    toast.textContent = a.getAttribute('data-soon');
    toast.classList.add('show'); clearTimeout(tt);
    tt = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  });

  // highlight the "jump to" chip of the section being viewed
  var chips = document.querySelectorAll('.ac-jump a');
  if ('IntersectionObserver' in window && chips.length) {
    var map = {};
    chips.forEach(function (c) { map[c.getAttribute('href').slice(1)] = c; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (c) { c.classList.remove('on'); });
        var c = map[en.target.id]; if (c) c.classList.add('on');
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();

// Stats band — animate numbers counting up from 0 when it scrolls into view
(function statsCountUp() {
  var nums = document.querySelectorAll('.ac-stat-num[data-count]');
  if (!nums.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setFinal() {
    nums.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }
  if (reduce) { setFinal(); return; }

  var done = false;
  function run() {
    if (done) return; done = true;
    nums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (!target && target !== 0) { el.textContent = el.getAttribute('data-count'); return; }
      var duration = 1100, startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  if ('IntersectionObserver' in window) {
    var band = document.querySelector('.ac-stats-band');
    if (band) {
      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) { if (e.isIntersecting) { run(); o.disconnect(); } });
      }, { threshold: 0.3 });
      obs.observe(band);
    } else run();
  } else run();
})();
