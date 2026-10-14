// ══════════════════════════════════════════
// transitions.js — vertikaler Ebenenwechsel
//
// Beim Klick auf einen Navigationselement fährt die Bühne (.stage)
// nach oben aus dem Bild, danach wird navigiert. Die neue Seite
// setzt im <head> die Klasse .stage-entering und fährt dadurch von
// unten herein. Die Sidebar liegt außerhalb der Bühne und bleibt
// deshalb bei jedem Wechsel unbewegt stehen.
//
// Bewegung nur, wenn der Nutzer keine reduzierten Animationen will.
// ══════════════════════════════════════════
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var DURATION = 540;          // ms — knapp unter der CSS-Dauer (620ms)
  var ENTER_CLASS = 'stage-entering';
  var LEAVE_CLASS = 'stage-leaving';

  function isTransitionLink(a, e) {
    if (!a || !a.href) return false;
    // Von anderem Skript bereits behandelt (z. B. Lightbox)
    if (e.defaultPrevented) return false;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.getAttribute('href').charAt(0) === '#') return false;

    var url;
    try { url = new URL(a.href, window.location.href); } catch (err) { return false; }
    if (url.origin !== window.location.origin) return false;
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    // Reine Sprungmarken auf derselben Seite bleiben ohne Übergang
    if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    if (url.href === window.location.href) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    if (reduce.matches) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!isTransitionLink(a, e)) return;

    e.preventDefault();
    root.classList.remove(ENTER_CLASS);
    root.classList.add(LEAVE_CLASS);

    var target = a.href;
    var done = false;
    function go() {
      if (done) return;
      done = true;
      window.location.href = target;
    }
    window.setTimeout(go, DURATION);
  }, false);

  // Nach der Einfahrt die Klasse abräumen (Endzustand ist identisch,
  // deshalb ist kein Sprung sichtbar).
  window.setTimeout(function () {
    root.classList.remove(ENTER_CLASS);
  }, 760);

  // Zurück-Navigation aus dem Cache: keine halbfertige Animation zeigen.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      root.classList.remove(ENTER_CLASS);
      root.classList.remove(LEAVE_CLASS);
    }
  });

  // Detailbereich je nach Schirmbreite in die Sidebar bzw. in die Bühne
  // hängen — sonst gingen die Projektangaben auf kleinen Schirmen verloren.
  function placeDetailPanel() {
    var panel = document.getElementById('detailPanel');
    var aside = document.querySelector('.sidebar');
    var stage = document.getElementById('stage');
    if (!panel || !aside || !stage) return;

    var narrow = window.matchMedia('(max-width: 900px)').matches;
    if (narrow) {
      if (panel.parentElement !== stage) {
        var footer = stage.querySelector('footer');
        if (footer) stage.insertBefore(panel, footer);
        else stage.appendChild(panel);
      }
    } else if (panel.parentElement !== aside) {
      var foot = aside.querySelector('.sidebar-foot');
      if (foot) aside.insertBefore(panel, foot);
      else aside.appendChild(panel);
    }
  }

  function init() {
    placeDetailPanel();
    window.addEventListener('resize', placeDetailPanel);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
