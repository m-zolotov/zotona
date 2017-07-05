'use strict';

angular.module('OrderItem')
    .factory('orderItemService', function($http, $q, $location){
        var orderItemList = undefined;
        return {
            getOrderItems: function(){
                var deferred = $q.defer();
                if (orderItemList === undefined) {
                    $http({
                        method: 'GET', url: './src/api/items.json'
                    }).
                    then (function success(response) {
                        orderItemList = response.data;
                        deferred.resolve(JSON.parse(JSON.stringify(orderItemList)));
                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(orderItemList);
                }

                return deferred.promise;
            }
        }
    });
