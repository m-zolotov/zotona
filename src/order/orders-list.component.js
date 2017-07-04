'use strict';

angular.module('Order')
    .component('ordersList', {
        templateUrl: 'src/order/orders-list.template.html',
        controller: ['orderService', 'authService', 'userService', function(orderService, authService, userService) {
            var self = this;

            self.title = 'Список заказов';
            self.ordersListFilter = '';

            userService.getCurrentUser();

            orderService.getList().then(function(value) {
                self.orders = value;
            });

            self.createOrder = function () {
                orderService.createOrder();
            };

            self.logoutUser = function () {
                authService.logout().then(function(value) {
                    if (value.error) {
                        // Сообщить пользователю
                    } else {
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