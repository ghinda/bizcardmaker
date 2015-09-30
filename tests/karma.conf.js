// Karma configuratio
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/foundation/js/foundation/foundation.js',
      'app/bower_components/foundation/js/foundation/foundation.reveal.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/angular-meditor/dist/meditor.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/html2canvas/dist/html2canvas.js',
      'app/bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js',
      'app/bower_components/jquery.payment/lib/jquery.payment.js',
      'app/scripts/**/*.js',
      'app/views/*.html',
      'tests/spec/**/*.js',
      {
        pattern: 'app/images/**/*',
        watched: false,
        included: false,
        served: true
      },
      {
        pattern: '.tmp/styles/**/*',
        watched: false,
        included: false,
        served: true
      },
      {
        pattern: 'app/bower_components/**/*',
        watched: false,
        included: false,
        served: true
      },

      {
        pattern: 'tests/media/**/*',
        watched: false,
        included: false,
        served: true
      },
    ],

    proxies: {
      '/images/': '/base/app/images/',
      '/styles/': '/base/.tmp/styles/',
      '/bower_components/': '/base/app/bower_components/',

      '/media/': '/base/tests/media/',
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/views/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'app/'
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
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome',
      // 'PhantomJS_Desktop',
    ],

    customLaunchers: {
      'PhantomJS_Desktop': {
        base: 'PhantomJS',
          options: {
            viewportSize: {
              width: 1400,
              height: 1000
          }
        }
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    browserNoActivityTimeout: 1000000
  });
};
