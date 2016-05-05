/* track analytics
*/

(function() {
  'use strict';

  var clickElement = function (e) {
    // order buttons
    if (window.util.closest(e.target, '.js-order-btn-psprint')) {
      ga('send', 'event', 'Orders', 'Clicked PsPrint button');
    }

    if (window.util.closest(e.target, '.js-order-btn-printchomp')) {
      ga('send', 'event', 'Orders', 'Clicked PrintChomp button');
    }
  };

  document.body.addEventListener('click', clickElement);
})();
