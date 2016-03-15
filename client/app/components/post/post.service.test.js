'use strict';
        
var FakeData = require('../../../mocks/data.js');

describe('Post', function () {
    beforeEach(angular.mock.module('spirit99'));

    // Mock depemdencies
    var queryUrl = 'http://www.9493.tw/fake-channel/posts';
    var createUrl = 'http://www.9493.tw/fake-channel/posts/create';
    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Channel', mockChannel);
        
            mockChannel.$inject = [];
        
            function mockChannel () {
                var self = this;
                self.channels = {};
                self.getQueryUrl = jasmine.createSpy('getQueryUrl')
                .and.returnValue(queryUrl);
                self.getCreateUrl = jasmine.createSpy('getCreateUrl')
                .and.returnValue(createUrl);
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Category', mockCategory);
        
            mockCategory.$inject = [];
        
            function mockCategory () {
                var self = this;
                self.getIcon = jasmine.createSpy('getIcon')
                .and.returnValue({});
            }
        });
    });


    var Post, $rootScope, scope, $httpBackend, $window;
    var fakePost;
    beforeEach(inject(function (_Post_, _$rootScope_, _$httpBackend_, _$window_) {
        Post = _Post_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $window = _$window_;
        fakePost = FakeData.genPosts({count: 1})[0];
    }));

    it(' - Should call reloadPosts() on event "channel:tuned"', function() {
        spyOn(Post, 'reloadPosts');
        $rootScope.$broadcast('channel:tuned');
        expect(Post.reloadPosts).toHaveBeenCalled();
    });

    it(' - Should call reloadPosts() on event "map:idle"', function() {
        spyOn(Post, 'reloadPosts');
        $rootScope.$broadcast('map:idle');
        expect(Post.reloadPosts).toHaveBeenCalled();
    });

    it(' - Should call prmsCreate() on event "map:click" with clicked location', function() {
        var location = {
            latitude: 23.456789,
            longitude: 135.797531
        };
        spyOn(Post, 'prmsCreate');
        $rootScope.$broadcast('map:click', location);
        expect(Post.prmsCreate).toHaveBeenCalledWith(location);
    });

    describe(' - validate()', function() {
        it(' - Should return true only when required fields matched', function() {
            var post = {};
            expect(Post.validate(post)).toBe(false);
            post.id = 54065;
            post.title = '我是林老木';
            post.latitude = 12.345678;
            post.longitude = '123.45678';
            expect(Post.validate(post)).toBe(false);
            post.longitude = 123.45678;
            expect(Post.validate(post)).toBe(true);        
        });
    });

    describe(' - normalize()', function() {
        var post;
        beforeEach(function() {
            post = angular.copy(fakePost);
            Post.normalize(post);
        });

        it(' - Normalized post should has fields: catagory, options', function() {
            expect('category' in post).toBe(true);
            expect('options' in post).toBe(true);
        })

        it(' - Normalized post.options should has fields: title, icon', function() {
            expect('title' in post.options).toBe(true);
            expect('icon' in post.options).toBe(true);
        });
    });

    describe(' - reloadPosts()', function() {
        var fakePosts;
        beforeEach(function() {
            // Mock $http call for posts
            fakePosts = FakeData.genPosts({count: 11});
            var queryUrlRegex = queryUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var urlRegex = new RegExp(queryUrlRegex + '.*');
            $httpBackend.when('GET', urlRegex).respond(200, fakePosts);

            // Mock validate()
            spyOn(Post, 'validate').and.callFake(function () {
                return true;
            });

            // Mock normalize()
            spyOn(Post, 'normalize');
        });

        it(' - Should populate received posts into Post.posts', function() {
            Post.reloadPosts();
            $httpBackend.flush();
            expect(Post.posts.length).toBe(fakePosts.length);
            expect(Post.posts).toEqual(fakePosts);
        });

        it(' - Should call validate() and normalize() on each received post', function() {
            Post.reloadPosts();
            $httpBackend.flush();
            expect(Post.validate.calls.count()).toBe(fakePosts.length);
            expect(Post.normalize.calls.count()).toBe(fakePosts.length);
        });

        it(' - Should broadcast "post:loadStart" before and "post:loadEnd" after reloadPosts()', function() {
            var onPostLoadStart = jasmine.createSpy('onPostLoadStart');
            scope.$on('post:loadStart', onPostLoadStart);
            var onPostLoadEnd = jasmine.createSpy('onPostLoadEnd');
            scope.$on('post:loadEnd', onPostLoadEnd);
            Post.reloadPosts();
            expect(onPostLoadStart).toHaveBeenCalled();
            expect(onPostLoadEnd).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(onPostLoadEnd).toHaveBeenCalled();
        });
    });

    describe(' - prmsCreate()', function() {
        
        var location;
        beforeEach(function() {
            location = {
                latitude: 23.456789,
                longitude: 135.797531
            };                    
        });

        it(' - Should redirect to create-url of channel', function() {
            spyOn($window.location, 'replace');
            Post.prmsCreate(location);
            var redirectUrl = createUrl + '?latitude=' + location.latitude + '&longitude=' + location.longitude;
            expect($window.location.replace).toHaveBeenCalledWith(redirectUrl);
        });
    });
});
