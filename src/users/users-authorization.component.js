'use strict';

angular.module('Users')
    .component('usersAuthorization', {
        templateUrl: 'src/users/users-authorization.template.html',
        controller: ['userService', '$http', '$q', '$routeParams', '$location', function(userService, $http, $q, $routeParams, $location) {
            var self = this;
            userService.getUser().then(function(value) {
                self.user = value;
            });
        }]
    });