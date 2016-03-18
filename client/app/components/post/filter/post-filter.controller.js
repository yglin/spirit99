(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostFilterController',PostFilterController);

    PostFilterController.$inject = ['PostFilter', 'DatePeriod'];

    /* @ngInject */
    function PostFilterController(PostFilter, DatePeriod) {
        var postFilterVM = this;
        postFilterVM.title = 'PostFilter';
        postFilterVM.chipsReadonly = false;
        postFilterVM.postFilter = PostFilter;
        postFilterVM.datePeriodPresets = DatePeriod.presets;
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();
