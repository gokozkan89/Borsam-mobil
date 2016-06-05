/**
 * Created by Serkan on 19.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function HaberlerController(haberlerService, $ionicLoading, $timeout) {
    var vm;



    function haberlerInvesting() {
      vm.loading = true;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.count = result.count;
        vm.list = result.field;
        vm.time = new Date();
      }

      function error() {
        vm.items = [];
        vm.time = new Date();
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }


      haberlerService.haberler().then(success).catch(error).finally(finished);
    }

    function init() {
      vm = {
        items: [],
        loading: false,
        haberlerInvesting: haberlerInvesting,
      };

      return vm;
    }

    return init();
  }

  HaberlerController.$inject = ["HaberlerService", "$ionicLoading", "$timeout"];

  module.controller("HaberlerController", HaberlerController);
} ());


