(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('StationManager', StationManager);

    StationManager.$inject = [];

    /* @ngInject */
    function StationManager() {
        var self = this;
        self.getStations = getStations;
        self.getTitle = getTitle;
        self.getResourceMeta = getResourceMeta;

        ////////////////
        // TODO: Implement
        function getTitle(stationID){
            return '核廢料掩埋場';
        }

        // TODO: Implement
        function getResourceMeta(stationName, resourceName) {
            return {};
        }

        // TODO: Implement
        function getStations () {
            return [
                {
                    id: 'nuclear-waste',
                    title: '核廢料掩埋場',
                    description: '創造非核家園',
                    introUrl: 'http://www.google.com',
                    logoUrl: 'https://yt3.ggpht.com/-Gd9lF_AqQPk/AAAAAAAAAAI/AAAAAAAAAAA/afbtVZjs18E/s88-c-k-no/photo.jpg'
                },
                {
                    id: 'localooxx',
                    title: '呆呆要不要借醬油',
                    description: '要不要要不要要不要要不要要不要要不要要不要ㄚ呆呆',
                    introUrl: 'http://www.google.com',
                    logoUrl: 'https://www.evansville.edu/residencelife/images/greenLogo.png'
                }                
            ];
        }
    }
})();