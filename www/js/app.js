// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
  /*.factory('authInterceptor', ['$q', '$location', function ($q, $location) {
    var canceller = $q.defer();
    var authInterceptor = {
      request: function (config) {
        if ($location.path() != '/login' && $location.path() != '/kayit' && isNaN(parseInt(localStorage.getItem('kullaniciId')))) {
          config.timeout = canceller.promise;
          //$location.path('/login');
        }
        return config;
      },
      response: function (response) {
        if ($location.path() != '/login' && $location.path() != '/kayit' && isNaN(parseInt(localStorage.getItem('kullaniciId')))) {
          $location.path('/login');
        }
        return response;
      },
      responseError: function (rejection) {
        $location.url('/login');
        return $q.reject(rejection);
      }
    };
    return authInterceptor;
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }])*/
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });
