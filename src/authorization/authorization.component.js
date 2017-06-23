'use strict';

angular.module('Authorization')
    .component('authorization', {
        templateUrl: 'src/authorization/authorization.template.html',
        controller: ['authService', 'userService', function(authService, userService) {
            var self = this;
            self.user = null;
            self.notCorrect = function () {
                self.hint = true;
            };

            userService.getCurrentUser().then(function(value) {
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
                        userService.getCurrentUser().then(function(value) {
                            if (value) {
                                self.user = value;
                            }
                        });
                    }
                });
            };

            self.logoutUser = function () {
                authService.logout().then(function(value) {
                    if (value.error) {
                        console.log(value.message, 'data:', value.data);
                    } else {
                        console.log(value.message, 'data:', value.data);
                        userService.getCurrentUser().then(function(value) {
                            if (value) {
                                self.user = value;
                            }
                        });
                    }
                });
            };
        }]
    });