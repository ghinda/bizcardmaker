/* affiliates modal
*/

(function() {
  'use strict';

  var $modal = document.querySelector('.modal-affiliate');

  // if we're on a page without the modal
  if (!$modal) {
    return;
  }

  var util = window.util;
  var banners = [
    {
      name: 'weebly-site',
      href: 'http://shareasale.com/r.cfm?b=838308&u=1215865&m=37723&urllink=&afftrack=',
      src: '/images/affiliate/banner-weebly.gif'
    },
    {
      name: 'weebly-eshop',
      href: 'http://shareasale.com/r.cfm?b=547761&u=1215865&m=37723&urllink=&afftrack=',
      src: '/images/affiliate/banner-weebly-eshop.gif'
    },
    {
      name: 'tinyprints-thankyou',
      href: 'http://shareasale.com/r.cfm?b=524136&u=1215865&m=12808&urllink=&afftrack=',
      src: '/images/affiliate/banner-tinyprints-thankyou.jpg'
    },
    {
      name: 'tinyprints-birthday',
      href: 'http://shareasale.com/r.cfm?b=192703&u=1215865&m=12808&urllink=&afftrack=',
      src: '/images/affiliate/banner-tinyprints-birthday.gif'
    },
    {
      name: 'logaster',
      href: 'https://www.logaster.com/ref/bizcardmaker/f6a48978.html',
      src: '/images/affiliate/banner-logaster.png'
    },
    {
      name: 'logaster-custom',
      href: 'https://www.logaster.com/ref/bizcardmaker/f6a48978.html',
      src: '/images/affiliate/banner-logaster-custom.png'
    }
  ];

  var activeBanner = null;
  var $modalStatus = document.querySelector('.modal-affiliate-status');
  var $link = document.querySelector('.modal-affiliate-banner');
  var $img = $link.querySelector('img');

  var affiliateStoreKey = 'bizcardmaker-affiliate';
  var affiliateStore = null;
  var affiliateStoreDefault = JSON.stringify({
    modalHide: false,
    modalTime: Date.now()
  });
  var expireTime = 1000;

  var loadingClass = 'modal-affiliate-status-loading';
  var doneClass = 'modal-affiliate-status-done';
  var loadingTime = 3200;

  var startLoading = function () {
    util.removeClass($modalStatus, doneClass);
    util.addClass($modalStatus, loadingClass);

    setTimeout(function () {
      util.removeClass($modalStatus, loadingClass);
      util.addClass($modalStatus, doneClass);
    }, loadingTime);
  };

  var updateAffiliateHideStore = function (e) {
    affiliateStore.modalHide = true;
    affiliateStore.modalTime = Date.now();
    window.localStorage.setItem(affiliateStoreKey, JSON.stringify(affiliateStore));
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function setRandomBanner () {
    var rand = getRandomInt(0, banners.length);
    activeBanner = banners[rand];

    $link.href = activeBanner.href;
    $img.src = activeBanner.src;
  }

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
    }

    if (affiliateStore.modalHide !== true) {
      // set a random banner
      setRandomBanner();

      // open the reveal modal
      $($modal).foundation('open');

      // show loading status
      startLoading();

      // update shown time
      updateAffiliateHideStore();

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

  function trackBannerClick () {
    // analytics track banner clicks
    ga('send', 'event', 'Affiliate', 'Click banner ' + activeBanner.name);
  }

  $modal.addEventListener('click', closeModal);
  document.body.addEventListener('click', showAffiliateModal);
  $link.addEventListener('click', trackBannerClick);

//   setTimeout(function () {
//     showAffiliateModal({
//       target: document.querySelector('.js-affiliate-modal')
//     })
//   }, 500)
})();
