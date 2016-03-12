'use strict';

var mockGeolocation = require('../mocks/geolocation.js');

describe('Spirit99 app', function() {

    describe(' - Map', function () {

        var fakePosition;
        beforeEach(function() {
            fakePosition = {
                coords: {
                    latitude: 23.456789,
                    longitude: 123.456789
                }
            };
            browser.addMockModule('spirit99', mockGeolocation.addMockGeolocation, fakePosition);
        });
        
        var EC, map, latitude, longitude, zoom, waitMapPanned, lastMap;
        beforeEach(function() {
            EC = protractor.ExpectedConditions;
            map = element(by.css('.angular-google-map-container'));
            latitude = element(by.id('s99-debug-map-center-latitude'));
            longitude = element(by.id('s99-debug-map-center-longitude'));
            zoom = element(by.id('s99-debug-map-zoom'));
            lastMap = { center: {} };
            var latitudeChanged = function () {
                return latitude.getText().then(function (lat) {
                    if (lat != lastMap.center.latitude) {
                        lastMap.center.latitude = lat;
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            };
            var longitudeChanged = function () {
                return longitude.getText().then(function (lng) {
                    if (lng != lastMap.center.longitude) {
                        lastMap.center.longitude = lng;
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            };

            waitMapPanned = EC.and(latitudeChanged, longitudeChanged);

            browser.get('/');
            browser.wait(waitMapPanned, 5000);
        });

        afterEach(function() {
            browser.executeScript('window.localStorage.clear()');
        });

        it(' - Should render angular-google-map when user navigates to /map', function () {
            expect(element(by.className('angular-google-map')).isPresent()).toBe(true);
        });

        describe(' - Initial map area set to GEOLOCATION', function() {
            it(' - Set init map to GEOLOCATION, should call geolocation.getCurrentPosition after page refresh', function () {
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-geolocation')).click();
                browser.refresh();
                expect(latitude.getText()).toEqual(fakePosition.coords.latitude.toString());
                expect(longitude.getText()).toEqual(fakePosition.coords.longitude.toString());
            });
        });

        describe(' - Initial map area set to LAST', function() {
            it(' - Set init map to LAST', function () {
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-last')).click();
                expect(element(by.id('s99-map-settings-init-map-last')).getAttribute('aria-checked')).toEqual('true');
                element(by.css('md-backdrop')).click();
                browser.actions().dragAndDrop(map, {x:200, y:200}).perform();
                browser.wait(waitMapPanned, 5000).then(function () {
                    browser.refresh();
                    expect(latitude.getText()).toEqual(lastMap.center.latitude);                    
                    expect(longitude.getText()).toEqual(lastMap.center.longitude);
                });
            });
        });

        describe(' - Initial map area set to HOME_MAP', function() {
            var homeMap;
            beforeEach(function() {
                browser.actions().dragAndDrop(map, {x:-200, y:200}).perform();
                browser.wait(waitMapPanned, 5000).then(function () {
                    homeMap = JSON.parse(JSON.stringify(lastMap));
                    // console.log(homeMap);
                });
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-home-map')).click();
            });

            afterEach(function() {
                element(by.css('md-backdrop')).click();
                browser.actions().dragAndDrop(map, {x:300, y:-300}).perform();                
                browser.wait(waitMapPanned, 5000).then(function () {
                    browser.refresh();
                    expect(latitude.getText()).toEqual(homeMap.center.latitude);                    
                    expect(longitude.getText()).toEqual(homeMap.center.longitude);
                });
            });

            it(' - Set init map to HOME_MAP, home-map not in local storage yet', function () {
                expect(element(by.id('s99-dialog-confirm')).isPresent()).toBe(true);
                browser.wait(EC.visibilityOf($('#s99-dialog-confirm')), 2000);
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.wait(EC.invisibilityOf($('#s99-dialog-confirm')), 2000);
            });

            it(' - Set init map to HOME_MAP, use the save-home-map button', function () {
                element(by.id('s99-dialog-confirm-button-cancel')).click();
                browser.wait(EC.invisibilityOf($('#s99-dialog-confirm')), 2000);
                element(by.id('s99-map-settings-button-save-home-map')).click();
                browser.wait(EC.visibilityOf($('#s99-dialog-confirm')), 2000);
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.wait(EC.invisibilityOf($('#s99-dialog-confirm')), 2000);
                // element(by.id('s99-button-open-menu')).click();
                // element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                // element(by.id('s99-map-settings-init-map-home-map')).click();
                // element(by.id('s99-map-settings-button-save-home-map')).click();
                // browser.sleep(1000);
                // element(by.id('s99-dialog-confirm-button-confirm')).click();
                // browser.sleep(1000);
                // var homeMap = browser.executeScript('return window.localStorage.getItem("spirit99.home-map")');
                // expect(homeMap).not.toBeNull();                       
            });
        });
    });
});
