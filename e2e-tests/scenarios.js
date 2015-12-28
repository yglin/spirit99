'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Spirit99 app', function() {

    it(' - should automatically redirect to /map when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toBe('/map');
    });

    describe(' - Map view', function() {

        beforeEach(function() {
            browser.get('index.html#/map');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

        // I don't know how to browser-get markers' data or it's damn hard.
        // describe(' - Drag map', function () {
        //     beforeEach(function () {
        //         // Drag map with a little offset
        //     })

        //     it(' - Markers should all locate inside bounds', function () {
        //         // body...
        //     });
        // });

    });

});
