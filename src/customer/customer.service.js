'use strict';

angular.module('Customer')
    .factory('customerService', function($http, $q, $location){
        var customersList = undefined;
        return {
            getCustomers: function(){
                var deferred = $q.defer();
                if (customersList === undefined) {
                    $http({
                        method: 'GET', url: './src/api/customer.json'
                    }).
                    then (function success(response) {
                        customersList = response.data;
                        deferred.resolve(JSON.parse(JSON.stringify(customersList)));
                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(customersList);
                }

                return deferred.promise;
            }
        }
    });
