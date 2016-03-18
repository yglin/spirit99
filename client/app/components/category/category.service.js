(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Category', Category);

    Category.$inject = ['$rootScope', 'Channel', 'nodeValidator', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function Category($rootScope, Channel, nodeValidator, uiGmapGoogleMapApi) {
        var self = this;
        self.CATEGORY_MISC = CATEGORY_MISC();
        self.ICON_SCALED_SIZE = null;
        self.categories = {};
        self.validate = validate;
        self.normalize = normalize;
        self.rebuildCategories = rebuildCategories;
        self.getIcon = getIcon;
        self.isVisible = isVisible;
        self.toggleVisible = toggleVisible;
        self.hideAll = hideAll;
        self.showAll = showAll;

        activate();

        function activate () {
            uiGmapGoogleMapApi.then(function (gMapApi) {
                self.ICON_SCALED_SIZE = new gMapApi.Size(32, 32);
            });
            $rootScope.$on('channel:tuned', function () {
                self.rebuildCategories();
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
            if (category.icon && nodeValidator.isURL(category.icon)) {
                category.icon = {
                    url: category.icon
                };
            }
            if (!category.icon.scaledSize && self.ICON_SCALED_SIZE) {
                category.icon.scaledSize = self.ICON_SCALED_SIZE;
            }
            if (!category.visible) {
                category.visible = true;
            }
        }

        function rebuildCategories () {
            self.categories = Channel.getCategories();
            for (var key in self.categories) {
                if (self.validate(self.categories[key])) {
                    self.normalize(self.categories[key], key);
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
                icon: {
                    url: 'https://www.serif.com/appresources/WPX6/Tutorials/en-gb/graphics_help/google_map_marker.png'
                }
            };
        }
    }
})();
