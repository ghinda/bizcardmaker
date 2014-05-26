/* Business Card Maker website
*/

(function() {
  'use strict';

  var $cardPage,
    $printPromo,
    $tour;

  var init = function() {

    $cardPage = $('.card-maker');
    $printPromo = $('.print-promo');
    $tour = $('.tutorial-tour');

    $('.js-guide-btn').click(showGuide);

  };

  var showGuide = function() {
    // check if card editor page
    if($cardPage.length) {
      $tour.foundation('joyride', 'start');

      return false;
    }
  };

  // foundation properties
  $(document).foundation({
    joyride: {
      scroll_speed: 500
    }
  });

  $(document).ready(init);

})();

// print promo
window.showPrintpromo = function() {
  'use strict';

  $('.print-promo').foundation('joyride', 'start');

};
