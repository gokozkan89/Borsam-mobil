"use strict";
(function () {
    var module = angular.module("services");
    
    function ConstantsService() {
       var apiUrl = "http://borsam.azurewebsites.net";
       var yahooUrl =  "http://finance.yahoo.com/webservice/v1/symbols/_HISSEKODU_/quote?format=json&view=detail&callback=JSON_CALLBACK";
       //var apiUrl = "http://localhost:3000";
       
       function  yahoo(hisseKodu) {
           return yahooUrl.replace("_HISSEKODU_", hisseKodu);
       }
       
       return { apiUrl : apiUrl, yahooUrl : yahooUrl, yahoo : yahoo };
    }
    
    module.factory("constantsService", ConstantsService);
    
})()