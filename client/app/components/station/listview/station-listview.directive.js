(function() {
    'use strict';

    angular
        .module('spirit99')
        .directive('s99StationListview', s99StationListview);

    s99StationListview.$inject = [];

    /* @ngInject */
    function s99StationListview() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/station/listview/station-listview.html',
            bindToController: true,
            controller: StationListviewController,
            controllerAs: 'stationListviewVM',
            link: link,
            restrict: 'EA',
            scope: {
                station: '=stationModel'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function StationListviewController() {

    }
})();