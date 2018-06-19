/* Tests for themes generation
 */

describe('Themes', function () {
  var async = function(arr, delay, done) {
    var j = 0;

    var runner = function() {
      setTimeout(function() {
        if(j === arr.length) {
          return done();
        }

        console.log('async ', arr.length - j);

        arr[j]();
        j++;
        runner();
      }, delay)
    }

    runner();
  };

  var downloadPicture = function(elem) {
    return function() {
      elem.getAttribute('href')
      .then(function(href) {
        console.log('Downloading ', href);
      });

      elem
      .click()
      .then(element(by.css('.js-download-dropdown-btn')).click)
      .then(element(by.css('.dropdown-download-files button[ng-click*="DownloadPicture()"]')).click)
      // close the dropdown
      .then(element(by.css('.js-download-dropdown-btn')).click);
    }
  };

  it('should open the page', function () {
    browser.get('/');
    expect(true).toBe(true);
  });

  it('should download a picture of each theme', function (done) {

    var downloads = [];

    element.all(by.css('.themes-row a'))
    .each(function(elem) {
      downloads.push(downloadPicture(elem));
    })
    .then(function() {

      setTimeout(() => {
        async(downloads, 1500, function() {
          expect(true).toBe(true);
          done();
        });
      }, 1500)

    })


  });

})
