"use strict";
(function () {
  var module = angular.module("starter.services");

  function ConstantsService() {
    //var apiUrl = "http://borsam.azurewebsites.net";
    var yahooUrl = "http://finance.yahoo.com/webservice/v1/symbols/_HISSEKODU_/quote?format=json&view=detail&callback=JSON_CALLBACK";
    var apiUrl = "http://localhost:3000";

    //Gökhan
    //var investingUrl = "http://tr.investing.com/rss/stock_Opinion.rss?callback=JSON_CALLBACK";
    var investingUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent('http://tr.investing.com/rss/stock_Opinion.rss');


    function yahoo(hisseKodu) {
      return yahooUrl.replace("_HISSEKODU_", hisseKodu);
    }

    function haberler() {
      return investingUrl;
    }

    return {apiUrl: apiUrl, yahooUrl: yahooUrl, yahoo: yahoo, investingUrl: investingUrl, haberler: haberler};
  }

  module.factory("constantsService", ConstantsService);

})()
