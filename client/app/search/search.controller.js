(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope'];

    /* @ngInject */
    function SearchController($scope) {
        var searchVM = this;
        searchVM.title = 'Search';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
