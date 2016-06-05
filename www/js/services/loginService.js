/**
 * Created by Serkan on 4.06.2016.
 */
"use strict";
(function () {
  var module = angular.module("starter.services");

  function LoginService($http, $q, $timeout, constantsService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function register(user) {
      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && result.data.result) {
          deferred.resolve(result.data.result);
        } else {
          deferred.resolve([]);
        }
      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + "kullaniciEkle";

      $http.post(url, user).then(success).catch(error);

      return deferred.promise;
    }

    function login(user) {
      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && result.data.result) {
          deferred.resolve(result.data.result);
        } else {
          deferred.resolve([]);
        }
      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + "kullaniciKontrol";

      $http.post(url, user).then(success).catch(error);

      return deferred.promise;
    }

    return {
      register: register, login: login
    };
  }

  LoginService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("loginService", LoginService);
})();
