"use strict";
(function () {
  var module = angular.module("starter.services");

  function PortfoyumService($http, $q, $timeout, constantsService, hisseService) {
    var apiUrl = constantsService.apiUrl + "/borsa/";

    function portfoyGetir(kullaniciId) {
      var deferred = $q.defer();

      function success(result) {
        var portfoyListesi = [];
        var kullanici = {};
        if (result && result.data && result.data.result) {
          var resultData = result.data.result;
          if (angular.isArray(resultData.KullaniciListesi) && resultData.KullaniciListesi.length) {
            kullanici = resultData.KullaniciListesi[0];
          }

          if (angular.isArray(resultData.PortfoyListesi) && resultData.PortfoyListesi.length) {
            var portfoyDataListesi = resultData.PortfoyListesi;
            var yahooPromiseList = [];

            for (var i = 0, l = portfoyDataListesi.length; i < l; i++) {
              yahooPromiseList.push(hisseService.yahoo(portfoyDataListesi[i].HisseKodu + ".IS"));
            }

            $q.all(yahooPromiseList).then(function (yahooAllResult) {
              if (yahooAllResult != null) {
                var portfoyToplamGuncelDeger = kullanici.Nakit;
                for (var j = 0, k = yahooAllResult.length; j < k; j++) {
                  var portfoyData = portfoyDataListesi[j];
                  var yahooData = yahooAllResult[j].field;

                  if (portfoyData && yahooData) {
                    var hisseKodu = portfoyData.HisseKodu;
                    var toplamHisseAdeti = parseFloat(portfoyData.ToplamHisseAdeti);
                    var toplamAlisFiyati = parseFloat(portfoyData.ToplamAlisFiyati);
                    var ortalamaAlisFiyati = parseFloat(toplamAlisFiyati / toplamHisseAdeti);
                    var sonFiyat = parseFloat(yahooData.price);
                    var degisim = parseFloat(yahooData.chg_percent);
                    var guncelDeger = parseFloat(toplamHisseAdeti * sonFiyat);
                    var karZarar = parseFloat(guncelDeger - toplamAlisFiyati);
                    var karZararOrani = parseFloat(karZarar / toplamAlisFiyati * 100);

                    portfoyListesi.push({
                      HisseKodu: hisseKodu,
                      ToplamHisseAdeti: toplamHisseAdeti.toFixedTr(),
                      ToplamAlisFiyati: toplamAlisFiyati.toFixedTr(2),
                      OrtalamaAlisFiyati: ortalamaAlisFiyati.toFixedTr(2),
                      SonFiyat: sonFiyat.toFixedTr(2),
                      Degisim: degisim.toFixedTr(2),
                      DegisimCss: degisim < 0 ? "assertive" : (degisim > 0 ? "balanced" : "energized"),
                      GuncelDeger: guncelDeger.toFixedTr(2),
                      KarZarar: karZarar.toFixedTr(2),
                      KarZararCss: karZarar < 0 ? "assertive" : (karZarar > 0 ? "balanced" : "energized"),
                      KarZararIkonCss: karZarar < 0 ? "ion-arrow-down-b assertive" : (karZarar > 0 ? "ion-arrow-up-b balanced" : "ion-arrow-right-b energized"),
                      KarZararOrani: karZararOrani.toFixedTr(2),
                      KarZararOraniCss: karZararOrani < 0 ? "assertive" : (karZararOrani > 0 ? "balanced" : "energized")
                    });

                    portfoyToplamGuncelDeger += guncelDeger;
                  }
                }
                var portfoyKarZararOrani = parseFloat((portfoyToplamGuncelDeger - kullanici.NakitBaslangic) / kullanici.NakitBaslangic * 100);
                kullanici.PortfoyKarZararOrani = portfoyKarZararOrani.toFixedTr(2);
                kullanici.PortfoyKarZararOraniCss = portfoyKarZararOrani < 0 ? "assertive" : (portfoyKarZararOrani > 0 ? "balanced" : "energized");
                kullanici.PortfoyToplamGuncelDeger = portfoyToplamGuncelDeger.toFixedTr(2);
              }
              deferred.resolve({Kullanici: kullanici, PortfoyListesi: portfoyListesi});
            });
          } else {
            deferred.resolve({Kullanici: kullanici, PortfoyListesi: portfoyListesi});
          }
        } else {
          deferred.resolve({Kullanici: kullanici, PortfoyListesi: portfoyListesi});
        }
      }

      function error(result) {
        deferred.reject(result);
      }

      var url = apiUrl + "portfoyGetir?kullaniciId=" + kullaniciId;
      $http.get(url).then(success).catch(error);

      return deferred.promise;
    }

    return {
      portfoyGetir: portfoyGetir
    };
  }

  PortfoyumService.$inject = ["$http", "$q", "$timeout", "constantsService", "hisseService"];

  module.factory("PortfoyumService", PortfoyumService);

})();
