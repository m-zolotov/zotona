'use strict';

angular.module('Home')
    .component('home', {
        templateUrl: 'src/home/home.template.html',
        controller: ['$routeParams', 'apiService', function($routeParams, apiService) {
            var self = this;

            apiService.getCurrentUser();

            apiService.getUser().then(function(value) {
                self.user = value;
            });
        }]
    });