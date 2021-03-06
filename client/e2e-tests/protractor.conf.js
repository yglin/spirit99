exports.config = {
    allScriptsTimeout: 1100000,

    specs: [
        'post/crud.e2e.js',
        // 'channel/create.e2e.js',
        // '01.map.e2e.js',
        // '02.channel.e2e.js',
        // '03.post.e2e.js'
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
        defaultTimeoutInterval: 120000
    },

    plugins: [
        {
            path: '../../node_modules/protractor-console-plugin/index.js',
            failOnWarning: false,
            failOnError: false
        }
    ],

    params: {
        stationUrl: 'http://localhost:9000',
    }
};
