'use strict';

angular.module('myApp', ['ngRoute', 'Users', 'Orders']);

angular.module('myApp')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/authorization', {
                template: '<users-authorization></users-authorization>'
            })
            .when('/orders/list', {
                template: '<orders-list></orders-list>'
            })
            .when('/orders/:orderId', {
                template: '<orders-details></orders-details>'
            })
            .otherwise({
                redirectTo: '/authorization'
            });
    }]);
