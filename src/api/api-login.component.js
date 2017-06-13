'use strict';

angular.module('API')
    .component('apiLogin', {
        templateUrl: 'src/api/api-login.template.html',
        controller: ['$http', '$q', '$routeParams', '$location', 'apiService', function($http, $q, $routeParams, $location, apiService) {
            var self = this;
        }]
    });