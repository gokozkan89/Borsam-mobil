/**
 * Created by Serkan on 19.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function HisseTakipController(HisseTakipService, $ionicLoading, $timeout, $scope) {
    var vm;

    function takipListesineEkleCikar(i, hisseKodu) {
      vm.loading = true;

      var kullaniciId = localStorage.getItem('kullaniciId');

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {

      }

      function error() {

      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      if (vm.liste[i].izle) {
        HisseTakipService.takipListesineEkle(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
      } else {
        HisseTakipService.takipListesindenCikar(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
      }
    }

    function takipListesiGetir() {
      vm.loading = true;

      var kullaniciId = 2;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        var yeniListe = [];
        for (var i = 0; i < result.length; i++) {
          yeniListe.push({
            Index: i,
            HisseKodu: result[i].HisseKodu,
            Izle: result[i].Izle == 1 ? true : false
          });
        }
        vm.liste = yeniListe;
      }

      function error() {
        vm.liste = [];
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });

        $scope.$broadcast('scroll.refreshComplete');
      }

      HisseTakipService.takipListesiGetir(kullaniciId).then(success).catch(error).finally(finished);
    }

    function takipListesindenCikar(hisseKodu) {
      vm.loading = true;

      var kullaniciId = 2;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.liste = result.liste;
      }

      function error() {
        vm.liste = [];
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      HisseTakipService.takipListesindenCikar(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
    }

    function init() {
      vm = {
        takipListesineEkleCikar: takipListesineEkleCikar,
        takipListesiGetir: takipListesiGetir,
        takipListesindenCikar: takipListesindenCikar
      };
      return vm;
    }

    return init();
  }

  HisseTakipController.$inject = ["HisseTakipService", "$ionicLoading", "$timeout", "$scope"];

  module.controller("HisseTakipController", HisseTakipController);
}());
