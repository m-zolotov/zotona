'use strict';

angular.module('API')
    .component('apiLogin', {
        templateUrl: 'src/api/api-login.template.html',
        controller: ['apiService', function(apiService) {
            var self = this;

            self.user = null;
            self.allUsers = [];
            self.setUser = function () {
                var currentUser = self.user;
                apiService.setLogin(currentUser).then(function(value) {
                    localStorage.setItem('username', String(value.username));
                    localStorage.setItem('password', String(value.password));
                });
            };
        }]
    });