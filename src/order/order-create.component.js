'use strict';

angular.module('Order')
    .component('orderCreate', {
        templateUrl: 'src/order/order-create.template.html',
        controller: ['orderService', 'userService', 'customerService', 'orderItemService', '$routeParams', function(orderService, userService, customerService, orderItemService, $routeParams) {
            var self = this;
            self.title = 'Детали нового заказа';
            /*var createID = $routeParams.create; customerService

            orderService.getOrder(createID).then(function(value) {
                self.order = value;
            });*/
            customerService.getCustomers().then(function(value) {
                self.customers = value;
            });

            orderItemService.getOrderItems().then(function(value) {
                self.items = value;
            });
        }]
    });