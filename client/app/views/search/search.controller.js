(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', 'PRESETS', 'UserCtrls', 'ChannelManager', 'PostManager'];

    /* @ngInject */
    function SearchController($scope, $rootScope, PRESETS, UserCtrls, ChannelManager, PostManager) {
        var searchVM = this;
        searchVM.title = 'Search';
        searchVM.keywords = [];
        searchVM.chipsReadonly = false;
        searchVM.categories = ChannelManager.getCategories();
        searchVM.datePresets = PRESETS.periods;
        searchVM.userCtrls = UserCtrls.search;
        searchVM.toggleCategoryShow = toggleCategoryShow;
        searchVM.showAllCategories = showAllCategories;
        searchVM.hideAllCategories = hideAllCategories;
        searchVM.onChangeDatePeriod = onChangeDatePeriod;
        
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
            PostManager.searchPosts();
        }

        function showAllCategories () {
            for(var key in searchVM.categories){
                searchVM.categories[key].show = true;
            }
            PostManager.searchPosts();
        }

        function hideAllCategories () {
            for(var key in searchVM.categories){
                searchVM.categories[key].show = false;
            }
            PostManager.searchPosts();
        }

        function onChangeDatePeriod () {
            PostManager.searchPosts();
        }
    }
})();
