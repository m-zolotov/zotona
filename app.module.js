'use strict';

angular.module('app', ['ngRoute', 'Home', 'API', 'User', 'Order']);

angular.module('app')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<home></home>'
            })
            .when('/login', {
                template: '<api-login></api-login>'
            })
            .when('/orders/list', {
                template: '<orders-list></orders-list>'
            })
            .when('/orders/:orderID', {
                template: '<order-details></order-details>'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);