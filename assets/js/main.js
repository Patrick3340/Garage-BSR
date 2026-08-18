/* Garage BSR Inc. — site behaviour
   Vanilla JS, no dependencies. Every page loads this one file. */
(function () {
  'use strict';

  /* --- Sticky header state ------------------------------------------- */
  var hdr = document.querySelector('.hdr');
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile drawer -------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      drawer.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        burger.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

  /* --- Accordion ------------------------------------------------------ */
  document.querySelectorAll('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc__item');
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-open', !open);
    });
  });

  /* --- Reveal on scroll ----------------------------------------------- */
  var revealables = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* --- Marquee: duplicate content so the loop is seamless -------------- */
  document.querySelectorAll('.strip__track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* --- Réalisations lightbox ------------------------------------------
     Enhancement only: each tile is already a plain link to the full-size
     JPEG, so the gallery works with JS off. Here we intercept the click and
     show the photo in place instead of navigating away. */
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.gal__i'));
  if (tiles.length) {
    var L = document.createElement('div');
    L.className = 'lbx';
    L.setAttribute('role', 'dialog');
    L.setAttribute('aria-modal', 'true');
    var fr = document.documentElement.lang.indexOf('fr') === 0;
    var t = fr
      ? { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', of: 'sur' }
      : { close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' };
    L.innerHTML =
      '<figure class="lbx__fig">' +
        '<img alt="">' +
        '<figcaption class="lbx__cap"><span class="lbx__n"></span><span class="lbx__d"></span></figcaption>' +
      '</figure>' +
      '<button class="lbx__btn lbx__x" type="button" aria-label="' + t.close + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<button class="lbx__btn lbx__prev" type="button" aria-label="' + t.prev + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button class="lbx__btn lbx__next" type="button" aria-label="' + t.next + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>';
    document.body.appendChild(L);

    var lImg = L.querySelector('.lbx__fig img');
    var lNum = L.querySelector('.lbx__n');
    var lDsc = L.querySelector('.lbx__d');
    var idx = 0;
    var opener = null;

    var show = function (i) {
      idx = (i + tiles.length) % tiles.length;
      var a = tiles[idx];
      var alt = a.querySelector('img').getAttribute('alt');
      lImg.src = a.getAttribute('href');
      lImg.alt = alt;
      lNum.textContent = (idx + 1) + ' ' + t.of + ' ' + tiles.length;
      lDsc.textContent = alt;
    };
    var open = function (i, from) {
      opener = from;
      show(i);
      L.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      L.querySelector('.lbx__x').focus();
    };
    var close = function () {
      L.classList.remove('is-open');
      document.body.style.overflow = '';
      lImg.removeAttribute('src');
      if (opener) { opener.focus(); opener = null; }
    };

    tiles.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        open(i, a);
      });
    });
    L.querySelector('.lbx__x').addEventListener('click', close);
    L.querySelector('.lbx__prev').addEventListener('click', function () { show(idx - 1); });
    L.querySelector('.lbx__next').addEventListener('click', function () { show(idx + 1); });
    /* Clicking the backdrop closes; clicking the photo itself must not */
    L.addEventListener('click', function (e) { if (e.target === L) close(); });

    document.addEventListener('keydown', function (e) {
      if (!L.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(idx - 1); }
      else if (e.key === 'ArrowRight') { show(idx + 1); }
      else if (e.key === 'Tab') {
        /* Keep focus inside the dialog while it is open */
        var f = L.querySelectorAll('button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* --- Footer year ----------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
