'use strict';

var mockGeolocation = require('../mocks/geolocation.js');

describe('Spirit99 app', function() {

    describe(' - Map', function () {

        // var fakeGeolocation;
        beforeEach(function() {
            browser.get('/');
            // fakeGeolocation = {
            //     latitude: 23.973875,
            //     longitude: 120.982024
            // };
            // browser.executeScript(mockGeolocation.mockGeoLocationSuccess(fakeGeolocation.latitude, fakeGeolocation.longitude));
            // browser.refresh();
        });

        afterEach(function() {
            browser.executeScript('window.localStorage.clear()');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

        describe(' - Initial map area set to GEOLOCATION', function() {
            it(' - Set init map to GEOLOCATION, should call geolocation.getCurrentPosition after page refresh', function () {
                browser.executeScript('window.localStorage.setItem("spirit99.init-map-scheme", 2);');
                browser.refresh();
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-geolocation')).click();
                expect(element(by.id('s99-map-settings-init-map-geolocation')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('1');
    
                // browser.executeScript('return window.navigator.geolocation;')
                // .then(function (geolocation) {
                //     console.log(geolocation);
                //     spyOn(geolocation, 'getCurrentPosition').and.callThrough();
                //     browser.refresh();
                //     expect(geolocation.getCurrentPosition).toHaveBeenCalled();                    
                // });
            });
        });

        describe(' - Initial map area set to LAST', function() {
            it(' - Set init map to LAST', function () {
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-last')).click();
                expect(element(by.id('s99-map-settings-init-map-last')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('2');
                var lastMap = browser.executeScript('return window.localStorage.getItem("spirit99.last-map")');
                expect(lastMap).not.toBeNull();
            });
        });

        describe(' - Initial map area set to HOME_MAP', function() {
            it(' - Set init map to HOME_MAP, home-map not in local storage yet', function () {
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-home-map')).click();
                browser.sleep(1000);
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.sleep(1000);
                expect(element(by.id('s99-map-settings-init-map-home-map')).getAttribute('aria-checked')).toEqual('true');
                var initMapScheme = browser.executeScript('return window.localStorage.getItem("spirit99.init-map-scheme")');
                expect(initMapScheme).toEqual('3');
                var homeMap = browser.executeScript('return window.localStorage.getItem("spirit99.home-map")');
                expect(homeMap).not.toBeNull();                       
            });

            it(' - Set init map to HOME_MAP, home-map already in local storage', function () {
                browser.executeScript('window.localStorage.setItem("spirit99.home-map", {})');
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-home-map')).click();
                element(by.id('s99-map-settings-button-save-home-map')).click();
                browser.sleep(1000);
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.sleep(1000);
                var homeMap = browser.executeScript('return window.localStorage.getItem("spirit99.home-map")');
                expect(homeMap).not.toBeNull();                       
            });
        });
    });
});
