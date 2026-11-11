// Saarflow – minimales JS: Mobil-Menü, Header-Linie, Einblenden, Formular-Platzhalter
(function () {
  'use strict';

  // Mobil-Menü
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hauptnavigation');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  // Trennlinie unter dem Header, sobald gescrollt wird
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Sanftes Einblenden
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Kontaktformular – öffnet das E-Mail-Programm mit vorausgefüllter Nachricht (mailto)
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('.form-status');
    var to = form.getAttribute('data-mailto');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var ok = field.value.trim() !== '';
        field.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        status.className = 'form-status is-error';
        status.textContent = 'Bitte geben Sie Ihren Namen und eine E-Mail-Adresse oder Telefonnummer an.';
        firstInvalid.focus();
        return;
      }

      var v = function (name) { return form.elements[name].value.trim(); };
      var name = v('name'), betrieb = v('betrieb'), kontakt = v('kontakt'), nachricht = v('nachricht');

      var subject = 'Anfrage Erstgespräch – ' + (betrieb || name);
      var body = [
        'Hallo Saarflow-Team,',
        '',
        'ich interessiere mich für ein kostenloses Erstgespräch.',
        '',
        'Name: ' + name,
        'Betrieb: ' + (betrieb || '–'),
        'Erreichbar unter: ' + kontakt,
        '',
        'Worum es geht:',
        nachricht || '–',
        '',
        'Viele Grüße',
        name
      ].join('\r\n');

      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
      status.className = 'form-status is-success';
      status.textContent = 'Ihr E-Mail-Programm sollte sich jetzt geöffnet haben – bitte dort auf „Senden“ klicken. ' +
        'Falls nicht, schreiben Sie uns direkt an ' + to + '.';
    });
  }
})();
