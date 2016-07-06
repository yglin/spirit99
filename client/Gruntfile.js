// Generated on 2015-12-02 using generator-angular 0.14.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/**/*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');
var _ = require('underscore');
var Q = require('q');
var modRewrite = require('connect-modrewrite');
var exec = require('child_process').exec;

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        protractor: 'grunt-protractor-runner',
        ngconstant: 'grunt-ng-constant'
    });

    // Configurable paths for the application
    var appConfig = {
        root: require('./bower.json').rootPath || './',
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/**/*.js'],
                tasks: ['newer:jshint:all', 'newer:jscs:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['<%= yeoman.app %>/**/*.spec.js', '<%= yeoman.app %>/**/*.test.js'],
                tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/**/*.css'],
                tasks: ['newer:copy:styles', 'postcss'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9493,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 30678
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.root)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    livereload: false,
                    // keepalive: true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('../bower_components')
                            ),
                            connect.static(appConfig.root)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yeoman.app %>/**/*.spec.js', '<%= yeoman.app %>/**/*.test.js']
            }
        },

        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/**/*.js'
                ]
            },
            test: {
                src: ['<%= yeoman.app %>/**/*.spec.js', '<%= yeoman.app %>/**/*.test.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/**/*',
                        '!<%= yeoman.dist %>/.**/*',
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: ['last 1 version']})
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically insert angular script files into index.html
        // includeSource: {
        //     options: {
        //         basePath: '<%= yeoman.app %>',
        //         baseUrl: '<%= yeoman.app %>/'
        //     },
        //     target: {
        //         files: {
        //             '<%= yeoman.root %>/index.html': '<%= yeoman.root %>/index.html'
        //         }
        //     }
        // },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.root %>/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
            }
        },

        injector: {
            options: {
                relative: true,
            },
            dev: {
                files: {
                    'index.html': ['app/app.module.js', 'app/app.*.js', 'app/**/*.js', 'app/**/*.css', '!app/obsolete/**/*.*', '!app/**/*.spec.js', '!app/**/*.test.js']
                }
            },
            dist: {
                files: {
                    'index.html': ['app/app.module.js', 'app/app.*.js', 'app/**/*.js', 'app/**/*.css', '!app/obsolete/**/*.*', '!app/**/*.spec.js', '!app/**/*.test.js']
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/**/*.js',
                    '<%= yeoman.dist %>/styles/**/*.css',
                    '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.root %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/**/*.css'],
            js: ['<%= yeoman.dist %>/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ],
                patterns: {
                    css: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']],
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/**/*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.root %>/images',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.root %>/images',
                    src: '**/*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        ngtemplates: {
            test: {
                options: {
                    module: 'spirit99',
                },
                cwd: '<%= yeoman.root %>',
                src: ['app/components/**/*.html'],
                dest: '.tmp/templateCache.js'                
            },
            dist: {
                options: {
                    module: 'spirit99',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'scripts/scripts.js'
                },
                cwd: '<%= yeoman.root %>',
                src: ['app/components/**/*.html'],
                dest: '.tmp/templateCache.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
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

        ngconstant: {
            options: {
                name: 'spirit99',
                dest: 'app/app.constant.js',
                deps: false,
                wrap: true
            },
            dev: {
                constants: {
                    CONFIG: _.extend(
                        grunt.file.readJSON('config/shared.json'),
                        grunt.file.readJSON('config/development.json')
                    )
                }
            },
            test: {
                constants: {
                    CONFIG: _.extend(
                        grunt.file.readJSON('config/shared.json'),
                        grunt.file.readJSON('config/test.json')
                    )
                }
            },
            dist: {
                constants: {
                    CONFIG: _.extend(
                        grunt.file.readJSON('config/shared.json'),
                        grunt.file.readJSON('config/production.json')
                    )
                }
            },
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.root %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'app/layout/**/*.html',
                        'images/**/*.{webp}',
                        'styles/fonts/**/*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                files:[
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles',
                        dest: '.tmp/styles/',
                        src: '**/*.css'                        
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Excution of shell commands
        shell: {
            protractor: {
                command: 'protractor e2e-tests/protractor.conf.js'
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'ngconstant:dev',
            'injector:dev',
            // 'includeSource',
            'concurrent:server',
            'postcss:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'ngconstant:test',
        // 'includeSource',
        'concurrent:test',
        'postcss',
        'ngtemplates:test',
        'connect:test',
        'karma',
    ]);

    grunt.registerTask('e2e-test', [
        'clean:server',
        'wiredep',
        'ngconstant:test',
        // 'includeSource',
        'concurrent:test',
        'postcss',
        'connect:test',
        'shell:protractor'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep:app',
        'ngconstant:dist',
        'injector:dist',
        'useminPrepare',
        'ngtemplates:dist',
        'concurrent:dist',
        'postcss',
        'concat:generated',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('awss3-sync', function () {
        var done = this.async();
        var doneSync = Q.defer();
        // var doneSetIndexHtmlCacheCtrl = Q.defer();

        var command = 'aws';
        var args = ['s3', 'sync', grunt.config.get('yeoman.dist'), 's3://www.9493.tw', '--delete', '--exclude', '"index.html"'];
        grunt.util.spawn({
            cmd: command,
            args: args,
            opts: {
                stdio: 'inherit'
            }
        }, function (error, result, code) {
            if (error) {
                grunt.log.error(error);
                doneSync.reject(error);
            }
            else {
                grunt.log.ok('Sync to AWS S3 www.9493.tw completed');
                doneSync.resolve();
            }            
        });

        doneSync.promise
        .then(function () {
            args = ['s3', 'cp', path.resolve(grunt.config.get('yeoman.dist'), 'index.html'), 's3://www.9493.tw/index.html', '--cache-control', '"max-age=0"'];
            grunt.util.spawn({
                cmd: command,
                args: args,
                opts: {
                    stdio: 'inherit'
                }
            }, function (error, result, code) {
                if (error) {
                    grunt.log.error(error);
                    done(false);
                }
                else {
                    done(true);
                }
            })
        })
        .catch(function (error) {
            done(false);
        });
    });

    grunt.registerTask('deploy', ['build', 'awss3-sync']);

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);
};
