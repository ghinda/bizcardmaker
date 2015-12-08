/* affiliates modal
*/

(function() {
  'use strict';

  var $modal = document.querySelector('#modal-affiliate');
  var $hideCheckbox = $modal.querySelector('.js-checkbox-affiliate-hide');
  var affiliateStoreKey = 'bizcardmaker-affiliate-hide-modal';
  var affiliateStore = null;
  var i;

  var showAffiliateModal = function (e) {
    var attrNgClick = e && e.target.getAttribute('ng-click') || '';
    if (e && e.target && attrNgClick.indexOf('Download') === -1) {
      return;
    }

    // get the localstorage value only on the first click.
    // for the e2e tests.
    if(affiliateStore === null) {
      affiliateStore = window.localStorage.getItem(affiliateStoreKey);

      // set checkbox value
      if (affiliateStore === 'true') {
        $hideCheckbox.checked = true;
      }
    }

    if(affiliateStore !== 'true') {
      // open the reveal modal
      $($modal).foundation('reveal', 'open');
    }
  };

  var closeModal = function (e) {
    if (!e.target.classList.contains('js-close-modal')) {
      return;
    }

    $($modal).foundation('reveal', 'close');
    e.preventDefault();
  };

  var changeAffiliateHideStore = function (e) {
    if (e.target.checked) {
      affiliateStore = 'true';
    } else {
      affiliateStore = 'false';
    }

    window.localStorage.setItem(affiliateStoreKey, affiliateStore);
  };

  $modal.addEventListener('click', closeModal);
  document.body.addEventListener('click', showAffiliateModal);

  $hideCheckbox.addEventListener('change', changeAffiliateHideStore);

})();