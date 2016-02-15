/* utils
 */

(function () {
  'use strict';

  function hash (key) {
    var hashFull = window.location.hash.substr(1);
    var hashValue = hashFull.substr(hashFull.indexOf(key + '=')).split('&')[0].split('=')[1];

    if (!hashValue) {
      return null;
    }

    return hashValue;
  }

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

  function hasClass (node, className) {
    if (!node.className) {
      return false;
    }
    var tempClass = ' ' + node.className + ' ';
    className = ' ' + className + ' ';

    if (tempClass.indexOf(className) !== -1) {
      return true;
    }

    return false;
  }

  function addClass (node, className) {
    // class is already added
    if (hasClass(node, className)) {
      return node.className;
    }

    if (node.className) {
      className = ' ' + className;
    }

    node.className += className;

    return node.className;
  }

  function removeClass (node, className) {
    var spaceBefore = ' ' + className;
    var spaceAfter = className + ' ';

    if (node.className.indexOf(spaceBefore) !== -1) {
      node.className = node.className.replace(spaceBefore, '');
    } else if (node.className.indexOf(spaceAfter) !== -1) {
      node.className = node.className.replace(spaceAfter, '');
    } else {
      node.className = node.className.replace(className, '');
    }

    return node.className;
  }

  window.util = {
    closest: closest,
    hash: hash,

    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass
  };
})();