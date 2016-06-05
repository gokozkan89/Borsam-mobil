/**
 * Created by Serkan on 25.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function HisseOneriController(HisseOneriService, $ionicLoading, $timeout, $scope) {
     var vm;  
     function hisseOneriGetir() {

      vm.loading = true;
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {

        vm.HisseOneriListesi = result.HisseOneriListesi;

      }

      function error() {
        vm.HisseOneriListesi = [];
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });

        $scope.$broadcast('scroll.refreshComplete');
      }

      HisseOneriService.hisseOneriGetir().then(success).catch(error).finally(finished);
    }
    
   function viewEntered(event, data){
      vm.hisseOneriGetir();
    }

    function init() {
      vm = {
        loading: false,        
        hisseOneriGetir: hisseOneriGetir
      };

      $scope.$on("$ionicView.enter", viewEntered);

      return vm;
    }

    return init();
  }


  HisseOneriController.$inject = ["HisseOneriService", "$ionicLoading", "$timeout", "$scope"];

  module.controller("HisseOneriController", HisseOneriController);
}());
