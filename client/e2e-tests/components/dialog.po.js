/*
* @Author: yglin
* @Date:   2016-04-25 10:04:11
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 12:10:17
*/

'use strict';

module.exports = new DialogPage();

function DialogPage() {
    var self = this;
    self.divRoot = element(by.css('#s99-dialog'));
    self.buttonConfirm = self.divRoot.element(by.css('button#confirm'));
    self.buttonCancel = self.divRoot.element(by.css('button#cancel'));

    self.waitPresent = waitPresent;
    self.confirm = confirm;
    self.prompt = prompt;
    self.alert = alert;
    self.cancel = cancel;

    function waitPresent() {
        browser.wait(function () {
            return self.divRoot.isPresent()
            .then(function (isPresent) {
                return isPresent == true;
            });
        }, 5000);
    }

    function confirm() {
        self.waitPresent();
        self.buttonConfirm.click();
    }

    function prompt() {
        self.waitPresent();
        self.buttonConfirm.click();
    }

    function alert() {
        self.waitPresent();
        self.buttonConfirm.click();
    }

    function cancel() {
        self.waitPresent();
        self.buttonCancel.click();
    }
};

