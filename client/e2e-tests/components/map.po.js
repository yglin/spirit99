/*
* @Author: yglin
* @Date:   2016-05-28 11:07:51
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-28 11:17:35
*/

'use strict';

module.exports = new MapPage();

function MapPage() {
    this.root = element(by.css('div#s99-map'));
    this.map = element(by.css('ui-gmap-google-map'));
    
    this.gotoCreatePost = gotoCreatePost;
};

function gotoCreatePost() {
    this.map.click();
}
