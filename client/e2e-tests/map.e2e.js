'use strict';

var mockGeolocation = require('./mock-geolocation.js');

describe('Spirit99 app', function() {

    describe(' - Map', function () {

        var fakeGeolocation;
        beforeEach(function() {
            fakeGeolocation = {
                latitude: 23.973875,
                longitude: 120.982024
            };
            browser.executeScript(mockGeolocation.mockGeoLocationSuccess(fakeGeolocation.latitude, fakeGeolocation.longitude));
            browser.get('/');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

        describe(' - Initial map area', function() {
            beforeEach(function() {
                browser.executeScript("return window.localStorage.clear();");
                // Navigate to map setting panel
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
            });

            // it(' - Set init map to GEOLOCATION', function() {
            //     element(by.id('s99-map-settings-init-map-geolocation')).click();
            //     expect(element(by.id('s99-map-settings-init-map-geolocation')).getAttribute('aria-checked')).toEqual('true');
            //     var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
            //     expect(initMapScheme).toEqual('1');
            // });

            it(' - Set init map to LAST', function () {
                element(by.id('s99-map-settings-init-map-last')).click();
                expect(element(by.id('s99-map-settings-init-map-last')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('2');
                var lastMap = browser.executeScript('return window.localStorage.getItem("spirit99.last-map")');
                expect(lastMap).not.toBeNull();
            });

            it(' - Set init map to HOME_MAP', function () {
                element(by.id('s99-map-settings-init-map-home-map')).click();
                expect(element(by.id('s99-map-settings-init-map-home-map')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('3');
            });

            it(' - Save home-map to local storage', function () {
                element(by.id('s99-map-settings-init-map-home-map')).click();
                element(by.id('s99-map-settings-button-save-home-map')).click();
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.sleep(1000);
                var homeMap = browser.executeScript('return window.localStorage.getItem("spirit99.home-map")');
                expect(homeMap).not.toBeNull();                       
            });
        });
    });

});
