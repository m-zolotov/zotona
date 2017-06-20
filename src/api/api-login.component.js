'use strict';

angular.module('API')
    .component('apiLogin', {
        templateUrl: 'src/api/api-login.template.html',
        controller: ['apiService', function(apiService) {
            var self = this;

            self.user = null;
            self.allUsers = [];
            self.hint = false;
            self.loginNotCorrect = function () {
                self.hint = true;
            };
            self.setUser = function () {
                var currentUser = self.user;
                apiService.setAuthorizedUser(currentUser).then(function(value) {
                    if (value) {
                        sessionStorage.setItem('username', String(value.username));
                        sessionStorage.setItem('password', String(value.password));
                    } else {
                        self.loginNotCorrect();
                    }
                });
            };
            self.resetForm = function () {
                self.user.username = null;
                self.user.password = null;
            };
        }]
    });