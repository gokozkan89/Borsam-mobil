"use strict";
(function () {
  var module = angular.module("starter.services");

  function HaberlerService($http, $q, $timeout, constantsService) {
    var apiUrl = constantsService.investingUrl;

    function test(arg) {

      var deferred = $q.defer();

      function success(result) {

        if (result && result.data && angular.isArray(result.data.result) && result.data.result.length) {
          deferred.resolve(result.data.result);
        } else {
          deferred.resolve([]);
        }

      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + (arg || "");
      $http.get(apiUrl).then(success).catch(error);

      return deferred.promise;
    }

    function haberler() {
      var url = constantsService.haberler();


      var deferred = $q.defer();

      function success(result) {

        //result.data.responseData.feed.entries

        if (result && result.data && result.data.responseData && result.data.responseData.feed && result.data.responseData.feed.entries) {
          var data = result.data.responseData.feed.entries;
          var count = result.data.responseData.feed.entries.length;
          var field = null;

          if (angular.isArray(data) && data.length) {
            field = data;
          }

          deferred.resolve({count: count, field: field});
        } else {
          deferred.resolve(null);
        }

      }

      function error(result) {
        deferred.reject(result);
      }

      $http.jsonp(url).then(success).catch(error);

      return deferred.promise;


    }


    return {
      test: test,
      haberler: haberler
    };
  }

  HaberlerService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("HaberlerService", HaberlerService);

})();
