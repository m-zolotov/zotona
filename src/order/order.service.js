'use strict';

angular.module('Order')
    .factory('orderService', function($http, $q){
        var ordersList = undefined;
        return{
            getList: function(){
                var deferred = $q.defer();
                if (!ordersList) {
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
            },
            getOrder: function(orderID){
                var deferred = $q.defer();
                var orderDetail = undefined;
                this.getList().
                then(function success() {
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
            },
            saveOrder: function(order){
                var deferred = $q.defer();
                function getMaxOrderId(orders) {
                    var maxID = 0;
                    for (var i = 0; i < orders.length; i++) {
                        if (maxID < Number(orders[i].id)) {
                            maxID = Number(orders[i].id);
                        }
                    }
                    return ++maxID;
                }
                this.getList().
                then(function success(orders) {
                    if (order.id === '-1') {
                        order.id = String(getMaxOrderId(orders));
                        ordersList.push(order);
                        deferred.resolve(JSON.parse(JSON.stringify(order)));
                    } else {
                        for (var i = 0; i < ordersList.length; i++) {
                            if (ordersList[i].id === order.id) {
                                ordersList[i].customerId = order.customerId;
                                ordersList[i].price = order.price;

                                ordersList[i].items = order.items;

                                deferred.resolve(JSON.parse(JSON.stringify(order)));
                                break;
                            }
                        }
                    }
                },function error(orders) {
                    deferred.reject(orders.status);
                });

                return deferred.promise;
            },
            createOrder: function(orderID){
                var deferred = $q.defer();
                this.getList().
                then(function success(orders) {
                    deferred.resolve(JSON.parse(JSON.stringify(ordersList)));
                },function error(orders) {
                    deferred.reject(orders.status);
                });

                return deferred.promise;
            }
        }
    });