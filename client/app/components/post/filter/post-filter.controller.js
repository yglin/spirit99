(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostFilterController',PostFilterController);

    PostFilterController.$inject = ['PostFilter'];

    /* @ngInject */
    function PostFilterController(PostFilter) {
        var postFilterVM = this;
        postFilterVM.title = 'PostFilter';
        postFilterVM.chipsReadonly = false;
        postFilterVM.postFilter = PostFilter;
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();
