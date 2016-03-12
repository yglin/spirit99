'use strict';

var fakeData = require('../mocks/data.js');
// var mockGeolocation = require('./mock-geolocation.js');

describe('Spirit99 app', function() {

    describe(' - Channel', function () {

        var fakePosts;
        
        beforeEach(function () {
            // Mock data from channel server
            function addMockServer (fakeData, fakePosts) {
                mockHttpBackend.$inject = ['$httpBackend'];

                function mockHttpBackend ($httpBackend) {
                    var channelIDs = Object.keys(fakeData.channels);
                    // Mock channels
                    for (var key in fakeData.channels) {
                        var channel = fakeData.channels[key];
                        if(channel['portal-url'] == 'http://highway.to.hell'){
                            // Make second channel offline
                            $httpBackend.when('GET', channel['portal-url'])
                            .respond(404, 'Channel is offline');
                        }
                        else{
                            $httpBackend.when('GET', channel['portal-url'])
                            .respond(200, channel);
                        }
                        var queryUrlRegex = channel['query-url'].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        var urlRegex = new RegExp(queryUrlRegex + '.*');
                        $httpBackend.when('GET', urlRegex)
                        .respond(200, fakePosts);
                    }

                    // Mock new channel
                    var newChannel = fakeData.newChannel;
                    $httpBackend.when('GET', newChannel['portal-url'])
                    .respond(200, newChannel);

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

        var EC;
        beforeEach(function() {
            EC = protractor.ExpectedConditions;
            browser.get('/');
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

        beforeEach(function() {
        // Open sidenav channels
            element(by.id('s99-open-sidenav-channels')).click();            
        });

        describe(' - Tune in first channel', function() {
            var firstChannel, firstChannelID, numOfPosts;
            beforeEach(function() {
                numOfPosts = element(by.id('s99-debug-number-posts'));
                firstChannelID = Object.keys(fakeData.channels)[0];
                firstChannel = fakeData.channels[firstChannelID];
                // Tune in channel test-1
                // browser.sleep(5000);
                element(by.id('s99-channel-item-logo-' + firstChannelID)).click();
                var tuneInButton = element(by.id('s99-button-tune-in-' + firstChannelID));
                browser.wait(function () {
                    return tuneInButton.isDisplayed();
                }, 1000);
                tuneInButton.click();
            });

            it(' - Logo and title on toolbar should change to first channel\'s', function() {
                expect(element(by.id('s99-channel-logo')).getAttribute('src')).toEqual(firstChannel['logo-url']);
                expect(element(by.id('s99-channel-title')).getText()).toEqual(firstChannel.title);
            });
            
            it(' - Should see post markers of first channel on map', function() {
                browser.wait(function () {
                    return numOfPosts.getText().then(function (numText) {
                        return numText == fakePosts.length.toString();
                    });
                }, 5000);
            });

            it(' - Should see category icons of markers from first channel', function() {
                for (var key in firstChannel.categories) {
                    var category = firstChannel.categories[key];
                    var iconUrl = '';
                    if (category.icon && category.icon.url) {
                        iconUrl = category.icon.url;
                    } else if (category.icon) {
                        iconUrl = category.icon;
                    }
                    browser.wait(function () {
                        return element(by.xpath('//img[@src="' + iconUrl + '"]')).isPresent();
                    }, 1000);
                }
            });

            it(' - Should auto-tuning to last tuned-in channel at begining', function() {
                browser.refresh();
                // browser.pause();
                expect(element(by.id('s99-channel-logo')).getAttribute('src')).toEqual(firstChannel['logo-url']);
                expect(element(by.id('s99-channel-title')).getText()).toEqual(firstChannel.title);                
            });
        });

        describe(' - Tune in offline (the 2nd) channel', function() {
            var secondChannelID, secondChannel, tuneInButton;
            beforeEach(function() {
                secondChannelID = Object.keys(fakeData.channels)[1];
                secondChannel = fakeData.channels[secondChannelID];
                // Tune in channel test-1
                // browser.sleep(5000);
                element(by.id('s99-channel-item-logo-' + secondChannelID)).click();
                tuneInButton = element(by.id('s99-button-tune-in-' + secondChannelID));
                browser.wait(function () {
                    return tuneInButton.isDisplayed();
                }, 3000);
                tuneInButton.click();
            });

            it(' - Should fail and raise alert in tuning to it', function() {
                expect(element(by.id('s99-dialog-alert')).isDisplayed()).toBe(true);
                element(by.id('s99-dialog-alert-button-confirm')).click();
                expect(element(by.id('s99-no-channel-tuned-prompt')).isDisplayed()).toBe(true);
            });

            it(' - Should mark channel as offline', function() {
                element(by.id('s99-dialog-alert-button-confirm')).click();
                expect(element(by.id('s99-channel-offline-' + secondChannelID)).isDisplayed()).toBe(true);                
            });

            it(' - Should disable offline channel\'s tune button', function() {
                element(by.id('s99-dialog-alert-button-confirm')).click();
                expect(tuneInButton.isEnabled()).toBe(false);
            });
        });

        describe(' - Add new channel', function() {
            var newChannel, addChannelInput, addChannelButton;
            beforeEach(function() {
                newChannel = fakeData.newChannel;
                addChannelInput = element(by.id('s99-input-add-channel'));
                addChannelButton = element(by.id('s99-button-add-channel'));
                addChannelInput.clear();
            });

            it(' - Should add new channel to the channel list', function() {
                addChannelInput.sendKeys(newChannel['portal-url']);
                addChannelButton.click();
                expect(element(by.id('s99-channel-item-' + newChannel.id)).isPresent()).toBe(true);
            });

            it(' - Should raise alert dialog on fail', function() {
                addChannelInput.sendKeys('http://highway.to.hell');
                addChannelButton.click();
                expect(element(by.id('s99-dialog-alert')).isPresent()).toBe(true);
            });

            it(' - Should tune in to new channel automatically', function() {
                addChannelInput.sendKeys(newChannel['portal-url']);
                addChannelButton.click();
                expect(element(by.id('s99-channel-title')).getText()).toEqual(newChannel.title);
            });

            it(' - Should remember added channel afterwards', function() {
                addChannelInput.sendKeys(newChannel['portal-url']);
                addChannelButton.click();
                browser.refresh();
                expect(element(by.id('s99-channel-item-' + newChannel.id)).isPresent()).toBe(true);                                
            });
        });

        describe(' - Delete channel', function() {
            var deleteChannel, deleteChannelID;
            beforeEach(function() {
                deleteChannelID = Object.keys(fakeData.channels)[0];
                deleteChannel = fakeData.channels[deleteChannelID];
                element(by.id('s99-channel-item-logo-' + deleteChannelID)).click();
            });

            it(' - Sould raise confirm dialog', function() {
                element(by.id('s99-button-delete-channel-' + deleteChannelID)).click();
                expect(element(by.id('s99-dialog-confirm')).isDisplayed()).toBe(true);
            });

            it(' - Should delete channel', function() {
                element(by.id('s99-button-delete-channel-' + deleteChannelID)).click();
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                expect(element(by.id('s99-channel-item-' + deleteChannelID)).isPresent()).toBe(false);
            });

            it(' - Should revert to no channel tuned state if current channel deleted', function() {
                element(by.id('s99-button-tune-in-' + deleteChannelID)).click();
                element(by.id('s99-button-delete-channel-' + deleteChannelID)).click();
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                expect(element(by.id('s99-no-channel-tuned-prompt')).isDisplayed()).toBe(true);
            });

            it(' - Deleted channel should not be there afterwards', function() {
                element(by.id('s99-button-delete-channel-' + deleteChannelID)).click();
                element(by.id('s99-dialog-confirm-button-confirm')).click();
                browser.wait(EC.invisibilityOf($('#s99-dialog-confirm')), 2000);
                browser.refresh();
                expect(element(by.id('s99-channel-item-' + deleteChannelID)).isPresent()).toBe(false);                
            });
        });
    });
});