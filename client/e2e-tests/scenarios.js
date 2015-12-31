'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Spirit99 app', function() {

    it(' - should automatically redirect to /map when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toBe('/map');
    });

    describe(' - Map view', function () {

        beforeEach(function() {
            browser.get('index.html#/map');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

    });

    describe(' - User visit site the first time', function () {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.get('index.html');
        });

        it(' - Local storage should be empty', function () {
            expect(browser.executeScript('return window.localStorage.length')).toBe(0);
        });

        it(' - Should auto select default station', function () {
            expect(element(by.className('spirit99-station-title')).getText()).toEqual('核廢料掩埋場');
        });

        it(' - There should be some markers on the map', function () {
            browser.wait(protractor.until.elementLocated(by.className('gmnoprint')), 10000);
            expect(element.all(by.xpath("//div[@class=\"gmnoprint\"]")).count()).toBeGreaterThan(0);
        });
    });

});
