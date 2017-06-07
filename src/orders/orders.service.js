'use strict';

angular.module('Orders')
    .factory('ordersService', function($http, $q){
        var ordersList = undefined;
        return{
            getData: function(){
                var deferred = $q.defer();
                if (ordersList === undefined) {
                    $http({
                        method: 'GET', url: './src/api/orders.json'
                    }).
                    then (function success(response) {
                        ordersList = response.data;
                        deferred.resolve(JSON.parse(JSON.stringify(ordersList)));
                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(ordersList);
                }

                return deferred.promise;
            }
        }
    });