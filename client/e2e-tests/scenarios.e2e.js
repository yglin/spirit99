'use strict';

describe('Spirit99 app', function() {

    it(' - should automatically redirect to /map when location hash/fragment is empty', function() {
        browser.get('/');
        expect(browser.getLocationAbsUrl()).toBe('/map');
    });

    describe(' - User visit site the first time', function () {
        beforeEach(function () {
            browser.executeScript('window.localStorage.clear();');
            browser.get('/');
        });

        it(' - Local storage should be empty', function () {
            expect(browser.executeScript('return window.localStorage.length')).toBe(0);
        });

        it(' - Should auto select default station', function () {
            expect(element(by.className('s99-station-title')).getText()).toEqual('核廢料掩埋場');
        });

    });

});
