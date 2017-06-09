'use strict';

angular.module('myApp', ['ngRoute', 'Main', 'Users', 'Orders']);

angular.module('myApp')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/", {
                template: '<main-page></main-page>'
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
                redirectTo: '/'
            });
    }]);
