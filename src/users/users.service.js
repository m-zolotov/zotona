'use strict';

angular.module('Users')
    .factory('userService', function($http, $q){
        var user = undefined;
        return{
            getUser: function(inputFormValues){
                var deferred = $q.defer();
                if (user === undefined) {
                    $http({
                        method: 'GET', url: './src/api/user.json'
                    }).
                    then (function success(response) {
                        var answers = response.data;
                        for (var i = 0; i < answers.length; i++) {
                            console.log('answers[i].login', answers[i].login);
                            console.log('inputFormValues.login', inputFormValues.login);
                            if (answers[i].login === inputFormValues.login) {
                                user = answers[i];
                                deferred.resolve(JSON.parse(JSON.stringify(user)));
                                break;
                            } else {
                                user = {};
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