'use strict';

var FakeData = require('../../../../mocks/data.js');

describe('PostFilter', function () {
    
    beforeEach(angular.mock.module('spirit99'));

    // Mock dependencies
    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('DatePeriod', mockDatePeriod);
        
            mockDatePeriod.$inject = [];
        
            function mockDatePeriod () {
                var self = this;
                // self.property = {};
                self.getPresetStart = jasmine.createSpy('getPresetStart')
                .and.returnValue(new Date(0));
                self.getPresetEnd = jasmine.createSpy('getPresetEnd')
                .and.returnValue(new Date());
                self.inBetween = jasmine.createSpy('inBetween')
                .and.returnValue(true);
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Category', mockCategory);
        
            mockCategory.$inject = [];
        
            function mockCategory () {
                var self = this;
                self.categories = {};
                self.isVisible = jasmine.createSpy('isVisible')
                .and.returnValue(true);
            }
        });
    });
    
    var PostFilter, $rootScope, scope, DatePeriod, Category;
    var onFilterChanged;
    beforeEach(inject(function (_PostFilter_, _$rootScope_, _DatePeriod_, _Category_) {
        PostFilter = _PostFilter_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        DatePeriod = _DatePeriod_;
        Category = _Category_;
        onFilterChanged = jasmine.createSpy('onFilterChanged');
        scope.$on('post:filterChanged', onFilterChanged);
    }));

    describe(' - onAddKeyword()', function() {

        it(' - Should broadcast event "post:filterChanged"', function() {
            PostFilter.onAddKeyword();
            expect(onFilterChanged).toHaveBeenCalled();
        });
    });

    describe(' - onRemoveKeyword()', function() {
        
        it(' - Should broadcast event "post:filterChanged"', function() {
            PostFilter.onRemoveKeyword();
            expect(onFilterChanged).toHaveBeenCalled();
        });
    });

    describe(' - onChangeDatePeriod()', function() {
        it(' - Should set createTime\'s start and end according to preset', function() {
            PostFilter.createTime.preset = 'inTheEternity';
            PostFilter.onChangeDatePeriod();
            expect(PostFilter.createTime.start).toEqual(new Date(0));
            // The "new Date()" return current time in milisecods.
            // There could be a little delay from the time when createTime.end was set.
            // Therefore instead of testing equality of these 2 points in time, test their difference. 
            expect((new Date()).getTime() - PostFilter.createTime.end.getTime()).toBeLessThan(1000);
        });

        it(' - Should not set createTime\'s start and end if preset=="custom"', function() {
            PostFilter.createTime.start = null;
            PostFilter.createTime.end = null;
            PostFilter.createTime.preset = 'custom';
            PostFilter.onChangeDatePeriod();
            expect(PostFilter.createTime.start).toBeNull();
            expect(PostFilter.createTime.end).toBeNull();
        });

        it(' - Should broadcast event "post:filterChanged"', function() {
            PostFilter.onChangeDatePeriod();
            expect(onFilterChanged).toHaveBeenCalled();            
        });
    });

    describe(' - filter()', function() {
        var post;
        beforeEach(function() {
            post = FakeData.genPosts({count:1})[0];
        });

        it(' - Should pass filters when post\'s title contains all keywords', function() {
            post.title = 'This world has enough for everyone\'s need, but not for everyone\'s greed';
            PostFilter.keywords = ['need', 'greed'];
            expect(PostFilter.filter(post)).toBe(true);
            PostFilter.keywords.push('seed');
            expect(PostFilter.filter(post)).toBe(false);
        });

        it(' - Should pass filter when post\'s createTime whithin date period', function() {
            PostFilter.keywords = [];
            expect(PostFilter.filter(post)).toBe(true);
            DatePeriod.inBetween.and.returnValue(false);
            expect(PostFilter.filter(post)).toBe(false);
        });

        it(' - Should pass filter when post\'s category is visible', function() {
            PostFilter.keywords = [];
            expect(PostFilter.filter(post)).toBe(true);
            Category.isVisible.and.returnValue(false);
            expect(PostFilter.filter(post)).toBe(false);                        
        });
    });
});
