/*
* @Author: yglin
* @Date:   2016-05-28 11:07:51
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 10:23:12
*/

'use strict';

module.exports = new MapPage();

function MapPage() {
    this.root = element(by.css('div#s99-map-debugger'));
    this.map = element(by.css('ui-gmap-google-map'));
    this.center = {
        latitude: this.root.element(by.css('span#center-latitude')),
        longitude: this.root.element(by.css('span#center-longitude'))
    };
    this.state = this.root.element(by.css('span#state'));

    this.gotoCreatePost = gotoCreatePost;
    this.expectCenter = expectCenter;
    this.waitIdle = waitIdle;

};

function waitIdle() {
    var self = this;
    browser.wait(function () {
        return self.state.getText()
        .then(function (text) {
            return text == 'idle';
        });
    }, 10000);        
}

function gotoCreatePost() {
    this.waitIdle();
    this.map.click();
    element(by.css('div#s99-info-window')).element(by.css('button#create-post')).click();
}

function expectCenter(latitude, longitude) {
    this.waitIdle();
    expect(this.center.latitude.getText()).toEqual(latitude.toFixed(6));
    expect(this.center.longitude.getText()).toEqual(longitude.toFixed(6));
}
