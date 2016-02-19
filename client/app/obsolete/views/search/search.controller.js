(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', 'Period', 'UserCtrls', 'ChannelManager', 'PostManager'];

    /* @ngInject */
    function SearchController($scope, $rootScope, Period, UserCtrls, ChannelManager, PostManager) {
        var searchVM = this;
        searchVM.title = 'Search';
        searchVM.chipsReadonly = false;
        searchVM.categories = ChannelManager.getCategories(UserCtrls.tunedInChannelID);
        searchVM.datePresets = Period.presets;
        searchVM.userCtrls = UserCtrls.search;
        searchVM.toggleCategoryShow = toggleCategoryShow;
        searchVM.showAllCategories = showAllCategories;
        searchVM.hideAllCategories = hideAllCategories;
        searchVM.onChangeDatePeriod = onChangeDatePeriod;
        searchVM.onAddKeyword = onAddKeyword;
        searchVM.onRemoveKeyword = onRemoveKeyword;
        
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
            searchVM.userCtrls.categories[categoryID].show = !searchVM.userCtrls.categories[categoryID].show;
            PostManager.searchPosts();
        }

        function showAllCategories () {
            for(var key in searchVM.categories){
                searchVM.userCtrls.categories[key].show = true;
            }
            PostManager.searchPosts();
        }

        function hideAllCategories () {
            for(var key in searchVM.categories){
                searchVM.userCtrls.categories[key].show = false;
            }
            PostManager.searchPosts();
        }

        function onChangeDatePeriod () {
            PostManager.searchPosts();
        }

        function onAddKeyword () {
            PostManager.searchPosts();
        }

        function onRemoveKeyword () {
            PostManager.searchPosts();
        }
    }
})();
