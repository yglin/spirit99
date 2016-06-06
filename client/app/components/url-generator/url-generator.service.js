/*
* @Author: yglin
* @Date:   2016-06-06 14:00:01
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-06 19:56:47
*/

(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UrlGenerator', UrlGenerator);

    UrlGenerator.$inject = ['$location', '$httpParamSerializer', 'Channel', 'Map', 'PostFilter', 'Category'];

    /* @ngInject */
    function UrlGenerator($location, $httpParamSerializer, Channel, Map, PostFilter, Category) {
        var self = this;
        self.generate = generate;

        ////////////////

        function generate() {
            var url = $location.protocol() + '://' + $location.host();
            if ($location.port()) {
                url += ':' + $location.port();
            }

            var queryParams = {};
            
            var channel = Channel.get();
            if (channel && channel['portal-url']) {
                queryParams.import = channel['portal-url'];
            }

            queryParams.map = {
                center: Map.map.center,
                zoom: Map.map.zoom
            };

            var filterParams = PostFilter.getParams();
            for (var key in filterParams) {
                queryParams[key] = filterParams[key];
            }

            var categoryParams = Category.getParams();
            for (var key in categoryParams) {
                queryParams[key] = categoryParams[key];
            }


            url += '?' + $httpParamSerializer(queryParams);

            return url;
        }
    }
})();
