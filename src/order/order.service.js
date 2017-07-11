'use strict';

angular.module('Order')
    .factory('orderService', function($http, $q, $location){
        var ordersList = undefined;
        var orderItemList = undefined;
        var customersList = undefined;

        function Order(id, customerId, price, items) {
            this.id = id;
            this.customerId = customerId;
            this.price = price;
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
                        ordersList = [];
                        for (var i = 0; i < response.data.length; i++) {
                            ordersList.push(new Order(response.data[i].id, response.data[i].customerId, response.data[i].price, response.data[i].items));
                        }
                        deferred.resolve(ordersList);
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
                        orderItemList = [];
                        for (var i = 0; i < response.data.length; i++) {
                            orderItemList.push(new OrderItem(response.data[i].id, response.data[i].title, response.data[i].price, response.data[i].count));
                        }
                        deferred.resolve(orderItemList);
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
                if (!customersList) {
                    $http({
                        method: 'GET', url: './src/api/customer.json'
                    }).
                    then (function success(response) {
                        customersList = [];
                        for (var i = 0; i < response.data.length; i++) {
                            customersList.push(new Customer(response.data[i].id, response.data[i].name));
                        }
                        deferred.resolve(customersList);
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
                if (order.id === '-1') {
                    $http({
                        method: "POST",
                        url : "./src/api/orders.json",
                        data: JSON.stringify(order)
                    }).
                    then (function success(response) {
                        self.getList().
                        then(function success(orders) {
                            deferred.resolve(ordersList);
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