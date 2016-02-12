/* safari tweaks
*/

(function() {
  'use strict';

  // Safari, in Private Browsing Mode, looks like it supports localStorage
  // but all calls to setItem throw QuotaExceededError.
  if (typeof localStorage === 'object') {
    try {
      localStorage.setItem('localStorage', 1);
      localStorage.removeItem('localStorage');
    } catch (e) {
      window.Storage.prototype._setItem = window.Storage.prototype.setItem;
      window.Storage.prototype.setItem = function() {};
    }
  }

  // ugly detection for ugly Safari
  var isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1);

  // show a notice if using safari
  var $warning = document.querySelector('.warning-safari');

  if (isSafari) {
    $warning.className += 'warning-safari-show';
  }
})();