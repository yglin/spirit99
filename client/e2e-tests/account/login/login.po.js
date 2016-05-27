/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var config = browser.params;

var LoginPage = function() {
    var self = this;

    var form = self.form = element(by.css('form[name=loginForm]'));
    form.email = form.element(by.css('input[name=email]'));
    form.password = form.element(by.css('input[name=password]'));
    form.submit = form.element(by.css('button[type=submit]'));
    // form.oauthButtons = require('../../components/oauth-buttons/oauth-buttons.po').oauthButtons;

    self.login = function(data) {
        for (var prop in data) {
            var formElem = form[prop];
            if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
                formElem.sendKeys(data[prop]);
            }
        }
        return form.submit.click();
    };

    self.loginAsNeeded = function (data, returnUrl) {
        // Login as needed
        self.form.isPresent().then(function (present) {
            if (present) {
                self.login(data);
                if (returnUrl) {                    
                    // Wait browser to redirect back to returnUrl
                    browser.wait(function () {
                        return browser.getCurrentUrl().then(function (url) {
                            return url == returnUrl;
                        });
                    }, 5000);
                }
                else {
                    browser.waitForAngular();
                }
            }
        });
    }
};

module.exports = new LoginPage();

