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
                var deferred = $q.defer();
                var currentUser = sessionStorage.getItem('username');
                if (!currentUser) {
                    $location.path('/login');
                }
                return deferred.promise;
            },
            setAuthorizedUser: function (user) {
                var deferred = $q.defer();
                this.getUser().
                then(function success(dataUser) {
                    var value = false;
                    for (var i = 0; i < dataUser.length; i++) {
                        if (user.username === dataUser[i].username && user.password === dataUser[i].password) {
                            value = true;
                            $location.path('/orders/list');
                            deferred.resolve(JSON.parse(JSON.stringify(user)));
                            break;
                        }
                    }
                    if (!value) {
                        deferred.resolve(value);
                    }
                },function error(user) {
                    deferred.reject(user.status);
                });
                return deferred.promise;
            },
            getOutOfAccount: function () {
                var deferred = $q.defer();
                sessionStorage.clear();
                this.getCurrentUser();
                return deferred.promise;
            }
        }
    });
