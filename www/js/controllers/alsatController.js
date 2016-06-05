/**
 * Created by Serkan on 25.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function AlSatController(hisseService, alSatService, $ionicLoading, $timeout, $stateParams, $ionicPopup, $location) {
    var vm;

    if(isNaN(parseInt(localStorage.getItem('kullaniciId')))) {
      $location.path('/login');
      return;
    }

    function getirHisseBilgileri() {
      var hisseKodu = vm.symbol + '.IS';
      var kullaniciId = localStorage.getItem('kullaniciId');
      vm.loading = true;

      var hisseServiceFinished = false;
      var alSatServiceFinished = false;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.issuer_name = result.field.issuer_name;
        vm.price = parseFloat(parseFloat(result.field.price).toFixed(2));
        vm.chg_percent = parseFloat(parseFloat(result.field.chg_percent).toFixed(2));
      }

      function error() {
        vm.issuer_name = '';
        vm.price = '';
        vm.chg_percent = '';
      }

      function finished() {
        hisseServiceFinished = true;
        if (hisseServiceFinished && alSatServiceFinished) {
          vm.loading = false;

          $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
          });
        }
      }

      hisseService.yahoo(hisseKodu).then(success).catch(error).finally(finished);

      alSatService.portfoyDetayGetir(kullaniciId, vm.symbol).then(function (result) {
        vm.toplamHisseAdeti = parseInt(result.ToplamHisseAdeti);
        vm.nakit = parseFloat(parseFloat(result.Nakit).toFixed(2));
      }).catch(function () {
        vm.toplamHisseAdeti = '';
        vm.nakit = '';
      }).finally(function () {
        alSatServiceFinished = true;
        if (hisseServiceFinished && alSatServiceFinished) {
          vm.loading = false;

          $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
          });
        }
      })
    }

    function emirEkle(emirTipi) {
      if (vm.adet > 0) {
        vm.loading = true;

        $ionicLoading.show({
          template: 'Lütfen bekleyin...'
        }).then(function () {
          console.log("The loading indicator is now displayed");
        });

        function success(result) {
          $ionicPopup.alert({
            title: 'Bilgi',
            template: (emirTipi == 'A' ? 'Alış ' : 'Satış ') + 'emriniz verilmiştir.'
          });
        }

        function error() {

        }

        function finished() {
          vm.loading = false;

          $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
          });
        }

        var emir = {
          emirTipi: emirTipi,
          hisseKodu: vm.symbol,
          hisseAdeti: vm.adet,
          teklifEdilenBirimFiyat: vm.price,
          kullaniciId: 2
        }

        alSatService.emirEkle(emir).then(success).catch(error).finally(finished);
      } else {
        $ionicPopup.alert({
          title: 'Uyarı',
          template: 'Lütfen hisse adeti giriniz!'
        });
      }
    }

    function init() {
      vm = {
        symbol: $stateParams.symbol,
        getirHisseBilgileri: getirHisseBilgileri,
        emirEkle: emirEkle
      };
      return vm;
    }

    return init();
  }

  AlSatController.$inject = ["hisseService", "alSatService", "$ionicLoading", "$timeout", "$stateParams", "$ionicPopup", "$location"];

  module.controller("AlSatController", AlSatController);
}());
