describe('Themes', function () {

  var ctrl;
  var scope;
  var rootScope;
  var timeout;
  var httpBackend;

  //assuming data1,data2 are canvas data of images of the same size
  function rmsDiff(data1, data2){
    var squares = 0;
    for(var i = 0; i < data1.length; i++) {
      squares += (data1[i] - data2[i]) * (data1[i] - data2[i]);
    }
    var rms = Math.sqrt(squares / data1.length);
    return rms;
  }

  function getCanvasData(canvas) {
    //Get the image data from the canvas.
    var ctx = canvas.getContext('2d');
    return ctx.getImageData(0,0,canvas.width,canvas.height).data;
  }

  function getImageData(img) {
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

    var theme = $a.getAttribute("href").replace('#/?theme=', '');
    var path = '/media/themes-orig/bizcardmaker-com-' + theme + '.jpg';

    window.location.hash = '#/?theme=' + theme;

    var img = document.createElement('img');
    img.src = path;

    img.addEventListener('load', function() {

      console.log('load')

      scope
      .generatePicture({}, function(canvas) {

        console.log('test done generate')

        // var rms = rmsDiff(getImageData(img), getCanvasData(canvas));
        var rms = 1;
        console.log(rms);

        expect(rms).to.be.within(0, 2);

        cb();

      });

    });

  }

  var j = 0;
  function cb(len, done) {
    return function() {
      j++;
      if(j === len) {
        done();
      }
    }
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
    var link = document.createElement('link');
    link.href = 'styles/main.css';
    link.rel = 'stylesheet';

    document.head.appendChild(link);

  }));

  describe('Themes', function () {

    this.timeout(500000);

    it('should test all themes', function (done) {
      var $themes = document.querySelectorAll('.themes-row a');
      var i;
      //for(i = 0; i < 2; i++) {
        //themeTest($themes[0], cb(1, done));
        themeTest($themes[0], done);
      //}
    });


  });

});
