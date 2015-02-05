/* Tests for themes generation
 */

describe('Themes', function () {

  var downloadPicture = function() {
    
    element(by.css('#js-download-button')).click();
    element(by.css('#drop-downloads a[ng-click*="DownloadPicture()"]')).click();
    
    browser.sleep(1000);
    
  };
  
  it('should open the page', function () {

    browser.get('#/');

    expect(true).toBe(true);

  });
  
  it('should download a picture of each theme', function () {
  
    element.all(by.css('.themes-row a')).each(function(elem) {
    
      elem.click();
      
      downloadPicture();
    
    });
    
    expect(true).toBe(true);
    
  });

})
