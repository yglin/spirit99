'use strict';

describe('Spirit99 app', function() {

    describe(' - Map view', function () {

        beforeEach(function() {
            browser.get('#/map');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

        it(' - There should be some markers on the map', function () {
            browser.wait(protractor.until.elementLocated(by.className('gmnoprint')), 10000);
            expect(element.all(by.xpath("//div[@class=\"gmnoprint\"]")).count()).toBeGreaterThan(0);
        });
    });

});
