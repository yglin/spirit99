(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('BookmarkAddController', BookmarkAddController);

    BookmarkAddController.$inject = ['$mdDialog', 'UserCtrls', 'ChannelManager', 'Period'];

    /* @ngInject */
    function BookmarkAddController($mdDialog, UserCtrls, ChannelManager, Period) {
        var bookmarkVM = this;
        bookmarkVM.title = 'Bookmark';
        bookmarkVM.cancel = cancel;
        bookmarkVM.confirm = confirm;
        bookmarkVM.title = '';
        bookmarkVM.description = '';
        bookmarkVM.channelTitle = '';
        bookmarkVM.channelLogo = '';
        bookmarkVM.keywords = '';
        bookmarkVM.period = {};
        bookmarkVM.categories = {};

        activate();

        ////////////////

        function activate() {
            bookmarkVM.channelTitle = ChannelManager.getChannelTitle(UserCtrls.tunedInChannelID);
            bookmarkVM.title = bookmarkVM.channelTitle;
            bookmarkVM.description = Period.getPresetTitle(UserCtrls.search.create_time.preset);
            for (var i = 0; i < UserCtrls.search.keywords.length; i++) {
                bookmarkVM.description += ',' + UserCtrls.search.keywords[i];
            };
            bookmarkVM.channelLogo = ChannelManager.getChannelLogo(UserCtrls.tunedInChannelID);
            bookmarkVM.keywords = UserCtrls.search.keywords;
            bookmarkVM.period = {
                presetID: UserCtrls.search.create_time.preset,
                title: Period.getPresetTitle(UserCtrls.search.create_time.preset),
                start: Period.getPresetStart(UserCtrls.search.create_time.preset),
                end: Period.getPresetEnd(UserCtrls.search.create_time.preset)
            }
            bookmarkVM.categories = ChannelManager.getCategories(UserCtrls.tunedInChannelID);
            bookmarkVM.categoryCtrls = UserCtrls.search.categories;
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function confirm () {
            var bookmark = {};
            bookmark.title = bookmarkVM.title;
            bookmark.description = bookmarkVM.description;
            bookmark.thumbnail = bookmarkVM.channelLogo;
            bookmark.channelID = UserCtrls.tunedInChannelID;
            bookmark.keywords = angular.copy(bookmarkVM.keywords);
            bookmark.period = angular.copy(bookmarkVM.period);
            bookmark.categories = angular.copy(bookmarkVM.categoryCtrls);
            $mdDialog.hide(bookmark);
        }
    }
})();
