/*
* @Author: yglin
* @Date:   2016-05-22 12:09:21
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-23 11:37:50
*/

'use strict';

module.exports = new ChannelRepoPage();

var dialog = require('../components/yg-dialog.po');

function ChannelRepoPage() {
    this.root = element(by.css('div#s99st-channel-list'));
    this.channelItems = this.root.all(by.css('.s99-channel-item'));

    this.getChannelItem = getChannelItem;
    this.expectHas = expectHas;
    this.import = _import;
};

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