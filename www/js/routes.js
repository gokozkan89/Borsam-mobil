angular.module('starter').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'ApplicationController'
    })
    .state('app.portfoyum', {
      url: '/portfoyum',
      views: {
        'menuContent': {
          templateUrl: 'templates/portfoyum.html',
          controller: 'PortfoyumController as vm'
        }
      }
    })
    .state('app.izlealsat', {
      url: '/izlealsat',
      views: {
        'menuContent': {
          templateUrl: 'templates/izlealsat.html',
          controller: 'IzleAlSatController as vm'
        }
      }
    })
    .state('app.alsat', {
      url: '/alsat/:symbol',
      views: {
        'menuContent': {
          templateUrl: 'templates/alsat.html',
          controller: 'AlSatController as vm'
        }
      }
    })
    .state('app.hissetakip', {
      url: '/hissetakip',
      views: {
        'menuContent': {
          templateUrl: 'templates/hissetakip.html',
          controller: 'HisseTakipController as vm'
        }
      }
    })
    .state('app.hisseoneri', {
      url: '/hisseoneri',
      views: {
        'menuContent': {
          templateUrl: 'templates/hisseoneri.html',
          controller: 'HisseOneriController as vm'

        }
      }
    })
    .state('app.haberler', {
      url: '/haberler',
      views: {
        'menuContent': {
          templateUrl: 'templates/haberler.html',
          controller: 'HaberlerController as vm'
        }
      }
    })
    .state("app.hisse", {
      url: "/hisse",
      views: {
        "menuContent": {
          templateUrl: 'templates/hisse.html',
          controller: 'HisseController as vm'
        }
      }
    })
    .state("app.ayarlar", {
      url: "/ayarlar",
      views: {
        "menuContent": {
          templateUrl: 'templates/ayarlar.html',
          controller: 'AyarlarController as vm'
        }
      }
    })
    .state("kayit", {
      url: "/kayit",
      templateUrl: 'templates/kayit.html',
      controller: 'LoginController as vm'
    })
    .state("login", {
      url: "/login",
      templateUrl: 'templates/login.html',
      controller: 'LoginController as vm'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
