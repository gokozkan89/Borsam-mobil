/**
 * Created by Serkan on 25.05.2016.
 */
"use strict";
(function () {
  var module = angular.module("starter.services");

  function AyarlarService($http, $q, $timeout, constantsService) {
    return null;
  }

  AyarlarService.$inject = ["$http", "$q", "$timeout", "constantsService"];

  module.factory("AyarlarService", AyarlarService);
})();
