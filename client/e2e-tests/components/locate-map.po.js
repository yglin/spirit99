/*
* @Author: yglin
* @Date:   2016-05-05 08:24:41
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-31 16:36:39
*/

'use strict';

module.exports = new LocateMapPage();

function LocateMapPage() {
    this.root = element(by.css('#s99-locate-map'));
    this.latitudeInput = this.root.element(by.css('input[name=latitude]'));
    this.longitudeInput = this.root.element(by.css('input[name=longitude]'));
    this.latitudeSpan = this.root.element(by.css('span#latitude'));
    this.longitudeSpan = this.root.element(by.css('span#longitude'));
      
    this.apply = apply;
    this.toEqual = toEqual;
};

function apply(coords) {
    if (coords.latitude) {
        this.latitudeInput.clear();
        this.latitudeInput.sendKeys(coords.latitude);
    }
    if (coords.longitude) {
        this.longitudeInput.clear();
        this.longitudeInput.sendKeys(coords.longitude);
    }
}

function toEqual(coords) {
    expect(this.latitudeSpan.getText()).toEqual(coords.latitude.toFixed(6).toString());
    expect(this.longitudeSpan.getText()).toEqual(coords.longitude.toFixed(6).toString());    
}