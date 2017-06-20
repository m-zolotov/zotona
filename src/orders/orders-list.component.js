'use strict';

angular.module('Order')
    .component('ordersList', {
        templateUrl: 'src/orders/orders-list.template.html',
        controller: ['orderService', 'apiService', function(orderService, apiService) {
            var self = this;

            self.title = 'Список заказов';
            self.ordersListFilter = '';

            apiService.getCurrentUser();

            apiService.getUser().then(function(value) {
                self.user = value;
            });

            orderService.getList().then(function(value) {
                self.orders = value;
            });

            self.getOut = function () {
                apiService.getOutOfAccount();
            };
        }]
    });