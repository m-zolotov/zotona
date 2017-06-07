'use strict';

angular.module('Orders')
    .component('ordersList', {
        templateUrl: 'src/orders/orders-list.template.html',
        controller: ['ordersService', '$http', '$q', '$routeParams', function(ordersService, $http, $q, $routeParams) {
            var self = this;
            ordersService.getData().then(function(value) {
                self.orders = value;
            });
        }]
    });