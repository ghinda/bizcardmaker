'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  var deployConfig = grunt.file.readJSON('deploy.json');

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
          livereload: true
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
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          livereload: true,
          base: [
            '.tmp',
            config.app,
            config.tests
          ]
        }
      },
      dist: {
        options: {
          base: [
            config.dist
          ]
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
          usemin: '/scripts/app.js',
          module: 'businessCardMaker'
        },
        cwd: '<%= config.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },
    concat: {
      options: {
        sourceMap: true
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        sourceMap: true,
        sourceMapIn: function(uglifySource) {
          return uglifySource + '.map';
        },
        sourceMapIncludeSources: true
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
    },
    cloudflare_purge: {
      default: {
        options: {
          apiKey: deployConfig.cloudflare.key,
          email: deployConfig.cloudflare.email,
          zone: deployConfig.cloudflare.zone
        }
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

  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',
    'assemble:dist',
    'htmlmin',
    'useminPrepare',
    'ngtemplates',
    'copy:dist',
    'concat',
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

  grunt.registerTask('deploy', function (target) {

    if (target === 'live') {
      return grunt.task.run([
        'test',

        'ftp-deploy:www',
        'cloudflare_purge'
      ]);
    }

    grunt.task.run([
      'test',

      'copy:dev',
      'ftp-deploy:development',
      'ftp-deploy:staging',
      'cloudflare_purge'
    ]);

  });

};
