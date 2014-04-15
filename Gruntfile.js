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
	var yeomanConfig = {
		app: 'app',
		dist: 'public'
	};

	try {
		yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
	} catch (e) {}

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			assemble: {
				files: [ '<%= yeoman.app %>/templates/{,*/}*.{hbs,html}' ],
				tasks: [ 'assemble:server' ]
			},
			sass: {
				files: [ '<%= yeoman.app %>/styles/{,*/}*.{scss,sass}' ],
				tasks: [ 'sass:server' ]
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'{.tmp,<%= yeoman.app %>/views}/{,*/}*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
							mountFolder(connect, yeomanConfig.app)
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
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},
		clean: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
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
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		},
		assemble: {
			options: {
				layoutdir: '<%= yeoman.app %>/templates'
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/templates',
					src: '**/*.hbs',
					dest: '.tmp'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/templates',
					src: '**/*.hbs',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		sass: {
			dist: {
				files: {
					'.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.scss',
					'.tmp/styles/app.css': '<%= yeoman.app %>/styles/app.scss'
				}
			},
			server: {
				files: {
					'.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.scss',
					'.tmp/styles/app.css': '<%= yeoman.app %>/styles/app.scss'
				}
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		useminPrepare: {
			html: [
				'<%= yeoman.app %>/{,*/}*.{html,hbs}'
			],
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			js: ['<%= yeoman.dist %>/scripts/*.js'],
			options: {
				assetsDirs: [
					'<%= yeoman.dist %>',
					'<%= yeoman.dist %>/images'
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
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html', 'views/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		copy: {
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/dev',
					dest: '<%= yeoman.dist %>',
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
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'CNAME',
						'*.*',
						'bower_components/**/*',
						//'images/{,*/}*.{gif,webp,svg}',
						'images/{,*/}*.*',
						'styles/fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: [
						'generated/*'
					]
				}]
			}
		},
		concurrent: {
			server: [
				'sass:server',
				'assemble:server'
			],
// 			test: [
// 				'sass'
// 			],
			dist: [
				'sass:dist',
				'assemble:dist'
			]
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
					usemin: '<%= yeoman.dist %>/scripts/app.js',
					module: 'businessCardMaker'
				},
				cwd: '<%= yeoman.app %>',
				src: 'views/{,*/}*.html',
				dest: '.tmp/scripts/templates.js'
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},
		buildcontrol: {
			options: {
				dir: 'public',
				commit: true,
				push: true,
				message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			},
			dev: {
				options: {
					remote: 'git@github.com:ghinda/bizcardmaker-dev.git',
					branch: 'gh-pages'
				}
			},
			dist: {
				options: {
					remote: 'git@github.com:ghinda/bizcardmaker.git',
					branch: 'gh-pages'
				}
			}
		}
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
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
		'concurrent:dist',
		'imagemin',
		'htmlmin',
		'useminPrepare',
		'ngtemplates',
		'copy:dist',
		'concat',
		'ngmin',
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

	grunt.registerTask('deploy', [
		'default',
		'buildcontrol:dist'
	]);

	grunt.registerTask('devdeploy', [
		'copy:dev',
		'buildcontrol:dev'
	]);
};
