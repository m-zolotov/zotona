'use strict';

angular.module('Main')
    .component('mainPage', {
        templateUrl: 'src/main/main-page.template.html',
        controller: ['$http', '$q', '$routeParams', '$location', function($http, $q, $routeParams, $location) {
            var self = this;
            console.log ('Hi!');
            $location.path('/authorization');
            /*mainService.getUser().then(function(value) {
                if (value === true) {
                    $location.path('/authorization');
                }
            });*/

        }]
    });