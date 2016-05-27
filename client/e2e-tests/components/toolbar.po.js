/*
* @Author: yglin
* @Date:   2016-05-27 19:46:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-27 19:59:04
*/

'use strict';

module.exports = new ToolbarPage();

function ToolbarPage() {
    this.root = element(by.css('#s99-main-toolbar'));
    this.channel = {
        title: this.root.element(by.css('.s99-channel-title'))
    };

    this.expectChannel = expectChannel;
};

function expectChannel(channel) {
    expect(this.channel.title.getAttribute('channel-id')).toEqual(channel.id, 'Channel ID not matched');
    expect(this.channel.title.getText()).toEqual(channel.title, 'Channel title not matched');
}
