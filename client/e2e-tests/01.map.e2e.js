'use strict';

var fakeData = require('../mocks/data.js');
var mockGeolocation = require('../mocks/geolocation.js');
var mockGeocoder = require('../mocks/geocoder.js');

describe('Spirit99 app', function() {

    describe(' - Map', function () {

        beforeEach(function() {
            browser.addMockModule('spirit99', mockGeolocation.addMockGeolocation, fakeData.geolocation);
            browser.addMockModule('spirit99', mockGeocoder.addMockGeocoder, fakeData.locations);
        });

        beforeEach(function() {
            browser.get('/');            
        });

        beforeEach(function () {
            browser.executeScript(function (fakeData) {
                window.localStorage.setItem('spirit99.locationQueries', JSON.stringify(fakeData.locationQueries));
            }, fakeData);
            browser.refresh();
        })

        afterEach(function() {
            browser.executeScript('window.localStorage.clear()');
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
            browser.wait(waitMapPanned, 5000);
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
                expect(latitude.getText()).toEqual(fakeData.geolocation.coords.latitude.toString());
                expect(longitude.getText()).toEqual(fakeData.geolocation.coords.longitude.toString());
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
            });
        });

        describe(' - Find locations', function() {
            var buttonLocator = element(by.id('s99-open-dialog-locator'));
            var inputLocator = element(by.xpath('//*[@id="s99-input-locator-search-text"]//input'));
            var locationQueries = element.all(by.xpath('//div[contains(@class, "s99-items-locator-address")]'));
            var confirm = element(by.id('s99-dialog-locator-button-confirm'));
            // beforeEach(function() {
            // });
            
            it(' - Should display locator dialog on pressing locator button', function() {
                buttonLocator.click();
                expect(element(by.id('s99-dialog-locator')).isDisplayed()).toBe(true);
            });

            it(' - Should navigate to geolocation of user if selected "My Location"', function() {
                browser.actions().dragAndDrop(map, {x:200, y:200}).perform();
                browser.wait(waitMapPanned, 5000);
                buttonLocator.click();
                inputLocator.click();
                locationQueries.get(0).click();                
                confirm.click();
                browser.wait(waitMapPanned, 5000).then(function () {
                    expect(latitude.getText()).toEqual(fakeData.geolocation.coords.latitude.toString());
                    expect(longitude.getText()).toEqual(fakeData.geolocation.coords.longitude.toString());
                });
            });

            it(' - Should navigate to first faked location given any address', function() {
                buttonLocator.click();
                // inputLocator.click();
                inputLocator.sendKeys('man on earth');
                confirm.click();
                browser.wait(waitMapPanned, 5000).then(function () {
                    expect(latitude.getText()).toEqual(fakeData.locations[0].latitude.toString());
                    expect(longitude.getText()).toEqual(fakeData.locations[0].longitude.toString());
                });                
            });

            it(' - Should show next-location button, naviagte to next location when pressed', function() {
                buttonLocator.click();
                // inputLocator.click();
                inputLocator.sendKeys('man on earth');
                confirm.click();
                var buttonNextLocation = element(by.id('s99-button-next-location'));
                expect(buttonNextLocation.isDisplayed()).toBe(true);
                buttonNextLocation.click();
                browser.wait(waitMapPanned, 5000).then(function () {
                    expect(latitude.getText()).toEqual(fakeData.locations[1].latitude.toString());
                    expect(longitude.getText()).toEqual(fakeData.locations[1].longitude.toString());
                });                
                buttonNextLocation.click();
                browser.wait(waitMapPanned, 5000).then(function () {
                    expect(latitude.getText()).toEqual(fakeData.locations[2].latitude.toString());
                    expect(longitude.getText()).toEqual(fakeData.locations[2].longitude.toString());
                });                
                buttonNextLocation.click();
                browser.wait(waitMapPanned, 5000).then(function () {
                    expect(latitude.getText()).toEqual(fakeData.locations[0].latitude.toString());
                    expect(longitude.getText()).toEqual(fakeData.locations[0].longitude.toString());
                });                
            });

            it(' - Should remember searched locationQueries', function() {
                browser.executeScript('window.localStorage.clear()');
                buttonLocator.click();
                inputLocator.click();
                inputLocator.sendKeys('台灣');
                confirm.click();
                browser.wait(waitMapPanned, 5000);
                browser.refresh();
                buttonLocator.click();
                inputLocator.click();
                locationQueries.get(1).click();
                expect(inputLocator.getAttribute('value')).toEqual('台灣');
            });
        });
    });
});
