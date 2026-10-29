/* ===========================================================
   SDCET Muzaffarnagar — main script
   1) mobile menu toggle (used inline via onclick in index.html)
   2) photoFail() — graceful fallback when an <img> can't load
   3) hero slideshow controller
   4) Life@SDCET tab switcher
   =========================================================== */

// Called from the hamburger/"Menu" button's onclick in index.html
function toggleMobileNav(){
  var open = document.body.classList.toggle('nav-open');
  var panel = document.getElementById('mobile-panel');
  var btn = document.querySelector('.btn-menu');
  if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// Close the drawer on Escape, and whenever a real navigation link inside
// it is clicked (but not the Academics accordion toggle button itself).
(function mobileNavCloseHelpers(){
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) toggleMobileNav();
  });
  document.addEventListener('click', function (e) {
    var panel = document.getElementById('mobile-panel');
    if (!panel || !document.body.classList.contains('nav-open')) return;
    var link = e.target.closest('a');
    if (link && panel.contains(link)) toggleMobileNav();
  });
})();

// The header's real height varies by page (the homepage carries an extra
// brand-strip row that inner pages don't) and can vary slightly across
// widths/zoom levels/font-load timing. Rather than guess with fixed
// breakpoints, measure the actual rendered header and drive --nav-h from
// that, so the hero's negative margin always lines up exactly and never
// leaves a gap (or overlap) below the header.
(function syncNavH(){
  var header = document.querySelector('header.main-nav');
  if (!header) return;
  function apply(){
    var h = header.getBoundingClientRect().height;
    if (h > 0) document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  apply();
  window.addEventListener('resize', apply, { passive: true });
  window.addEventListener('orientationchange', apply);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  window.addEventListener('load', apply);
  setTimeout(apply, 400);
})();

// Nav starts transparent (floating over the hero image). Once the page
// scrolls past the hero, switch it to a solid navy bar so it stays
// readable over whatever section is behind it.
(function stickyNavSolidOnScroll(){
  var header = document.querySelector('header.main-nav');
  if (!header) return;
  function update(){
    if (window.scrollY > 60) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Called from every real <img onerror="photoFail(this,'label')">.
// Swaps a broken image for the same dashed placeholder box used
// elsewhere on the site, so a missing photo never leaves a blank hole.
window.photoFail = function (img, label) {
  var slot = img.closest('.photo-slot');
  if (!slot) return;
  img.remove();
  slot.style.border = '1.5px dashed var(--line-200)';
  slot.style.background = 'var(--paper-50)';
  slot.style.display = 'flex';
  slot.style.flexDirection = 'column';
  slot.style.alignItems = 'center';
  slot.style.justifyContent = 'center';
  slot.style.textAlign = 'center';
  slot.style.padding = '18px';
  slot.style.color = 'var(--ink-500)';
  slot.innerHTML =
    '<b style="color:var(--ink-700);font-size:.85rem;">' + label + '</b>' +
    '<small style="font-size:.72rem;max-width:200px;display:block;margin-top:6px;">' +
    'Photo not found — drop the file in /images (see images/README.md)</small>';
};
// replay failures that happened before this script loaded
(window.__pfq||[]).forEach(function (q) { window.photoFail(q[0], q[1]); });
window.__pfq = [];

(function heroSlideshow() {
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.dot');
  var idx = 0;
  var timer;

  window.showSlide = function (i) {
    if (!slides.length) return;
    slides[idx].classList.remove('active');
    if (dots[idx]) dots[idx].classList.remove('active');
    idx = i;
    slides[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
    resetTimer();
  };

  function next() {
    showSlide((idx + 1) % slides.length);
  }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }
  if (slides.length) resetTimer();
})();

window.showLifeTab = function (i, btn) {
  document.querySelectorAll('.life-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.life-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  btn.classList.add('active');
  var panel = document.querySelector('.life-panel[data-life="' + i + '"]');
  if (panel) panel.classList.add('active');
};

// Placements testimonial slider — a horizontal .testi-track holding every
// .testi-slide (real slides first, then one clone of slide 0 at the end)
// is shifted with transform:translateX so slides physically slide
// right-to-left as it auto-advances. Clicking a dot jumps straight there
// (wrapping index-only, no clone involved) and restarts the timer. When
// the track reaches the trailing clone, it snaps back to the real first
// slide with the transition briefly switched off so the loop is seamless.
(function testimonialSlider() {
  var track = document.querySelector('.testi-track');
  if (!track) return;
  var dots = document.querySelectorAll('.tdot');
  var total = dots.length; // real slides only — the clone has no dot
  var idx = 0;
  var timer;

  function render(pos, animate) {
    track.classList.toggle('no-transition', !animate);
    track.style.transform = 'translateX(-' + (pos * 100) + '%)';
  }

  window.showTestimonial = function (i) {
    if (!total) return;
    idx = i;
    dots.forEach(function (d) { d.classList.remove('active'); });
    if (dots[idx]) dots[idx].classList.add('active');
    render(idx, true);
    resetTimer();
  };

  function next() {
    dots.forEach(function (d) { d.classList.remove('active'); });
    if (idx + 1 < total) {
      idx = idx + 1;
      if (dots[idx]) dots[idx].classList.add('active');
      render(idx, true);
    } else {
      // Slide onto the trailing clone (visually identical to slide 0),
      // then snap back to the real slide 0 with no transition once the
      // slide-in has finished — a seamless infinite right-to-left loop.
      render(total, true);
      if (dots[0]) dots[0].classList.add('active');
      track.addEventListener('transitionend', function reset() {
        track.removeEventListener('transitionend', reset);
        idx = 0;
        render(0, false);
        // Force reflow so the no-transition jump is applied before any
        // later transform change re-enables the transition.
        void track.offsetHeight;
      }, { once: true });
    }
  }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }
  if (total) resetTimer();
})();

// SDCET Incubation Forum page — auto-advancing gallery slider.
// Markup lives in pages/incubation-forum.html (#inc-slider). To add a photo,
// just add another <figure class="inc-slide"> there — dots + counter are built
// from however many slides exist, so nothing here needs to change.
(function incubationSlider() {
  var root = document.getElementById('inc-slider');
  if (!root) return;
  var slides = root.querySelectorAll('.inc-slide');
  var dotsBox = root.querySelector('.inc-dots');
  var count = root.querySelector('.inc-count');
  var idx = 0, timer = null, delay = 3500, startX = null;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slides.length < 2) return;

  var dots = [];
  for (var i = 0; i < slides.length; i++) {
    (function (n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to photo ' + (n + 1));
      b.addEventListener('click', function () { go(n); });
      dotsBox.appendChild(b);
      dots.push(b);
    })(i);
  }

  function show(n) {
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    if (count) count.textContent = (idx + 1) + ' / ' + slides.length;
  }
  function go(n) { show(n); restart(); }
  function restart() {
    clearInterval(timer);
    if (!reduce) timer = setInterval(function () { show(idx + 1); }, delay);
  }

  root.querySelector('.inc-arrow.prev').addEventListener('click', function () { go(idx - 1); });
  root.querySelector('.inc-arrow.next').addEventListener('click', function () { go(idx + 1); });

  // pause while the visitor hovers / focuses the slider
  root.addEventListener('mouseenter', function () { clearInterval(timer); });
  root.addEventListener('mouseleave', restart);
  root.addEventListener('focusin', function () { clearInterval(timer); });
  root.addEventListener('focusout', restart);

  // touch swipe
  root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });

  dots[0].classList.add('active');
  if (count) count.textContent = '1 / ' + slides.length;
  restart();
})();

// SDCET Incubation Forum page — lightbox for news cards + gallery photos.
// Any element with data-lightbox="<group>" opens the full image (its
// data-src, or the <img> inside/itself) in a large viewer with prev/next
// through that group, Esc to close and arrow-key navigation.
(function incubationLightbox() {
  var box = document.getElementById('inc-lightbox');
  if (!box) return;
  var img = box.querySelector('img');
  var cap = box.querySelector('figcaption');
  var btnClose = box.querySelector('.lb-close');
  var btnPrev = box.querySelector('.lb-prev');
  var btnNext = box.querySelector('.lb-next');
  var items = [], cur = 0, lastFocus = null;

  function srcOf(el) {
    if (el.dataset.src) return el.dataset.src;
    var i = el.tagName === 'IMG' ? el : el.querySelector('img');
    return i ? i.getAttribute('src') : '';
  }
  function collect(group) {
    var seen = {}, list = [];
    document.querySelectorAll('[data-lightbox="' + group + '"]').forEach(function (el) {
      var s = srcOf(el);
      if (!s || seen[s]) return;
      seen[s] = true;
      list.push({ src: s, caption: el.dataset.caption || el.getAttribute('alt') || '' });
    });
    return list;
  }
  function render() {
    img.src = items[cur].src;
    img.alt = items[cur].caption;
    cap.textContent = items[cur].caption;
  }
  function open(group, src) {
    items = collect(group);
    cur = Math.max(0, items.findIndex(function (it) { return it.src === src; }));
    box.classList.toggle('single', items.length < 2);
    render();
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.classList.add('lb-open');
    btnClose.focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove('lb-open');
    img.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) {
    if (items.length < 2) return;
    cur = (cur + d + items.length) % items.length;
    render();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-lightbox]') : null;
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute('data-lightbox'), srcOf(t));
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { step(-1); });
  btnNext.addEventListener('click', function () { step(1); });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.tagName === 'FIGURE') close();
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {   // keep focus inside the viewer
      var f = [btnClose, btnPrev, btnNext].filter(function (b) { return b.offsetParent !== null; });
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();

// SDCET Academics mega menu (desktop) + accordion (mobile menu).
// Desktop: opens on hover AND on click / Enter / Arrow-Down; closes on Esc,
// outside click, or when the pointer leaves. Markup is in the shared header
// (#mega-academics) — to add a department, add one <a class="mega-dept">.
function toggleMobileAcademics(btn) {
  var sub = document.getElementById('mp-academics');
  if (!sub) return;
  var open = !sub.classList.contains('open');
  sub.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

(function academicsMega() {
  var header = document.querySelector('header.main-nav');
  var trigger = header && header.querySelector('.mega-trigger');
  var mega = document.getElementById('mega-academics');
  if (!header || !trigger || !mega) return;
  var timer = null;
  var hoverOk = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');

  function open() {
    clearTimeout(timer);
    header.classList.add('mega-open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    clearTimeout(timer);
    header.classList.remove('mega-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function closeSoon() { clearTimeout(timer); timer = setTimeout(close, 220); }
  function isOpen() { return header.classList.contains('mega-open'); }

  trigger.addEventListener('click', function (e) {
    // Hovering (desktop mouse) already previews the dropdown; a click on
    // "Academics" itself should take the user straight to the Academics page.
    if (!(hoverOk && hoverOk.matches)) {
      // touch / no-hover devices: first tap opens the dropdown, second tap
      // (or tapping the link again while open) navigates through as normal
      if (!isOpen()) { e.preventDefault(); open(); return; }
    }
    close();
  });
  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); open();
      var first = mega.querySelector('a'); if (first) first.focus();
    }
  });
  if (hoverOk && hoverOk.matches) {
    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('mouseleave', closeSoon);
    mega.addEventListener('mouseenter', open);
    mega.addEventListener('mouseleave', closeSoon);
    // moving to any other nav link closes it right away
    header.querySelectorAll('nav.primary a').forEach(function (a) {
      if (a !== trigger) a.addEventListener('mouseenter', close);
    });
  }
  document.addEventListener('click', function (e) {
    if (!isOpen()) return;
    if (mega.contains(e.target) || trigger.contains(e.target)) {
      if (e.target.closest && e.target.closest('#mega-academics a')) close();
      return;
    }
    close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { close(); trigger.focus(); }
  });
  mega.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !mega.contains(e.relatedTarget) && e.relatedTarget !== trigger) close();
  });
  window.addEventListener('resize', function () { if (window.innerWidth <= 980) close(); });
})();
// ---- About Us page: photo carousel (auto every 5s) + sticky sub-nav scroll-spy ----
(function(){
  var wrap = document.querySelector('.about-carousel');
  if(wrap){
    var slides = wrap.querySelectorAll('.ac-slide');
    var dots = wrap.querySelectorAll('.ac-dots span');
    var n = slides.length, i = 0;
    if(n > 1){
      setInterval(function(){
        slides[i].classList.remove('is-active');
        if(dots[i]) dots[i].classList.remove('on');
        i = (i + 1) % n;
        slides[i].classList.add('is-active');
        if(dots[i]) dots[i].classList.add('on');
      }, 5000);
    }
  }

  var subnav = document.querySelector('.about-subnav-inner');
  if(subnav){
    var links = subnav.querySelectorAll('a');
    var sections = [];
    links.forEach(function(a){
      var sec = document.querySelector(a.getAttribute('href'));
      if(sec) sections.push({link: a, el: sec});
    });
    function setActive(link){
      links.forEach(function(a){ a.classList.toggle('on', a === link); });
    }
    if('IntersectionObserver' in window && sections.length){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            var match = sections.find(function(s){ return s.el === e.target; });
            if(match) setActive(match.link);
          }
        });
      }, {rootMargin: '-40% 0px -50% 0px', threshold: 0});
      sections.forEach(function(s){ obs.observe(s.el); });
    }
    links.forEach(function(a){
      a.addEventListener('click', function(){ setActive(a); });
    });
  }

  // Scroll-in reveal: fade + rise each .reveal element into place once it
  // enters the viewport (one-time — stays visible after it has appeared).
  var reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    if('IntersectionObserver' in window){
      var rObs = new IntersectionObserver(function(entries, obs){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      }, {threshold: 0.15, rootMargin: '0px 0px -8% 0px'});
      reveals.forEach(function(el){ rObs.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('in'); });
    }
  }
})();
/* SDCET department detail page — accordion + scroll-reveal */
(function () {
  // Sticky sub-nav scroll-spy — same pattern as the About page's
  // .about-subnav-inner (see about.js), mirrored here so a visitor can jump
  // straight to any section (Vision & Mission, Outcomes, Achievements,
  // Research, Faculty, Labs, Alumni, Admissions) even before every section
  // has real content behind it.
  var deptSubnav = document.querySelector('.dept-subnav-inner');
  if (deptSubnav) {
    var dLinks = deptSubnav.querySelectorAll('a');
    var dSections = [];
    dLinks.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      if (sec) dSections.push({ link: a, el: sec });
    });
    var setDeptActive = function (link) {
      dLinks.forEach(function (a) { a.classList.toggle('on', a === link); });
    };
    if ('IntersectionObserver' in window && dSections.length) {
      var dObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var match = dSections.find(function (s) { return s.el === e.target; });
            if (match) setDeptActive(match.link);
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
      dSections.forEach(function (s) { dObs.observe(s.el); });
    }
    dLinks.forEach(function (a) {
      a.addEventListener('click', function () { setDeptActive(a); });
    });
  }

  var accItems = document.querySelectorAll('.dept-acc-item');
  if (accItems.length) {
    accItems.forEach(function (item) {
      var btn = item.querySelector('.dept-acc-btn');
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('open');
        accItems.forEach(function (i) { i.classList.remove('open'); i.querySelector('.dept-acc-btn').setAttribute('aria-expanded', 'false'); });
        if (willOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  // FAQ accordion — each item toggles independently (does not close siblings),
  // separate from the PEOs/POs/PSOs accordion group above.
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq-btn');
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('open');
        item.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });
  }

  var reveals = document.querySelectorAll('.dept-reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  // Section-level fade + slide-up motion (Information Technology page):
  // opacity 0 -> 1, y:50 -> 0, once, ~20% of the section visible, 0.7s ease-out.
  var motions = document.querySelectorAll('.fade-in-up');
  if (motions.length) {
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.2 });
      motions.forEach(function (el) { mio.observe(el); });
    } else {
      motions.forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  // Premium scroll-reveal motion (Electronics & Communication Engineering page):
  // opacity 0 -> 1, y:80 -> 0, scale .92 -> 1, blur(10px) -> 0, once, ~25% visible,
  // 0.9s ease-out — CSS handles the staggered cascade of .pr-item children.
  var premiums = document.querySelectorAll('.premium-reveal');
  if (premiums.length) {
    if ('IntersectionObserver' in window) {
      var pio = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      premiums.forEach(function (el) { pio.observe(el); });
    } else {
      premiums.forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  // Department-name heading: once you've scrolled down to it, pin it under
  // the nav and KEEP it pinned for the rest of the page (never lets go
  // again), per request. A sentinel placed right before it in the DOM
  // tracks the scroll point where it would naturally reach the nav; a
  // spacer reserves its height once it's pulled out of flow (position:
  // fixed) so the paragraphs below don't jump up to fill the gap.
  // Some department pages wrap this heading in a scroll-reveal section
  // (.premium-reveal) that sets a (0px, so invisible) CSS filter once
  // revealed — any filter, even blur(0px), makes that ancestor the
  // containing block for a fixed-position descendant instead of the
  // viewport, which would fling the pinned bar off-screen. Reparenting the
  // heading to <body> while pinned sidesteps that regardless of which
  // reveal style a given department page happens to use.
  var pinHeading = document.querySelector('.dept-name-heading');
  if (pinHeading) {
    var pinSentinel = document.createElement('span');
    pinSentinel.setAttribute('aria-hidden', 'true');
    pinSentinel.style.cssText = 'display:block;height:0;';
    pinHeading.parentNode.insertBefore(pinSentinel, pinHeading);
    var pinSpacer = document.createElement('div');
    pinSpacer.setAttribute('aria-hidden', 'true');
    pinSpacer.style.display = 'none';
    pinHeading.parentNode.insertBefore(pinSpacer, pinHeading.nextSibling);
    var pinHomeParent = pinSpacer.parentNode;
    var navHpx = function () {
      return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
    };
    // The sub-nav (when present) is itself sticky right under the main nav,
    // so the pinned department-name bar must stack BELOW it, not under it —
    // otherwise the two would overlap at the same top offset.
    var subnavBar = document.querySelector('.dept-subnav');
    var subnavHpx = function () {
      return subnavBar ? subnavBar.offsetHeight : 0;
    };
    var pinTopPx = function () {
      return navHpx() + subnavHpx();
    };
    var updatePin = function () {
      var pinned = pinHeading.classList.contains('is-pinned');
      if (!pinned) {
        var shouldPin = pinSentinel.getBoundingClientRect().top <= pinTopPx();
        if (shouldPin) {
          pinSpacer.style.height = pinHeading.offsetHeight + 'px';
          pinSpacer.style.display = 'block';
          pinHeading.classList.add('is-pinned');
          pinHeading.style.top = pinTopPx() + 'px';
          document.body.appendChild(pinHeading);
        }
      } else if (pinSentinel.getBoundingClientRect().top > pinTopPx()) {
        // scrolled back up above where it first appeared — release it
        pinHeading.classList.remove('is-pinned');
        pinSpacer.style.display = 'none';
        pinHomeParent.insertBefore(pinHeading, pinSpacer);
      }
    };
    window.addEventListener('scroll', updatePin, { passive: true });
    window.addEventListener('resize', updatePin);
    updatePin();
  }
})();

/* About tabs */
(function(){
  var box=document.getElementById('ab-tabs'); if(!box) return;
  var tabs=[].slice.call(box.querySelectorAll('.ab-tab')), panels=[].slice.call(box.querySelectorAll('.ab-panel'));
  box.classList.add('ab-js');
  function show(i,focus){
    tabs.forEach(function(t,k){var on=k===i;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;});
    panels.forEach(function(p,k){p.classList.toggle('is-active',k===i);});
    if(focus) tabs[i].focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){show(i);});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'){e.preventDefault();show((i+1)%tabs.length,true);}
      else if(e.key==='ArrowLeft'){e.preventDefault();show((i+tabs.length-1)%tabs.length,true);}
    });
  });
})();

/* Alumni spotlight slider (.hof): auto-advances, pauses on hover/focus, thumbs + arrows + swipe */
(function hofSlider(){
  var root=document.getElementById('hof'); if(!root) return;
  var slides=[].slice.call(root.querySelectorAll('.hof-slide')), thumbs=[].slice.call(root.querySelectorAll('.hof-thumb'));
  var bar=root.querySelector('.hof-progress i'), num=document.getElementById('hof-n');
  var MS=5500, idx=0, timer=null, left=MS, started=0, reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  root.style.setProperty('--hof-ms',MS+'ms');
  function restartBar(){ if(!bar) return; bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); }
  function show(i){
    idx=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){ s.classList.toggle('is-active',k===idx); s.setAttribute('aria-hidden',k===idx?'false':'true'); });
    thumbs.forEach(function(t,k){ t.classList.toggle('is-active',k===idx); });
    if(num) num.textContent=idx+1;
    var im=slides[idx].querySelector('img'); if(im) im.loading='eager';
  }
  function arm(ms){ clearTimeout(timer); if(reduce) return; left=ms; started=Date.now(); timer=setTimeout(function(){ show(idx+1); restartBar(); arm(MS); },ms); }
  function go(i){ show(i); restartBar(); root.classList.remove('is-paused'); arm(MS); }
  function pause(){ if(reduce||root.classList.contains('is-paused')) return; root.classList.add('is-paused'); clearTimeout(timer); left=Math.max(300,left-(Date.now()-started)); }
  function resume(){ if(reduce||!root.classList.contains('is-paused')) return; root.classList.remove('is-paused'); arm(left); }
  document.getElementById('hof-prev').addEventListener('click',function(){ go(idx-1); });
  document.getElementById('hof-next').addEventListener('click',function(){ go(idx+1); });
  thumbs.forEach(function(t){ t.addEventListener('click',function(){ go(+t.dataset.go); }); });
  root.addEventListener('mouseenter',pause); root.addEventListener('mouseleave',resume);
  root.addEventListener('focusin',pause); root.addEventListener('focusout',resume);
  var x0=null;
  root.addEventListener('touchstart',function(e){ x0=e.touches[0].clientX; },{passive:true});
  root.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) go(idx+(dx<0?1:-1)); x0=null; },{passive:true});
  document.addEventListener('visibilitychange',function(){ if(document.hidden) pause(); else resume(); });
  show(0); restartBar(); arm(MS);
})();

// ---- About page v2: button tabs (hash-aware) ----
(function(){
  var tabs=document.querySelectorAll('.ab2-tab'); if(!tabs.length) return;
  var panels=document.querySelectorAll('.ab2-panel');
  function open(id,scroll){
    var want=id; if(id==='approvals') id='overview';
    var hit=false;
    panels.forEach(function(p){var on=p.id===id; if(on) hit=true;});
    if(!hit) id='overview';
    panels.forEach(function(p){var on=p.id===id; p.hidden=!on; p.classList.toggle('on',on);});
    tabs.forEach(function(t){var on=t.dataset.tab===id; t.classList.toggle('on',on); t.setAttribute('aria-selected',on);
      if(on&&t.scrollIntoView) t.scrollIntoView({block:'nearest',inline:'center'});});
    if(want==='approvals'){var ap=document.getElementById('approvals'); if(ap) setTimeout(function(){ap.scrollIntoView({behavior:'smooth',block:'center'});},60);}
    if(scroll){var bar=document.querySelector('.ab2-tabbar'),h=document.querySelector('.adm-hero');
      var y=h?h.getBoundingClientRect().bottom+window.pageYOffset:0; if(window.pageYOffset>y) window.scrollTo({top:y,behavior:'smooth'});}
  }
  tabs.forEach(function(t){t.addEventListener('click',function(){
    try{history.replaceState(null,'','#'+t.dataset.tab);}catch(e){}
    open(t.dataset.tab,true);});});
  window.addEventListener('hashchange',function(){open(location.hash.slice(1),false);});
  open(location.hash.slice(1)||'overview',false);
})();

// ---- About v2: overview photo slideshow ----
(function(){
  var box=document.getElementById('ab2-slides'); if(!box) return;
  var sl=box.querySelectorAll('.ab2-slide'), dots=box.querySelectorAll('.ab2-sdots button'), i=Math.floor(Math.random()*sl.length), t;
  function show(n){ i=(n+sl.length)%sl.length;
    sl.forEach(function(s,k){s.classList.toggle('on',k===i); if(k===i) s.loading='eager';});
    dots.forEach(function(d,k){d.classList.toggle('on',k===i);}); }
  function start(){ stop(); t=setInterval(function(){show(i+1);},3500); }
  function stop(){ clearInterval(t); }
  dots.forEach(function(d,k){d.addEventListener('click',function(){show(k);start();});});
  box.addEventListener('mouseenter',stop); box.addEventListener('mouseleave',start);
  show(i); start();
})();

// ---- Academics v2: programme filter tabs ----
(function(){
  var tabs=document.querySelectorAll('.ac2-tabs .ab2-tab'); if(!tabs.length) return;
  var cards=document.querySelectorAll('#ap-grid .ap-card');
  function filter(f,scroll){
    var ok=false; tabs.forEach(function(t){if(t.dataset.filter===f) ok=true;}); if(!ok) f='all';
    tabs.forEach(function(t){var on=t.dataset.filter===f; t.classList.toggle('on',on); t.setAttribute('aria-selected',on);});
    cards.forEach(function(c){c.hidden=!(f==='all'||c.dataset.level===f);});
    if(scroll){var s=document.getElementById('courses'); if(s) s.scrollIntoView({behavior:'smooth',block:'start'});}
  }
  tabs.forEach(function(t){t.addEventListener('click',function(){filter(t.dataset.filter,false);});});
  function fromHash(){var h=location.hash.slice(1); if(/^(btech|mtech|mba|diploma)$/.test(h)) filter(h,true);}
  window.addEventListener('hashchange',fromHash); fromHash();
})();
