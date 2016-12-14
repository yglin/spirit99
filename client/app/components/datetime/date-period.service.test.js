'use strict';
        
describe('DatePeriod', function () {
    beforeEach(angular.mock.module('spirit99'));
    var DatePeriod;
    beforeEach(inject(function (_DatePeriod_) {
        DatePeriod = _DatePeriod_;
    }));

    describe(' - getPresetStart()', function() {
        
        it(' - Should return start date of preset', function() {
            for (var presetID in DatePeriod.presets) {
                expect(DatePeriod.getPresetStart(presetID)).toEqual(DatePeriod.presets[presetID].start);
            }
        });

        it(' - Should reutrn 1970/1/1 if not specified preset', function() {
            expect(DatePeriod.getPresetStart(null)).toEqual(new Date(0));
        });
    });

    describe(' - getPresetEnd()', function () {
            
        it(' - Should return now whatever', function() {
            for (var presetID in DatePeriod.presets) {
                // The "new Date()" return current time in milisecods.
                // There could be a little delay from the time when createTime.end was set.
                // Therefore instead of testing equality of these 2 points in time, test their difference. 
                expect((new Date()).getTime() - DatePeriod.getPresetEnd(presetID).getTime()).toBeLessThan(1000);
            }
        });
    });

    describe(' - inBetween()', function() {
        var start, end, testTime;
        beforeEach(function() {
            start = DatePeriod.getPresetStart('inTheYear');
            end = new Date();
            testTime = new Date();            
        });
        
        it(' - Should Return true if subject time is between start time and end time', function() {
            testTime.setDate(testTime.getDate() - 182);
            expect(DatePeriod.inBetween(testTime, start, end)).toBe(true);
            testTime.setDate(testTime.getDate() - 365);
            expect(DatePeriod.inBetween(testTime, start, end)).toBe(false);
        });

        it(' - Should accept parameters as number(miliseconds from 1970/1/1) type', function() {
            testTime.setDate(testTime.getDate() - 182);
            expect(DatePeriod.inBetween(testTime.getTime(), start, end)).toBe(true);
            testTime.setDate(testTime.getDate() - 365);
            expect(DatePeriod.inBetween(testTime.getTime(), start.getTime(), end)).toBe(false);            
        });
    });
});
