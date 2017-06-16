'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/orders/order-details.template.html',
        controller: ['orderService', 'apiService', '$routeParams', function(orderService, apiService, $routeParams) {
            var self = this;
            var orderID = $routeParams.orderID;

            apiService.getCurrentUser();

            apiService.getUser().then(function(value) {
                self.user = value;
            });

            orderService.getOrder(orderID).then(function(value) {
                self.order = value;
            });
        }]
    });