/*
* @Author: yglin
* @Date:   2016-05-28 11:18:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-28 11:21:21
*/

'use strict';

var config = browser.params;

var channelListPage = require('../channel/channel-list.po');

describe('Create post', function() {

    require('../before-each')();

    it(' - Create a post on map', function() {
        channelListPage.open();
    });
});