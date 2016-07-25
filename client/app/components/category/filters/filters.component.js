/*
* @Author: yglin
* @Date:   2016-07-25 16:08:13
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-25 16:21:56
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99CategoryFilters',{
        templateUrl: 'app/components/category/filters/filters.tpl.html',
        controller: FiltersController,
        bindings: {
        }
    });

    FiltersController.$inject = ['$rootScope', 'Category'];

    /* @ngInject */
    function FiltersController($rootScope, Category) {
        var $ctrl = this;
        $ctrl.title = 'Filters';
        $ctrl.category = Category;

        $ctrl.toggleVisible = toggleVisible;
        $ctrl.showAll = showAll;
        $ctrl.hideAll = hideAll;

        $ctrl.$onInit = function () {
        };

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
