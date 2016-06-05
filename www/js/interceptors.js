/**
 * Created by Serkan on 4.06.2016.
 */
angular.module.factory('authInterceptor', ['$location', '$localStorage', function ($location, $localStorage) {
  var authInterceptor = {
    request: function (config) {
      return config;
    },
    response: function (response) {
      if ($location.path() != 'login' && $localStorage.getItem('kullaniciId') == null) {
        $location.path('/login');
      }
      return response;
    }
  };
  return timestampMarker;
}]);

angular.module.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);
