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

    describe(' - Navigate between views by clicking menu buttons in toolbar', function() {
        beforeEach(function() {
            browser.get('/');
        });

        describe(' - to stations view', function() {
            beforeEach(function() {
                element(by.id('menu-button-stations')).click();
            });

            it(' - Should redirect to stations view and hide menu-button-stations', function () {
                expect(browser.getCurrentUrl()).toMatch(/.+\/\#\/stations\/?$/);
                expect(element(by.id('menu-button-stations')).isDisplayed()).toBe(false);
            });
        });

        describe(' - to search view', function() {
            beforeEach(function() {
                element(by.id('menu-button-search')).click();
            });

            it(' - Should redirect to search view and hide menu-button-search', function () {
                expect(browser.getCurrentUrl()).toMatch(/.+\/\#\/search\/?$/);
                expect(element(by.id('menu-button-search')).isDisplayed()).toBe(false);
            });
        });

        describe(' - to settings view', function() {
            beforeEach(function() {
                element(by.id('menu-button-settings')).click();
            });

            it(' - Should redirect to settings view and hide menu-button-settings', function () {
                expect(browser.getCurrentUrl()).toMatch(/.+\/\#\/settings\/?$/);
                expect(element(by.id('menu-button-settings')).isDisplayed()).toBe(false);
            });
        });
        
        describe(' - to map view', function() {
            beforeEach(function() {
                browser.get('/#/stations');
                element(by.id('menu-button-map')).click();
            });

            it(' - Should redirect to map view and hide menu-button-map', function () {
                expect(browser.getCurrentUrl()).toMatch(/.+\/\#\/map\/?$/);
                expect(element(by.id('menu-button-map')).isDisplayed()).toBe(false);
            });
        });
    });

});
