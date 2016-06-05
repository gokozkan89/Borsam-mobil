/**
 * Created by Serkan on 25.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function AyarlarController(AyarlarService, $ionicLoading, $timeout) {

  }

  AyarlarController.$inject = ["AyarlarService", "$ionicLoading", "$timeout"];

  module.controller("AyarlarController", AyarlarController);
}());
