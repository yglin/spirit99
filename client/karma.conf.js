module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'https://maps.googleapis.com/maps/api/js?sensor=false',

            // bower:js
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular.validators/angular.validators.js',
            'bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            'bower_components/lodash/lodash.js',
            'bower_components/angular-google-maps/dist/angular-google-maps.js',
            'bower_components/angular-clipboard/angular-clipboard.js',
            // endbower
            
            'app/app.module.js',
            'app/app.*.js',
            '.tmp/templateCache.js',
            'app/components/**/*.js',
            // 'app/app.constant.js',
            // 'app/app.route.js',
            // 'app/services/fake-data.service.js',
            // 'app/components/**/*.js',
            // 'app/services/**/*.js',
            // 'app/**/*.spec.js',
            // 'app/**/*.test.js'
        ],

        exclude: [
            'app/obsolete/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine', 'browserify'],

        preprocessors: {
            'mocks/**/*.mock.js': ['browserify'],
            'app/**/*.{spec,test}.js': ['browserify'],
        },

        browserify: {
            debug: true
        },

        browsers: [
            'PhantomJS'
            // 'PhantomJS_custom'
        ],

        plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-browserify'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        customLaunchers: {
          'PhantomJS_custom': {
            base: 'PhantomJS',
            options: {
              windowName: 'my-window',
              settings: {
                webSecurityEnabled: false
              },
            },
            flags: ['--load-images=true'],
            debug: true
          }
        },

        phantomjsLauncher: {
          // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
          exitOnResourceError: true
        }
    });
};
