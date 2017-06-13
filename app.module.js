'use strict';

angular.module('myApp', ['ngRoute', 'API', 'Users', 'Orders']);

angular.module('myApp')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/api/user', {
                template: '<api-user></api-user>'
            })
            .when('/api/login', {
                template: '<api-login></api-login>'
            })
            .when('/authorization', {
                template: '<users-authorization></users-authorization>'
            })
            .when('/orders/list', {
                template: '<orders-list></orders-list>'
            })
            .when('/orders/:orderID', {
                template: '<orders-details></orders-details>'
            })
            .otherwise({
                redirectTo: '/api/user'
            });
    }]);
