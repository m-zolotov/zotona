'use strict';

angular.module('API')
    .factory('apiService', function($http, $q){
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
            setLogin: function () {

            },
            setLogout: function () {

            }
        }
    });
