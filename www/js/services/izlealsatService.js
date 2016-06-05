/**
 * Created by Serkan on 25.05.2016.
 */
"use strict";
(function () {
  var module = angular.module("starter.services");

  function IzleAlSatService($http, $q, $timeout, constantsService, HisseTakipService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";


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

    function yahooAll(hisseKodu, kullaniciId) {
      var url = constantsService.yahoo(hisseKodu);

      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && result.data.list && result.data.list.resources && result.data.list.resources.length) {
          var dataList = result.data.list.resources;
          var liste = [];

          HisseTakipService.takipListesiGetir(kullaniciId).then(function (takipResult) {
            var takipArray = [];
            
            if(takipResult && takipResult.HisseTakipListesi){
              for (var i = 0; i < takipResult.HisseTakipListesi.length; i++) {
                takipArray.push(takipResult.HisseTakipListesi[i].HisseKodu);
              }
            }

            for (var j = 0; j < dataList.length; j++) {
              var yahooData = dataList[j].resource.fields;
              var symbol = yahooData.symbol.replace('.IS','');
              var sonFiyat = parseFloat(yahooData.price);
              var degisim = parseFloat(yahooData.chg_percent);
              
              liste.push({
                index: j,
                symbol: symbol,
                price: sonFiyat.toFixedTr(2),
                degisim: degisim.toFixedTr(2),
                degisimCss: degisim < 0 ? "assertive" : (degisim > 0 ? "balanced" : "energized"),
                izle: takipArray.indexOf(symbol) == -1 ? false : true
              });              
            }
            deferred.resolve({ liste: liste });
          })
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

    function yahoo(hisseKodu) {
      var url = constantsService.yahoo(hisseKodu);

      var deferred = $q.defer();

      function success(result) {
        if (result && result.data && result.data.list) {
          var data = result.data.list;
          var count = data.meta.count;
          var field = null;

          if (angular.isArray(data.resources) && data.resources.length) {
            field = data.resources[0].resource.fields;
          }

          deferred.resolve({ count: count, field: field });
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
      yahoo: yahoo,
      yahooAll: yahooAll
    };
  }

  IzleAlSatService.$inject = ["$http", "$q", "$timeout", "constantsService", "HisseTakipService"];

  module.factory("IzleAlSatService", IzleAlSatService);
})();
