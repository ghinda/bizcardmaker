describe('Themes', function () {

  var ctrl;
  var scope;
  var rootScope;
  var timeout;
  var httpBackend;

  var async = function(arr, delay, done) {
    var j = 0;
    var results = [];

    var runner = function() {
      setTimeout(function() {
        if(j === arr.length) {
          return done(results);
        }

        console.log('Async ', arr.length - j);

        arr[j](function(res) {
          results.push(res)
        });
        j++;
        runner();
      }, delay)
    }

    runner();
  };

  function getImageData (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    return context.createImageData(width, height);
  }

  function rmsDiff (a, b) {
    var diff = 0;

		for (var i = 0; i < a.data.length / 4; i++) {
			diff += Math.abs(a.data[4 * i + 0] - b.data[4 * i + 0]) / 255;
			diff += Math.abs(a.data[4 * i + 1] - b.data[4 * i + 1]) / 255;
			diff += Math.abs(a.data[4 * i + 2] - b.data[4 * i + 2]) / 255;
		}

		return 100 * diff / (a.width * b.height * 3);
   }

  function getCanvasData(canvas) {
    // Get the image data from the canvas.
    var ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function getImgData(img) {
    // Create an empty canvas element
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return getCanvasData(canvas);
  }

  function themeTest($a, cb) {

    return function() {

      var theme = $a.getAttribute('href').replace('#/?theme=', '');
      var path = '/media/themes-orig/bizcardmaker-com-' + theme + '.jpg';

      var $card = document.querySelector('.card-preview');

      $card.className = 'card-preview ' + theme;

      var img = document.createElement('img');
      img.src = path;
      img.style.maxWidth = 'none';

      document.body.appendChild(img);

      img.addEventListener('load', function() {

        scope
        .generatePicture({}, function(canvas) {
          img.width = canvas.width;

          var rms = rmsDiff(getImgData(img), getCanvasData(canvas));

          console.log(theme, rms);

          cb(rms);
        });

      });

    }

  }

  function addCss(href) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';

    document.head.appendChild(link);
  }

  beforeEach(module('businessCardMaker'));
  beforeEach(module('templates'));
  // beforeEach(module('ngMockE2E'));

  beforeEach(inject(function($controller, $rootScope, $compile, $templateCache, $httpBackend, $timeout) {

    timeout = $timeout;
    rootScope = $rootScope;
    httpBackend = $httpBackend;

    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });

    $httpBackend.whenGET(/\/offers/).respond(200, {});

    var element = $compile($templateCache.get('views/cardeditor.html'))(scope);
    scope.$digest()

    $(document.body).append(element);

    // add the css
    addCss('/styles/main.css');
    addCss('/bower_components/angular-meditor/dist/meditor.css');

  }));

  describe('Themes', function () {

    this.timeout(500000);

    it('should test all themes', function (done) {
      var $themes = document.querySelectorAll('.themes-row a');
      var downloads = [];

      for(var i = 0; i < $themes.length; i++) {
        downloads.push(themeTest($themes[i]));
      }

      async(downloads, 1500, function(results) {
        results.forEach(function(res) {
          expect(res).to.be.within(0, 5);
        });
        done();
      });

    });


  });

});
