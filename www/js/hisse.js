(function () {
    var module = angular.module('starter.controllers');

    function HisseController(hisseService, $ionicLoading, $timeout) {
        var vm;

        function getHisse() {

            function success(result) {
                vm.items = result;
                vm.time = new Date();
            }

            function error() {
                vm.items = [];
                vm.time = new Date();
            }

            hisseService.test("ali").then(success).catch(error);
        }

        function searchYahoo() {
            vm.loading = true;

            $ionicLoading.show({
                template: 'Loading...'
            }).then(function () {
                console.log("The loading indicator is now displayed");
            });

            function success(result) {
                vm.count = result.count;
                vm.hisse = result.field;
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
            

            hisseService.yahoo(vm.hisseKodu.toUpperCase() + ".IS").then(success).catch(error).finally(finished);
        }

        function init() {
            vm = {
                name: "Yasin",
                items: [],
                loading: false,
                searchYahoo: searchYahoo,
                hisseKodu: "",
                hisse: null,
                getHisse: getHisse
            };

            return vm;
        }

        return init();
    }

    HisseController.$inject = ["hisseService", "$ionicLoading", "$timeout"];

    module.controller("HisseController", HisseController);
} ());


