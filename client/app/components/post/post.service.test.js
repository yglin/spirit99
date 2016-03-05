'use strict';
        
describe('Post', function () {
    beforeEach(module('spirit99'));

    // Mock depemdencies
    var queryUrl = 'http://www.9493.tw/fake-channel/posts';
    beforeEach(function() {
        module(function($provide) {
            $provide.service('Channel', mockChannel);
        
            mockChannel.$inject = ['FakeData'];
        
            function mockChannel (FakeData) {
                var self = this;
                self.channels = {};
                self.getQueryUrl = jasmine.createSpy('getQueryUrl')
                .and.callFake(function () {
                    return queryUrl;
                });
            }
        });

        module(function($provide) {
            $provide.service('Category', mockCategory);
        
            mockCategory.$inject = [];
        
            function mockCategory () {
                var self = this;
                self.getIcon = jasmine.createSpy('getIcon')
                .and.returnValue({});
            }
        });
    });


    var Post, FakeData, $rootScope, $httpBackend;
    var fakePost;
    beforeEach(inject(function (_Post_, _FakeData_, _$rootScope_, _$httpBackend_) {
        Post = _Post_;
        FakeData = _FakeData_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        fakePost = FakeData.genFakePosts({count: 1})[0];
    }));

    it(' - Should call reloadPosts() on event "channel:tuned"', function() {
        spyOn(Post, 'reloadPosts');
        $rootScope.$broadcast('channel:tuned');
        expect(Post.reloadPosts).toHaveBeenCalled();
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
            fakePosts = FakeData.genFakePosts({count: 11});
            var queryUrlRegex = queryUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var urlRegex = new RegExp(queryUrlRegex + '.*');
            $httpBackend.when('GET', urlRegex).respond(200, fakePosts);

            // Mock validate()
            spyOn(Post, 'validate').and.callFake(function () {
                return true;
            });

            // Mock normalize()
            spyOn(Post, 'normalize');

            Post.reloadPosts();
            $httpBackend.flush();
        });

        it(' - Should populate received posts into Post.posts', function() {
            expect(Post.posts.length).toBe(fakePosts.length);
            expect(Post.posts).toEqual(fakePosts);
        });

        it(' - Should call validate() and normalize() on each received post', function() {
            expect(Post.validate.calls.count()).toBe(fakePosts.length);
            expect(Post.normalize.calls.count()).toBe(fakePosts.length);
        });
    });

});
