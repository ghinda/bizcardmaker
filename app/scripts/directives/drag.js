/* Drag directive
 */

app.directive('drag', function ($document, $timeout) {
  'use strict';

  return {
    template: '<div class="drag-container">' +
    '<div class="drag-handle"></div><div ng-transclude></div>' +
    '</div>',
    scope: {
      dragContainer: '@',
      dragModel: '='
    },
    replace: true,
    transclude: true,
    link: function (scope, element) {

      var $body = angular.element('body');
      var $container = $body;

      if(scope.dragContainer) {
        $container = angular.element(scope.dragContainer);
      }

      var $dragHandle = element.find('.drag-handle');

      var transformPrefixes = [
        'webkitTransform',
        'msTransform',
        'transform'
      ];

      var startX = 0;
      var startY = 0;
      var x = 0;
      var y = 0;

      var minX = 0;
      var maxX = 0;
      var minY = 0;
      var maxY = 0;

      var dragSize;
      var containerSize;
      var dragStartY;
      var dragStartX;
      var dragActive = false;

      var grid = 10;

      var setContainment = function (argument) {

        var dragOffset = $dragHandle[0].getBoundingClientRect();
        var containerOffset = $container[0].getBoundingClientRect();

        dragStartY = dragOffset.top;
        dragStartX = dragOffset.left;

        minY = dragStartY - containerOffset.top;
        minY = 0 - maxGrid(minY);

        maxY = (containerOffset.top + containerSize.height) - dragStartY - dragSize.height;
        maxY = maxGrid(maxY);

        minX = dragStartX - containerOffset.left;
        minX =  0 - maxGrid(minX);

        maxX = (containerOffset.left + containerSize.width) - dragStartX - dragSize.width;
        maxX = maxGrid(maxX);

      };

      var getElementSize = function (elem) {
        return {
          width: elem.width(),
          height: elem.height()
        };
      };

      var restrictGrid = function (val) {
        return (val % grid === 0) ? val : val - val % grid;
      };

      var maxGrid = function (val) {
        return Math.floor(val/grid) * grid;
      };

      var mousemove = function (e) {

        if(!dragActive) {
          return;
        }

        x = e.pageX - startX;
        y = e.pageY - startY;

        x = restrictGrid(x);
        y = restrictGrid(y);

        if (x < minX) {
          x = minX;
        }
        if (x > maxX) {
          x = maxX;
        }
        if (y < minY) {
          y = minY;
        }
        if (y > maxY) {
          y = maxY;
        }

        var translate = 'translate(' + x + 'px ,' + y + 'px)';

        angular.forEach(transformPrefixes, function(prefix) {
          element.css(prefix, translate);
        });

        // disable text selection
        e.preventDefault();

      };

      var mouseup = function (e) {

        if(!dragActive) {
          return;
        }

        // remove transforms and set distance in px
        angular.forEach(transformPrefixes, function(prefix) {
          element.css(prefix, '');
        });

        var left = x;
        var top = y;

        if(element.css('position') === 'absolute') {

          // absolute elements
          left += element[0].offsetLeft;
          top += element[0].offsetTop;

        } else {

          // relative elements
          if(element.css('left') && element.css('left') !== 'auto') {
            left = parseInt(element.css('left'), 10) + x;
          }

          if(element.css('top') && element.css('top') !== 'auto') {
            top = parseInt(element.css('top'), 10) + y;
          }

        }

        element.css({
          top:  top,
          left:  left
        });

        // set positions in model
        scope.dragModel.x = top;
        scope.dragModel.y = left;

        // recalculate containment
        setContainment();

        // remove active classes
        dragActive = false;
        $body.removeClass('drag-active');
        element.removeClass('drag-handle-show');

      };

      var mousedown = function(e) {

        dragActive = true;
        $body.addClass('drag-active');
        element.addClass('drag-handle-show');

        x = y = 0;

        startX = e.pageX - x;
        startY = e.pageY - y;

      };

      // disable window scrolling when moving the mouse
      // to the window margins or
      // in the browser chrome and back in
      var scrollTop;
      var scrollLeft;

      var disableScroll = function(e) {

        if(!dragActive) {
          scrollTop = $body[0].scrollTop;
          scrollLeft = $body[0].scrollLeft;

          return;
        }

        $body[0].scrollTop = scrollTop;
        $body[0].scrollLeft = scrollLeft;

      };

      $dragHandle.on('mousedown', mousedown);

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);

      // don't scroll when moving to the window sides
      window.addEventListener('scroll', disableScroll);

      // hack to wait for complete dom render
      $timeout(function () {

        dragSize = getElementSize($dragHandle);
        containerSize = getElementSize($container);
        setContainment();

      });

    }
  };
});
