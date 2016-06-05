
"use strict";
(function () {
  var module = angular.module("starter.services");

  function HisseOneriService($http, $q, $timeout, constantsService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function hisseOneriGetir() {
      var deferred = $q.defer();

      function success(result) {
        var hisseOneriListesi = [];
        

        if (result && result.data && result.data.result) {
          var resultData = result.data.result;

       

          if (angular.isArray(resultData.HisseOneriListesi) && resultData.HisseOneriListesi.length) {
            hisseOneriListesi = resultData.HisseOneriListesi;
          }
      
        }
        deferred.resolve({ HisseOneriListesi: hisseOneriListesi});
      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + "hisseOneriGetir";
      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    return {
      hisseOneriGetir: hisseOneriGetir
    };
  }  

  HisseOneriService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("HisseOneriService", HisseOneriService);
})();
