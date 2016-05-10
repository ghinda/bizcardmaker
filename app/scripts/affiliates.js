/* affiliates modal
*/

(function() {
  'use strict';

  var $modal = document.querySelector('#modal-affiliate');

  // if we're on a page without the modal
  if (!$modal) {
    return;
  }

  var $hideCheckbox = $modal.querySelector('.js-checkbox-affiliate-hide');
  var affiliateStoreKey = 'bizcardmaker-affiliate';
  var affiliateStore = null;
  var affiliateStoreDefault = JSON.stringify({
    modalHide: false,
    modalTime: Date.now()
  });
  // 4 days
  var expireTime = 1000 * 60 * 60 * 24 * 4;
  var i;

  var showAffiliateModal = function (e) {
    if (!window.util.closest(e.target, '.js-affiliate-modal')) {
      return;
    }

    // get the localstorage value only on the first click.
    // for the e2e tests.
    if (affiliateStore === null) {
      affiliateStore = window.localStorage.getItem(affiliateStoreKey) || affiliateStoreDefault;

      affiliateStore = JSON.parse(affiliateStore);

      // migration from initial version where value was not an object
      if (typeof affiliateStore !== 'object') {
        affiliateStore = JSON.parse(affiliateStoreDefault);
      }
    }

    // if the store expired, show it again
    if (affiliateStore.modalHide === true && (Date.now() - affiliateStore.modalTime > expireTime)) {
      affiliateStore.modalHide = false;
      $hideCheckbox.checked = false;
    }

    if (affiliateStore.modalHide !== true) {
      // open the reveal modal
      $($modal).foundation('open');

      // track affiliate modal views
      ga('send', 'event', 'Affiliate', 'View affiliate modal');
    }
  };

  var closeModal = function (e) {
    if (!e.target.classList.contains('js-close-modal')) {
      return;
    }

    $($modal).foundation('close');
    e.preventDefault();
  };

  var changeAffiliateHideStore = function (e) {
    if (e.target.checked) {
      affiliateStore.modalHide = true;
      affiliateStore.modalTime = Date.now();
    } else {
      affiliateStore.modalHide = false;
    }

    window.localStorage.setItem(affiliateStoreKey, JSON.stringify(affiliateStore));
  };

  $modal.addEventListener('click', closeModal);
  document.body.addEventListener('click', showAffiliateModal);
  $hideCheckbox.addEventListener('change', changeAffiliateHideStore);


  setTimeout(function () {
  showAffiliateModal({
    target: document.querySelector('.js-affiliate-modal')
  })
  }, 200)
})();
