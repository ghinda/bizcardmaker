/* laborday-promo
*/

(function() {
  'use strict';

  var init = function () {
    var $popover = document.querySelector('.js-laborday-promo');

    // TODO check date
    var before = new Date('08-28-2018');
    var after = new Date('09-11-2018');
    var now = new Date();
    var active = (now >= before && now <= after);

    // if we're on a page without the popover
    // or promo not active
    if (!$popover || !active) {
      return;
    }

    $popover.style.display = 'block';
  };

  // wait for the angular app to load
  setTimeout(init, 3000);

})();
