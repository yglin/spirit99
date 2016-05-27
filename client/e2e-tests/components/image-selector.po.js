/*
* @Author: yglin
* @Date:   2016-04-15 17:16:05
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-27 18:28:24
*/

'use strict';

var ImageSelectorPage = function() {
    var self = this;
    self.divRoot = element(by.css('div#s99st-image-selector'));
    self.url = self.divRoot.element(by.css('input[type=url]'));
    self.confirm = element(by.css('button#s99st-image-selector-confirm'));
    self.cancel = element(by.css('button#close-button'));

    self.select = function (url) {
        browser.wait(function() {
            return self.url.isDisplayed().then(function (isDisplayed) {
                return isDisplayed == true;
            });
        }, 2000);
        self.url.sendKeys(url);
        browser.wait(function() {
            return self.confirm.isEnabled().then(function (isEnabled) {
                return isEnabled == true;
            });
        }, 2000);
        self.confirm.click();
        // browser.wait(function() {
        //     return self.divRoot.isDisplayed().then(function (isDisplayed) {
        //         return isDisplayed == false;
        //     });
        // }, 2000);
    }
};

module.exports = new ImageSelectorPage();
