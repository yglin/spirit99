'use strict';

describe('SpiritManager', function () {

    beforeEach(module('spirit99'));

    var SpiritManager, FakeData;
    beforeEach(inject(function (_SpiritManager_, _FakeData_) {
        SpiritManager = _SpiritManager_;
        FakeData = _FakeData_;
    }));

    // describe(' - promiseLoadSpirits()', function () {
        // var $spirit, $httpBackend;
        // beforeEach(inject(function (_$spirit_, _$httpBackend_) {
        //     $spirit = _$spirit_;
        //     $httpBackend = _$httpBackend_;
        // }));

        // afterEach(function () {
        //     $httpBackend.verifyNoOutstandingExpectation();
        // });

        // it(' - Should return spirits if success', function () {
        //     var fakeSpirits = FakeData.genFakeSpirits(5);
        //     $httpBackend.expectGET(/\/fake\.url\.to\/spirit/)
        //     .respond(200, fakeSpirits);

        //     var spirits;
        //     var spiritsReceiver = jasmine.createSpy('spiritsReceiver')
        //     .and.callFake(function (responds) {
        //         spirits = responds;
        //     });
        //     var options = {
        //         Spirit: $spirit('http://fake.url.to/spirit'),
        //         spiritsCache: {},
        //         mapBounds: {}
        //     };
        //     SpiritManager.promiseLoadSpirits(options).then(spiritsReceiver);
        //     $httpBackend.flush();
        //     expect(spiritsReceiver).toHaveBeenCalled();
        //     expect(spirits.length).toEqual(fakeSpirits.length);
        //     expect(angular.toJson(spirits)).toEqual(angular.toJson(fakeSpirits));
        // });
        
        // it(' - Should call ErrorHandler if failed', function () {
            
        // });
    // });


});
