(function () {
  var STORAGE_KEY = "utmify-tracking-params";
  var ATTRIBUTION_KEY = "premium-utmify-attribution";
  var COOKIE_KEY = "utmify_tracking_params";
  var THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  var CLICK_IDS = ["fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid", "twclid"];

  function shouldTrackParam(key) {
    return key.indexOf("utm_") === 0 || key.indexOf("utmify") === 0 || CLICK_IDS.indexOf(key) !== -1;
  }

  function readCookie(name) {
    var match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[2]) : "";
  }

  function readStoredParams() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          return parsed.params || {};
        }
      }
    } catch (error) {}

    try {
      var cookieValue = readCookie(COOKIE_KEY);
      return cookieValue ? JSON.parse(cookieValue) : {};
    } catch (error) {
      return {};
    }
  }

  function persist(params) {
    var payload = {
      params: params,
      expiresAt: Date.now() + THIRTY_DAYS,
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.localStorage.setItem(
        ATTRIBUTION_KEY,
        JSON.stringify(Object.assign({ captured_at: new Date().toISOString() }, params)),
      );
    } catch (error) {}

    document.cookie =
      COOKIE_KEY +
      "=" +
      encodeURIComponent(JSON.stringify(params)) +
      "; expires=" +
      new Date(Date.now() + THIRTY_DAYS).toUTCString() +
      "; path=/; SameSite=Lax";
  }

  function mergeIntoUrl(stored) {
    if (!Object.keys(stored).length) return;

    var rewritten = new URLSearchParams(window.location.search);
    var changed = false;

    Object.keys(stored).forEach(function (key) {
      if (!rewritten.has(key)) {
        rewritten.set(key, stored[key]);
        changed = true;
      }
    });

    if (changed) {
      window.history.replaceState(
        {},
        "",
        window.location.pathname + "?" + rewritten.toString() + window.location.hash,
      );
    }
  }

  var currentParams = new URLSearchParams(window.location.search);
  var incoming = {};

  currentParams.forEach(function (value, key) {
    if (shouldTrackParam(key)) {
      incoming[key] = value;
    }
  });

  var stored = readStoredParams();
  var merged = Object.assign({}, stored, incoming);

  if (Object.keys(merged).length > 0) {
    persist(merged);
  }

  if (Object.keys(incoming).length === 0) {
    mergeIntoUrl(stored);
  }

  window.getUtmifyGambiarraParams = function () {
    return readStoredParams();
  };
})();
