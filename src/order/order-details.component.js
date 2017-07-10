'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/order/order-details.template.html',
        controller: ['orderService', 'authService', 'userService', '$routeParams', '$location', function(orderService, authService, userService, $routeParams, $location) {
            var self = this;
            var i = 0;
            var orderID = $routeParams.orderID;
            self.newOrder = null;
            self.oldOrder = null;
            self.order = {};

            if (orderID === 'create') {
                self.title = 'Детали нового заказа';
                self.oldOrder = null;
                self.newOrder = true;
            } else {
                self.title = 'Детали заказа';
                self.newOrder = null;
                self.oldOrder = true;
            }

            orderService.getOrder(orderID).then(function(value) {
                self.order = value;
            });

            orderService.getCustomers().then(function(value) {
                self.customers = value;
                self.selectedOption = self.customers[0].id;
            });

            orderService.getOrderItems().then(function(value) {
                self.items = value;
            });

            self.saveOrder = function () {
                var selectedItemsList = [];
                var selectedItemsListSum = 0;
                for (var i = 0; i < self.items.length; i++) {
                    if (self.items[i].selected === true) {
                        selectedItemsList.push(self.items[i]);
                        selectedItemsListSum += Number(self.items[i].price);
                    }
                }
                if (orderID === 'create') {
                    self.order.id = '-1';
                    self.order.customerId = self.selectedOption;
                    self.order.price = String(selectedItemsListSum.toFixed(2));
                    self.order.items = JSON.parse(JSON.stringify(selectedItemsList));
                }
                orderService.saveOrder(self.order).then(function(value) {
                    $location.path('/order/' + self.order.id);
                    self.order = value;
                });

            };
            
            self.selectedItems = function (item) {
                if (item.selected) {
                    item.selected = false;
                } else {
                    item.selected = true;
                }
            };
        }]
    });