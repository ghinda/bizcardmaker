'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

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
// 			test: {
// 				options: {
// 					middleware: function (connect) {
// 						return [
// 							mountFolder(connect, '.tmp'),
// 							mountFolder(connect, 'test')
// 						];
// 					}
// 				}
// 			},
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
        layoutdir: '<%= config.app %>/templates/layouts',
        partials: [
          '<%= config.app %>/templates/partials/**/*.html'
        ]
      },
      server: {
        options: {
          collections: [{
            name: 'posted',
            inflection: 'post',
            sortby: 'posted',
            sortorder: 'descending'
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/templates',
          src: '**/*.hbs',
          dest: '.tmp'
        }]
      },
      dist: {
        options: {
          collections: [{
            name: 'posted',
            inflection: 'post',
            sortby: 'posted',
            sortorder: 'descending'
          }]
        },
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
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= config.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: [
        //'<%= config.dist %>/{,*/}*.{html,hbs}'
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
        configFile: 'tests/karma.conf.js',
        singleRun: true
      }
    },
    ngtemplates: {
      dist: {
        options: {
          usemin: '<%= config.dist %>/scripts/app.js',
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
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
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

// 	grunt.registerTask('test', [
// 		'clean:server',
// 		'concurrent:test',
// 		'connect:test',
// 		'karma'
// 	]);

  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',
    'assemble:dist',
    'htmlmin',
    'useminPrepare',
    'ngtemplates',
    'copy:dist',
    'concat',
    'ngAnnotate',
    'cssmin',
    'uglify',
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
        //'test',
        'default',

        'ftp-deploy:www',
        'cloudflare'
      ]);
    }

    grunt.task.run([
      //'test',
      'default',

      'copy:dev',
      'ftp-deploy:development',
      'ftp-deploy:staging',
      'cloudflare'
    ]);

  });

};
