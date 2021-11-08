/* Protractor config
 */

var themeDir = __dirname + '/media/themes';

exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:9000/',
  capabilities: {
    'browserName': 'chrome',

    chromeOptions: {
      args: [ '--start-maximized' ],
      prefs: {
        download: {
          prompt_for_download: false,
          default_directory: themeDir
        },
        profile: {
          default_content_settings: {
            'multiple-automatic-downloads': 1
          }
        }
      }
    }
  },
  framework: 'jasmine2',
  rootElement: '.card-maker',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 3000000
  }
}

