'use strict';

angular.module('Users')
    .component('usersAuthorization', {
        templateUrl: 'src/users/users-authorization.template.html',
        controller: ['userService', '$http', '$q', '$routeParams', '$location', 'apiService', function(userService, $http, $q, $routeParams, $location, apiService) {
            var self = this;
            self.user = {};
            self.user.username = "";
            self.user.password = "";
            self.setUser = function (userData) {
                console.log('userData', userData);
                userService.getUser(userData).then(function(value) {
                    self.user = value;
                });
            };
        }]
    });