'use strict';

var fakeData = require('../mocks/data.js');
var mockServer = require('../mocks/server.js');
var mapPage = require('./map.po');

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

        // Tune in to first channel
        var firstChannel, firstChannelID, posts, markers, numOfPosts;
        beforeEach(function() {
            markers = element.all(by.xpath('//div[@class="gmnoprint" and @title]'));
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

            it(' - Should see posts of first channel on map', function() {
                expect(markers.count()).toBe(posts.length);
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
                    expect(element(by.xpath('//div[@class="gmnoprint" and @title]/img[@src="' + iconUrl + '"]')).isPresent()).toBe(true);
                }
            });

            // Protractor dragAndDrop() not always working due to below issue
            // https://github.com/angular/protractor/issues/583
            it(' - Should query posts after map panned', function() {
                mapPage.panTo(0, 0);
                expect(markers.count()).toBeLessThan(posts.length);                
            });

            it(' - Should query posts after map zoomed', function() {
                mapPage.zoomTo(15);
                expect(markers.count()).toBeLessThan(posts.length);                
            });

            it(' - Should query posts after map navigated by locate address', function() {
                var buttonLocator = element(by.id('s99-open-dialog-locator'));
                var inputLocator = element(by.xpath('//*[@id="s99-input-locator-search-text"]//input'));
                var locationQueries = element.all(by.xpath('//div[contains(@class, "s99-items-locator-address")]'));
                var confirm = element(by.id('s99-dialog-locator-button-confirm'));
                buttonLocator.click();
                inputLocator.click();
                inputLocator.sendKeys('彰化市');
                confirm.click();
                browser.wait(function () {
                    return markers.count().then(function (count) {
                        return count < posts.length;
                    });
                }, 5000);                
            });
        });

        describe(' - Read post', function() {
            
            var post, marker, infoWindow;
            beforeEach(function() {
                infoWindow = element(by.id('s99-marker-info-window'));
                post = posts[posts.length - 1];
                marker = markers.filter(function (elem, index) {
                    return elem.getAttribute('title').then(function (title) {
                        return title == post.title;
                    });
                }).first();

                marker.click();
                browser.wait(function () {
                    return infoWindow.isDisplayed();
                },2000);
            });

            it(' - Click on post marker should show the info window of post-item-view', function() {
                expect(infoWindow.element(by.css('.s99-post-info-window-title')).getText()).toEqual(post.title);
                expect(infoWindow.element(by.css('.s99-post-info-window-thumbnail')).getAttribute('src')).toEqual(post.thumbnail);
            });

            it(' - Provide redirect link to post\'s "read-url"', function() {
                expect(element(by.css('a#post-' + post.id + '-link-read')).getAttribute('href')).toEqual(post.links.read);
            });
        });

        describe(' - Sidenav post list', function() {

            var post, postItems;
            beforeEach(function() {
                post = posts[0];
                postItems = element.all(by.css('.s99-post-item'));
                element(by.id('s99-open-sidenav-posts')).click();                
                expect(element(by.id('s99-post-list')).isDisplayed()).toBe(true);
            });
            
            it(' - Should show posts in posts sidenav', function() {
                expect(postItems.count()).toBe(posts.length);
            });

            it(' - Can search title in post list', function() {
                element(by.model('postListVM.search.title')).sendKeys('你');
                expect(element.all(by.css('.s99-post-item')).count()).toBe(5);
            });
            
            it(' - Provide redirect link to post\'s "read-url"', function() {
                expect(element(by.css('a#post-' + post.id + '-link-read')).getAttribute('href')).toEqual(post.links.read);
            });
        });

        describe(' - Filter posts', function() {

            var inputKeywords = element(by.xpath('//*[@id="s99-input-post-filter-keywords"]//input'));
            var datePeriodSelector = element(by.xpath('//md-select[@id="s99-select-dateperiod-preset"]'));
            beforeEach(function() {
                element(by.id('s99-open-sidenav-filter')).click();
                expect(element(by.id('s99-post-filter')).isDisplayed()).toBe(true);
            });
            
            it(' - Filter titles by keywords', function() {
                inputKeywords.sendKeys('你');
                inputKeywords.sendKeys(protractor.Key.ENTER);
                element(by.css('md-backdrop')).click();
                expect(markers.count()).toBe(5);
                element(by.id('s99-open-sidenav-filter')).click();
                expect(element(by.id('s99-post-filter')).isDisplayed()).toBe(true);
                inputKeywords.sendKeys('我');
                inputKeywords.sendKeys(protractor.Key.ENTER);
                element(by.css('md-backdrop')).click();
                expect(markers.count()).toBe(1);
            });

            it(' - Filter posts created in specified date period presets', function() {
                datePeriodSelector.click();
                var inTheDay = element(by.xpath('//md-select-menu/md-content/md-option[@value="inTheDay"]'));
                inTheDay.click();
                expect(markers.count()).toBe(4);
                datePeriodSelector.click();
                var inTheWeek = element(by.xpath('//md-select-menu/md-content/md-option[@value="inTheWeek"]'));
                inTheWeek.click();
                expect(markers.count()).toBe(8);             
                datePeriodSelector.click();
                var inTheMonth = element(by.xpath('//md-select-menu/md-content/md-option[@value="inTheMonth"]'));
                inTheMonth.click();
                expect(markers.count()).toBe(13);             
                datePeriodSelector.click();
                var inTheYear = element(by.xpath('//md-select-menu/md-content/md-option[@value="inTheYear"]'));
                inTheYear.click();
                expect(markers.count()).toBe(18);             
            });

            it(' - Filter posts created in custom date period', function() {
                datePeriodSelector.click();
                var custom = element(by.xpath('//md-select-menu/md-content/md-option[@value="custom"]'));
                custom.click();

                var inputCustomDateStart = element(by.xpath('//*[@id="s99-input-dateperiod-start"]//input'));
                expect(inputCustomDateStart.isDisplayed()).toBe(true);
                var inputCustomDateEnd = element(by.xpath('//*[@id="s99-input-dateperiod-end"]//input'));
                expect(inputCustomDateEnd.isDisplayed()).toBe(true);

                inputCustomDateStart.clear();
                inputCustomDateStart.sendKeys('1/1/1970');
                inputCustomDateEnd.clear();
                var aYearAgo = new Date();
                aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);
                inputCustomDateEnd.sendKeys((aYearAgo.getMonth() + 1) + '/' + aYearAgo.getDate() + '/' + aYearAgo.getFullYear());

                expect(markers.count()).toBe(5);             
            });

            it(' - Filter posts by categories', function() {
                var hideAll = element(by.id('s99-button-hide-all-categories'));
                hideAll.click();
                expect(markers.count()).toBe(0);
                var showAll = element(by.id('s99-button-show-all-categories'));
                showAll.click();
                expect(markers.count()).toBe(23);

                hideAll.click();
                for (var id in firstChannel.categories) {
                    var category = firstChannel.categories[id];
                    var iconUrl = '';
                    if (category.icon && category.icon.url) {
                        iconUrl = category.icon.url;
                    } else if (category.icon) {
                        iconUrl = category.icon;
                    }
                    element(by.xpath('//div/img[@src="' + iconUrl + '"]')).click();
                    expect(element.all(by.xpath('//div[@class="gmnoprint" and @title]/img[@src="' + iconUrl + '"]')).count()).toBeGreaterThan(0);
                }
            });
        });

        describe('- Create post', function() {
            var infoWindow;
            beforeEach(function() {
                // Hide all markers to prevent them from obscuring clicking on map
                element(by.id('s99-open-sidenav-filter')).click();
                element(by.id('s99-button-hide-all-categories')).click();
                element(by.css('md-backdrop')).click();
                
                infoWindow = element(by.id('s99-info-window-create-post'));
                map.click();
            });

            it(' - Click on map to pop the info-window for creating new post', function() {
                browser.wait(function () {
                    return infoWindow.isDisplayed();
                }, 2000);
            });

            it(' - Clicking on "s99-button-create-post" redirects to channel\'s "create-url"', function() {
                var pattern = firstChannel['create-url'].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
                + '\\/?\\?latitude=\\d+\\.\\d+' + '.*' + '\\&longitude=\\d+\\.\\d+' + '.*';
                var regexUrl = new RegExp(pattern);
                browser.wait(function () {
                    return infoWindow.isDisplayed();
                }, 2000);
                infoWindow.element(by.id('s99-button-create-post')).click()
                .then(function () {
                    browser.ignoreSynchronization = true;
                    browser.wait(function () {
                        return browser.getCurrentUrl().then(function (url) {
                            return url.match(regexUrl);
                        });
                    }, 5000).then(function () {
                        browser.ignoreSynchronization = false;
                    }, function () {
                        fail();
                        browser.ignoreSynchronization = false;
                    });
                });

            });
        });

    });  
});