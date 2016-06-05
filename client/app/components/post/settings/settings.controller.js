/*
* @Author: yglin
* @Date:   2016-06-05 17:58:59
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-05 18:25:56
*/

(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostSettingsController', PostSettingsController);

    PostSettingsController.$inject = ['Post'];

    /* @ngInject */
    function PostSettingsController(Post) {
        var $ctrl = this;
        $ctrl.title = 'PostSettings';
        $ctrl.settings = Post.settings;
        $ctrl.saveSettings = Post.saveSettings;

        $ctrl.$onInit = function () {
        };
    }
})();
