


describe('Person', function () {

  var ctrl;
  var scope;
  
  beforeEach(module('businessCardMaker'));
  
  beforeEach(inject(function($controller, $rootScope) {
    
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });
    
  })); 
  
  describe('MainCtrl', function () {
    
    it('default image filename', function (done) {
      
      this.timeout(50000);
      
      setTimeout(function() {
      
        scope.generatePicture().then(function(canvas) {
          console.log(canvas);
        });
        
        expect(scope.model.imageFilename).to.equal('bizcardmaker-com.jpg');
        
        done();
        
      }, 10000);
      
      
    }); 
  
  }); 

});
  
  

