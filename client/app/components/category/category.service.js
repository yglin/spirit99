(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Category', Category);

    Category.$inject = ['$rootScope', 'nodeValidator', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function Category($rootScope, nodeValidator, uiGmapGoogleMapApi) {
        var self = this;
        self.CATEGORY_MISC = CATEGORY_MISC();
        self.categories = {};
        self.validate = validate;
        self.normalize = normalize;
        self.rebuildCategories = rebuildCategories;
        self.getIcon = getIcon;
        self.isVisible = isVisible;
        self.toggleVisible = toggleVisible;
        self.hideAll = hideAll;
        self.showAll = showAll;

        var gMapApi;

        activate();

        function activate () {
            uiGmapGoogleMapApi.then(function (googleMaps) {
                gMapApi = googleMaps;
            });
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
            if (gMapApi) {
                if (!category.icon) {
                    category.icon = {};
                }
                if (nodeValidator.isURL(category.icon)) {
                    category.icon = {
                        url: category.icon
                    };
                }
                var scaledSize = [32, 32];
                if (category.icon.scaledSize) {
                    scaledSize[0] = category.icon.scaledSize[0];
                    scaledSize[1] = category.icon.scaledSize[1];
                }
                category.icon.scaledSize = new gMapApi.Size(scaledSize[0], scaledSize[1]);

                if (category.icon.anchor) {
                    if (category.icon.anchor == 'left') {
                        category.icon.anchor = new gMapApi.Point(0, scaledSize[1]);
                    }
                    else if (category.icon.anchor == 'middle') {
                        category.icon.anchor = new gMapApi.Point(scaledSize[0] * 0.5, scaledSize[1]);
                    }
                    else if (category.icon.anchor == 'right') {
                        category.icon.anchor = new gMapApi.Point(scaledSize[0], scaledSize[1]);
                    }
                    else {
                        delete category.icon.anchor;
                    }                    
                }
            }

            if (!category.visible) {
                category.visible = true;
            }
        }

        function rebuildCategories (categories) {
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
                // icon: {
                //     url: 'https://www.serif.com/appresources/WPX6/Tutorials/en-gb/graphics_help/google_map_marker.png'
                // }
            };
        }
    }
})();
