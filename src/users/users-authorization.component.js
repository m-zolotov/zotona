'use strict';

angular.module('Users')
    .component('usersAuthorization', {
        templateUrl: 'src/users/users-authorization.template.html',
        controller: ['userService', '$http', '$q', '$routeParams', '$location', function(userService, $http, $q, $routeParams, $location) {
            var self = this;
            self.user = {};
            self.user.login = '';
            self.user.password = '';
            self.setUser = function (sd) {
                console.log('sd', sd);
                userService.getUser(sd).then(function(value) {
                    self.user = value;
                });
            };
        }]
    });