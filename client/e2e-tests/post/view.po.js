/*
* @Author: yglin
* @Date:   2016-05-31 16:19:09
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-03 13:51:25
*/

'use strict';

var locateMap = require('../components/locate-map.po');
var dialog = require('../components/dialog.po');

module.exports = new ViewPage();

function ViewPage() {
    this.root = element(by.css('div#s99-post-view'));
    this.title = this.root.element(by.css('.s99-post-title'));
    this.content = this.root.element(by.css('.s99-post-content'));
    this.author = this.root.element(by.css('.s99-post-author'));
    this.latitude = this.root.element()
    this.categoryIcon = this.root.element(by.css('img.s99-category-icon'));
    this.categoryTitle = this.root.element(by.css('span.s99-category-title'));

    this.gotoUpdate = gotoUpdate;
    this.delete = _delete;
    this.toEqual = toEqual;
};

function gotoUpdate() {
    this.root.element(by.css('button#goto-update')).click();
}

function _delete() {
    this.root.element(by.css('button#delete')).click();
    dialog.confirm();
    dialog.prompt();
}

function toEqual(post, channel) {
    expect(this.title.getText()).toEqual(post.title);
    expect(this.content.getInnerHtml()).toEqual(post.content);
    expect(this.author.getText()).toEqual(post.author);
    if (post.category && channel.categories
    && post.category in channel.categories) {
        var category = channel.categories[post.category];
        expect(this.categoryIcon.getAttribute('src')).toEqual(category.icon.url);
        expect(this.categoryTitle.getText()).toEqual(category.title);
    }

    locateMap.toEqual(post);
}

