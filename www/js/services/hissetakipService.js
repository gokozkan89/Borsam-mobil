"use strict";
(function () {
  var module = angular.module("starter.services");

  function HisseTakipService($http, $q, $timeout, constantsService, hisseService) {
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
        if (result && result.data && result.data.result) {
          var hisseTakipDataListesi = result.data.result;
          var yahooPromiseList = [];
          for (var a = 0; a < hisseTakipDataListesi.length; a++) {
            yahooPromiseList.push(hisseService.yahoo(hisseTakipDataListesi[a].HisseKodu + ".IS"));
          }
          $q.all(yahooPromiseList).then(function (yahooAllResult) {
            if (yahooAllResult != null) {
              for (var b = 0; b < yahooAllResult.length; b++) {
                var sonFiyat = parseFloat(yahooAllResult[b].field.price);
                var degisim = parseFloat(yahooAllResult[b].field.chg_percent);
                hisseTakipDataListesi[b].SonFiyat = sonFiyat.toFixedTr(2);
                hisseTakipDataListesi[b].Degisim = degisim.toFixedTr(2);
                hisseTakipDataListesi[b].DegisimCss = degisim < 0 ? "assertive" : (degisim > 0 ? "balanced" : "energized");
              }
              deferred.resolve({ HisseTakipListesi: hisseTakipDataListesi });
            } else {
              deferred.resolve({ HisseTakipListesi: [] });
            }
          });
        } else {
          deferred.resolve({ HisseTakipListesi: [] });
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

  HisseTakipService.$inject = ["$http", "$q", "$timeout", "constantsService", "hisseService"];

  module.factory("HisseTakipService", HisseTakipService);

})();
