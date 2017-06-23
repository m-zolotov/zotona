'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/orders/order-details.template.html',
        controller: ['orderService', 'authService', '$routeParams', function(orderService, authService, $routeParams) {
            var self = this;
            self.title = 'Детали заказа';
            var orderID = $routeParams.orderID;

            authService.getCurrentUser();

            /*authService.getUser().then(function(value) {
                self.user = value;
            });*/

            orderService.getOrder(orderID).then(function(value) {
                self.order = value;
            });
        }]
    });