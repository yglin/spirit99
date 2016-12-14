(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('DatePeriod', DatePeriod);

    DatePeriod.$inject = [];

    /* @ngInject */
    function DatePeriod() {
        var self = this;
        self.getPreset = getPreset;
        self.getPresetStart = getPresetStart;
        self.getPresetEnd = getPresetEnd;
        self.getPresetTitle = getPresetTitle;
        self.inBetween = inBetween;
        self.presets = defaultPresets();

        ////////////////

        function getPreset(presetID) {
            if(presetID in self.presets){
                return self.presets[presetID];
            }
            else{
                return {};
            }
        }

        function getPresetTitle (presetID) {
            var preset = getPreset(presetID);
            if('title' in preset){
                return preset.title;
            }
            else{
                return '';
            }
        }

        function getPresetStart (presetID) {
            var preset = getPreset(presetID);
            if('start' in preset){
                return preset.start;
            }
            else{
                return new Date(0);
            }
        }

        function getPresetEnd (presetID) {
            return new Date();
        }

        function inBetween (theTime, startTime, endTime) {
            theTime = new Date(theTime);
            if(theTime >= startTime && theTime <= endTime){
                return true;
            }
            else{
                return false;
            }
        }

        function defaultPresets () {
            var presets = {
                inTheDay: {
                    title: '一天內',
                },
                inTheWeek: {
                    title: '一週內'
                },
                inTheMonth: {
                    title: 'ㄧ個月內'
                },
                inTheYear: {
                    title: '一年內'
                },
                anyTime: {
                    title: '不限時間'
                },
                custom: {
                    title: '自訂日期'
                }
            };
            // In the past day
            presets.inTheDay.start = new Date();
            presets.inTheDay.end = new Date();
            presets.inTheDay.start.setDate(presets.inTheDay.end.getDate() - 1);

            // In the past week
            presets.inTheWeek.start = new Date();
            presets.inTheWeek.end = new Date();
            presets.inTheWeek.start.setDate(presets.inTheWeek.end.getDate() - 7);

            // In the past month
            presets.inTheMonth.start = new Date();
            presets.inTheMonth.end = new Date();
            presets.inTheMonth.start.setMonth(presets.inTheMonth.end.getMonth() - 1);

            // In the past year
            presets.inTheYear.start = new Date();
            presets.inTheYear.end = new Date();
            presets.inTheYear.start.setFullYear(presets.inTheYear.end.getFullYear() - 1);

            // Any time from 1970
            presets.anyTime.start = new Date(0);
            presets.anyTime.end = new Date();

            // Default for custom, same as inTheYear
            presets.custom.start = new Date();
            presets.custom.end = new Date();
            presets.custom.start.setFullYear(presets.custom.end.getFullYear() - 1);            

            return presets;
        }

    }
})();
