/**
 * Created by Serkan on 4.06.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function LoginController(loginService, PortfoyumService, $ionicLoading, $ionicPopup, $state, $rootScope, $scope) {
    var vm;

    function register() {
      vm.loading = true;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        if (result.Hata == 'EMAIL_KULLANILMIS') {
          $ionicPopup.alert({
            title: 'Hata',
            template: 'Bu email adresi daha önce kullanılmış!'
          });
        } else if (result.KullaniciId != null) {
          localStorage.setItem('kullaniciId', result.KullaniciId);
          $ionicPopup.alert({
            title: 'Bilgi',
            template: 'Kullanıcı oluşturulmuştur.'
          }).then(function (res) {
            $state.go('app.portfoyum');
          });
        }
      }

      function error() {
        $ionicPopup.alert({
          title: 'Hata',
          template: 'Hata oluştu!'
        });
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      var user = {
        adi: vm.adi,
        soyadi: vm.soyadi,
        email: vm.email,
        sifre: vm.sifre
      };

      loginService.register(user).then(success).catch(error).finally(finished);
    }

    function login() {
      vm.loading = true;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        if (result.Hata == 'BILGILER_HATALI') {
          $ionicPopup.alert({
            title: 'Hata',
            template: 'Kullanıcı bilgileri hatalı!'
          });
        } else if (result.KullaniciId != null) {
          localStorage.setItem('kullaniciId', result.KullaniciId);
          PortfoyumService.portfoyGetir(result.KullaniciId).then(function success(result) {
            $rootScope.Kullanici = result.Kullanici;
            $state.go('app.portfoyum');
          });
          $state.go('app.portfoyum');
        }
      }

      function error() {
        $ionicPopup.alert({
          title: 'Hata',
          template: 'Giriş işlemi başarısız oldu!'
        });
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      var user = {
        email: vm.email,
        sifre: vm.sifre
      };

      loginService.login(user).then(success).catch(error).finally(finished);
    }

    function loginKontrol() {
      if (!isNaN(parseInt(localStorage.getItem('kullaniciId')))) {
        $state.go('app.portfoyum');
      }
    }

    function viewEntered(event, data) {
      vm.loginKontrol();
    }


    function init() {
      vm = {
        register: register,
        login: login,
        loginKontrol: loginKontrol
      };

      $scope.$on("$ionicView.enter", viewEntered);

      return vm;
    }

    return init();
  }

  LoginController.$inject = ["loginService", "PortfoyumService", "$ionicLoading", "$ionicPopup", "$state", "$rootScope", "$scope"];

  module.controller("LoginController", LoginController);
} ());
