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
        if (result && result.data && result.data.list) {
          var data = result.data.list;
          var adet = data.meta.count;
          var liste = null;
          var newData = [];

          if (angular.isArray(data.resources) && data.resources.length) {
            HisseTakipService.takipListesiGetir(kullaniciId).then(function (takipResult) {
              var takipArray = [];
              for(var j=0;j<takipResult.length; j++)
              {
                takipArray.push(takipResult[j].HisseKodu);
              }

              var Renk = "balanced";
              //field = data.resources;

              for (var i = 0; i < data.resources.length; i++) {
                if(parseFloat(data.resources[i].resource.fields.chg_percent) < 0)
                  Renk = "assertive";
                else if(parseFloat(data.resources[i].resource.fields.chg_percent) == 0)
                  Renk = "energized";
                else
                  Renk = "balanced";

                var symbol = data.resources[i].resource.fields.symbol.replace('.IS','');

                newData.push({
                  index: i,
                  symbol: symbol,
                  price: data.resources[i].resource.fields.price,
                  yuzdeDegisim: "%" + data.resources[i].resource.fields.chg_percent,
                  renk:Renk,
                  izle: takipArray.indexOf(symbol) == -1 ? false : true
                });
              }
            })

            liste = newData;
          }

          deferred.resolve({adet: adet, liste: liste});
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
      yahoo: yahoo,
      yahooAll: yahooAll
    };
  }

  IzleAlSatService.$inject = ["$http", "$q", "$timeout", "constantsService", "HisseTakipService"];

  module.factory("IzleAlSatService", IzleAlSatService);
})();
