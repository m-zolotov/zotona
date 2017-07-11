'use strict';

angular.module('Order')
    .factory('orderService', function($http, $q, $location){
        var ordersList = undefined;
        var orderItemList = undefined;
        var customersList = undefined;

        function Order(id, customerId, items) {
            this.id = id;
            this.customerId = customerId;
            this.items = items;
        }

        function Customer(id, name) {
            this.id = id;
            this.name = name;
        }

        function OrderItem(id, title, price, count) {
            this.id = id;
            this.title = title;
            this.price = price;
            this.count = count;
        }

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
            },
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
            },
            saveOrder: function(order){
                var deferred = $q.defer();
                var self = this;
                function getMaxOrderId(orders) {
                    var maxID = 0;
                    for (var i = 0; i < orders.length; i++) {
                        if (maxID < Number(orders[i].id)) {
                            maxID = Number(orders[i].id);
                        }
                    }
                    return ++maxID;
                }
                if (order.id === '-1') {
                    order.id = String(getMaxOrderId(ordersList));
                    $http({
                        method: "POST",
                        url : "./src/api/orders.json",
                        data: JSON.stringify(order)
                    }).
                    then (function success(response) {
                        self.getList().
                        then(function success(orders) {
                            deferred.resolve(JSON.parse(JSON.stringify(ordersList)));
                        },function error(orders) {
                            deferred.reject(orders.status);
                        });

                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(ordersList);
                }

                return deferred.promise;

                /*this.getList().
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
                });*/

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