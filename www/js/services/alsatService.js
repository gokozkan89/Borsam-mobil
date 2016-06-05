/**
 * Created by Serkan on 25.05.2016.
 */
"use strict";
(function () {
  var module = angular.module("starter.services");

  function AlSatService($http, $q, $timeout, constantsService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function portfoyDetayGetir(kullaniciId, hisseKodu) {
      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && angular.isArray(result.data.result) && result.data.result.length) {
          deferred.resolve(result.data.result[0]);
        } else {
          deferred.resolve([]);
        }
      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + "portfoyDetayGetir?kullaniciId=" + kullaniciId + "&hisseKodu=" + hisseKodu;

      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    function emirEkle(emir) {
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

      var url = apiUrl + "emirEkle?emirTipi=" + emir.emirTipi + "&hisseKodu=" + emir.hisseKodu + "&hisseAdeti=" + emir.hisseAdeti + "&teklifEdilenBirimFiyat=" + emir.teklifEdilenBirimFiyat + "&kullaniciId=" + emir.kullaniciId;

      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    return {
      portfoyDetayGetir: portfoyDetayGetir,
      emirEkle: emirEkle
    };
  }

  AlSatService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("alSatService", AlSatService);
})();
