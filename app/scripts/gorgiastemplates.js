/* briskine popup
*/

(function() {
  'use strict';

  var $popup = document.querySelector('.js-gtemplates-popup');
  if (!$popup) {
    return;
  }

  var hideClass = 'gtemplates-popup-hide';
  var storageKey = 'gtemplates-popup';
  var closedTime = null;
  var expiry = 1000 * 60 * 60 * 24;

  function timeAgo (dateString) {
    if (!dateString) {
      return true;
    }

    var difference = Date.now() - parseInt(dateString, 10);
    return difference > expiry;
  }

  function hidePopup () {
    $popup.classList.add(hideClass);
    window.localStorage.setItem(storageKey, String(Date.now()));
  }

  var $closeBtn = $popup.querySelector('.js-gtemplates-close');
  $closeBtn.addEventListener('click', hidePopup);

  function showPopup () {
    closedTime = window.localStorage.getItem(storageKey);
    if (timeAgo(closedTime)) {
      $popup.classList.remove(hideClass);
    }
  }

  setTimeout(function () {
    showPopup();
  }, 2000);
})();
