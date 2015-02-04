/* Tests for themes generation
 */

describe('Themes', function () {


  it('should open the page', function () {

    browser.get('#/');
    
    element(by.css('#js-download-button')).click();
    element(by.css('[ng-click="DownloadPicture()"]')).click();

    expect(true).toBe(true);

  });

})
