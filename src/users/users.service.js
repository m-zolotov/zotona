'use strict';

angular.module('Users')
    .factory('userService', function($http, $q){
        var user = undefined;
        return{
            getUser: function(){
                var deferred = $q.defer();
                if (user === undefined) {
                    $http({
                        method: 'GET', url: './src/data/user.json'
                    }).
                    then (function success(response) {
                        deferred.resolve(JSON.parse(JSON.stringify(response.data)));
                    },function error(response) {
                        deferred.reject(response.status);
                    });
                } else {
                    deferred.resolve(user);
                }
                return deferred.promise;
            }
        }
    });