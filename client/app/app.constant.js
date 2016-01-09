(function() {
    'use strict';

    var ZOOM_LEVELS = {
        STREET: 15,
        TAIWAN: 7
    };

    angular
    .module('spirit99')
    .constant('ZOOM_LEVELS', zoomLevelsProvider())
    .constant('DEFAULTS', defaultsProvider());

    function zoomLevelsProvider () {
        return ZOOM_LEVELS;
    }

    function defaultsProvider() {
        return {
            map: {
                center: { latitude: 23.973875, longitude: 120.982024 },
                zoom: ZOOM_LEVELS.TAIWAN,
                bounds: {
                    southwest: {latitude: 0, longitude: 0},
                    northeast: {latitude: 0, longitude: 0}
                }
            },
            stations: {
                'nuclear-waste': {
                    id: 'nuclear-waste',
                    title: '核廢料掩埋場',
                    description: '創造非核家園',
                    introUrl: 'http://www.google.com',
                    isOffline: false,
                    logoUrl: 'https://yt3.ggpht.com/-Gd9lF_AqQPk/AAAAAAAAAAI/AAAAAAAAAAA/afbtVZjs18E/s88-c-k-no/photo.jpg'
                },
                
                'localooxx': {
                    id: 'localooxx',
                    title: '呆呆要不要借醬油',
                    description: '要不要要不不要要不要要要要不要要不要ㄚ呆呆',
                    introUrl: 'http://www.google.com',
                    isOffline: true,
                    logoUrl: 'https://www.evansville.edu/residencelife/images/greenLogo.png'
                }                
            }

        };
    }

})();