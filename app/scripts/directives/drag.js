/* Drag directive
 */

app.directive('dragModel', function ($document, $timeout) {
  'use strict';

  return {
    template: '<div class="drag-container">' +
    '<div class="drag-handle"></div><div ng-transclude></div>' +
    '</div>',
    scope: {
      dragModel: '=',
      dragContainer: '@',
      dragGrid: '@'
    },
    replace: true,
    transclude: true,
    link: function (scope, element) {

      var $body = document.getElementsByTagName('body')[0];
      var $container = $body;

      if(scope.dragContainer) {
        $container = document.querySelector(scope.dragContainer);
      }
      
      var $dragHandle = element[0].querySelector('.drag-handle');

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

      var grid = scope.dragGrid;

      var setContainment = function (argument) {

        // get size and position
        var dragRect = $dragHandle.getBoundingClientRect();
        var containerRect = $container.getBoundingClientRect();

        dragStartY = dragRect.top;
        dragStartX = dragRect.left;

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

      var maxGrid = function (val) {
        return Math.floor(val/grid) * grid;
      };

      var mousemove = function (e) {

        if(!dragActive) {
          return;
        }

        x = e.touches[0].pageX - startX;
        y = e.touches[0].pageY - startY;

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

        var translate = 'translate3d(' + x + 'px ,' + y + 'px, 0)';

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
          left:  left,
          bottom: 'auto',
          right: 'auto'
        });

        // set positions in model
        scope.dragModel.x = top;
        scope.dragModel.y = left;

        // remove active classes
        dragActive = false;
        $body.classList.remove('drag-active');
        element[0].classList.remove('drag-handle-show');

      };

      var mousedown = function(e) {
        
        // recalculate containment
        setContainment();
        
        dragActive = true;
        $body.classList.add('drag-active');
        element[0].classList.add('drag-handle-show');

        x = y = 0;
        
        startX = e.touches[0].pageX - x;
        startY = e.touches[0].pageY - y;

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
});
