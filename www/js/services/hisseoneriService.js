"use strict";
(function () {
  var module = angular.module("starter.services");

  function HisseOneriService($http, $q, $timeout, constantsService, hisseService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function hisseOneriGetir() {
      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && result.data.result && result.data.result.HisseOneriListesi) {
          var hisseOneriDataListesi = result.data.result.HisseOneriListesi;
          var yahooPromiseList = [];
          for (var i = 0, l = hisseOneriDataListesi.length; i < l; i++) {
            yahooPromiseList.push(hisseService.yahoo(hisseOneriDataListesi[i].HisseKodu + ".IS"));
          }
          $q.all(yahooPromiseList).then(function (yahooAllResult) {
            if (yahooAllResult != null) {
              for (var j = 0, k = yahooAllResult.length; j < k; j++) {
                var sonFiyat = parseFloat(yahooAllResult[j].field.price);
                var hedefFiyat = parseFloat(hisseOneriDataListesi[j].HedefFiyat);
                var getiriPotansiyeli = parseInt((hedefFiyat - sonFiyat) / sonFiyat * 100);
                hisseOneriDataListesi[j].SonFiyat = sonFiyat.toFixedTr(2);
                hisseOneriDataListesi[j].GetiriPotansiyeli = getiriPotansiyeli;
                hisseOneriDataListesi[j].GetiriPotansiyeliCss = getiriPotansiyeli < 0 ? "assertive" : (getiriPotansiyeli > 0 ? "balanced" : "energized");
              }
            }
            deferred.resolve({HisseOneriListesi: hisseOneriDataListesi});
          });
        } else {
          deferred.resolve({HisseOneriListesi: []});
        }
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

  HisseOneriService.$inject = ["$http", "$q", "$timeout", "constantsService", "hisseService"];

  module.factory("HisseOneriService", HisseOneriService);
})();
