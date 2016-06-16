(function(angular, undefined) {
'use strict';

angular.module('spirit99')

.constant('CONFIG', {MIN_POSTS_FOR_LIST:10,CHANNEL_SAVING_FIELDS:['portal-url','id','title','description','logo-url'],ENV:'development',DEBUG:true,MARKER_CLUSTER_TYPE:'cluster',SERVER_URL:'http://localhost:9000',GOOGLE_CLIENT_API_KEY:'AIzaSyCewhA8IKkKYEWgW0e5bSThsw6sNKauliE'})

;
})(angular);