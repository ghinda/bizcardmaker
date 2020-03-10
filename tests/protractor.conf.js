/* Protractor config
 */

var themeDir = __dirname + '/media/themes';

exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:9000/',
  capabilities: {
    'browserName': 'chrome',

    /*
    * Can be used to specify the phantomjs binary path.
    * This can generally be ommitted if you installed phantomjs globally.
    */
    'phantomjs.binary.path': require('phantomjs').path,

    /*
    * Command line args to pass to ghostdriver, phantomjs's browser driver.
    * See https://github.com/detro/ghostdriver#faq
    */
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],

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

