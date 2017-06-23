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
                        console.log('Ошибка', 'data:', response.data.data);
                    } else {
                        $location.path('/orders/list');
                        console.log('Ошибки нет', 'data:', response.data.data);
                    }
                    deferred.resolve(response.data.data);
                },function error(response) {
                    deferred.reject(response.status);
                });

                return deferred.promise;
            }
        }
    });
