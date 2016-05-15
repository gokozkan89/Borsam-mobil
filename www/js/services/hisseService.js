"use strict";
(function () {
    var module = angular.module("services");
    
    function HisseService($http, $q, $timeout, constantsService) {
        var apiUrl = constantsService.apiUrl + "/borsa/";
        
        
        function test(arg) {
            
            var deferred = $q.defer();
            
            function success(result) {
                
                if (result && result.data && angular.isArray(result.data.result) && result.data.result.length) {
                    deferred.resolve(result.data.result);    
                } else {
                    deferred.resolve([]);
                }
                
            }
            
            function error(result) {
                deferred.reject(result);
            }           
            
            var url = apiUrl + (arg ||"");           
            $http.get(apiUrl).then(success).catch(error);
            
            return deferred.promise;    
        }
        
        function yahoo(hisseKodu) {
            var url = constantsService.yahoo(hisseKodu);
            
            
             var deferred = $q.defer();
            
            function success(result) {
                
                if (result && result.data && result.data.list) {
                    var data = result.data.list;
                    var count = data.meta.count;
                    var field = null;
                    
                    if (angular.isArray(data.resources) && data.resources.length) {
                        field  =  data.resources[0].resource.fields;
                    }
                    
                    deferred.resolve({count : count, field : field});    
                } else {
                    deferred.resolve(null);
                }
                
            }
            
            function error(result) {
                deferred.reject(result);
            }
                       
            $http.jsonp(url).then(success).catch(error);
            
            return deferred.promise;    
            
            
        }
        
        
        return  {
          test: test,
          yahoo : yahoo
        };       
    }
    
    HisseService.$inject = ["$http", "$q", "$timeout", "constantsService"];
    
    module.factory("hisseService", HisseService);
    
})();