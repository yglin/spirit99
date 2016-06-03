/*
* @Author: yglin
* @Date:   2016-05-22 09:14:55
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-30 14:45:10
*/

'use strict';

var fakeData = require('./fake-data');

var channelListPage = require('./channel-list.po');
var channelRepoPage = require('./channel-repo.po');
var channelEditorPage = require('./channel-editor.po');
var loginPage = require('../account/login/login.po');
var toolbar = require('../components/toolbar.po');
var mapView = require('../map/map.po');
var postEditorPage = require('../post/editor.po');
var postMarkers = require('../post/post-markers.po');

describe('Create a channel', function() {
    
    require('../before-each')();

    var testUser;
    beforeEach(function() {
        testUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        };
    });

    beforeEach(function() {
        channelListPage.open();
    });

    it(' - Create a channel and create a new post on it', function() {
        channelListPage.gotoRepo();
        channelRepoPage.gotoCreate();
        loginPage.loginAsNeeded(testUser);
        channelEditorPage.apply(fakeData.newChannel);
        channelEditorPage.submit();
        channelRepoPage.expectHas(fakeData.newChannel);
        channelRepoPage.import(fakeData.newChannel);
        toolbar.expectChannel(fakeData.newChannel);
        mapView.gotoCreatePost();
        postEditorPage.apply(fakeData.newPost);
        postEditorPage.submit();
        toolbar.expectChannel(fakeData.newChannel);
        postMarkers.hasPost(fakeData.newPost);        

        // browser.pause(54088);
    });
});