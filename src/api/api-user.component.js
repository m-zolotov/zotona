'use strict';

angular.module('API')
    .component('apiUser', {
        templateUrl: 'src/api/api-user.template.html',
        controller: ['$http', '$q', '$routeParams', '$location', 'apiService', function($http, $q, $routeParams, $location, apiService) {
            (function () {
                apiService.getUser().then(function(value) {
                    var user = value;
                    if (user.username === 'true' && user.password === 'true') {
                        $location.path('/orders/list');

                    } else {
                        $location.path('/authorization');
                    }
                });
            })();
        }]
    });