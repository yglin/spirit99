// Use synchronous loading in index.html
// Due to error "Uncaught ReferenceError: google is not defined"
// which is from google-maps-utility-library-v3
(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(MapConfiger);

    MapConfiger.$inject = ['uiGmapGoogleMapApiProvider', 'CONFIG'];

    // Configration for partial view - map
    function MapConfiger(uiGmapGoogleMapApiProvider, CONFIG){
        uiGmapGoogleMapApiProvider.configure({
            key: CONFIG.GOOGLE_CLIENT_API_KEY
        });
    }

})();