/* track analytics
*/

(function() {
  'use strict';

  var events = [
    {
      selector: '.js-track-order',
      arguments: ['Orders', 'Clicked Print Order button'],
    },
    {
      selector: '.js-track-pdf',
      arguments: ['Download', 'Download PDF'],
    },
    {
      selector: '.js-track-picture',
      arguments: ['Download', 'Download picture'],
    },
  ];

  var clickElement = function (nativeEvent) {
    events.some(function (event) {
      if (window.util.closest(nativeEvent.target, event.selector)) {
        ga.apply(null, ['send', 'event'].concat(event.arguments));
        return true;
      }
    });
  };

  document.body.addEventListener('click', clickElement);
})();
