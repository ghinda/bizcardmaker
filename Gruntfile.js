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
      server: '.tmp'
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
        layoutdir: '<%= config.app %>/templates/layouts'
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
    imagemin: {
      dist: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= config.dist %>/images'
        }]
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
            'images/{,*/}*.*',
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
        configFile: 'karma.conf.js',
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
      all: {
        options: {
          args: {
            specs: [
              'tests/e2e/*.spec.js'
            ]
          }
        }
      }
    },
    photobox : {
      themes: {
        options : {
          screenSizes: [ '1200' ],
          relativePaths: true,
          urls: [
            './tests/media/themes.html'
          ]
        }
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
      return grunt.task.run(['default', 'connect:dist:keepalive']);
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
    'imagemin',
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
    //'test',
    'build'
  ]);

  grunt.registerTask('deploy', function (target) {

    if (target === 'live') {
      return grunt.task.run([
        'default',
        'ftp-deploy:www'
      ]);
    }

    grunt.task.run([
      'default',
      'copy:dev',
      'ftp-deploy:development',
      'ftp-deploy:staging'
    ]);

  });

};
