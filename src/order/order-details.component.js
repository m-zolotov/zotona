'use strict';

angular.module('Order')
    .component('orderDetails', {
        templateUrl: 'src/order/order-details.template.html',
        controller: ['orderService', 'authService', 'userService', 'customerService', 'orderItemService', '$routeParams', '$location', function(orderService, authService, userService, customerService, orderItemService, $routeParams, $location) {
            var self = this;
            var orderID = $routeParams.orderID;
            self.newOrder = null;
            self.oldOrder = null;
            self.order = {};
            self.selectedItems = [
                {
                    "title": "QUADEEBO",
                    "price": "3809.87"
                },
                {
                    "title": "TWIGGERY",
                    "price": "34535.45"
                },
                {
                    "title": "FANFARE",
                    "price": "765.65"
                }
            ];

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
                console.log('!');
            };
        }]
    });