'use strict';

angular.module('Orders')
    .component('orderDetail', {
        templateUrl: 'orders/orders-details.template.html',
        controller: ['orderService', '$http', '$q', '$routeParams', function(orderService, $http, $q, $routeParams) {
            var self = this;

        }]
    });