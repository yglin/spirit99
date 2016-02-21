(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MapSettingsController',MapSettingsController);

    MapSettingsController.$inject = ['Map', '$mdDialog', 'INIT_MAP_SCHEMES'];

    /* @ngInject */
    function MapSettingsController(Map, $mdDialog, INIT_MAP_SCHEMES) {
        var mapSettingsVM = this;
        mapSettingsVM.title = 'MapSettings';
        mapSettingsVM.ctrl = Map;
        mapSettingsVM.initMapSchemes = INIT_MAP_SCHEMES;
        mapSettingsVM.setInitMapScheme = Map.setInitMapScheme;
        mapSettingsVM.setHomeMap = setHomeMap;

        activate();

        ////////////////

        function activate() {
        }

        function setHomeMap () {
            $mdDialog.show(
            $mdDialog.confirm()
            .title('設定地圖首頁')
            .content('將目前所瀏覽的地圖範圍，設定為每次開啟網站時顯示的地圖首頁？')
            .ok('確定')
            .cancel('取消')
            ).then(function () {
                Map.saveMap('home-map');
            });

        }
    }
})();
