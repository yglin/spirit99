// Use synchronous loading in index.html
// Due to error "Uncaught ReferenceError: google is not defined"
// which is from google-maps-utility-library-v3
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