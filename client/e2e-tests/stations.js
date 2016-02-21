'use strict';

describe('Spirit99 app - stations', function() {
    beforeEach(function() {
        browser.get('#/stations');
        browser.sleep(1000);
    });

    var stationListviews = element.all(by.tagName('s99-station-listview'));

    it(' - Should render a list of stations', function () {
        expect(stationListviews.count()).toBeGreaterThan(0);
    });

    it(' - A station\'s list view should contain a logo, a title, a description, and a check button', function() {
        stationListviews.each(function (elem, index) {
            expect(elem.element(by.className('s99-station-logo')).isPresent()).toBe(true);
            expect(elem.element(by.className('s99-station-title')).isPresent()).toBe(true);
            expect(elem.element(by.className('s99-station-description')).isPresent()).toBe(true);
            expect(elem.element(by.css('md-checkbox, checkbox')).isPresent()).toBe(true);
        });
    });

    it(' - When click on a station\'s list view, redirect to its introduction page', function () {
        browser.ignoreSynchronization = true;
        var lastLocation = browser.getCurrentUrl();
        stationListviews.last().element(by.css('a')).click();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).not.toEqual(lastLocation);
        browser.ignoreSynchronization = false;
    });

    it(' - Show toolbar if at least 1 station is checked, hide it otherwise', function() {
        
        var toolbar = element(by.className('s99-toolbar'));

        expect(toolbar.isDisplayed()).toBe(false);

        stationListviews.get(0).element(by.css('checkbox, md-checkbox')).click();
        expect(toolbar.isDisplayed()).toBe(true);

        stationListviews.get(1).element(by.css('checkbox, md-checkbox')).click();
        expect(toolbar.isDisplayed()).toBe(true);        

        stationListviews.get(1).element(by.css('checkbox, md-checkbox')).click();
        stationListviews.get(0).element(by.css('checkbox, md-checkbox')).click();
        expect(toolbar.isDisplayed()).toBe(false);
    });

    it(' - Show station offline message and blur logo if station is offline', function() {        
        var station1 = stationListviews.get(0);
        // TODO: make request to introUrl of station1 fail
        station1.click();
        // TODO: expect logo blurred and offline message
    });

    it(' - Click on open button redirect to station-editor page', function() {
        element(by.id('button-open-station')).click();
        expect(browser.getCurrentUrl()).toMatch(/.+\/station-editor/);
    });
});
