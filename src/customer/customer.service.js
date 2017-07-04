'use strict';

angular.module('Customer')
    .factory('customerService', function($http, $q, $location){

        return {
            getCustomer: function(){
                var deferred = $q.defer();

                $http({
                    method: 'GET', url: './src/api/customer.json'
                }).
                then (function success(response) {
                    if (response.data.error) {

                    } else {

                    }
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.status);
                });

                return deferred.promise;
            }
        }
    });
