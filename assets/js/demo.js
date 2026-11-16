// Saarflow – Beispiel-Websites: Mobil-Menü und Hinweis bei den Beispiel-Formularen
(function () {
  'use strict';
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }
  // Die Formulare der Beispielseiten senden nichts
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (!note) return;
      note.classList.add('is-shown');
      note.textContent = 'Das ist eine Beispielseite: Es wurde nichts gesendet. Auf Ihrer eigenen Website kommt die Anfrage direkt bei Ihnen an.';
    });
  });
})();
