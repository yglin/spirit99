'use strict';

var fakeData = require('../mocks/data.js');
var mockServer = require('../mocks/server.js');

describe(' - Spirit99', function() {

    beforeEach(function () {
        // Mock data from channel server
        browser.addMockModule('mockServer', mockServer.addMockServer, fakeData);
    });

    afterEach(function() {
        browser.removeMockModule('mockServer');
    });

    var EC, map, zoomIn;
    beforeEach(function() {
        EC = protractor.ExpectedConditions;
        map = element(by.css('.angular-google-map-container'));
        zoomIn = element(by.xpath('//div[@title="Zoom in"]'));
        browser.get('/');
    });

    describe(' - Post', function () {

        // Init app with fake channels and set init map to show Taiwan
        beforeEach(function () {
            browser.executeScript(function (fakeData) {
                window.localStorage.setItem("spirit99.init-map-scheme", 3);
                window.localStorage.setItem("spirit99.home-map", JSON.stringify(fakeData.mapTaiwan));            

                var channels = {};
                for (var id in fakeData.channels) {
                    channels[id] = fakeData.channels[id].portal;
                }
                window.localStorage.setItem("spirit99.channels", JSON.stringify(channels));
            }, fakeData);
            browser.refresh();
        });

        afterEach(function() {
            browser.executeScript('window.localStorage.clear()');
        });

        // Wait for google map loaded
        // beforeEach(function() {
        //     browser.wait(function () {
                // return element(by.css('.gmnoprint')).isDisplayed();
        //     }, 5000);
        // });

        // Tune in to first channel
        var firstChannel, firstChannelID, posts, numOfPosts;
        beforeEach(function() {
            numOfPosts = element(by.id('s99-debug-number-posts'));
            firstChannelID = Object.keys(fakeData.channels)[0];
            firstChannel = fakeData.channels[firstChannelID].portal;
            posts = fakeData.channels[firstChannelID].posts;

            element(by.id('s99-open-sidenav-channels')).click();            
            element(by.id('s99-channel-item-logo-' + firstChannelID)).click();
            var tuneInButton = element(by.id('s99-button-tune-in-' + firstChannelID));
            browser.wait(function () {
                return tuneInButton.isDisplayed();
            }, 1000);
            tuneInButton.click();
            element(by.css('md-backdrop')).click();
        });
        
        describe(' - Query posts', function() {

            it(' - Should query posts of first channel on map', function() {
                browser.wait(function () {
                    return numOfPosts.getText().then(function (numText) {
                        return numText == posts.length.toString();
                    });
                }, 5000);
            });

            it(' - Should see category icons of markers from first channel', function() {
                var conditions = [];
                for (var key in firstChannel.categories) {
                    var category = firstChannel.categories[key];
                    var iconUrl = '';
                    if (category.icon && category.icon.url) {
                        iconUrl = category.icon.url;
                    } else if (category.icon) {
                        iconUrl = category.icon;
                    }
                    conditions.push(function () {
                        return element(by.xpath('//img[@src="' + iconUrl + '"]')).isPresent();                        
                    });
                }
                var allIconPresent = EC.and.apply(EC, conditions);
                // browser.pause();
                browser.wait(allIconPresent, 5000);
            });

            // Protractor dragAndDrop() not always working due to below issue
            // https://github.com/angular/protractor/issues/583
            // it(' - Should query posts after map panned', function() {
            //     browser.wait(function () {
            //         return numOfPosts.getText().then(function (numText) {
            //             return numText == posts.length.toString();
            //         });
            //     }, 5000);
            //     browser.actions().dragAndDrop(map, {x:2000, y:50}).perform();
            //     browser.wait(function () {
            //         return numOfPosts.getText().then(function (numText) {
            //             return numText == '0';
            //         });
            //     }, 5000);
            // });

            it(' - Should query posts when map zoomed', function() {
                browser.wait(function () {
                    return numOfPosts.getText().then(function (numText) {
                        return numText == posts.length.toString();
                    });
                }, 5000);
                zoomIn.click();
                zoomIn.click();
                zoomIn.click();
                browser.wait(function () {
                    return numOfPosts.getText().then(function (numText) {
                        return parseInt(numText) < posts.length;
                    });
                }, 5000);
            });
        });

        describe('- Create post', function() {

            it(' - Click on map to create new post', function() {
                map.click().then(function () {
                    browser.ignoreSynchronization = true;
                    browser.wait(function () {
                        return browser.getCurrentUrl().then(function (url) {
                            return url.indexOf(firstChannel['create-url']) == 0;
                        });
                    }, 5000).then(function () {
                        browser.ignoreSynchronization = false;
                    }, function () {
                        browser.ignoreSynchronization = false;
                    });                
                });                
            });
        });

    });
    
});