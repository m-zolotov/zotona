'use strict';

angular.module('API')
    .component('apiUser', {
        templateUrl: 'src/api/api-user.template.html',
        controller: ['$http', '$q', '$routeParams', '$location', 'apiService', function($http, $q, $routeParams, $location, apiService) {
            var self = this;
            console.log ('Hi!');

            //console.log ('user', user);

            //$location.path('/authorization');
            apiService.getUser().then(function(value) {
                self.login = value;
                if (login === false) {
                    $location.path('/authorization');
                }
            });

        }]
    });