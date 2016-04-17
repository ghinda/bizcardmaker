/* DragResize directive
 */

app.directive('drModel', [
'$document', '$timeout',
function ($document, $timeout) {
  'use strict';

  return {
    template: '<div class="dr-container">' +
    '<div class="drag-handle"></div>' +
    '<div class="resize-handle"></div>' +
    '<div ng-transclude></div>' +
    '</div>',
    scope: {
      drModel: '=',
      drContainer: '@',
      drGrid: '@'
    },
    replace: true,
    transclude: true,
    link: function (scope, element) {

      var classDrActive = 'dr-active';
      var classDrShow = 'dr-handle-show';

      var $body = document.getElementsByTagName('body')[0];
      var $container = $body;

      if(scope.drContainer) {
        $container = document.querySelector(scope.drContainer);
      }

      var $dragHandle = element[0].querySelector('.drag-handle');
      var $resizeHandle = element[0].querySelector('.resize-handle');

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

      var dragActive = false;
      var resizeActive = false;

      var grid = scope.drGrid;

      var maxGrid = function (val) {
        return Math.floor(val/grid) * grid;
      };

      var setContainment = function (argument) {

        // get size and position
        var dragRect = $dragHandle.getBoundingClientRect();
        var containerRect = $container.getBoundingClientRect();

        var dragStartY = dragRect.top;
        var dragStartX = dragRect.left;

        minY = dragStartY - containerRect.top;
        minY = 0 - maxGrid(minY);

        maxY = (containerRect.top + containerRect.height) - dragStartY - dragRect.height;
        maxY = maxGrid(maxY);

        minX = dragStartX - containerRect.left;
        minX = 0 - maxGrid(minX);

        maxX = (containerRect.left + containerRect.width) - dragStartX - dragRect.width;
        maxX = maxGrid(maxX);

      };

      var restrictGrid = function (val) {
        return (val % grid === 0) ? val : val - val % grid;
      };

      var mousemove = function (e) {

        if(!dragActive && !resizeActive) {
          return;
        }

        // disable text selection
        e.preventDefault();

        x = restrictGrid(e.touches[0].pageX - startX);
        y = restrictGrid(e.touches[0].pageY - startY);

        if (x > maxX) {
          x = maxX;
        }
        if (y > maxY) {
          y = maxY;
        }

        // drag
        if(dragActive) {
          if (x < minX) {
            x = minX;
          }
          if (y < minY) {
            y = minY;
          }

          var translate = 'translate3d(' + x + 'px ,' + y + 'px, 0)';

          angular.forEach(transformPrefixes, function(prefix) {
            element.css(prefix, translate);
          });
        }

        // resize
        if(resizeActive) {
          var newHeight = element._startHeight + y;
          element.css('height', newHeight);

          var newWidth = element._startWidth + x;
          element.css('width', newWidth);
        }

      };

      var mouseup = function (e) {

        if(!dragActive && !resizeActive) {
          return;
        }

        if(dragActive) {
          dragActive = false;

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
            left:  left,
            bottom: 'auto',
            right: 'auto'
          });

          // set positions in model
          if(scope.drModel) {
            scope.drModel.x = left;
            scope.drModel.y = top;
          }
        }

        if(resizeActive) {
          resizeActive = false;

          // set sizes in model
          if(scope.drModel) {
            scope.drModel.width = parseInt(element.css('width'));
            scope.drModel.height = parseInt(element.css('height'));
          }
        }

        // remove active classes
        $body.classList.remove(classDrActive);
        element[0].classList.remove(classDrShow);

      };

      var mousedown = function(e) {

        var elem = e.target;

        // recalculate containment
        setContainment();

        x = y = 0;

        startX = e.touches[0].pageX - x;
        startY = e.touches[0].pageY - y;

        // resize
        if(elem === $resizeHandle) {
          resizeActive = true;

          //element._startY = event.pageY;
          element._startHeight = parseInt(element.css('height'));
          element._startWidth = parseInt(element.css('width'));
        } else {
          // drag
          dragActive = true;
        }

        $body.classList.add(classDrActive);
        element[0].classList.add(classDrShow);

      };

      // disable window scrolling when moving the mouse
      // to the window margins or
      // in the browser chrome and back in
      var scrollTop;
      var scrollLeft;

      var disableScroll = function(e) {

        if(!dragActive) {
          scrollTop = $body.scrollTop;
          scrollLeft = $body.scrollLeft;

          return;
        }

        $body.scrollTop = scrollTop;
        $body.scrollLeft = scrollLeft;

      };

      var emulateTouch = function(e) {

        e.touches = [{
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY
        }];

        return e;

      };

      var setModel = function() {

        scope.drModel.x = scope.drModel.x || '';
        element.css({
          left: scope.drModel.x
        });

        scope.drModel.y = scope.drModel.y || '';
        element.css({
          top: scope.drModel.y
        });

        scope.drModel.width = scope.drModel.width || '';
        element.css({
          width: scope.drModel.width
        });

        scope.drModel.height = scope.drModel.height || '';
        element.css({
          height: scope.drModel.height
        });

      };

      scope.$watch('drModel', setModel, true);

      $resizeHandle.addEventListener('mousedown', function(e) {
        mousedown(emulateTouch(e));
      });
      $resizeHandle.addEventListener('touchstart', mousedown);

      $dragHandle.addEventListener('mousedown', function(e) {
        mousedown(emulateTouch(e));
      });
      $dragHandle.addEventListener('touchstart', mousedown);

      document.addEventListener('mousemove', function(e) {
        mousemove(emulateTouch(e));
      });
      document.addEventListener('touchmove', mousemove);

      document.addEventListener('mouseup', mouseup);
      document.addEventListener('touchend', mouseup);

      // don't scroll when moving to the window sides
      window.addEventListener('scroll', disableScroll);

    }
  };
}]);
