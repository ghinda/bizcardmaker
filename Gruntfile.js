'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var files = {
  app: [
    'scripts/util.js',
    'scripts/env.js',
    'scripts/modal.js',
    'scripts/help.js',
    'scripts/safari.js',
    'scripts/logaster.js',
    'scripts/affiliates.js',
    'scripts/newsletter.js',
    'scripts/themes.js',
    'scripts/pdf.js',
    'scripts/app.js',
    'scripts/directives/fileread.js',
    'scripts/directives/payment.js',
    'scripts/directives/drag.js',
    'scripts/controllers/main.js',
    'scripts/controllers/order.js',
    'scripts/services/data.js',

    'scripts/website.js'
  ],
  plugins: [
    'bower_components/jquery/dist/jquery.js'',
    'bower_components/angular/angular.js'',
    'bower_components/angular-touch/angular-touch.js'',
    'bower_components/angular-route/angular-route.js'',
    'bower_components/angular-meditor/dist/meditor.js'',

    'bower_components/html2canvas/dist/html2canvas.js'',
    'bower_components/jspdf/dist/jspdf.debug.js'',

    'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js'',

    'bower_components/jquery.payment/lib/jquery.payment.js'',

    'bower_components/foundation-sites/dist/plugins/foundation.core.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.util.keyboard.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.util.box.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.util.triggers.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.util.mediaQuery.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.util.motion.js'',

    'bower_components/foundation-sites/dist/plugins/foundation.tooltip.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.dropdown.js'',
    'bower_components/foundation-sites/dist/plugins/foundation.reveal.js''
  ]
}

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  // configurable paths
  var config = {
    app: 'app',
    dist: 'public',
    tests: 'tests'
  };

  grunt.initConfig({
    config: config,
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        options: { reload: true }
      },
      assemble: {
        files: [ '<%= config.app %>/templates/{,*/}*.{hbs,html}' ],
        tasks: [ 'assemble:server' ]
      },
      sass: {
        files: [ '<%= config.app %>/styles/{,*/}*.{scss,sass}' ],
        tasks: [ 'sass:server' ]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '{.tmp,<%= config.app %>/views}/{,*/}*.html',
          '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, config.app),
              mountFolder(connect, config.tests)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, config.dist)
            ];
          }
        }
      }
    },
    clean: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.dist %>',
          src: [
            '*'
          ]
        }]
      },
      server: '.tmp',
      test: [
        '<%= config.tests %>/media/themes',
        '<%= config.tests %>/media/themes-diff'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js'
      ]
    },
    assemble: {
      options: {
        collections: [{
          name: 'posted',
          inflection: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        data: './themes.json',
        layoutdir: '<%= config.app %>/templates/layouts',
        partials: [
          '<%= config.app %>/templates/partials/**/*.html'
        ]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/templates',
          src: '**/*.hbs',
          dest: '.tmp'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/templates',
          src: '**/*.hbs',
          dest: '<%= config.dist %>'
        }]
      }
    },
    sass: {
      dist: {
        files: {
          '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss'
        }
      },
      server: {
        files: {
          '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss'
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= config.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: [
        '<%= config.dist %>/{,*/}index.html'
      ],
      options: {
        dest: '<%= config.dist %>'
      }
    },
    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      js: ['<%= config.dist %>/scripts/*.js'],
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images'
        ],
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm]
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= config.dist %>'
        }]
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/dev',
          dest: '<%= config.dist %>',
          src: [
            'CNAME',
            '*.*'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'CNAME',
            '*.*',
            //'bower_components/**/*',
            'bower_components/font-awesome/**/*',
            'images/**/*',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= config.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    karma: {
      unit: {
        configFile: 'tests/karma.conf.js'
      }
    },
    ngtemplates: {
      dist: {
        options: {
          concat: 'generated',
          module: 'businessCardMaker'
        },
        cwd: '<%= config.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: '**/*.js',
          dest: '.tmp/scripts'
        }]
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        mangle: false,
        sourceMap: true
      }
    },
    protractor: {
      options: {
        keepAlive: false,
        configFile: 'tests/protractor.conf.js'
      },
      themes: {
        options: {
          args: {
            specs: [
              'tests/e2e/themes.spec.js'
            ]
          }
        }
      }
    },
    execute: {
      themes: {
        src: [ 'tests/themes/themes-diff.js' ]
      }
    },
    'ftp-deploy': {
      development: {
        auth: {
          host: 'server134.web-hosting.com',
          authPath: 'deploy.json',
          authKey: 'namecheap'
        },
        src: '<%= config.dist %>',
        dest: './releases/development/'
      },
      staging: {
        auth: {
          host: 'server134.web-hosting.com',
          authPath: 'deploy.json',
          authKey: 'namecheap'
        },
        src: '<%= config.dist %>',
        dest: './releases/staging/'
      },
      www: {
        auth: {
          host: 'server134.web-hosting.com',
          authPath: 'deploy.json',
          authKey: 'namecheap'
        },
        src: '<%= config.dist %>',
        dest: './releases/www/'
      }
    }
  });

  // monkey-patch the uglify and concat tasks
  // so that uglify handles js concatenation itself, for sourcemaps.
  grunt.registerTask('useminPatch', function () {
    var concat = grunt.config('concat');
    var uglify = grunt.config('uglify');

    var concatFiles = concat.generated.files.slice();
    var newConcatFiles = [];
    var newUglifyFiles = [];

    concatFiles.forEach(function (file, index) {
      if (file.dest.indexOf('.js') !== -1) {
        file.dest = file.dest.replace('.tmp/concat/', 'public/');
        newUglifyFiles.push(file);
      } else {
        newConcatFiles.push(file);
      }
    });

    uglify.generated = {
      files: newUglifyFiles
    };

    concat.generated = {
      files: newConcatFiles
    };

    console.log(uglify.generated.files);

    grunt.config('concat', concat);
    grunt.config('uglify', uglify);

  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'default',
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'sass:server',
      'assemble:server',
      'connect:livereload',
      'watch'
    ]);

  });

  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',
    'assemble:dist',
    'htmlmin',
    'useminPrepare',
    'ngtemplates',
    'useminPatch',
    'copy:dist',
    'concat',
    //'ngAnnotate',
    'cssmin',
    'uglify',

    'rollup',

    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('test', function(target) {

    grunt.task.run([
      'default',
      'connect:dist',
      'clean:test',
      'protractor:themes',
      'execute:themes'
    ]);

  });

  var deployConfig = grunt.file.readJSON('deploy.json');

  var purgeCloudflareCache = function() {

    var done = this.async();

    var https = require('https');
    var querystring = require('querystring');

    // Build the post string from an object
    var postData = querystring.stringify({
      tkn: deployConfig.cloudflare.key,
      email: deployConfig.cloudflare.email,
      a: 'fpurge_ts',
      v: 1,
      z: 'bizcardmaker.com'
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'www.cloudflare.com',
        path: '/api_json.html',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    // Set up the request
    var postReq = https.request(post_options, function(res) {

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log(chunk);
        done();
      });

    });

    // post the data
    postReq.write(postData);
    postReq.end();

  };

  grunt.registerTask('cloudflare', purgeCloudflareCache);

  grunt.registerTask('deploy', function (target) {

    if (target === 'live') {
      return grunt.task.run([
        'test',

        'ftp-deploy:www',
        'cloudflare'
      ]);
    }

    grunt.task.run([
      'test',

      'copy:dev',
      'ftp-deploy:development',
      'ftp-deploy:staging',
      'cloudflare'
    ]);

  });

};
