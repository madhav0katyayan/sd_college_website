/* News & Events gallery: category filter + accessible lightbox. */
(function () {
  var grid = document.getElementById('ev-grid');
  if (!grid) return;
  var items = Array.prototype.slice.call(grid.querySelectorAll('.ev-item'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.ev-chip'));
  var countEl = document.getElementById('ev-count-num');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter'), n = 0;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      items.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.hidden = !show;
        if (show) n++;
      });
      if (countEl) countEl.textContent = n;
    });
  });

  // Lightbox
  var lb = document.createElement('div');
  lb.className = 'ev-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Photo viewer');
  lb.innerHTML =
    '<button type="button" class="ev-x" aria-label="Close">&times;</button>' +
    '<button type="button" class="ev-prev" aria-label="Previous photo">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="ev-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  var current = -1, opener = null;

  function visible() { return items.filter(function (it) { return !it.hidden; }); }
  function show(i) {
    var list = visible();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var a = list[current].querySelector('.ev-card');
    img.src = a.getAttribute('href');
    img.alt = a.getAttribute('data-title');
    cap.textContent = a.getAttribute('data-title');
    var s = document.createElement('small');
    s.textContent = a.getAttribute('data-cat') + '  ·  ' + (current + 1) + ' / ' + list.length;
    cap.appendChild(s);
  }
  function open(a) {
    opener = a;
    var list = visible();
    show(list.indexOf(a.closest('.ev-item')));
    lb.classList.add('open');
    document.body.classList.add('ev-lock');
    lb.querySelector('.ev-x').focus();
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('ev-lock');
    img.removeAttribute('src');
    if (opener) opener.focus();
  }
  grid.addEventListener('click', function (e) {
    var a = e.target.closest('.ev-card');
    if (!a) return;
    e.preventDefault();
    open(a);
  });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.closest('.ev-x')) close();
    else if (e.target.closest('.ev-prev')) show(current - 1);
    else if (e.target.closest('.ev-next')) show(current + 1);
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') { // keep focus inside the dialog
      var f = lb.querySelectorAll('button'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
