/*
* @Author: yglin
* @Date:   2016-05-22 09:29:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-22 09:38:08
*/

'use strict';

module.exports = new ChannelListPage();

function ChannelListPage() {
    this.root = element(by.css('div#s99-channel-list'));
    this.linkToChannelRepository = this.root.element(by.css('a#link-to-repo'));

    this.open = open;
    this.gotoRepo = gotoRepo;

    function open() {
        element(by.id('s99-open-sidenav-channels')).click();
    }

    function gotoRepo() {
        this.linkToChannelRepository.click();
    }
};
