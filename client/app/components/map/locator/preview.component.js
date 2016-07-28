/*
* @Author: yglin
* @Date:   2016-07-28 12:00:18
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-28 14:20:22
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99LocatorPreview',{
        templateUrl: 'app/components/map/locator/preview.tpl.html',
        controller: PreviewController,
        bindings: {
            center: '<',
            zoom: '<'
        }
    });

    PreviewController.$inject = ['CONFIG'];

    /* @ngInject */
    function PreviewController(CONFIG) {
        var $ctrl = this;
        $ctrl.title = 'Preview';
        $ctrl.GOOGLE_CLIENT_API_KEY = CONFIG.GOOGLE_CLIENT_API_KEY;

        $ctrl.$onInit = function () {
        };
    }
})();