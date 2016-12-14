/*
* @Author: yglin
* @Date:   2016-05-16 17:40:31
* @Last Modified by:   yglin
* @Last Modified time: 2016-12-14 10:23:08
*/

'use strict';

(function() {
    angular
        .module('spirit99')
        .controller('DebuggerController', DebuggerController);

    DebuggerController.$inject = ['$scope', 'Map', 'Post'];

    /* @ngInject */
    function DebuggerController($scope, Map, Post) {
        var $ctrl = this;
        $ctrl.title = 'Debugger';
        $ctrl.map = undefined;
        $ctrl.posts = undefined;
        $ctrl.state = 'initial';

        activate();

        ////////////////

        function activate() {
            $ctrl.map = Map.map;
            $ctrl.posts = Post.posts;

            $scope.$on('map:dragstart', stateBusy);
            $scope.$on('map:zoom_changed', stateBusy);
            $scope.$on('map:bounds_changed', stateBusy);
            $scope.$on('map:idle', function () {
                $ctrl.state = 'idle';
                // $scope.$apply();
            });
        }

        function stateBusy() {
            $ctrl.state = 'busy';
            // $scope.$apply();
        }
    }
})();
