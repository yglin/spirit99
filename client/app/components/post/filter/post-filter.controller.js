(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostFilterController',PostFilterController);

    PostFilterController.$inject = ['$rootScope', 'PostFilter', 'DatePeriod', 'Category'];

    /* @ngInject */
    function PostFilterController($rootScope, PostFilter, DatePeriod, Category) {
        var postFilterVM = this;
        postFilterVM.title = 'PostFilter';
        postFilterVM.chipsReadonly = false;
        postFilterVM.postFilter = PostFilter;
        postFilterVM.category = Category;
        postFilterVM.datePeriodPresets = DatePeriod.presets;
        postFilterVM.toggleVisible = toggleVisible;
        postFilterVM.showAll = showAll;
        postFilterVM.hideAll = hideAll;
        
        activate();

        ////////////////

        function activate() {
        }

        function toggleVisible (categoryID) {
            Category.toggleVisible(categoryID);
            $rootScope.$broadcast('post:filterChanged');
        }

        function showAll () {
            Category.showAll();
            $rootScope.$broadcast('post:filterChanged');            
        }

        function hideAll () {
            Category.hideAll();
            $rootScope.$broadcast('post:filterChanged');            
        }
    }
})();
