module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            // bower:js
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-loader/angular-loader.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            'app/bower_components/lodash/lodash.js',
            'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
            'app/bower_components/angular-resource/angular-resource.js',
            // endbower
            'app/app.module.js',
            'app/app.config.js',
            'app/app.constant.js',
            'app/app.route.js',
            'app/services/fake-data.service.js',
            // 'app/components/**/*.js',
            // 'app/services/**/*.js',
            'app/map/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers: [
            'PhantomJS',
            // 'PhantomJS_custom'
        ],

        plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
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
