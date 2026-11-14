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

  // Paket-Buttons wählen das passende Paket im Kontaktformular vor
  var paketSelect = document.getElementById('paket');
  document.querySelectorAll('[data-paket]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (paketSelect) paketSelect.value = link.getAttribute('data-paket');
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
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

      var v = function (id) { return document.getElementById(id).value.trim(); };
      var name = v('name'), betrieb = v('betrieb'), kontakt = v('email'), nachricht = v('nachricht'), paket = v('paket');

      var topic = form.getAttribute('data-topic') || 'Webdesign';
      var sel = document.getElementById('paket');
      var paketText = paket ? sel.options[sel.selectedIndex].text : '';
      var subject = 'Anfrage ' + topic + (paket ? ' (' + paket + ')' : '') + ' – ' + (betrieb || name);
      var body = [
        'Hallo Saarflow-Team,',
        '',
        'ich interessiere mich für ein kostenloses Erstgespräch zum Thema ' + topic + '.',
        '',
        'Name: ' + name,
        'Betrieb: ' + (betrieb || '–'),
        'Erreichbar unter: ' + kontakt,
        'Interesse an: ' + (paket ? paketText : 'noch unsicher – bitte beraten Sie mich'),
        '',
        'Worum es geht:',
        nachricht || '–',
        '',
        'Viele Grüße',
        name
      ].join('\n');

      var enc = encodeURIComponent;
      window.location.href = 'mailto:' + to + '?subject=' + enc(subject) + '&body=' + enc(body);

      form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });

      // Ausweichweg: Webmail (z. B. Gmail im Browser) übernimmt mailto-Text nicht immer
      var gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + enc(to) + '&su=' + enc(subject) + '&body=' + enc(body);
      status.className = 'form-status is-success';
      status.innerHTML = '';
      var p1 = document.createElement('p');
      p1.textContent = 'Ihr E-Mail-Programm sollte sich jetzt geöffnet haben – bitte dort auf „Senden“ klicken.';
      var p2 = document.createElement('p');
      p2.textContent = 'Die Nachricht ist leer oder es hat sich nichts geöffnet?';
      var actions = document.createElement('div');
      actions.className = 'form-fallback';
      var a = document.createElement('a');
      a.className = 'btn btn-small';
      a.href = gmail; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'In Gmail öffnen';
      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-small btn-ghost';
      copy.textContent = 'Nachricht kopieren';
      copy.addEventListener('click', function () {
        var text = 'An: ' + to + '\nBetreff: ' + subject + '\n\n' + body;
        var done = function () { copy.textContent = 'Kopiert – jetzt in eine E-Mail an ' + to + ' einfügen'; };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else { fallbackCopy(text); done(); }
      });
      actions.appendChild(a); actions.appendChild(copy);
      status.appendChild(p1); status.appendChild(p2); status.appendChild(actions);
    });
  }
})();

// ==========================================================================
// Barrierefreiheit: Einstellungs-Menü (Einstellungen bleiben lokal im Browser)
// Die Klassen werden schon im <head> gesetzt, damit nichts flackert.
// ==========================================================================
(function () {
  'use strict';
  var KEY = 'sf-a11y';
  var root = document.documentElement;
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { state = {}; }

  var toggles = [
    ['contrast', 'Hoher Kontrast'],
    ['links', 'Links hervorheben'],
    ['readable', 'Gut lesbare Schrift'],
    ['spacing', 'Mehr Zeilen- und Zeichenabstand'],
    ['motion', 'Animationen stoppen'],
    ['cursor', 'Großer Mauszeiger']
  ];
  var sizes = ['Normal', 'Groß', 'Sehr groß'];

  function apply() {
    root.className = root.className.replace(/\ba11y-[\w-]+/g, '').replace(/\s+/g, ' ').trim();
    if (state.font) root.classList.add('a11y-font-' + state.font);
    toggles.forEach(function (t) { if (state[t[0]]) root.classList.add('a11y-' + t[0]); });
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'a11y-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'a11y-panel');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M4 8.5c2.6.8 5.3 1.2 8 1.2s5.4-.4 8-1.2M12 9.7V15m0 0-3.5 6.5M12 15l3.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '<span class="visually-hidden">Barrierefreiheit: Einstellungen öffnen</span>';

  var panel = document.createElement('div');
  panel.id = 'a11y-panel';
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'a11y-title');
  panel.hidden = true;
  var html = '<div class="a11y-head"><h2 id="a11y-title">Barrierefreiheit</h2>' +
    '<button type="button" class="a11y-close"><span aria-hidden="true">×</span><span class="visually-hidden">Einstellungen schließen</span></button></div>' +
    '<p class="a11y-group" id="a11y-size-label">Schriftgröße</p><div class="a11y-sizes" role="group" aria-labelledby="a11y-size-label">';
  sizes.forEach(function (label, i) { html += '<button type="button" data-size="' + i + '">' + label + '</button>'; });
  html += '</div><ul class="a11y-list">';
  toggles.forEach(function (t) {
    html += '<li><button type="button" class="a11y-toggle" data-key="' + t[0] + '"><span>' + t[1] + '</span><span class="a11y-switch" aria-hidden="true"></span></button></li>';
  });
  html += '</ul><div class="a11y-foot"><button type="button" class="a11y-reset">Alles zurücksetzen</button>' +
    '<a href="barrierefreiheit.html">Erklärung zur Barrierefreiheit</a></div>';
  panel.innerHTML = html;

  function sync() {
    panel.querySelectorAll('[data-size]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-size')) === (state.font || 0)));
    });
    panel.querySelectorAll('[data-key]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(!!state[b.getAttribute('data-key')]));
    });
  }
  function open(isOpen) {
    panel.hidden = !isOpen;
    btn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) panel.querySelector('[data-size]').focus(); else btn.focus();
  }

  panel.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-size')) state.font = Number(b.getAttribute('data-size'));
    else if (b.hasAttribute('data-key')) { var k = b.getAttribute('data-key'); state[k] = !state[k]; }
    else if (b.classList.contains('a11y-reset')) state = {};
    else if (b.classList.contains('a11y-close')) { open(false); return; }
    apply(); sync();
  });
  btn.addEventListener('click', function () { open(panel.hidden); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) open(false); });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  });

  document.body.appendChild(btn);
  document.body.appendChild(panel);
  sync();
})();

// ==========================================================================
// Cookie-Hinweis
// Die Website setzt derzeit keine Cookies und kein Tracking. Der Hinweis
// informiert darüber. Wird später z. B. ein Statistik-Tool eingebunden, hier
// eine Einwilligungs-Option ergänzen und das Tool erst nach Zustimmung laden.
// ==========================================================================
(function () {
  'use strict';
  var KEY = 'sf-consent';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  var banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-labelledby', 'cookie-title');
  banner.innerHTML = '<div class="cookie-text"><h2 id="cookie-title">Keine Cookies, kein Tracking</h2>' +
    '<p>Diese Website verwendet keine Cookies und keine Analyse-Tools. Gespeichert werden nur Ihre eigenen Einstellungen, z. B. zur Barrierefreiheit – lokal in Ihrem Browser. ' +
    '<a href="datenschutz.html#cookies">Mehr in der Datenschutzerklärung</a></p></div>' +
    '<button type="button" class="btn btn-small cookie-ok">Verstanden</button>';
  banner.hidden = !!stored;
  document.body.appendChild(banner);

  function place() {
    document.documentElement.style.setProperty('--cookie-h', banner.hidden ? '0px' : banner.offsetHeight + 'px');
  }
  banner.querySelector('.cookie-ok').addEventListener('click', function () {
    try { localStorage.setItem(KEY, JSON.stringify({ necessary: true, date: new Date().toISOString() })); } catch (e) {}
    banner.hidden = true; place();
    var trigger = document.querySelector('[data-cookie-settings]'); if (trigger && document.activeElement === document.body) trigger.focus();
  });
  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', function () { banner.hidden = false; place(); banner.querySelector('.cookie-ok').focus(); });
  });
  window.addEventListener('resize', place);
  place();
})();
