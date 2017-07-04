'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/order/order-details.template.html',
        controller: ['orderService', 'authService', 'userService', '$routeParams', function(orderService, authService, userService, $routeParams) {
            var self = this;
            self.title = 'Детали заказа';
            var orderID = $routeParams.orderID;

            orderService.getOrder(orderID).then(function(value) {
                self.order = value;
            });
        }]
    });