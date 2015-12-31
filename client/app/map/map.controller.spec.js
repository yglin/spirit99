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

    describe(' - General map event propagation', function () {
        it(' - Should propagate event and map model to child scopes', function () {
            spyOn($scope, '$broadcast');
            controller.propagateMapEvent({}, 'some_event');
            expect($scope.$broadcast).toHaveBeenCalledWith('map:some_event', controller.map);
        });
    });
});