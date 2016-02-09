/* utils
 */

(function () {
  'use strict';

  function closest ($elem, selector) {
    // traverse the dom up and find the closest parent
    // that matches the selector.
    // include the current element.
    var $matches;

    // loop through parents
    while ($elem && $elem !== document) {
      if ($elem.parentNode) {
        // find all siblings that match the selector
        $matches = $elem.parentNode.querySelectorAll(selector);
        // check if our element is matched (poor-man's Element.matches())
        if ([].indexOf.call($matches, $elem) !== -1) {
          return $elem;
        }

        // go up the tree
        $elem = $elem.parentNode;
      } else {
        return null;
      }
    }

    return null;
  }

  window.util = {
    closest: closest
  };
})();