(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('FakeData', FakeData);

    FakeData.$inject = ['DEFAULTS'];

    /* @ngInject */
    function FakeData(DEFAULTS) {
        var self = this;
        self.genFakeMap = genFakeMap;
        self.genFakeStations = genFakeStations;
        self.genFakeResources = genFakeResources;
        self.genFakeIconObjects = genFakeIconObjects;

        ////////////////
        function genFakeMap (requiredArg1, requiredArg2, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return DEFAULTS.map;
        };

        function genFakeStations (options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
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
        };

        function genFakeResources(options) {
            options = typeof options === 'undefined' ? {} : options;
            options.count = typeof options.count === 'undefined' ? 10 : options.count;
            options.countHasCategory = typeof options.countHasCategory === 'undefined' ? options.count : options.countHasCategory;  
            var resources = [];
            var categories = Object.keys(self.genFakeIconObjects());
            for (var i = 0; i < options.count; i++) {
                var resource = {
                    id: i+1,
                    latitude: 23.973875 + 2 * (0.5 - Math.random()),
                    longitude: 120.982024 + 2 * (0.5 - Math.random()),
                };
                if(i < options.countHasCategory){
                    resource.category = _.sample(categories);
                }
                resources.push(resource);
            };
            return resources;
        }

        function genFakeIconObjects (options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {
                'food': {
                    url: 'http://food.icon.url'
                },
                'cloth': {
                    url: 'http://cloth.icon.url'
                },
                'house': {
                    url: 'http://house.icon.url'
                },
                'transport': {
                    url: 'http://transport.icon.url'
                }
            };
        };
    }
})();