/*
* @Author: yglin
* @Date:   2016-05-02 19:59:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-04 20:02:22
*/

'use strict';

module.exports = {
    getTextFromHtml: getTextFromHtml,
    waitForRedirect: waitForRedirect
}

function getTextFromHtml(html) {
    return html ? String(html).replace(/<[^>]+>/gm, '') : '';
}

function waitForRedirect(nextUrl) {
    browser.wait(function () {
        return browser.getCurrentUrl()
        .then(function (url) {
            return  url == nextUrl;
        });
    }, 5000);
}

