/* Business Card Maker website
*/

(function() {
  'use strict';

  var $cardPage;
  var $tour;

  var init = function() {

    $cardPage = $('.card-maker');
    $tour = $('.tutorial-tour');

//     $('.js-guide-btn').click(showGuide);

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
      scroll_speed: 500,
      modal: false
    },
    reveal: {
      animation_speed: 80
    }
  });

  $(document).ready(init);

})();
