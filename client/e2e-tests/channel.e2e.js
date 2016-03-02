'use strict';

var fakeData = require('./fake-data.js');
var mockGeolocation = require('./mock-geolocation.js');

describe('Spirit99 app', function() {

    beforeEach(function() {
        browser.executeScript(mockGeolocation.mockGeoLocationSuccess(23.973875, 120.982024));
        browser.get('/');
    });

    describe(' - Channel', function () {
        
        beforeEach(function () {
            // Fake data stored in local storage
            browser.executeScript(function (fakeChannels) {
                window.localStorage.setItem("spirit99.channels", JSON.stringify(fakeChannels));
            }, fakeData.channels);
            // browser.pause();
        });

        beforeEach(function () {

            // Mock data from channel server
            function addMockServer (fakeData) {
                mockHttpBackend.$inject = ['$httpBackend'];

                function mockHttpBackend ($httpBackend) {
                    for (var key in fakeData.channels) {
                        $httpBackend.when('GET', fakeData.channels[key]['portal-url'])
                        .respond(200, fakeData.channels[key]);
                    }
                    $httpBackend.when('GET', /.*/).passThrough();
                }
                angular.module('mockServer', ['ngMockE2E']).run(mockHttpBackend);
            }
            browser.addMockModule('mockServer', addMockServer, fakeData);
        });

        afterEach(function() {
            browser.removeMockModule('mockServer');
        });

        describe(' - Tune in first channel', function() {

            beforeEach(function() {
                // Clear last tuned-in channel ID
                browser.executeScript('window.localStorage.removeItem("last-channel-id")');
                browser.refresh();

                var firstChennlID = Object.keys(fakeData.channels)[0];
                // Tune in channel test-1
                // browser.sleep(5000);
                element(by.id('s99-open-sidenav-channels')).click();
                element(by.id('s99-button-tune-in-' + firstChennlID)).click();
            });
            
            it(' - Should see 10 post markers of first channel on map', function() {
                browser.wait(protractor.until.elementLocated(by.className('gmnoprint')), 10000);
                expect(element.all(by.xpath("//div[@class=\"gmnoprint\" and @title]")).count()).toBe(10);
            });

            it(' - Should see category icons of markers from test-1', function() {
                
            });
        });

        describe(' - From test-1, tune in to test-2', function() {
            
        });
    });

});