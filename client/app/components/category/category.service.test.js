'use strict';
        
describe('Category', function () {
    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function() {
        module(function($provide) {
            $provide.factory('uiGmapGoogleMapApi', mockUiGmapGoogleMapApi);
        
            mockUiGmapGoogleMapApi.$inject = ['$q'];
        
            function mockUiGmapGoogleMapApi ($q) {
                return $q.resolve({
                    Size: function Size (width, height) {
                        this.width = width;
                        this.height = height;
                    }
                });
            }
        });

        module(function($provide) {
            $provide.service('Channel', mockChannel);
        
            mockChannel.$inject = ['FakeData'];
        
            function mockChannel (FakeData) {
                var self = this;
                self.property = {};
                self.getCategories = jasmine.createSpy('getCategories')
                .and.callFake(function () {
                    return FakeData.fakeCategories;
                });
            }
        });

    });

    var Category, $rootScope, FakeData;
    beforeEach(inject(function (_Category_, _$rootScope_, _FakeData_) {
        Category = _Category_;
        $rootScope = _$rootScope_;
        FakeData = _FakeData_;
    }));

    it(' - Should call rebuildCategories() on event channel:tuned', function() {
        spyOn(Category, 'rebuildCategories');
        $rootScope.$broadcast('channel:tuned');
        expect(Category.rebuildCategories).toHaveBeenCalled();
    });

    describe(' - validate()', function() {
        it(' - Should return true only when matched required fields and types', function() {
            var category = {};
            expect(Category.validate(category)).toBe(false);
            category.icon = "";
            expect(Category.validate(category)).toBe(false);
            category.icon = "https://upload.wikimedia.org/wikipedia/commons/9/91/Checked_icon.png";
            expect(Category.validate(category)).toBe(true);
            category.icon = {url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Checked_icon.png"};
            expect(Category.validate(category)).toBe(true);
        });
    });

    describe(' - normalize()', function() {
        it(' - Normalized category should has icon.url', function() {
            var category = {
                icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Checked_icon.png"
            };
            Category.normalize(category);
            expect(category.icon.url).toBeDefined();
        });
    });

    describe(' - rebuildCategories()', function() {
        beforeEach(function() {
            spyOn(Category, 'validate').and.returnValue(true);
            spyOn(Category, 'normalize');            
        });

        it(' - Should get categories from Channel', function() {
            FakeData.fakeCategories.misc = Category.CATEGORY_MISC;
            Category.rebuildCategories();
            expect(Category.categories).toEqual(FakeData.fakeCategories);
        });

        it(' - Should call vaildate() upon categories', function() {
            Category.rebuildCategories();
            expect(Category.validate).toHaveBeenCalled();
        });

        it(' - Should delete invalid category', function() {
            Category.validate.and.returnValue(false);
            Category.rebuildCategories();
            expect(Category.categories).toEqual({misc: Category.CATEGORY_MISC});
        });

        it(' - Should call normalize() upon categories', function() {
            Category.rebuildCategories();
            expect(Category.normalize).toHaveBeenCalled();
        });
    });

    describe(' - getIcon()', function() {
        it(' - Should return an google map icon object anyway', function() {
            // Reference to Google Map API v3
            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Icon
            var icon = Category.getIcon('xxx');
            expect('url' in icon).toBe(true);
        });
    });

});