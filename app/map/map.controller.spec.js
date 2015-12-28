'use strict';

describe('MapController', function () {
    beforeEach(module('spirit99'));

    // <<<<<<<<<<<<<<<<<<<<< Initialize MapController and some global dependencies
    var controller;
    var DEFAULTS;
    var $rootScope;
    var $scope;
    beforeEach(inject(function (_$rootScope_, _DEFAULTS_, $controller) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        DEFAULTS = _DEFAULTS_;
        controller = $controller('MapController', {
            $scope: $scope,
            initMapArea: DEFAULTS.map
        });
    }));
    // >>>>>>>>>>>>>>>>>>>>> Initialize MapController and some global dependencies

    describe(' - Initial map area scheme undetermined', function () {
        it(' - Initial map area should be default', function () {
            expect(controller.map.center).toEqual(DEFAULTS.map.center);
            expect(controller.map.zoom).toEqual(DEFAULTS.map.zoom);
        });
    });

    describe(' - Event: Map\'s tiles loaded', function () {
        it(' - $scope.$broadcast should be called with "map:tilesloaded" and map object', function () {
            spyOn($scope, '$broadcast');
            controller.handlerTilesLoaded({}, 'tilesloaded');
            expect($scope.$broadcast).toHaveBeenCalledWith('map:tilesloaded', controller.map);
        });
    });

    describe(' - Event: User done dargging map', function () {
        it(' - $scope.$broadcast should be called with "map:dragend" and map object', function () {
            spyOn($scope, '$broadcast');
            controller.handlerDragend({}, 'dragend');
            expect($scope.$broadcast).toHaveBeenCalledWith('map:dragend', controller.map);
        });
    });
});