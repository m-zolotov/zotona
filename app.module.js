'use strict';

angular.module('app', ['ngRoute', 'Authorization', 'User', 'Order']);

angular.module('app')
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            /*.when('/', {
                template: '<home></home>'
            })*/
            .when('/', {
                template: '<authorization></authorization>'
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