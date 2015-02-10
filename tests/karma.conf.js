// Karma configuration
// Generated on Mon Feb 02 2015 23:18:20 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      '../app/bower_components/jquery/dist/jquery.js',
      '../app/bower_components/foundation/js/foundation/foundation.js',
      '../app/bower_components/foundation/js/foundation/foundation.reveal.js',
      '../app/bower_components/angular/angular.js',
      '../app/bower_components/angular-route/angular-route.js',
      '../app/bower_components/angular-touch/angular-touch.js',
      '../app/bower_components/angular-meditor/dist/meditor.js',
      '../app/bower_components/angular-mocks/angular-mocks.js',
      '../app/scripts/**/*.js',
      'spec/**/*.js',
      'spec/**/*.fix.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
