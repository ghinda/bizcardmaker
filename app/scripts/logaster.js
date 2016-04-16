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
    if (!window.util.closest(e.target, '.js-btn-logaster')) {
      return;
    }

    // open the reveal modal
    $($modal).foundation('open');
  };

  var closeModal = function (e) {
    if (!e.target.classList.contains('js-close-modal')) {
      return;
    }

    $($modal).foundation('close');
    e.preventDefault();
  };

  $modal.addEventListener('click', closeModal);
  document.body.addEventListener('click', showLogasterModal);
})();
