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
                localStorage.setItem('username', String(user.username));
                localStorage.setItem('password', String(user.password));
                this.getUser().
                then(function success(userData) {
                    if (user.username === userData.username && user.password === userData.password) {
                        $location.path('/orders/list');

                    }/* else {
                        $location.path('/authorization');
                    }*/


                        /*if (usersList[i].id === userID) {
                            userDetail = usersList[i];
                            deferred.resolve(JSON.parse(JSON.stringify(userDetail)));
                            break;
                        }*/

                },function error(user) {
                    deferred.reject(user.status);
                });

                return deferred.promise;
            },
            setLogout: function () {

            }
        }
    });
