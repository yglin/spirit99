(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(MapConfiger);

    MapConfiger.$inject = ['uiGmapGoogleMapApiProvider'];

    // Configration for partial view - map
    function MapConfiger(uiGmapGoogleMapApiProvider){
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB5rcT4tYhcrHp5NwEophBjfKV0uilCNEE'
        });
    }

})();