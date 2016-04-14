/* help popup
*/

(function() {
  'use strict';

  var $btnHelp = document.querySelector('.btn-nav-help');
  // if we're on a page without the help button
  if (!$btnHelp) {
    return;
  }

  var storeKey = 'bizcardmakerHideHelpPopup'
  var activePopupClass = 'popup-help-show';
  var hidePopup = window.localStorage.getItem(storeKey) || false

  var toggleHelpPopup = function (e) {
    if (
      !window.util.closest(e.target, '.btn-nav-help') &&
      !window.util.closest(e.target, '.btn-popup-help-close')
    ) {
      return;
    }

    if (window.util.hasClass(document.body, activePopupClass)) {
      window.util.removeClass(document.body, activePopupClass)
      // don't show the popup again once it's closed
      window.localStorage.setItem(storeKey, 'true')
    } else {
      window.util.addClass(document.body, activePopupClass)
    }
  };

  if (!hidePopup) {
    toggleHelpPopup({
      target: $btnHelp
    })
  }

  document.body.addEventListener('click', toggleHelpPopup);
})();
