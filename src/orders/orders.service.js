'use strict';

angular.module('Orders')
    .factory('ordersService', function($http, $q){
        var ordersList = undefined;
        return{
            getData: function(){
                var deferred = $q.defer();
                if (ordersList === undefined) {
                    $http({
                        method: 'GET', url: './src/data/orders.json'
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
            },
            getOrder: function(orderID){
                var deferred = $q.defer();
                var orderDetail = undefined;
                this.getData().
                then(function success(orders) {
                    for (var i = 0; i < ordersList.length; i++) {
                        if (ordersList[i].id === orderID) {
                            orderDetail = ordersList[i];
                            deferred.resolve(JSON.parse(JSON.stringify(orderDetail)));
                            break;
                        }
                    }
                },function error(orders) {
                    deferred.reject(orders.status);
                });

                return deferred.promise;
            }
        }
    });