(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Geolocation', Geolocation);

    Geolocation.$inject = ['$window', '$location', '$q', '$log', 'Dialog'];

    /* @ngInject */
    function Geolocation($window, $location, $q, $log, Dialog) {
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
                    var alertMessage = '';
                    console.log(error.message);
                    console.log(error.message.indexOf('Only secure origins are allowed'));
                    if (error.message.indexOf('Only secure origins are allowed') >= 0) {
                        var httpsLink = 'https://' + $location.host();
                        alertMessage = '定位失敗，請嘗試使用以下網址進入本站<br>';
                        alertMessage += '<a href="' + httpsLink + '">' + httpsLink + '</a>';
                    }
                    else {
                        alertMessage = '定位失敗，錯誤訊息如下：<br><p>' + error.message + '</p>';
                    }
                    Dialog.alert('定位失敗', alertMessage);
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