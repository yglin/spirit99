(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MapDebugController',MapDebugController);

    MapDebugController.$inject = ['Map', 'Post'];

    /* @ngInject */
    function MapDebugController(Map, Post) {
        var mapDebugVM = this;
        mapDebugVM.title = 'MapDebug';
        mapDebugVM.map = Map.map;
        mapDebugVM.posts = Post.posts;

        activate();

        ////////////////

        function activate() {
        }
    }
})();