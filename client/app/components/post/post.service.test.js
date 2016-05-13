'use strict';
        
var FakeData = require('../../../mocks/data.js');

describe('Post', function () {
    beforeEach(angular.mock.module('spirit99'));

    // Mock depemdencies
    var queryUrl = 'http://www.9493.tw/fake-channel/posts';
    var createUrl = 'http://www.9493.tw/fake-channel/posts/create';
    var readUrl = 'http://www.9493.tw/fake-channel/posts/:id';
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
                self.getReadUrl = jasmine.createSpy('getReadUrl')
                .and.returnValue(readUrl);
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

        angular.mock.module(function($provide) {
            $provide.service('PostFilter', mockPostFilter);
        
            mockPostFilter.$inject = [];
        
            function mockPostFilter () {
                var self = this;
                // self.property = {};
                self.filter = jasmine.createSpy('filter')
                .and.callFake(function () {
                    return true;
                });
            }
        });
    });


    var Post, PostFilter, $rootScope, scope, $httpBackend, $window;
    var fakePost;
    beforeEach(inject(function (_Post_, _PostFilter_, _$rootScope_, _$httpBackend_, _$window_) {
        Post = _Post_;
        PostFilter = _PostFilter_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $window = _$window_;
        fakePost = FakeData.genPosts({count: 1})[0];
    }));

    it(' - Should call issueQuery() on event "channel:tuned"', function() {
        spyOn(Post, 'issueQuery');
        $rootScope.$broadcast('channel:tuned');
        expect(Post.issueQuery).toHaveBeenCalled();
    });

    it(' - Should call issueQuery() on event "map:dragend"', function() {
        spyOn(Post, 'issueQuery');
        $rootScope.$broadcast('map:dragend');
        expect(Post.issueQuery).toHaveBeenCalled();
    });

    it(' - Should call onMapIdleReloadPosts() on events "map:zoom_changed"', function() {
        spyOn(Post, 'onMapIdleReloadPosts');
        $rootScope.$broadcast('map:zoom_changed');
        expect(Post.onMapIdleReloadPosts).toHaveBeenCalled();
    });

    it(' - Should call onMapIdleReloadPosts() on events "map:navigate"', function() {
        spyOn(Post, 'onMapIdleReloadPosts');
        $rootScope.$broadcast('map:navigate');
        expect(Post.onMapIdleReloadPosts).toHaveBeenCalled();
    });

    it(' - Should call applyFilters() on event "post:filterChanged"', function() {
        spyOn(Post, 'applyFilters');
        $rootScope.$broadcast('post:filterChanged');
        expect(Post.applyFilters).toHaveBeenCalled();        
    });

    // it(' - Should call prmsCreate() on event "map:click" with clicked location', function() {
    //     var location = {
    //         latitude: 23.456789,
    //         longitude: 135.797531
    //     };
    //     spyOn(Post, 'prmsCreate');
    //     $rootScope.$broadcast('map:click', location);
    //     expect(Post.prmsCreate).toHaveBeenCalledWith(location);
    // });
    // 
    describe(' - onMapIdleReloadPosts()', function() {
        beforeEach(function() {
            spyOn(Post, 'issueQuery');
        });
        
        it(' - Should call issueQuery() on received "map:idle" event', function() {
            Post.onMapIdleReloadPosts();
            $rootScope.$broadcast('map:idle');
            expect(Post.issueQuery).toHaveBeenCalled();
        });

        it(' - There should be "none or only one" process waiting at a time', function() {
            Post.onMapIdleReloadPosts();
            Post.onMapIdleReloadPosts();
            Post.onMapIdleReloadPosts();
            Post.onMapIdleReloadPosts();            
            $rootScope.$broadcast('map:idle');
            $rootScope.$broadcast('map:idle');
            $rootScope.$broadcast('map:idle');
            expect(Post.issueQuery.calls.count()).toBe(1);
        });
    });

    describe(' - issueQuery()', function() {
        beforeEach(function() {
            spyOn(Post, 'reloadPosts');            
        });
        
        it(' - Should call Post.reloadPosts() with last query parameters', function() {
            Post.issueQuery();
            expect(Post.reloadPosts).toHaveBeenCalledWith(Post.lastQuery);
        });

        it(' - Should set lastQuery\'s dirty flag true to indicate that it\'s a new coming query', function() {
            Post.lastQuery.dirty = false;
            Post.issueQuery();
            expect(Post.lastQuery.dirty).toBe(true);
        });
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
            expect(typeof post.category).toEqual('string');
            expect(typeof post.options).toEqual('object');
        })

        it(' - Normalized post.options should has fields: title, icon, visible', function() {
            expect(typeof post.options.title).toEqual('string');
            expect(typeof post.options.icon).toEqual('object');
            expect(typeof post.options.visible).toEqual('boolean');
        });
    });

    describe(' - reloadPosts()', function() {
        var query, fakePosts;
        beforeEach(function() {
            // Mock $http call for posts
            query = {
                channel: 'ooxx',
                bounds: FakeData.bounds,
                dirty: true
            };
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

        it(' - Should unset query\'s dirty flag before sending http request', function() {
            Post.reloadPosts(query);
            expect(query.dirty).toBe(false);
        });

        it(' - After received http response, should cancel if query has been set dirty again', function() {
            Post.reloadPosts(query);
            query.dirty = true;
            $httpBackend.flush();
            expect(Post.posts).toEqual([]);
        });

        it(' - Should populate received posts into Post.posts', function() {
            Post.reloadPosts(query);
            $httpBackend.flush();
            expect(Post.posts.length).toBe(fakePosts.length);
            expect(Post.posts).toEqual(fakePosts);
        });

        it(' - Should call validate() and normalize() on each received post', function() {
            Post.reloadPosts(query);
            $httpBackend.flush();
            expect(Post.validate.calls.count()).toBe(fakePosts.length);
            expect(Post.normalize.calls.count()).toBe(fakePosts.length);
        });

        it(' - Should broadcast "progress:start" before and "progress:end" after reloadPosts()', function() {
            var onPostLoadStart = jasmine.createSpy('onPostLoadStart');
            scope.$on('progress:start', onPostLoadStart);
            var onPostLoadEnd = jasmine.createSpy('onPostLoadEnd');
            scope.$on('progress:end', onPostLoadEnd);
            Post.reloadPosts(query);
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

    describe(' - applyFilters()', function() {
        beforeEach(function() {
            Post.posts = FakeData.genPosts({count:5});
        });

        it(' - Should set options.visible true on passed all filters', function() {
            Post.applyFilters();
            for (var i = 0; i < Post.posts.length; i++) {
                expect(Post.posts[i].options.visible).toBe(true);
            };
        });
    });
});
