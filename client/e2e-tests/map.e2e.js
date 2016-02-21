'use strict';

describe('Spirit99 app', function() {

    describe(' - Map view', function () {

        beforeEach(function() {
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

            it(' - Default inital map options should be GEOLOCATION', function() {
                expect(element(by.id('s99-map-settings-init-map-geolocation')).getAttribute('aria-checked')).toEqual('true');
            });

            it(' - Set init map to LAST', function () {
                element(by.id('s99-map-settings-init-map-last')).click();
                expect(element(by.id('s99-map-settings-init-map-last')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('2');
                var lastMap = browser.executeScript('return window.localStorage.getItem("spirit99.last-map")');
                expect(lastMap).not.toBeNull();
            });
        });
    });

});
