'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
      });    

    // Define the configuration for all the tasks
    grunt.initConfig({

        // configuration for SASS
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },

        // configuration for Watch
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },

        // configuration for BrowserSync
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },

        // configuration for copying html and font files
        copy: {
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]                
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        // configuration for cleaning distribution folder
        clean: {
            build: {
                src: [ 'dist/']
            }
        },

        // configuration for imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },

        // configuration for useminPrepare
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html'] // 'contactus.html','aboutus.html',
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js:['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }       
                        }]
                    }
                }
            }
        },

        // configuration for Concat
        concat: {
            options: {
                separator: ';'
            },
  
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // configuration for Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // configuration for cssmin
        cssmin: {
            dist: {}
        },

        // configuration for Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
  
            release: {
            // filerev: release hashes(md5) all assets (images, js and css )
            // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        // configuration for Usemin (replaces all assets with their revved version in html and css files) according to their relative paths
        usemin: {
            //html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            html: ['dist/index.html'],
            options: {
                 // contains the directories for finding the assets
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },


    // configuration for htmlmin
        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    //'dist/contactus.html': 'dist/contactus.html',
                    //'dist/aboutus.html': 'dist/aboutus.html',
                }
            }
        }
    });


    // Register tasks, which get invoked via 'grunt <task>'

    // run 'grunt css' to compile the .scss files
    grunt.registerTask('css', ['sass']);

    // default when you just run 'grunt' in the terminal
    grunt.registerTask('default', ['browserSync', 'watch']); 

    // run 'grunt build' to clean, copy, minify, concatenate, uglify, etc. 
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);    

};