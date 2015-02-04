/* Protractor config
 */

exports.config = {
  baseUrl: 'http://localhost:9000/',
  capabilities: {
    'browserName': 'phantomjs',

    /* 
    * Can be used to specify the phantomjs binary path.
    * This can generally be ommitted if you installed phantomjs globally.
    */
    'phantomjs.binary.path': require('phantomjs').path,

    /*
    * Command line args to pass to ghostdriver, phantomjs's browser driver.
    * See https://github.com/detro/ghostdriver#faq
    */
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
  rootElement: '.card-maker',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
}

