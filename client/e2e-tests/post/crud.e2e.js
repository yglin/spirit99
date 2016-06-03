/*
* @Author: yglin
* @Date:   2016-05-28 11:18:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 14:32:51
*/

'use strict';

var config = browser.params;

var channelListPage = require('../channel/channel-list.po');
var toolbar = require('../components/toolbar.po');
var dialog = require('../components/dialog.po');
var mapView = require('../map/map.po');
var postMarkers = require('./post-markers.po');
var editorPage = require('./editor.po');
var viewPage = require('./view.po');
var loginPage = require('../account/login/login.po');

var serverData = require('../server-data.js');
var fakeData = require('./fake-data');

describe('Post create, read, update, delete', function() {

    require('../before-each')();
    var user, channel, post, post2;

    beforeEach(function() {
        user = serverData.users[0];
        channel = serverData.channels[0];
        post = fakeData.posts[0];
        post2 = fakeData.posts[1];        
    });

    it(' - Create a post on map', function() {
        channelListPage.open();
        channelListPage.import(config.stationUrl + '/api/channels/' + channel.id + '/portal', true);
        toolbar.expectChannel(channel);
        mapView.gotoCreatePost();
        editorPage.hasCoordsFromUrl();
        dialog.confirm();
        loginPage.forcedLogin(user);
        editorPage.apply(post);
        editorPage.submit();
        toolbar.expectChannel(channel);
        postMarkers.hasPost(post); 
    });

    it(' - Read the post', function() {
        postMarkers.gotoPostView(post);
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
        viewPage.toEqual(post, channel);        
        browser.getAllWindowHandles().then(function(handles){
            browser.driver.close();
            browser.switchTo().window(handles[0]); // 0 or 1 to switch between the 2 open windows
        });
    });

    it(' - Update the post', function() {
        postMarkers.gotoPostView(post);
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
        loginPage.forcedLogin(user);
        viewPage.gotoUpdate();
        editorPage.apply(post2);
        editorPage.submit();
        viewPage.toEqual(post2, channel);        
        browser.get('/');
        postMarkers.hasPost(post2);
        browser.getAllWindowHandles().then(function(handles){
            browser.driver.close();
            browser.switchTo().window(handles[0]); // 0 or 1 to switch between the 2 open windows
        });
    });

    it(' - Delete the post', function() {
        postMarkers.gotoPostView(post2);
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
        loginPage.forcedLogin(user);
        viewPage.delete();
        browser.get('/');
        postMarkers.hasNoPost(post2);
        browser.getAllWindowHandles().then(function(handles){
            browser.driver.close();
            browser.switchTo().window(handles[0]); // 0 or 1 to switch between the 2 open windows
        });
    });
});