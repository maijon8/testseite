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

  // Kontaktformular – Versand über Formspree (action-Attribut im HTML)
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var buttonLabel = button.textContent;
    var fallback = 'Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.';

    var show = function (msg, type) {
      status.className = 'form-status' + (type ? ' is-' + type : '');
      status.textContent = msg;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
        field.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        show('Bitte füllen Sie Name und Kontakt aus und bestätigen Sie den Datenschutzhinweis.', 'error');
        firstInvalid.focus();
        return;
      }

      if (form.action.indexOf('DEINE_FORM_ID') !== -1) {
        show('Das Formular ist noch nicht eingerichtet (Formspree-ID fehlt). ' + fallback, 'error');
        return;
      }

      button.disabled = true;
      button.textContent = 'Wird gesendet …';
      show('');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
          show('Danke, Ihre Anfrage ist angekommen. Wir melden uns in Kürze bei Ihnen.', 'success');
        } else {
          show('Das hat leider nicht geklappt. ' + fallback, 'error');
        }
      }).catch(function () {
        show('Keine Verbindung. ' + fallback, 'error');
      }).then(function () {
        button.disabled = false;
        button.textContent = buttonLabel;
      });
    });
  }
})();
