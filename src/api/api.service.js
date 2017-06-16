'use strict';

angular.module('API')
    .factory('apiService', function($http, $q, $location){
        var user = null;
        // var allUsers = [];
        // var self = this;

        return {
            getUser: function(){
                var deferred = $q.defer();
                if (!user) {
                    $http({
                        method: 'GET', url: './src/data/user.json'
                    }).
                    then (function success(response) {
                        user = response.data;
                        deferred.resolve(JSON.parse(JSON.stringify(user)));
                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(user);
                }
                return deferred.promise;
            },
            getCurrentUser: function(){
                //localStorage.setItem('username', 'login');
                var currentUser = localStorage.getItem('username');
                if (!currentUser) {
                    $location.path('/login');
                }
            },
            setLogin: function (user) {
                var deferred = $q.defer();
                this.getUser().
                then(function success(dataUser) {
                    for (var i = 0; i < dataUser.length; i++) {
                        if (user.username === dataUser[i].username && user.password === dataUser[i].password) {
                            $location.path('/orders/list');
                            deferred.resolve(JSON.parse(JSON.stringify(user)));
                        }
                    }
                },function error(user) {
                    deferred.reject(user.status);
                });
                return deferred.promise;
            }
        }
    });
