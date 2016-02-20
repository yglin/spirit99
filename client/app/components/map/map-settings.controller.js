(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MapSettingsController',MapSettingsController);

    MapSettingsController.$inject = ['Map', 'INIT_MAP_SCHEMES'];

    /* @ngInject */
    function MapSettingsController(Map, INIT_MAP_SCHEMES) {
        var mapSettingsVM = this;
        mapSettingsVM.title = 'MapSettings';
        mapSettingsVM.ctrl = Map;
        mapSettingsVM.initMapSchemes = INIT_MAP_SCHEMES;
        mapSettingsVM.setInitMapScheme = Map.setInitMapScheme;

        activate();

        ////////////////

        function activate() {

        }
    }
})();
