'use strict';

angular.module('app', ['ngRoute', 'Authorization', 'User', 'Order', 'OrderItem', 'Customer']);

angular.module('app')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<authorization></authorization>'
            })
            .when('/order/list', {
                template: '<orders-list></orders-list>'
            })
            .when('/order/create', {
                template: '<order-create></order-create>'
            })
            .when('/order/:orderID', {
                template: '<order-details></order-details>'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);