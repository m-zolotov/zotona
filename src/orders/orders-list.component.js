'use strict';

angular.module('Orders')
    .component('ordersList', {
        templateUrl: 'orders/orders-list.template.html',
        controller: ['orderService', '$http', '$q', '$routeParams', function(orderService, $http, $q, $routeParams) {
            var self = this;

        }]
    });