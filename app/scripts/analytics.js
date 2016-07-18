/* track analytics
*/

(function() {
  'use strict';

  var clickElement = function (e) {
    // order buttons
    if (window.util.closest(e.target, '.js-order-btn-psprint')) {
      ga('send', 'event', 'Orders', 'Clicked PsPrint button');
    }
  };

  document.body.addEventListener('click', clickElement);
})();
