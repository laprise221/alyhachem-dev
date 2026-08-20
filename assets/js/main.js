/* Aly Hachem Development — interactions */
(function () {
  'use strict';

  /* ── Année du copyright ─────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── En-tête : ombre au défilement ──────────────────── */
  var head = document.querySelector('.site-head');
  function onScroll() {
    head.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Menu mobile ────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      burger.focus();
    }
  });

  /* ── Formulaire → e-mail pré-rédigé ─────────────────── */
  var DEST = 'aly.hachemreda@gmail.com';
  var form = document.getElementById('contact-form');

  if (form) {
    var note = document.getElementById('form-note');

    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = form.querySelectorAll('[required]');
      var firstBad = null;

      for (var i = 0; i < required.length; i++) {
        var el = required[i];
        var ok = el.value.trim() !== '' && el.checkValidity();
        el.classList.toggle('invalid', !ok);
        if (!ok && !firstBad) firstBad = el;
      }

      if (firstBad) {
        firstBad.focus();
        note.textContent = 'Merci de compléter les champs signalés avant d’envoyer.';
        return;
      }

      var v = function (name) {
        var f = form.elements[name];
        return f ? f.value.trim() : '';
      };

      var nom = v('nom');
      var entreprise = v('entreprise');
      var email = v('email');
      var tel = v('telephone');
      var type = v('type');

      var subject = 'Demande de projet — ' + type + ' — ' + nom;

      var lines = [
        'Bonjour Aly,',
        '',
        v('message'),
        '',
        '— — —',
        'Nom          : ' + nom,
        'Entreprise   : ' + (entreprise || '—'),
        'E-mail       : ' + email,
        'Téléphone    : ' + (tel || '—'),
        'Type de projet : ' + type,
        '',
        'Envoyé depuis alyhachem.dev'
      ];

      var href = 'mailto:' + DEST +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\r\n'));

      // un clic sur une ancre réelle passe mieux que location.href :
      // certains navigateurs bloquent l'ouverture d'un protocole externe par script
      var opener = document.createElement('a');
      opener.href = href;
      opener.style.display = 'none';
      document.body.appendChild(opener);
      opener.click();
      document.body.removeChild(opener);

      note.innerHTML = 'Votre messagerie devrait s’ouvrir avec l’e-mail prêt à envoyer. ' +
        'Si ce n’est pas le cas, écrivez à <a href="mailto:' + DEST + '">' + DEST + '</a>.';
    });
  }

  /* ── Lien de navigation actif selon la section visible ── */
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = links[entry.target.id];
        if (a) a.classList.toggle('is-current', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }
})();
