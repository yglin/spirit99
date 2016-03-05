'use strict';

var fakeData = require('./fake-data.js');
var mockGeolocation = require('./mock-geolocation.js');

describe('Spirit99 app', function() {

    describe(' - Channel', function () {

        var fakePosts;
        
        beforeEach(function() {
            browser.executeScript(mockGeolocation.mockGeoLocationSuccess(23.973875, 120.982024));
            browser.get('/');
        });

        beforeEach(function () {
            // Mock data from channel server
            function addMockServer (fakeData, fakePosts) {
                mockHttpBackend.$inject = ['$httpBackend'];

                function mockHttpBackend ($httpBackend) {
                    for (var key in fakeData.channels) {
                        $httpBackend.when('GET', fakeData.channels[key]['portal-url'])
                        .respond(200, fakeData.channels[key]);
                        var queryUrlRegex = fakeData.channels[key]['query-url'].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        var urlRegex = new RegExp(queryUrlRegex + '.*');
                        $httpBackend.when('GET', urlRegex)
                        .respond(200, fakePosts);
                    }
                    $httpBackend.when('GET', /.*/).passThrough();
                }
                angular.module('mockServer', ['ngMockE2E']).run(mockHttpBackend);
            }
            fakePosts = fakeData.genPosts({count: 23});
            browser.addMockModule('mockServer', addMockServer, fakeData, fakePosts);
        });

        afterEach(function() {
            browser.removeMockModule('mockServer');
        });

        beforeEach(function () {
            // Fake data stored in local storage
            browser.executeScript(function (fakeData) {
                // Set init map to show Taiwan
                window.localStorage.setItem("spirit99.init-map-scheme", 3);
                window.localStorage.setItem("spirit99.home-map", JSON.stringify(fakeData.mapTaiwan));
                window.localStorage.setItem("spirit99.channels", JSON.stringify(fakeData.channels));
            }, fakeData);
            browser.refresh();
        });

        afterEach(function() {
            browser.executeScript('window.localStorage.clear()');
        });

        describe(' - Tune in first channel', function() {

            var firstChannel, firstChannelID, markers;
            beforeEach(function() {
                firstChannelID = Object.keys(fakeData.channels)[0];
                firstChannel = fakeData.channels[firstChannelID];
                // Tune in channel test-1
                // browser.sleep(5000);
                element(by.id('s99-open-sidenav-channels')).click();
                element(by.id('s99-channel-item-logo-' + firstChannelID)).click();
                var tuneInButton = element(by.id('s99-button-tune-in-' + firstChannelID));
                browser.wait(function () {
                    return tuneInButton.isDisplayed();
                }, 3000);
                tuneInButton.click();

                markers = element.all(by.xpath("//div[@class=\"gmnoprint\" and @title]"));
            });

            it(' - Logo and title on toolbar should change to first channel\'s', function() {
                expect(element(by.id('s99-channel-logo')).getAttribute('src')).toEqual(firstChannel['logo-url']);
                expect(element(by.id('s99-channel-title')).getText()).toEqual(firstChannel.title);
            });
            
            it(' - Should see post markers of first channel on map', function() {
                markers.then(function (markers) {
                    // browser.pause();
                    expect(markers.length).toBe(fakePosts.length);          
                });
            });

            it(' - Should see category icons of markers from test-1', function() {
                markers.then(function () {
                    for (var key in firstChannel.categories) {
                        var category = firstChannel.categories[key];
                        var iconUrl = ''
                        if (category.icon && category.icon.url) {
                            iconUrl = category.icon.url;
                        } else if (category.icon) {
                            iconUrl = category.icon
                        }
                        expect(element(by.xpath('//img[@src="' + iconUrl + '"]')).isPresent()).toBe(true);
                    }
                })
            });

            // it(' - Should remember last tuned-in channel', function() {
                
            // });
        });

        describe(' - From test-1, tune in to test-2', function() {
            
        });
    });

});