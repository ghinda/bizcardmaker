/* Tests for themes generation
 */

describe('Themes', function () {

  var downloadPicture = function(elem) {

    elem.getAttribute('href')
    .then(function(href) {
      console.log('Downloading ', href);
    });

    elem.click();

    element(by.css('#js-download-button')).click();
    element(by.css('#drop-downloads a[ng-click*="DownloadPicture()"]')).click();

    browser.driver.sleep(1800);

  };

  it('should open the page', function () {

    browser.get('#/');

    expect(true).toBe(true);

  });

  it('should download a picture of each theme', function () {

    element.all(by.css('.themes-row a')).each(downloadPicture);

    expect(true).toBe(true);

  });

})
