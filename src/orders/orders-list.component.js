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
                authService.logout();
            };
        }]
    });