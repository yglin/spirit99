(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MapSettingsController',MapSettingsController);

    MapSettingsController.$inject = ['Map'];

    /* @ngInject */
    function MapSettingsController(Map) {
        var mapSettingsVM = this;
        mapSettingsVM.title = 'MapSettings';
        mapSettingsVM.ctrl = Map;
        mapSettingsVM.initMapSchemes = Map.INIT_MAP_SCHEMES;
        mapSettingsVM.setInitMapScheme = Map.setInitMapScheme;
        mapSettingsVM.saveHomeMap = Map.saveHomeMap;

        activate();

        ////////////////

        function activate() {
        }
    }
})();
