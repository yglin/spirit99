/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var config = browser.params;

var LoginPage = function() {
    var self = this;
    self.accountPanel = element.all(by.css('div#s99-account-panel'))
    .filter(function (elem, index) {
        return elem.isDisplayed().then(function (isDisplayed) {
            return isDisplayed == true;
        });
    }).first();
    self.loginButton = self.accountPanel.element(by.css('button#login'));
    self.userPane = self.accountPanel.element(by.css('div#user-pane'));

    var form = self.form = element(by.css('form[name=loginForm]'));
    form.email = form.element(by.css('input[name=email]'));
    form.password = form.element(by.css('input[name=password]'));
    form.submit = element(by.css('button#confirm'));
    // form.oauthButtons = require('../../components/oauth-buttons/oauth-buttons.po').oauthButtons;

    self.login = function(data) {
        browser.wait(function () {
            return self.form.isDisplayed()
            .then(function (isDisplayed) {
                return isDisplayed == true;
            });
        }, 5000);        
        for (var prop in data) {
            var formElem = self.form[prop];
            if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
                formElem.sendKeys(data[prop]);
            }
        }
        browser.wait(function () {
            return self.form.submit.isEnabled()
            .then(function (isEnabled) {
                return isEnabled == true;
            });
        }, 5000);
        return self.form.submit.click();
    }

    self.forcedLogin = function (data) {
        self.userPane.isDisplayed()
        .then(function (isDisplayed) {
            if (!isDisplayed) {
                self.form.isPresent().then(function (isPresent) {
                    if (!isPresent) {
                        self.loginButton.click();
                    }
                });                
                self.login(data);
            }
        });
        browser.wait(function () {
            return self.userPane.isDisplayed()
            .then(function (isDisplayed) {
                return isDisplayed == true;
            });
        }, 10000);                    
    }

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

