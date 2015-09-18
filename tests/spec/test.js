
describe('Themes', function () {

  var ctrl;
  var scope;

  beforeEach(module('businessCardMaker'));
  beforeEach(module('templates'));

  beforeEach(inject(function($controller, $rootScope, $compile) {

    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });

    var element = $compile('<div ng-include="views/cardeditor.html"></div>')(scope);
    console.log(element.html())

  }));

  describe('MainCtrl', function () {



    it('default image filename', function (done) {

      // this.timeout(50000);

      // setTimeout(function() {

      console.log(document.body.innerHTML)

        // scope.generatePicture().then(function(canvas) {
        //   console.log(canvas);
        // });

        expect(scope.model.imageFilename).to.equal('bizcardmaker-com.jpg');

        done();

      // }, 10000);


    });

  });

});
