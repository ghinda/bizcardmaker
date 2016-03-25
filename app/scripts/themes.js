/* theme selector
*/

(function() {
  'use strict';

  var themeActive = '';
  var $themeActive;
  var $container = document.querySelector('.themes-box');

  // if we're on a page without the themes
  if (!$container) {
    return;
  }

  function hashChange () {
    themeActive = window.util.hash('theme');

    // if no theme in the url
    if (!themeActive) {
      // select the first in the list
      $container.querySelector('.theme-item').click();

      return;
    }

    // uncheck previous active theme
    $themeActive = $container.querySelector('.active');
    if ($themeActive) {
      window.util.removeClass($themeActive, 'active');
    }

    $themeActive = $container.querySelector('.js-' + themeActive);
    if ($themeActive) {
      window.util.addClass($themeActive, 'active');
    }
  }

  hashChange();
  window.addEventListener('hashchange', hashChange, false);
})();
