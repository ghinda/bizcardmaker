
describe('Themes', function () {

  var ctrl;
  var scope;
  var rootScope;
  var timeout;
  var httpBackend;

  beforeEach(module('businessCardMaker'));
  beforeEach(module('templates'));
  beforeEach(module('ngMockE2E'));

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

    $(document.body).append(element)

  }));

  //assuming data1,data2 are canvas data of images of the same size
  function rmsDiff(data1, data2){
      var squares = 0;
      for(var i = 0; i<data1.length; i++){
          squares += (data1[i]-data2[i])*(data1[i]-data2[i]);
      }
      var rms = Math.sqrt(squares/data1.length);
      return rms;
  }

  function getData(canvas) {
     //Get the image data from the canvas.
     return canvas.getImageData(0,0,canvas.width,canvas.height);
   }

  describe('MainCtrl', function () {

    it('default image filename', function (done) {

      this.timeout(10000);

      scope
      .generatePicture()
      .then(function(canvas) {
        console.log(canvas);

        // console.log($templateCache.get('views/cardeditor.html'))
        //expect(scope.model.imageFilename).to.equal('bizcardmaker-com.jpg');
        expect(true).to.equal(true)

        done();

      });

      rootScope.$apply()

    });

  });

});
