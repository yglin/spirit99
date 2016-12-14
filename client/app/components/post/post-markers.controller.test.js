'use strict';

describe('PostMarkersController', function () {

    beforeEach(angular.mock.module('spirit99'));

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Post', MockPost);
        
            MockPost.$inject = ['$q'];
        
            function MockPost ($q) {
                var self = this;
                // self.property = {};
                self.prmsCreate = jasmine.createSpy('prmsCreate')
                .and.returnValue($q.resolve());
            }
        });
    });

    var postMarkersVM, scope, $rootScope, Post;
    beforeEach(inject(function ($controller, _$rootScope_, _Post_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        Post = _Post_;
        postMarkersVM = $controller('PostMarkersController', {$scope: scope});
    }));

    describe(' - showInfoWindow', function() {
        var coords, templateUrl, templateParameter;
        beforeEach(function() {
            coords = {
                latitude: 56.5566,
                longitude: 78.7788
            };
            templateUrl = 'app/black/hole/info-window.tpl.html';
            templateParameter = { dididada: 'gubibapo' };
        });
        
        it(' - Should move info window to given coordinates and show given template', function() {
            expect(postMarkersVM.infoWindow.show).toBe(false);
            postMarkersVM.showInfoWindow(coords, templateUrl, templateParameter);
            expect(postMarkersVM.infoWindow.coords).toEqual(coords);
            expect(postMarkersVM.infoWindow.templateUrl).toEqual(templateUrl);
            expect(postMarkersVM.infoWindow.templateParameter).toEqual(templateParameter);
            expect(postMarkersVM.infoWindow.show).toBe(true);
        });
    });

    describe(' - createPost()', function() {

        var coords;
        beforeEach(function() {
            coords = {
                latitude: 99.876543,
                longitude: 12.345678
            };
        });

        it(' - Should call Post.prmsCreate with infoWindow\'s location', function() {
            postMarkersVM.showInfoWindow(coords);
            postMarkersVM.createPost();
            $rootScope.$digest();
            expect(Post.prmsCreate).toHaveBeenCalledWith(coords);
        });
    });
});
        
// describe('PostMarkersController', function () {

//     beforeEach(angular.mock.module('spirit99'));

//     var postMarkersVM;
//     beforeEach(inject(function ($controller) {
//         postMarkersVM = $controller('PostMarkersController');
//     }));

// });
