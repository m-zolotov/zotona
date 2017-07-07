'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/order/order-details.template.html',
        controller: ['orderService', 'authService', 'userService', 'customerService', 'orderItemService', '$routeParams', '$location', function(orderService, authService, userService, customerService, orderItemService, $routeParams, $location) {
            var self = this;
            var i = 0;
            var orderID = $routeParams.orderID;
            self.newOrder = null;
            self.oldOrder = null;
            self.order = {};
            self.selectedItems = [];

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
                console.log('self.order', self.order);
            });

            /*var createID = $routeParams.create; customerService

             orderService.getOrder(createID).then(function(value) {
             self.order = value;
             });*/
            customerService.getCustomers().then(function(value) {
                self.customers = value;
                self.selectedOption = self.customers[0].id;
            });

            orderItemService.getOrderItems().then(function(value) {
                self.items = value;
            });

            self.saveOrder = function () {
                if (orderID === 'create') {
                    self.order.id = '-1';
                    self.order.customerId = self.selectedOption;
                }
                orderService.saveOrder(self.order).then(function(value) {
                    $location.path('/order/' + self.order.id);
                    self.order = value;
                });
            };
            
            self.addSelectedItems = function (item) {
                /*item.id = i;
                i++;*/
                console.log('item', item);
                self.selectedItems.push(JSON.parse(JSON.stringify(item)));
            };
        }]
    });