'use strict';

var FakeData = require('../../../../mocks/data.js');

describe('PostFilter', function () {
    
    beforeEach(angular.mock.module('spirit99'));
    
    var PostFilter, $rootScope, scope;
    var onFilterChanged;
    beforeEach(inject(function (_PostFilter_, _$rootScope_) {
        PostFilter = _PostFilter_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
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

    describe(' - filter()', function() {
        var post;
        beforeEach(function() {
            post = FakeData.genPosts({count:1})[0];
        });

        it(' - Should pass filters only when post\'s title contains all keywords', function() {
            post.title = 'This world has enough for everyone\'s need, but not for everyone\'s greed';
            PostFilter.keywords = ['need', 'greed'];
            expect(PostFilter.filter(post)).toBe(true);
            PostFilter.keywords.push('seed');
            expect(PostFilter.filter(post)).toBe(false);
        });
    });
});
