/*
* @Author: yglin
* @Date:   2016-05-22 12:09:21
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-30 14:47:25
*/

'use strict';

module.exports = new ChannelRepoPage();

var dialog = require('../components/dialog.po');

function ChannelRepoPage() {
    this.root = element(by.css('div#s99st-channel-list'));
    this.linkToCreate = element(by.css('button#s99st-button-create'));
    this.channelItems = this.root.all(by.css('.s99-channel-item'));

    this.gotoCreate = gotoCreate;
    this.getChannelItem = getChannelItem;
    this.expectHas = expectHas;
    this.import = _import;
};

function gotoCreate() {
    this.linkToCreate.click();
}

function getChannelItem(channel) {
    return element(by.css('div[channel-id=' + channel.id + ']'));
}

function expectHas(channel) {
    var channelItem = this.getChannelItem(channel);
    expect(channelItem.isPresent()).toBeTruthy('Should has channel: id = ' + channel.id + ', title = ' + channel.title);
}

function _import(channel) {
    var channelItem = this.getChannelItem(channel);
    channelItem.click();
    dialog.confirm();
}