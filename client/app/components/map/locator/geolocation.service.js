(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Geolocation', Geolocation);

    Geolocation.$inject = ['$window', '$location', '$timeout', '$q', '$log', 'Dialog'];

    /* @ngInject */
    function Geolocation($window, $location, $timeout, $q, $log, Dialog) {
        var self = this;
        self.prmsGetCurrentPosition = prmsGetCurrentPosition;

        ////////////////

        function prmsGetCurrentPosition () {
            var deferred = $q.defer();

            if($window.navigator && $window.navigator.geolocation
            && typeof $window.navigator.geolocation.getCurrentPosition === 'function'){

                // Wait user decision for 5 seconds
                var waitUser = $q.defer();
                var waitUserDelay = 10000;

                $window.navigator.geolocation.getCurrentPosition(
                function(position){
                    if (waitUser.promise.$$state.status === 0) {
                        waitUser.resolve();
                        deferred.resolve(position);
                    }
                },
                function (error) {
                    if (waitUser.promise.$$state.status === 0) {
                        waitUser.resolve();
                        $log.warn(error);
                        var alertMessage = errorMessage(error);
                        Dialog.alert('定位失敗', alertMessage)
                        .finally(function () {
                            deferred.reject(error);                    
                        });
                    }
                }, {
                    enableHighAccuracy: true,
                    timeout: waitUserDelay,
                    maximumAge: 0
                });

                // Cancel geolocation after waitUserDelay timeout
                $timeout(function () {
                    waitUser.reject();
                }, waitUserDelay);

                waitUser.promise
                .catch(function () {
                    if (deferred.promise.$$state.status === 0) {
                        var alertMessage = '超過等待時間，取消自動定位';
                        Dialog.alert('定位失敗', alertMessage)
                        .finally(function () {
                            deferred.reject();                    
                        });
                    }
                    else {
                        deferred.reject();
                    }
                });
            }
            else{
                $log.warn('Browser not support geolocation');
                Dialog.alert('定位失敗', '很抱歉，您的瀏覽器不支援自動定位功能')
                .finally(function () {
                    deferred.reject('Browser not support geolocation');
                });
            }

            return deferred.promise;
        }

        function errorMessage(error) {
            if (error.message.indexOf('Only secure origins are allowed') >= 0) {
                var httpsLink = 'https://' + $location.host();
                return '定位失敗，請嘗試使用以下網址進入本站<br>' + '<a href="' + httpsLink + '">' + httpsLink + '</a>';
            }
            else {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        return '使用者已拒絕定位；或是您的瀏覽器已設定為禁止定位';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        return '無法找到您的位置';
                        break;
                    case error.TIMEOUT:
                        return '超過等待時間，取消自動定位';
                        break;
                    default:
                        return '未知原因的定位失敗，錯誤訊息如下：<br><p>' + error.message + '</p>';
                }
            }
        }
    }
})();