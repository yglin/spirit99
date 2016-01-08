'use strict';
        
describe('s99StationListview', function () {

    var compile, scope, s99StationListviewElem;
    beforeEach(function(){
        module('spirit99');

        inject(function($compile, $rootScope){
            compile = $compile;
            scope = $rootScope.$new();
        });
      
        var element = angular.element('<s99-station-listview></s99-station-listview>');
        s99StationListviewElem = compile(element)(scope);
        scope.$digest();
    });

    it('Require station\'s logo, title, description, and a checkbox', function() {
        expect(s99StationListviewElem[0].querySelector('.s99-station-logo').length).not.toBe(0);
        expect(s99StationListviewElem[0].querySelector('.s99-station-title').length).not.toBe(0);
    });

});
