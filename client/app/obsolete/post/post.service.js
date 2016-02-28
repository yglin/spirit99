// (function() {
//     'use strict';

//     angular
//         .module('spirit99')
//         .service('PostManager', PostManager);

//     PostManager.$inject = ['$rootScope', '$q', 'FakeData', 'UserCtrls', 'ChannelManager', 'Period'];

//     /* @ngInject */
//     function PostManager($rootScope, $q, FakeData, UserCtrls, ChannelManager, Period) {
//         var self = this;
//         self.posts = [];
//         self.promiseLoadPosts = promiseLoadPosts;
//         self.getPost = getPost;
//         self.searchPosts = searchPosts;

//         ////////////////
//         // TODO: Implement
//         function getPost (postMeta, options) {
//             options = typeof options === 'undefined' ? {} : options;
//             // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
//             return {};
//         };

//         // TODO: Implement
//         function promiseLoadPosts (postMeta, mapBounds) {
//             self.posts.length = 0;
//             return FakeData.genFakePosts({count: Math.floor(Math.random() * 45) + 5}).then(
//             function (fakePosts) {
//                 self.posts.push.apply(self.posts, fakePosts);
//                 for (var i = 0; i < self.posts.length; i++) {
//                     normalize(self.posts[i]);
//                 };
//                 searchPosts();
//                 return self.posts;
//             }, function (error) {
//                 console.debug(error);
//             });
//         };

//         function normalize(post) {
//             post.matchSearch = true;
//             var categories = ChannelManager.categories;
//             if(post.category && post.category in categories && categories[post.category].icon){
//                 if(typeof categories[post.category].icon === 'string'){
//                     post.categoryIcon = categories[post.category].icon;
//                 }
//                 else if('url' in categories[post.category].icon){
//                     post.categoryIcon = categories[post.category].icon.url;
//                 }
//                 else{
//                     post.categoryIcon = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png';
//                 }
//             }
//             else{
//                 post.categoryIcon = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png';                
//             }
//         }

//         function searchPosts () {
//             var categories = UserCtrls.search.categories;
//             var keywords = UserCtrls.search.keywords;
//             // console.log(keywords);
//             var startDate = Period.getPresetStart(UserCtrls.search.create_time.preset);
//             var endDate = Period.getPresetEnd(UserCtrls.search.create_time.preset);
//             for (var i = 0; i < self.posts.length; i++) {
//                 var post = self.posts[i];
//                 post.matchSearch = true;

//                 for (var j = 0; j < keywords.length; j++) {
//                     if(post.title.indexOf(keywords[j]) < 0){
//                         post.matchSearch = false;
//                         break;
//                     }
//                 };
                
//                 var createTime = new Date(post.create_time);
//                 if(Period.inBetween(createTime, startDate, endDate)){
//                     post.matchSearch = post.matchSearch && true;
//                 }
//                 else{
//                     post.matchSearch = false;
//                 }

//                 if(post.category in categories){
//                     post.matchSearch = post.matchSearch && categories[post.category].show;
//                 }
//                 else{
//                     post.matchSearch = false;
//                 }

//             }
//             $rootScope.$broadcast('search:changed');
//         }
//     }
// })();