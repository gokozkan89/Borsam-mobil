(function () {
  var module = angular.module('starter.controllers');

  function PortfoyumController(PortfoyumService, $ionicLoading, $timeout, $location, $rootScope, $scope) {
    var vm;

    if(isNaN(parseInt(localStorage.getItem('kullaniciId')))) {
      $location.path('/login');
      return;
    }

    function gosterGizleDetay(sembol) {

    }

    function portfoyGetir() {
      vm.loading = true;

      var kullaniciId = localStorage.getItem('kullaniciId');

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        $rootScope.Kullanici = vm.Kullanici = result.Kullanici;
        vm.PortfoyListesi = result.PortfoyListesi;

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

      PortfoyumService.portfoyGetir(kullaniciId).then(success).catch(error).finally(finished);
    }

    function viewEntered(event, data){
      vm.portfoyGetir();
    }

    function init() {
      vm = {
        loading: false,
        gosterGizleDetay: gosterGizleDetay,
        portfoyGetir: portfoyGetir
      };

      $scope.$on("$ionicView.enter", viewEntered);

      return vm;
    }

    return init();
  }

  PortfoyumController.$inject = ["PortfoyumService", "$ionicLoading", "$timeout", "$location", "$rootScope", "$scope"];

  module.controller("PortfoyumController", PortfoyumController);
}());


