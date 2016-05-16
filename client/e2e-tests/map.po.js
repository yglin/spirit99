/*
* @Author: yglin
* @Date:   2016-05-16 14:35:27
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-16 21:16:14
*/

'use strict';

module.exports = new MapPage();

function MapPage() {
    this.root = element(by.css('div#s99-map-debugger'));
    this.center = {
        latitude: this.root.element(by.css('span#center-latitude')),
        longitude: this.root.element(by.css('span#center-longitude'))
    };
    this.inputs = {
        center: {
            latitude: this.root.element(by.css('input[name=center-latitude]')),
            longitude: this.root.element(by.css('input[name=center-longitude]'))
        }
    };
    this.state = this.root.element(by.css('span#state'));

    this.waitIdle = waitIdle;
    this.panTo = panTo;
    this.expectCenter = expectCenter;

    function waitIdle() {
        var self = this;
        browser.wait(function () {
            return self.state.getText()
            .then(function (text) {
                return text == 'idle';
            });
        }, 5000);        
    }

    function panTo(latitude, longitude) {
        this.inputs.center.latitude.clear();
        this.inputs.center.latitude.sendKeys(latitude);
        this.inputs.center.longitude.clear();
        this.inputs.center.longitude.sendKeys(longitude);
        this.waitIdle();
    }

    function expectCenter(latitude, longitude) {
        this.waitIdle();
        expect(this.center.latitude.getText()).toEqual(latitude);
        expect(this.center.longitude.getText()).toEqual(longitude);
    }
};
