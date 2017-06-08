'use strict';

angular.module('Orders')
    .component('ordersDetails', {
        templateUrl: 'src/orders/orders-details.template.html',
        controller: ['ordersService', '$http', '$q', '$routeParams', function(ordersService, $http, $q, $routeParams) {
            var self = this;
            var orderID = $routeParams.orderID;
            ordersService.getOrder(orderID).then(function(value) {
                self.order = value;
            });
        }]
    });