(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostGadgetController', PostGadgetController);

    PostGadgetController.$inject = ['Post', 'Sidenav'];

    /* @ngInject */
    function PostGadgetController(Post, Sidenav) {
        var postGadgetVM = this;
        // postGadgetVM.title = 'PostGadget';
        postGadgetVM.post = Post;
        postGadgetVM.openPosts = openPosts;

        activate();

        ////////////////

        function activate() {
        }

        function openPosts () {
            Sidenav.open('posts');
        }
    }
})();
