/*
* @Author: yglin
* @Date:   2016-07-23 11:17:55
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-23 14:33:29
*/

(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostViewer', PostViewer);

    PostViewer.$inject = ['$rootScope', '$mdDialog', '$mdMedia'];

    /* @ngInject */
    function PostViewer($rootScope, $mdDialog, $mdMedia) {
        var self = this;
        self.showDialog = showDialog;

        ////////////////
        
        activate();

        function activate() {
            if ($mdMedia('gt-sm')) {
                $rootScope.$on('post:show', function (event, post) {
                    self.showDialog(post);
                });                
            }
        }

        function showDialog(post) {
            if (!$mdMedia('gt-sm')) {
                return;
            }
            var template = '<md-dialog style="background-color: rgba(0,0,0,0.5);" aria-label="Post View Dialog">';
            template += '<s99-post-viewer post="$ctrl.post"></s99-post-viewer>';
            template += '</md-dialog>';
            $mdDialog.show({
                template: template,
                clickOutsideToClose: true,
                controller: function () {},
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    post: post
                }
            });
        }
    }
})();