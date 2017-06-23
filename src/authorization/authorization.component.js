'use strict';

angular.module('Authorization')
    .component('authorization', {
        templateUrl: 'src/authorization/authorization.template.html',
        controller: ['authService', function(authService) {
            var self = this;
            self.user = null;
            self.notCorrect = function () {
                self.hint = true;
            };

            authService.getCurrentUser().then(function(value) {
                if (value) {
                    self.user = value;
                }
            });

            self.loginUser = function (username, password) {
                authService.login(username, password).then(function(value) {
                    if (value.error) {
                        console.log(value.message, 'data:', value.data);
                        self.notCorrect();
                    } else {
                        console.log(value.message, 'data:', value.data);
                        authService.getCurrentUser().then(function(value) {
                            if (value) {
                                self.user = value;
                            }
                        });
                    }
                });
            };

            self.logoutUser = function () {
                authService.logout();
            };
        }]
    });