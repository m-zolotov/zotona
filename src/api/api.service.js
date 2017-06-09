'use strict';

angular.module('API')
    .factory('apiService', function($http, $q){
        var self = this;
        self.user = {};
        self.login = localStorage.getItem('login');
        self.password = localStorage.getItem('password');
        return{
            getUser: function(){
                var deferred = $q.defer();
                if (self.login === null || self.password === null) {
                    return false;
                } else {
                    return true;
                }
            },
            setLogin: function () {

            },
            setLogout: function () {

            }
        }
    });
