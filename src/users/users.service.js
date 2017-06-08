'use strict';

angular.module('Users')
    .factory('userService', function($http, $q){
        var user = undefined;
        return{
            getUser: function(){
                var deferred = $q.defer();
                if (user === undefined) {
                    $http({
                        method: 'GET', url: './src/api/user.json'
                    }).
                    then (function success(response) {
                        var answers = response.data;
                        for (var i = 0; i < answers.length; i++) {
                            if (answers[i].login === inputLogin) {
                                user = answers[i];
                                deferred.resolve(JSON.parse(JSON.stringify(user)));
                                break;
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