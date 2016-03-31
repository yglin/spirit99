(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Geolocation', Geolocation);

    Geolocation.$inject = ['$window', '$q', '$log', 'Dialog'];

    /* @ngInject */
    function Geolocation($window, $q, $log, Dialog) {
        var self = this;
        self.prmsGetCurrentPosition = prmsGetCurrentPosition;

        ////////////////

        function prmsGetCurrentPosition () {
            var deferred = $q.defer();
            if($window.navigator && $window.navigator.geolocation
            && typeof $window.navigator.geolocation.getCurrentPosition === 'function'){
                $window.navigator.geolocation.getCurrentPosition(
                function(position){
                    deferred.resolve(position);
                },
                function (error) {
                    $log.warn(error);
                    Dialog.alert('定位失敗', '定位失敗，錯誤訊息如下：<br><p>' + error.message + '</p>');
                    deferred.reject(error);
                });
            }
            else{
                $log.warn('Browser not support geolocation');
                Dialog.alert('定位失敗', '很抱歉，您的瀏覽器不支援自動定位功能');
                deferred.reject('Browser not support geolocation');
            }
            return deferred.promise;
        }
    }
})();