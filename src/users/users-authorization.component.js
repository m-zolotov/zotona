'use strict';

angular.module('Users')
    .component('usersAuthorization', {
        templateUrl: 'src/users/users-authorization.template.html',
        controller: ['userService', '$http', '$q', '$routeParams', '$location', 'apiService', function(userService, $http, $q, $routeParams, $location, apiService) {
            var self = this;
            self.user = {};
            var userData = self.user;
            self.user.username = "";
            self.user.password = "";
            self.setUser = function (userData) {
                console.log('userData', userData);
                userService.getUser(userData).then(function(value) {
                    self.user = value;
                    //localStorage.setItem('username', String(self.user.username));
                    //localStorage.setItem('password', String(self.user.password));
                    apiService.getUser().then(function(value) {
                        var museri = value;
                        if (self.user.username === museri.username && self.user.password === museri.password) {
                            $location.path('/orders/list');
                        }
                    });
                });
            };
        }]
    });