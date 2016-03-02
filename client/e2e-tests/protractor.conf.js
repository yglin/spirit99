exports.config = {
    allScriptsTimeout: 1100000,

    specs: [
        '*.e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            // To prevent chrome from asking permission for gelocation
            // REF. to https://github.com/angular/protractor/issues/2626
            prefs: {'profile.managed_default_content_settings.geolocation': 1}
        }
    },

    baseUrl: 'http://localhost:9001/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    plugins: [
        {
            path: '../../node_modules/protractor-console-plugin/index.js',
            failOnWarning: false,
            failOnError: false
        }
    ]
};
