(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Category', Category);

    Category.$inject = ['$rootScope', '$location', 'nodeValidator', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function Category($rootScope, $location, nodeValidator, uiGmapGoogleMapApi) {
        var self = this;
        self.CATEGORY_MISC = CATEGORY_MISC();
        self.categories = {};

        self.getParams = getParams;
        self.validate = validate;
        self.normalize = normalize;
        self.rebuildCategories = rebuildCategories;
        self.getIcon = getIcon;
        self.isVisible = isVisible;
        self.toggleVisible = toggleVisible;
        self.hideAll = hideAll;
        self.showAll = showAll;

        activate();

        var gMapApi = null;

        function activate () {
            if ($location.search().categories) {
                self.queryParams = JSON.parse($location.search().categories);
            }
        }

        function getParams() {
            var params = {};
            for (var key in self.categories) {
                params[key] = self.categories[key].visible;
            }
            return { categories: params };
        }

        ////////////////
        function validate (category) {
            if (!category.icon) {
                return false;
            }
            var gotIconUrl = false;
            if (nodeValidator.isURL(category.icon)) {
                gotIconUrl = true;
            }
            else if (category.icon.url && nodeValidator.isURL(category.icon.url)) {
                gotIconUrl = true;
            }
            if (!gotIconUrl) {
                return false;
            }
            return true;
        }

        function normalize (category) {
            // build icon object
            var iconObject = {};
            if (category.icon && nodeValidator.isURL(category.icon)) {
                iconObject.url = category.icon;
            }
            else if (category.icon && category.icon.url && nodeValidator.isURL(category.icon.url)) {
                iconObject.url = category.icon.url;
            }

            if (gMapApi) {
                var scaledSizeX = 32;
                var scaledSizeY = 32;
                // Normalize icon's size
                if (category.icon.scaledSize && category.icon.scaledSize.length >= 2) {
                    scaledSizeX = category.icon.scaledSize[0];
                    scaledSizeY = category.icon.scaledSize[1];
                }
                iconObject.scaledSize = new gMapApi.Size(scaledSizeX, scaledSizeY);

                // Normalize icon's anchor position
                if (category.icon.anchor && typeof category.icon.anchor == 'string') {
                    if (category.icon.anchor == 'left') {
                        iconObject.anchor = new gMapApi.Point(0, scaledSizeY);
                    }
                    else if (category.icon.anchor == 'middle') {
                        iconObject.anchor = new gMapApi.Point(scaledSizeX * 0.5, scaledSizeY);
                    }
                    else if (category.icon.anchor == 'right') {
                        iconObject.anchor = new gMapApi.Point(scaledSizeX, scaledSizeY);
                    }
                }                
            }
            category.icon = iconObject;

            if (!category.visible) {
                category.visible = true;
            }
        }

        function rebuildCategories (categories) {
            return uiGmapGoogleMapApi.then(function (googleMaps) {
                gMapApi = googleMaps;
                
                self.categories = categories;
                for (var key in self.categories) {
                    if (self.validate(self.categories[key])) {
                        self.normalize(self.categories[key]);
                    }
                    else {
                        delete self.categories[key];
                    }
                }
                if (!('misc' in self.categories)) {
                    self.categories['misc'] = self.CATEGORY_MISC;
                }

                // Apply query parameters, only once
                if (self.queryParams) {
                    for (var key in self.queryParams) {
                        if (self.categories[key]) {
                            self.categories[key].visible = self.queryParams[key];
                        }
                    }
                    delete self.queryParams;
                }
            });
        }

        function getIcon(categoryID) {
            if (categoryID in self.categories) {
                return self.categories[categoryID].icon;
            } else {
                return self.CATEGORY_MISC.icon;
            }
        }

        function isVisible (categoryID) {
            if (categoryID in self.categories) {
                return self.categories[categoryID].visible;
            }
            else {
                return false;
            }
        }

        function toggleVisible (categoryID) {
            if (categoryID in self.categories) {
                self.categories[categoryID].visible = !(self.categories[categoryID].visible);
            }
        }

        function hideAll () {
            for (var id in self.categories) {
                self.categories[id].visible = false;
            }
        }

        function showAll () {
            for (var id in self.categories) {
                self.categories[id].visible = true;
            }
        }

        function CATEGORY_MISC () {
            return {
                title: '其他',
                icon: {
                    url: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png'
                },
                visible: true
            };
        }
    }
})();
