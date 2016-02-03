/* logaster modal
*/

(function() {
  'use strict';

  var $modal = document.querySelector('.js-modal-logaster');

  // if we're on a page without the modal
  if (!$modal) {
    return;
  }

  var showLogasterModal = function (e) {
    if (e && e.target && e.target.className.indexOf('js-btn-logaster') === -1) {
      return;
    }

    // open the reveal modal
    $($modal).foundation('reveal', 'open');
  };

  var closeModal = function (e) {
    if (!e.target.classList.contains('js-close-modal')) {
      return;
    }

    $($modal).foundation('reveal', 'close');
    e.preventDefault();
  };

  $modal.addEventListener('click', closeModal);
  document.body.addEventListener('click', showLogasterModal);
})();