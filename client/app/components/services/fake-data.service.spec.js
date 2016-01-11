'use strict';
        
describe('FakeData', function () {
    beforeEach(module('spirit99'));
    var FakeData, DEFAULTS;
    beforeEach(inject(function (_FakeData_, _DEFAULTS_) {
        FakeData = _FakeData_;
        DEFAULTS = _DEFAULTS_;
    }));

    describe(' - genFakeMap()', function () {
        it(' - Should has DEFAULT\'s center and zoom', function () {
            var map = FakeData.genFakeMap();
            expect(map).toEqual(DEFAULTS.map);
        });
    })

    describe(' - genFakeSpirits()', function () {
        it(' - Should return 10 fake spirits as default count', function () {
            var fakeSpirits = FakeData.genFakeSpirits();
            expect(fakeSpirits.length).toBe(10);
        });

        it(' - Should return 50 fake spirits if given options.count=50', function () {
            var fakeSpirits = FakeData.genFakeSpirits({count: 50});
            expect(fakeSpirits.length).toBe(50);
        });

        it(' - Should have property "id"', function () {
            var fakeSpirits = FakeData.genFakeSpirits();
            expect(_.sample(fakeSpirits).id).toBeDefined();
        });

        it(' - Should have property "latitude" and "longitude"', function () {
            var fakeSpirits = FakeData.genFakeSpirits(); 
            expect(_.sample(fakeSpirits).latitude).toBeDefined();           
            expect(_.sample(fakeSpirits).longitude).toBeDefined();           
        });

        it(' - Should have property "category"', function () {
            var fakeSpirits = FakeData.genFakeSpirits();
            expect(_.sample(fakeSpirits).category).toBeDefined();
        });

        it(' - None of spirits should have property "category" if given options.countHasCategory=0', function () {
            var fakeSpirits = FakeData.genFakeSpirits({countHasCategory: 0});
            expect(_.sample(fakeSpirits).category).toBeUndefined();
        });
    });
});