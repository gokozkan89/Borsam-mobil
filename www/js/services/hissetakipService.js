"use strict";
(function () {
  var module = angular.module("starter.services");

  function HisseTakipService($http, $q, $timeout, constantsService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function takipListesineEkle(hisseKodu, kullaniciId) {
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

      var url = apiUrl + "takipListesineEkle?hisseKodu=" + hisseKodu + "&kullaniciId=" + kullaniciId;
      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    function takipListesiGetir(kullaniciId) {
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

      var url = apiUrl + "takipListesiGetir?kullaniciId=" + kullaniciId;
      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    function takipListesindenCikar(hisseKodu, kullaniciId) {
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

      var url = apiUrl + "takipListesindenCikar?hisseKodu=" + hisseKodu + "&kullaniciId=" + kullaniciId;
      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    return {
      takipListesineEkle: takipListesineEkle,
      takipListesiGetir: takipListesiGetir,
      takipListesindenCikar: takipListesindenCikar
    };
  }

  HisseTakipService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("HisseTakipService", HisseTakipService);

})();
