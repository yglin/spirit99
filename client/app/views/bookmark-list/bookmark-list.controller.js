(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('BookmarkListController',BookmarkListController);

    BookmarkListController.$inject = ['$scope', 'PRESETS', 'UserCtrls', 'ChannelManager'];

    /* @ngInject */
    function BookmarkListController($scope, PRESETS, UserCtrls, ChannelManager) {
        var bookmarkListVM = this;
        bookmarkListVM.title = 'BookmarkList';
        bookmarkListVM.bookmarks = [];
        bookmarkListVM.addBookmark = addBookmark;

        activate();

        ////////////////

        function activate() {
            loadBookmarks();
        }

        // XXX: To be implemented
        function loadBookmarks () {
        }

        function addBookmark () {
            var newBookmark = {};
            newBookmark.channelID = UserCtrls.tunedInChannelID;
            newBookmark.channelTitle = ChannelManager.getChannelTitle();
            newBookmark.search = angular.copy(UserCtrls.search);
            newBookmark.periodPresetTitle = PRESETS.periods[newBookmark.search.create_time.preset].title;
            newBookmark.categories = ChannelManager.getCategories();
            bookmarkListVM.bookmarks.push(newBookmark);
        }

        function applyBookmark (bookmark) {
            
        }
    }
})();