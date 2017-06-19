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
                apiService.setAuthorizedUser(currentUser).then(function(value) {
                    sessionStorage.setItem('username', String(value.username));
                    sessionStorage.setItem('password', String(value.password));
                });
            };
            self.loginFormSubmit = function () {
                console.log('hi');
            };
            self.resetForm = function () {
                self.user.username = null;
                self.user.password = null;
            };
        }]
    });