/* ==========================================================================
   Garage BSR Inc. — Booking embed
   --------------------------------------------------------------------------
   ▶ CONFIGURATION — this is the ONLY line you need to change.

     Paste either:
       • a Calendly link ......... https://calendly.com/your-account/rendez-vous
       • a Google Calendar link .. https://calendar.google.com/calendar/appointments/schedules/...

     Leave it as "" (empty) and the page shows the "book by phone" fallback
     instead, so the site stays usable until your account is ready.
   ========================================================================== */

var BSR_BOOKING_URL = "";

/* ==========================================================================
   Nothing below needs editing.
   ========================================================================== */
(function () {
  'use strict';

  var mount = document.getElementById('booking-embed');
  var fallback = document.getElementById('booking-fallback');
  if (!mount) return;

  var url = (BSR_BOOKING_URL || '').trim();

  function showFallback() {
    if (fallback) fallback.hidden = false;
    mount.hidden = true;
  }

  if (!url) { showFallback(); return; }

  if (url.indexOf('calendly.com') !== -1) {
    /* Calendly inline widget, themed with the logo colours. */
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    var themed =
      url + sep +
      'hide_gdpr_banner=1' +
      '&background_color=070707' +
      '&text_color=ffffff' +
      '&primary_color=d5020d';

    var widget = document.createElement('div');
    widget.className = 'calendly-inline-widget';
    widget.setAttribute('data-url', themed);
    widget.style.minWidth = '320px';
    widget.style.height = '760px';
    mount.appendChild(widget);

    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onerror = showFallback;
    document.body.appendChild(s);
    return;
  }

  if (url.indexOf('calendar.google.com') !== -1) {
    var frame = document.createElement('iframe');
    frame.src = url;
    frame.title = document.documentElement.lang.indexOf('fr') === 0
      ? 'Calendrier de rendez-vous'
      : 'Appointment calendar';
    frame.width = '100%';
    frame.height = '760';
    frame.style.border = '0';
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('loading', 'lazy');
    mount.appendChild(frame);
    return;
  }

  /* Unrecognised provider — embed it in a plain iframe and hope for the best. */
  var generic = document.createElement('iframe');
  generic.src = url;
  generic.title = 'Booking';
  generic.width = '100%';
  generic.height = '760';
  generic.style.border = '0';
  generic.setAttribute('loading', 'lazy');
  mount.appendChild(generic);
})();
