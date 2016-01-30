(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', 'ChannelManager'];

    /* @ngInject */
    function SearchController($scope, $rootScope, ChannelManager) {
        var searchVM = this;
        searchVM.title = 'Search';
        searchVM.keywords = [];
        searchVM.chipsReadonly = false;
        searchVM.categories = ChannelManager.getCategories();
        searchVM.toggleCategoryShow = toggleCategoryShow;
        searchVM.showAllCategories = showAllCategories;
        searchVM.hideAllCategories = hideAllCategories;
        
        activate();

        ////////////////

        function activate() {
            for(var key in searchVM.categories){
                if(typeof searchVM.categories[key].show === 'undefined'){
                    searchVM.categories[key].show = true;
                }
            }
        }

        function toggleCategoryShow (categoryID) {
            searchVM.categories[categoryID].show = !searchVM.categories[categoryID].show;
            $rootScope.$broadcast('search:changed');
        }

        function showAllCategories () {
            for(var key in searchVM.categories){
                searchVM.categories[key].show = true;
            }
            $rootScope.$broadcast('search:changed');
        }

        function hideAllCategories () {
            for(var key in searchVM.categories){
                searchVM.categories[key].show = false;
            }
            $rootScope.$broadcast('search:changed');
        }
    }
})();
