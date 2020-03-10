'use strict';

const sass = require('sass');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');

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
        tasks: [ 'assemble:server', 'sitemap:server' ]
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
        ],
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/templates',
          src: '**/*.{hbs,xml}',
          dest: '.tmp'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/templates',
          src: '**/*.{hbs,xml}',
          dest: '<%= config.dist %>'
        }]
      }
    },
    sass: {
      options: {
        implementation: sass,
      },
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
            '<%= config.dist %>/styles/fonts/*',
            '!<%= config.dist %>/images/banner-social.png'
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
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'CNAME',
            '*.*',
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
    buildcontrol: {
      options: {
        dir: '<%= config.dist %>',
        commit: true,
        push: true,
        connectCommits: false
      },
      production: {
        options: {
          remote: 'git@github.com:ghinda/bizcardmaker.git',
          branch: 'gh-pages'
        }
      },
    },
    swPrecache: {
      dist: {
        rootDir: '<%= config.dist %>'
      }
    }
  });

  grunt.registerTask('sitemap', function (target) {
    var dist = config.dist;
    if (target === 'server') {
      dist = '.tmp';
    }

    grunt.file.copy(`${dist}/sitemap.html`, `${dist}/sitemap.xml`);
    grunt.file.delete(`${dist}/sitemap.html`);
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
      'sitemap:server',
      'connect:livereload',
      'watch'
    ]);

  });

  grunt.registerTask('build', [
    'clean:dist',
    'sass:dist',
    'assemble:dist',
    'sitemap',
    'htmlmin',
    'useminPrepare',
    'ngtemplates',
    'copy:dist',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'swPrecache'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('test', function() {
    grunt.task.run([
      'default',
      'connect:dist',
      'clean:test',
      'protractor:themes',
      'execute:themes'
    ]);
  });

  grunt.registerTask('deploy', function () {
    return grunt.task.run([
      'test',
      'buildcontrol:production'
    ]);
  });

};
