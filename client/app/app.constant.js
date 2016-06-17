(function(angular, undefined) {
'use strict';

angular.module('spirit99')

.constant('CONFIG', {MIN_POSTS_FOR_LIST:10,CHANNEL_SAVING_FIELDS:['portal-url','id','title','description','logo-url'],ENV:'production',DEBUG:false,MARKER_CLUSTER_TYPE:'cluster',GOOGLE_CLIENT_API_KEY:'AIzaSyB72lwL0HWu-jdurOAWFMIUMPAL6aHeZ0s'})

;
})(angular);