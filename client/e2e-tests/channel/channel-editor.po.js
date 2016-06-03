/*
* @Author: yglin
* @Date:   2016-04-23 17:16:37
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-30 14:47:56
*/

'use strict';

var ChannelEditor = function() {
    var self = this;
    var imageSelector = require('../components/image-selector.po');
    var dialog = require('../components/dialog.po');

    self.form = element(by.css('form[name="channelForm"]'));
    self.id = self.form.element(by.css('input[name=id]'));
    self.title = self.form.element(by.css('input[name=title]'));
    self.description = self.form.element(by.css('textarea[name=description]'));
    self.buttonLogo = self.form.element(by.css('button#select-logo'));
    self.categoryTitle = self.form.element(by.css('input#category-title'));
    self.categoryIcon = self.form.element(by.css('div#category-icon'));
    self.buttonRemoveAllCategories = self.form.element(by.css('#remove-all-categories'));
    self.buttonAddCategory = self.form.element(by.css('button#category-add'));
    self.buttonSubmit = self.form.element(by.css('button#submit'));
    self.checkPublic = self.form.element(by.css('#checkbox-public'));

    self.messages = {
        channelIDRequired: self.form.element(by.css('#s99st-message-channel-id-required')),
        channelIDExist: self.form.element(by.css('#s99st-message-channel-id-exists')),
        channelIDFalsePattern: self.form.element(by.css('#s99st-message-channel-id-false-pattern')),
        channelTitleRequired: self.form.element(by.css('#s99st-message-channel-title-required')),
        channelCreated: self.form.element(by.css('#s99st-message-channel-created'))
    };

    // self.preview = {
    //     title: self.form.element(by.css('div#preview div.s99st-channel-item .s99st-channel-title'))
    // }
    
    self.apply = function (channel) {
        if (channel.id) {
            self.id.clear();
            self.id.sendKeys(channel.id);
        }
        if (channel.title) {
            self.title.clear();
            self.title.sendKeys(channel.title);
        }
        if (channel.description) {
            self.description.clear();
            self.description.sendKeys(channel.description);
        }
        if (channel['logo-url']) {
            self.buttonLogo.click();
            imageSelector.select(channel['logo-url']);
        }

        if (typeof channel.categories === 'object') {
            self.buttonRemoveAllCategories.isDisplayed().then(function (isDisplayed) {
                if (isDisplayed) {
                    self.buttonRemoveAllCategories.click();
                    dialog.confirm();                    
                }
            });
            for (var id in channel.categories) {
                self.categoryTitle.sendKeys(channel.categories[id].title);
                self.categoryIcon.click();
                imageSelector.select(channel.categories[id].icon.url);
                self.buttonAddCategory.click();
            }
        }

        self.checkPublic.isSelected()
        .then(function (isSelected) {
            if (isSelected != (channel.state == 'public')) {
                self.checkPublic.click();
            }
        });
    }

    self.submit = function () {
        self.buttonSubmit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 20000)
        .then(function () {
            browser.switchTo().alert().accept();    
        });     
    }

    self.expect = function (data) {
        if (data.id) {
            expect(self.id.getAttribute('value')).toEqual(data.id);
        }
        if (data.title) {
            expect(self.title.getAttribute('value')).toEqual(data.title);
        }
        if (data.description) {
            expect(self.description.getAttribute('value')).toEqual(data.description);
        }
    }
};

module.exports = new ChannelEditor();
