/* psprint order button
*/

(function() {
  'use strict';

  var link = 'http://www.shareasale.com/r.cfm?b=283670&u=1215865&m=22819&urllink=&afftrack=';
  var $btn = document.querySelector('.js-order-btn-psprint');

  var openPsprintPage = function (e) {
    if (!window.util.closest(e.target, '.js-order-btn-psprint')) {
      return;
    }

    // open the url
    window.open(link, 'psprint');
  };

  document.body.addEventListener('click', openPsprintPage);
})();
