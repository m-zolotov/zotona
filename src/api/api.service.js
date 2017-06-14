'use strict';

angular.module('API')
    .factory('apiService', function($http, $q, $location){
        return{
            getUser: function(){
                var deferred = $q.defer();
                var user = {};
                user.username = localStorage.getItem('username') || '';
                user.password = localStorage.getItem('password') || '';
                if (user.username !== '' || user.password !== '') {
                    deferred.resolve(JSON.parse(JSON.stringify(user)));
                } else {
                    deferred.resolve(user);
                }

                return deferred.promise;
            },
            setLogin: function (user) {
                var deferred = $q.defer();
                this.getUser().
                then(function success(localUser) {
                    if (user[0].username === localUser.username && user[0].password === localUser.password) {
                        $location.path('/orders/list');
                        deferred.resolve(JSON.parse(JSON.stringify(localUser)));
                    }
                },function error(user) {
                    deferred.reject(user.status);
                });

                return deferred.promise;
            }
        }
    });
