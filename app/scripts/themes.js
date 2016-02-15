/* theme selector
*/

(function() {
  'use strict';

  var themeActive = ''
  var $container = document.querySelector('.themes-box');

  function hashChange () {
    themeActive = util.hash('theme')

    // if no theme in the url
    if (!themeActive) {
      // select the first in the list
      $container.querySelector('.theme-item').click();

      return;
    }

    // uncheck previous active theme
    var $themeActive = $container.querySelector('.active');
    if ($themeActive) {
      util.removeClass($themeActive, 'active')
    }

    $themeActive = $container.querySelector('.js-' + themeActive)
    util.addClass($themeActive, 'active')
  }

  hashChange();
  window.addEventListener('hashchange', hashChange, false);
})();