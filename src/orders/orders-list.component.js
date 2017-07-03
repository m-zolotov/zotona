'use strict';

angular.module('Order')
    .component('ordersList', {
        templateUrl: 'src/orders/orders-list.template.html',
        controller: ['orderService', 'authService', 'userService', function(orderService, authService, userService) {
            var self = this;

            self.title = 'Список заказов';
            self.ordersListFilter = '';

            userService.getCurrentUser();

            /*authService.getUser().then(function(value) {
                self.user = value;
            });*/

            orderService.getList().then(function(value) {
                self.orders = value;
            });

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