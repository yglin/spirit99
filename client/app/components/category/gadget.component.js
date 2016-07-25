/*
* @Author: yglin
* @Date:   2016-07-25 15:49:47
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-25 16:24:05
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99CategoryGadget',{
        templateUrl: 'app/components/category/gadget.tpl.html',
        controller: GadgetController,
        bindings: {
        }
    });

    GadgetController.$inject = ['$mdDialog'];

    /* @ngInject */
    function GadgetController($mdDialog) {
        var $ctrl = this;
        $ctrl.title = 'Gadget';
        $ctrl.openFilters = openFilters;

        $ctrl.$onInit = function () {
        };

        function openFilters() {
            var template = '<md-dialog class="s99-trasparent-dialog" aria-label="Category Filters Dialog">';
            template += '<s99-category-filters></s99-category-filters>';
            template += '</md-dialog>';
            $mdDialog.show({
                template: template,
                controller: function () {},
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                locals: {}
            });
        }
    }
})();
