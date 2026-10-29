/* Online admission form (static site: nothing is sent to a server).
   Validates the entries, shows a summary and lets the applicant email or print it. */
(function () {
  'use strict';
  var form = document.getElementById('adm-form');
  if (!form) return;

  var $ = function (id) { return document.getElementById(id); };
  var program = $('adm-program');
  var errBox = $('adm-err');
  var done = $('adm-done');

  var RULES = {
    // programme -> which optional blocks apply
    btech:   { branches: 1, entrance: 'Entrance exam (JEE Main / UPSEE / UPTAC)', r12: 1, pcm: 1 },
    lateral: { branches: 1, entrance: 'Entrance exam (UP-JEECUP / LEET)', dip: 1 },
    diploma: { branches: 1 },
    mtech:   { branches: 1, entrance: 'Entrance exam (GATE)', r12: 1, grad: 1 },
    mba:     { entrance: 'Entrance exam (CAT / MAT / CMAT / UPSEE)', r12: 1, grad: 1 }
  };

  function setReq(container, on) {
    [].forEach.call(container.querySelectorAll('input,select'), function (el) {
      if (el.name === 'entrance' || el.name === 'entranceRoll' || el.name === 'entranceScore') return;
      if (el.name === 'branch2' || el.name === 'branch3') return;
      if (on) el.setAttribute('data-req', '1'); else el.removeAttribute('data-req');
    });
  }
  function show(el, on) { el.hidden = !on; }

  function applyProgram() {
    var r = RULES[program.value] || {};
    show($('adm-branches'), !!r.branches);
    $('adm-branches').querySelector('[name=branch1]').setAttribute('data-req', r.branches ? '1' : '');
    if (!r.branches) $('adm-branches').querySelector('[name=branch1]').removeAttribute('data-req');
    show($('adm-entrance'), !!r.entrance);
    if (r.entrance) $('adm-ent-label').textContent = r.entrance;
    show($('adm-row12'), !!(r.r12 || !program.value));
    setReq($('adm-row12'), !!r.r12);
    show($('adm-row-pcm'), !!r.pcm); setReq($('adm-row-pcm'), !!r.pcm);
    show($('adm-row-dip'), !!r.dip); setReq($('adm-row-dip'), !!r.dip);
    show($('adm-row-grad'), !!r.grad); setReq($('adm-row-grad'), !!r.grad);
    // 12th row label for diploma / lateral: hidden entirely (not needed)
    if (program.value === 'diploma' || program.value === 'lateral') show($('adm-row12'), false);
  }
  program.addEventListener('change', applyProgram);
  applyProgram();

  function label(el) {
    var l = el.closest('label');
    if (l) { var s = l.querySelector('span'); if (s) return s.textContent.replace(/\s*\*$/, ''); }
    var row = el.closest('.adm-row');
    if (row) { var v = row.querySelector('.lvl'); if (v) return v.textContent.replace(/\s*\*$/, '') + ' – ' + (el.getAttribute('aria-label') || '').replace(/^\S+\s/, ''); }
    return el.name;
  }

  function validate() {
    var problems = [];
    [].forEach.call(form.querySelectorAll('.invalid'), function (e) { e.classList.remove('invalid'); e.removeAttribute('aria-invalid'); });
    function bad(el, msg) { el.classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); problems.push({ el: el, msg: msg }); }

    [].forEach.call(form.elements, function (el) {
      if (!el.name || el.type === 'checkbox') return;
      var req = el.required || el.getAttribute('data-req') === '1';
      var v = (el.value || '').trim();
      if (el.closest('[hidden]')) return;
      if (req && !v) { bad(el, label(el) + ' is required'); return; }
      if (!v) return;
      switch (el.name) {
        case 'name': case 'father': case 'mother':
          if (!/^[A-Za-z][A-Za-z .'\-]{1,59}$/.test(v)) bad(el, label(el) + ': use letters only'); break;
        case 'phone': case 'parentPhone':
          if (!/^[6-9]\d{9}$/.test(v)) bad(el, label(el) + ': enter a valid 10-digit mobile number'); break;
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad(el, 'Enter a valid email address'); break;
        case 'pin':
          if (!/^\d{6}$/.test(v)) bad(el, 'PIN code must be 6 digits'); break;
        case 'dob':
          var age = (Date.now() - new Date(v).getTime()) / 31557600000;
          if (isNaN(age) || age < 14 || age > 50) bad(el, 'Please check the date of birth'); break;
        default:
          if (el.type === 'number') {
            var n = parseFloat(v);
            if (/^p/.test(el.name) || el.name === 'pcm') { if (isNaN(n) || n < 0 || n > 100) bad(el, label(el) + ': enter a value between 0 and 100'); }
            if (/^y/.test(el.name)) { if (n < 1990 || n > 2026) bad(el, label(el) + ': enter a valid year'); }
          }
      }
    });

    var b1 = form.branch1.value, b2 = form.branch2.value, b3 = form.branch3.value;
    if (!$('adm-branches').hidden) {
      if ((b2 && b2 === b1) || (b3 && (b3 === b1 || b3 === b2))) bad(form.branch2, 'Choose a different branch for each preference');
    }
    if (!form.agree.checked) bad(form.agree, 'Please accept the declaration');
    return problems;
  }

  form.addEventListener('input', function (e) {
    if (e.target.classList.contains('invalid')) { e.target.classList.remove('invalid'); e.target.removeAttribute('aria-invalid'); }
    if (e.target.name === 'phone' || e.target.name === 'parentPhone' || e.target.name === 'pin') e.target.value = e.target.value.replace(/\D/g, '');
  });

  var FIELDS = [
    ['Programme', function (d) { return program.options[program.selectedIndex].text; }],
    ['Branch preference 1', function (d) { return d.branch1; }], ['Branch preference 2', function (d) { return d.branch2; }], ['Branch preference 3', function (d) { return d.branch3; }],
    ['Name', function (d) { return d.name; }], ['Father\'s name', function (d) { return d.father; }], ['Mother\'s name', function (d) { return d.mother; }],
    ['Date of birth', function (d) { return d.dob; }], ['Gender', function (d) { return d.gender; }], ['Category', function (d) { return d.category; }], ['Nationality', function (d) { return d.nationality; }],
    ['Mobile', function (d) { return d.phone; }], ['Parent mobile', function (d) { return d.parentPhone; }], ['Email', function (d) { return d.email; }],
    ['Address', function (d) { return [d.address, d.city, d.district, d.state, d.pin].filter(Boolean).join(', '); }],
    ['Entrance exam', function (d) { return [d.entrance, d.entranceRoll && ('Roll ' + d.entranceRoll), d.entranceScore && ('Score ' + d.entranceScore)].filter(Boolean).join(' | '); }],
    ['10th', function (d) { return d.p10 ? d.p10 + '% (' + d.b10 + ', ' + d.y10 + ')' : ''; }],
    ['12th', function (d) { return d.p12 ? d.p12 + '% (' + d.b12 + ', ' + d.y12 + ')' : ''; }],
    ['PCM aggregate', function (d) { return d.pcm ? d.pcm + '%' : ''; }],
    ['Diploma', function (d) { return d.pdip ? d.pdip + '% (' + d.bdip + ', ' + d.ydip + ')' : ''; }],
    ['Graduation', function (d) { return d.pgrad ? d.pgrad + '% (' + d.bgrad + ', ' + d.ygrad + ')' : ''; }]
  ];

  function collect() {
    var d = {};
    [].forEach.call(form.elements, function (el) { if (el.name && el.type !== 'checkbox') d[el.name] = (el.value || '').trim(); });
    return d;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var problems = validate();
    if (problems.length) {
      errBox.hidden = false;
      errBox.innerHTML = '';
      var t = document.createElement('b'); t.textContent = 'Please fix the following:'; errBox.appendChild(t);
      var ul = document.createElement('ul');
      problems.slice(0, 6).forEach(function (p) { var li = document.createElement('li'); li.textContent = p.msg; ul.appendChild(li); });
      if (problems.length > 6) { var more = document.createElement('li'); more.textContent = '…and ' + (problems.length - 6) + ' more'; ul.appendChild(more); }
      errBox.appendChild(ul);
      problems[0].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (problems[0].el.focus) problems[0].el.focus({ preventScroll: true });
      return;
    }
    errBox.hidden = true;
    var d = collect();
    var today = new Date();
    var ref = 'SDCET26-' + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + '-' + Math.floor(1000 + Math.random() * 9000);
    $('adm-ref').textContent = ref;
    $('adm-done-name').textContent = d.name.split(' ')[0];

    var sum = $('adm-summary'); sum.innerHTML = '';
    var lines = ['Online admission application 2026-27 (' + ref + ')', ''];
    FIELDS.forEach(function (f) {
      var val = f[1](d); if (!val) return;
      var row = document.createElement('div'); row.className = 'adm-sum-row';
      var a = document.createElement('span'); a.textContent = f[0];
      var b = document.createElement('b'); b.textContent = val;
      row.appendChild(a); row.appendChild(b); sum.appendChild(row);
      lines.push(f[0] + ': ' + val);
    });
    $('adm-mailto').href = 'mailto:info@sdcetmzn.org?subject=' + encodeURIComponent('Admission application 2026-27 – ' + d.name + ' (' + ref + ')') + '&body=' + encodeURIComponent(lines.join('\n') + '\n\nI declare that the information given above is true to the best of my knowledge.');

    form.hidden = true; document.querySelector('.adm-aside').hidden = true;
    done.hidden = false; done.focus({ preventScroll: true });
    done.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('adm-edit').addEventListener('click', function () {
    done.hidden = true; form.hidden = false; document.querySelector('.adm-aside').hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('adm-print').addEventListener('click', function () { window.print(); });
  $('adm-reset').addEventListener('click', function () { setTimeout(function () { applyProgram(); errBox.hidden = true; [].forEach.call(form.querySelectorAll('.invalid'), function (x) { x.classList.remove('invalid'); }); }, 0); });
})();
