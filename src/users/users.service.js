'use strict';

angular.module('Users')
    .factory('userService', function($http, $q){
        var user = undefined;
        return{
            getUser: function(userData){
                var deferred = $q.defer();
                if (user === undefined) {
                    $http({
                        method: 'GET', url: './src/api/user.json'
                    }).
                    then (function success(response) {
                        var answers = response.data;
                        for (var i = 0; i < answers.length; i++) {
                            if (answers[i].username === userData.username) {
                                user = answers[i];
                                deferred.resolve(JSON.parse(JSON.stringify(user)));
                                break;
                            } else {
                                user = userData;
                                deferred.resolve(JSON.parse(JSON.stringify(user)));
                            }
                        }
                        deferred.resolve(JSON.parse(JSON.stringify(user)));
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