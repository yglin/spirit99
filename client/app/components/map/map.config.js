(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(MapConfiger);

    MapConfiger.$inject = ['uiGmapGoogleMapApiProvider'];

    // Configration for partial view - map
    function MapConfiger(uiGmapGoogleMapApiProvider){
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE'
        });
    }

})();