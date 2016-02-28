(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Category', Category);

    Category.$inject = [];

    /* @ngInject */
    function Category() {
        var self = this;
        self.iconObjects = {};
        self.categories = {};
        self.getIconObject = getIconObject;

        ////////////////

        function getIconObject() {
        }
    }
})();
