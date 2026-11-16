// Saarflow – Beispiel-Websites: Mobil-Menü, Beispiel-Formulare und Beispiel-Terminbuchung
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

  // ------------------------------------------------------------------
  // Beispiel-Terminbuchung in drei Schritten: Leistung, Termin, Daten.
  // Reine Vorführung im Browser – es wird nichts gespeichert oder gesendet.
  // Einstellungen stehen als JSON im Element (data-booking).
  // ------------------------------------------------------------------
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function option(name, value, main, sub, checked, disabled) {
    var input = el('input', { type: 'radio', name: name, value: value, checked: checked, disabled: disabled });
    var span = el('span', {}, [el('b', { text: main }), sub ? el('small', { text: sub }) : null]);
    return el('label', { class: 'book-opt' }, [input, span]);
  }
  function minutes(t) { var p = t.split(':'); return Number(p[0]) * 60 + Number(p[1]); }
  function clock(m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }

  document.querySelectorAll('[data-booking]').forEach(function (root, bookingIndex) {
    var cfg;
    try { cfg = JSON.parse(root.getAttribute('data-booking')); } catch (e) { return; }
    var uid = 'book' + bookingIndex;
    var state = { step: 0, service: null, staff: 0, day: null, time: null, values: {} };
    var stepNames = ['Leistung', 'Termin', 'Daten'];

    // Die nächsten offenen Tage ab morgen
    var days = [];
    var d = new Date(); d.setHours(12, 0, 0, 0);
    while (days.length < 6) {
      d = new Date(d.getTime() + 86400000);
      if (cfg.open[String(d.getDay())]) days.push(new Date(d.getTime()));
    }
    function slotsFor(day) {
      var span = cfg.open[String(day.getDay())], out = [];
      for (var m = minutes(span[0]), i = 0; m <= minutes(span[1]); m += cfg.step, i++) {
        // "Belegte" Zeiten: fest pro Tag und Uhrzeit, damit die Ansicht stabil bleibt
        out.push({ time: clock(m), taken: (day.getDate() * 7 + i * 5) % 4 === 0 });
      }
      return out;
    }
    function dayLong(day) { return day.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }); }

    var title = el(cfg.heading || 'h3', { class: 'book-title', id: uid + '-title', text: cfg.title });
    var steps = el('ol', { class: 'book-steps', 'aria-label': 'Schritte der Buchung' });
    var panel = el('div', { class: 'book-panel', tabindex: '-1' });
    var summary = el('p', { class: 'book-summary', 'aria-live': 'polite' });
    var back = el('button', { type: 'button', class: 'book-back', text: 'Zurück' });
    var next = el('button', { type: 'button', class: 'btn', text: 'Weiter' });
    var actions = el('div', { class: 'book-actions' }, [back, next]);
    var note = el('p', { class: 'form-note', role: 'status' });
    var box = el('div', { class: 'card-form book', role: 'group', 'aria-labelledby': uid + '-title' }, [title, steps, panel, summary, actions, note]);
    var defaultNote = 'Beispiel-Buchung: Es wird nichts gespeichert oder gesendet.';

    function summaryText() {
      var parts = [];
      if (state.service != null) parts.push(cfg.services[state.service].name);
      if (cfg.staff && state.service != null && state.staff > 0) parts.push('bei ' + cfg.staff[state.staff]);
      if (state.day != null && state.time) parts.push(dayLong(days[state.day]) + ', ' + state.time + ' Uhr');
      return parts.join(' · ');
    }
    function ready() {
      if (state.step === 0) return state.service != null;
      if (state.step === 1) return state.day != null && !!state.time;
      return true;
    }
    function renderTimes(holder) {
      holder.textContent = '';
      if (state.day == null) return;
      var list = el('div', { class: 'book-chips' });
      slotsFor(days[state.day]).forEach(function (s) {
        list.appendChild(option(uid + '-time', s.time, s.time, s.taken ? 'belegt' : '', state.time === s.time, s.taken));
      });
      holder.appendChild(el('fieldset', {}, [el('legend', { text: 'Uhrzeit am ' + dayLong(days[state.day]) }), list]));
    }
    function render(focus) {
      steps.textContent = '';
      stepNames.forEach(function (name, i) {
        steps.appendChild(el('li', { class: i < state.step || state.step === 3 ? 'is-done' : i === state.step ? 'is-current' : '', 'aria-current': i === state.step ? 'step' : false, text: name }));
      });
      panel.textContent = '';
      note.className = 'form-note'; note.textContent = defaultNote;
      actions.hidden = state.step === 3;
      summary.hidden = state.step === 3;
      back.hidden = state.step === 0;

      if (state.step === 0) {
        var list = el('div', { class: 'book-list' });
        cfg.services.forEach(function (s, i) { list.appendChild(option(uid + '-service', i, s.name, s.info, state.service === i)); });
        panel.appendChild(el('fieldset', {}, [el('legend', { text: cfg.serviceLabel }), list]));
        if (cfg.staff) {
          var who = el('div', { class: 'book-chips book-chips--wide' });
          cfg.staff.forEach(function (name, i) { who.appendChild(option(uid + '-staff', i, name, '', state.staff === i)); });
          panel.appendChild(el('fieldset', {}, [el('legend', { text: cfg.staffLabel }), who]));
        }
      } else if (state.step === 1) {
        var dayList = el('div', { class: 'book-chips book-chips--days' });
        days.forEach(function (day, i) {
          dayList.appendChild(option(uid + '-day', i, day.toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', ''), day.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' }), state.day === i));
        });
        var times = el('div', { class: 'book-times' });
        panel.appendChild(el('fieldset', {}, [el('legend', { text: 'Tag' }), dayList]));
        panel.appendChild(times);
        renderTimes(times);
      } else if (state.step === 2) {
        cfg.fields.forEach(function (f) {
          var id = uid + '-' + f.id;
          panel.appendChild(el('div', { class: 'f' }, [
            el('label', { for: id, text: f.label }),
            el('input', { id: id, type: f.type || 'text', autocomplete: f.autocomplete || false, placeholder: f.placeholder || false, value: state.values[f.id] || false, 'data-field': f.id, 'data-required': f.optional ? false : true })
          ]));
        });
      } else {
        panel.appendChild(el('div', { class: 'book-done' }, [
          el('p', { class: 'book-done-kicker', text: 'Termin eingetragen' }),
          el('p', { class: 'book-done-when', text: dayLong(days[state.day]) + ', ' + state.time + ' Uhr' }),
          el('p', { text: cfg.services[state.service].name + (cfg.staff && state.staff > 0 ? ' bei ' + cfg.staff[state.staff] : '') + ' · für ' + (state.values.name || 'Sie') }),
          el('p', { class: 'book-done-note', text: 'Das ist eine Beispielseite: Es wurde nichts gespeichert. Auf Ihrer eigenen Website steht der Termin jetzt in Ihrem Kalender, und Ihr Kunde bekommt eine Bestätigung per E-Mail.' }),
          el('button', { type: 'button', class: 'book-back', 'data-restart': true, text: 'Noch einen Termin ausprobieren' })
        ]));
      }
      next.textContent = state.step === 2 ? cfg.submit : 'Weiter';
      next.setAttribute('aria-disabled', String(!ready()));
      summary.textContent = summaryText();
      if (focus) panel.focus();
    }

    // Eingaben sofort merken, damit sie beim Zurückgehen nicht verloren gehen
    box.addEventListener('input', function (e) {
      var field = e.target.getAttribute('data-field');
      if (field) { state.values[field] = e.target.value; e.target.removeAttribute('aria-invalid'); }
    });
    box.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === uid + '-service') state.service = Number(t.value);
      else if (t.name === uid + '-staff') state.staff = Number(t.value);
      else if (t.name === uid + '-day') { state.day = Number(t.value); state.time = null; renderTimes(panel.querySelector('.book-times')); }
      else if (t.name === uid + '-time') state.time = t.value;
      else return;
      next.setAttribute('aria-disabled', String(!ready()));
      summary.textContent = summaryText();
      note.className = 'form-note'; note.textContent = defaultNote;
    });
    next.addEventListener('click', function () {
      if (!ready()) {
        note.className = 'form-note is-shown';
        note.textContent = state.step === 0 ? 'Bitte wählen Sie zuerst eine Leistung.' : 'Bitte wählen Sie einen Tag und eine freie Uhrzeit.';
        return;
      }
      if (state.step === 2) {
        var missing = null;
        panel.querySelectorAll('[data-field]').forEach(function (input) {
          state.values[input.getAttribute('data-field')] = input.value.trim();
          var bad = input.hasAttribute('data-required') && !input.value.trim();
          input.setAttribute('aria-invalid', String(bad));
          if (bad && !missing) missing = input;
        });
        if (missing) {
          note.className = 'form-note is-shown'; note.textContent = 'Bitte füllen Sie die markierten Felder aus.';
          missing.focus();
          return;
        }
      }
      state.step += 1; render(true);
    });
    back.addEventListener('click', function () { state.step -= 1; render(true); });
    box.addEventListener('click', function (e) {
      if (!e.target.hasAttribute('data-restart')) return;
      state = { step: 0, service: null, staff: 0, day: null, time: null, values: {} };
      render(true);
    });

    // Vorab-Ansicht und einfaches Anfrageformular (ohne JavaScript sichtbar) durch die Buchung ersetzen
    root.textContent = '';
    root.appendChild(box);
    render(false);
  });
})();
