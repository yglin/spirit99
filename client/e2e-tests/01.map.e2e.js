'use strict';

var fakeData = require('../mocks/data.js');
var mockGeolocation = require('../mocks/geolocation.js');
var mockGeocoder = require('../mocks/geocoder.js');

var mapPage = require('./map.po');

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
        
        var EC, map, latitude, longitude, zoom;
        beforeEach(function() {
            EC = protractor.ExpectedConditions;
            map = element(by.css('.angular-google-map-container'));
            latitude = element(by.id('s99-debug-map-center-latitude'));
            longitude = element(by.id('s99-debug-map-center-longitude'));
            zoom = element(by.id('s99-debug-map-zoom'));
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
                mapPage.expectCenter(fakeData.geolocation.coords.latitude.toString(), fakeData.geolocation.coords.longitude.toString());
            });
        });

        describe(' - Initial map area set to LAST', function() {
            it(' - Set init map to LAST', function () {
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-last')).click();
                expect(element(by.id('s99-map-settings-init-map-last')).getAttribute('aria-checked')).toEqual('true');
                element(by.css('md-backdrop')).click();
                mapPage.panTo('55.555555', '111.111111');
                browser.refresh();
                mapPage.expectCenter('55.555555', '111.111111');
            });
        });

        describe(' - Initial map area set to HOME_MAP', function() {
            var homeMap;
            beforeEach(function() {
                homeMap = {
                    center: {
                        latitude: 11.111111,
                        longitude: 123.456789
                    },
                    zoom: 12
                };
                mapPage.panTo(homeMap.center.latitude.toString(), homeMap.center.longitude.toString());
                element(by.id('s99-button-open-menu')).click();
                element(by.css('md-tab-item md-icon#s99-sidenav-tab-icon-settings')).click();                
                element(by.id('s99-map-settings-init-map-home-map')).click();
            });

            afterEach(function() {
                element(by.css('md-backdrop')).click();
                mapPage.panTo(0, 0);
                browser.refresh();
                mapPage.expectCenter(homeMap.center.latitude.toString(), homeMap.center.longitude.toString());
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
            
            it(' - Should display locator dialog on pressing locator button', function() {
                buttonLocator.click();
                expect(element(by.id('s99-dialog-locator')).isDisplayed()).toBe(true);
            });

            it(' - Should navigate to geolocation of user if selected "My Location"', function() {
                mapPage.panTo(0, 0);
                buttonLocator.click();
                inputLocator.click();
                locationQueries.get(0).click();                
                confirm.click();
                mapPage.expectCenter(fakeData.geolocation.coords.latitude.toString(), fakeData.geolocation.coords.longitude.toString());
            });

            it(' - Should navigate to first faked location given any address', function() {
                buttonLocator.click();
                // inputLocator.click();
                inputLocator.sendKeys('man on earth');
                confirm.click();
                mapPage.expectCenter(fakeData.locations[0].latitude.toString(), fakeData.locations[0].longitude.toString());
            });

            it(' - Should show next-location button, naviagte to next location when pressed', function() {
                buttonLocator.click();
                // inputLocator.click();
                inputLocator.sendKeys('man on earth');
                confirm.click();
                var buttonNextLocation = element(by.id('s99-button-next-location'));
                expect(buttonNextLocation.isDisplayed()).toBe(true);
                buttonNextLocation.click();
                mapPage.expectCenter(fakeData.locations[1].latitude.toString(), fakeData.locations[1].longitude.toString());
                buttonNextLocation.click();
                mapPage.expectCenter(fakeData.locations[2].latitude.toString(), fakeData.locations[2].longitude.toString());
                buttonNextLocation.click();
                mapPage.expectCenter(fakeData.locations[0].latitude.toString(), fakeData.locations[0].longitude.toString());
            });

            it(' - Should remember searched locationQueries', function() {
                browser.executeScript('window.localStorage.clear()');
                buttonLocator.click();
                inputLocator.click();
                inputLocator.sendKeys('台灣');
                confirm.click();
                mapPage.waitIdle();
                browser.refresh();
                buttonLocator.click();
                inputLocator.click();
                locationQueries.get(1).click();
                expect(inputLocator.getAttribute('value')).toEqual('台灣');
            });
        });
    });
});
