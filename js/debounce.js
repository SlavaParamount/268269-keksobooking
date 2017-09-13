'use strict';
(function () {
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
}());
