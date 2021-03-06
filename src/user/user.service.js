'use strict';

angular.module('User')
    .factory('userService', function($http, $q, $location){
        var user = null;

        return {
            getCurrentUser: function(){
                var deferred = $q.defer();

                $http({
                    method: 'GET', url: './src/api/user.json'
                }).
                then (function success(response) {
                    if (response.data.error) {
                        $location.path('/');
                    } else {
                        $location.path('/order/list');
                    }
                    deferred.resolve(response.data.data);
                },function error(response) {
                    deferred.reject(response.status);
                });

                return deferred.promise;
            }
        }
    });
