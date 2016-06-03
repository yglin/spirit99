/*
* @Author: yglin
* @Date:   2016-05-22 09:29:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 10:14:44
*/

'use strict';

module.exports = new ChannelListPage();

var dialog = require('../components/dialog.po');

function ChannelListPage() {
    this.root = element(by.css('div#s99-channel-list'));
    this.inputPortalUrl = this.root.element(by.css('input[name=newPortalUrl]'));
    this.buttonAddChannel = this.root.element(by.css('button#add-channel'));
    this.linkToChannelRepository = this.root.element(by.css('a#link-to-repo'));

    this.open = open;
    this.tuneIn = tuneIn;
    this.import = _import;
    this.gotoRepo = gotoRepo;

    function open() {
        element(by.id('s99-open-sidenav-channels')).click();
    }

    function tuneIn(channel) {
        this.root.element(by.css('div#s99-channel-item-' + channel.id)).click();
    }

    function _import(portalUrl, tuneIn) {
        this.inputPortalUrl.sendKeys(portalUrl);
        this.buttonAddChannel.click();
        if (tuneIn) {
            dialog.confirm();
        }
        else {
            dialog.cancel();
        }
    }

    function gotoRepo() {
        this.linkToChannelRepository.click();
    }
};
