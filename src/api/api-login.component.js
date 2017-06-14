'use strict';

angular.module('API')
    .component('apiLogin', {
        templateUrl: 'src/api/api-login.template.html',
        controller: ['userService', '$http', '$q', '$routeParams', '$location', 'apiService', function(userService, $http, $q, $routeParams, $location, apiService) {
            var self = this;
            self.user = {};
            self.user.username = "";
            self.user.password = "";
            self.setUser = function () {
                localStorage.setItem('username', String(self.user.username));
                localStorage.setItem('password', String(self.user.password));
                userService.getUser().then(function(value) {
                    apiService.setLogin(value).then(function(value) {

                    });
                });
            };
        }]
    });