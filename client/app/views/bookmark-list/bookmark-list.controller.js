(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('BookmarkListController',BookmarkListController);

    BookmarkListController.$inject = ['$scope', 'Bookmark', 'PRESETS', 'UserCtrls', 'ChannelManager', 'Period', '$mdDialog'];

    /* @ngInject */
    function BookmarkListController($scope, Bookmark, PRESETS, UserCtrls, ChannelManager, Period, $mdDialog) {
        var bookmarkListVM = this;
        bookmarkListVM.title = 'BookmarkList';
        bookmarkListVM.bookmarks = [];
        bookmarkListVM.addNew = addNew;
        bookmarkListVM.apply = apply;

        activate();

        ////////////////

        function activate() {
            loadBookmarks();
        }

        // XXX: To be implemented
        function loadBookmarks () {
        }

        function addNew () {
            $mdDialog.show({
                controller: 'BookmarkAddController',
                templateUrl: 'app/views/bookmark-list/bookmark-add.tpl.html',
                controllerAs: 'bookmarkVM',
                bindToController: true,
                parent: angular.element(document.body),
                clickOutsideToClose:true
            }).then(function (bookmark) {
                bookmarkListVM.bookmarks.push(bookmark);
            }, function () {
                console.debug('Canceled adding new bookmark');
            });
        }

        function apply (bookmark) {
            UserCtrls.tuneInChannel(bookmark.channelID);
            UserCtrls.applySearch(bookmark.search);
            UserCtrls.applyCategories(bookmark.categories);
        }
    }
})();