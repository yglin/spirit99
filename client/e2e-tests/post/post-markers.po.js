/*
* @Author: yglin
* @Date:   2016-05-30 11:58:57
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 14:30:09
*/

'use strict';

module.exports = new PostMarkersPage();

var mapView = require('../map/map.po');

function PostMarkersPage() {
    // this.root = element(by.css('#post-markers'));

    this.hasPost = hasPost;
    this.hasNoPost = hasNoPost;
    this.gotoPostView = gotoPostView;
};

function hasPost(post) {
    var postMarker = element(by.xpath('//div[@class="gmnoprint" and @title="' + post.title + '"]'));
    mapView.waitIdle();    
    expect(postMarker.isPresent()).toBeTruthy();
}

function hasNoPost(post) {
    var postMarker = element(by.xpath('//div[@class="gmnoprint" and @title="' + post.title + '"]'));
    mapView.waitIdle();    
    expect(postMarker.isPresent()).toBeFalsy();
}

function gotoPostView(post) {
    var postMarker = element(by.xpath('//div[@class="gmnoprint" and @title="' + post.title + '"]'));
    var linkToPostView = element(by.css('a.s99-post-links-read'));
    mapView.waitIdle();    
    postMarker.click();
    browser.wait(function () {
        return linkToPostView.isDisplayed()
        .then(function (isDisplayed) {
            return isDisplayed == true;
        });
    }, 5000);
    linkToPostView.click();
}
