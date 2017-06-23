'use strict';

angular.module('Authorization')
    .factory('authService', function($http, $q, $location){
        var user = null;

        return {
            login: function (username, password) {
                var deferred = $q.defer();

                $http({
                    method: 'GET', url: './src/api/login.json'
                }).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.status);
                });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET', url: './src/api/logout.json'
                }).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.status);
                });

                return deferred.promise;
            }
        }
    });
