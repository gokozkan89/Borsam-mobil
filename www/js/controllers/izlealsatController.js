/**
 * Created by Serkan on 25.05.2016.
 */
(function () {
  var module = angular.module('starter.controllers');

  function IzleAlSatController(izleAlSatService, HisseTakipService, $ionicLoading, $timeout, $stateParams, $scope) {
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

      izleAlSatService.test("ali").then(success).catch(error);
    }

    function getirListe() {
      var hisseListesi = "AVOD.IS,ACSEL.IS,ADANA.IS,ADBGR.IS,ADNAC.IS,ADEL.IS,ADESE.IS,AEFES.IS,AFMAS.IS,AFYON.IS,AGYO.IS,ATPET.IS,ATSYH.IS,AKALT.IS,AKBNK.IS,AKCNS.IS,AKGUV.IS,AKENR.IS,AKFGY.IS,AKFEN.IS,AKSGY.IS,AKGRT.IS,AKMGY.IS,AKSA.IS,AKSEN.IS,AKSUE.IS,AKPAZ.IS,AKYO.IS,ALARK.IS,ALBRK.IS,ALCAR.IS,ALCTL.IS,ALGYO.IS,ALKA.IS,ALKIM.IS,ALNTF.IS,ALTIN.IS,ALYAG.IS,ANACM.IS,ANELE.IS,ANELT.IS,ANSA.IS,ANHYT.IS,ANSGR.IS,ARCLK.IS,ARENA.IS,ARTOG.IS,ARFYO.IS,ARMDA.IS,ARSAN.IS,ARTI.IS,ASELS.IS,ASCEL.IS,ASLAN.IS,ASUZU.IS,ASYAB.IS,ATAC.IS,ATAYO.IS,ATEKS.IS,ATLAS.IS,ATSYO.IS,AVIVA.IS,AVGYO.IS,AVRSY.IS,AVTUR.IS,AYCES.IS,AYEN.IS,AYES.IS,AYGAZ.IS,BAGFS.IS,BAKAB.IS,BANVT.IS,BAYMD.IS,BERDN.IS,BFREN.IS,BIMAS.IS,BISAS.IS,BJKAS.IS,BOLUC.IS,BOSSA.IS,BOYNR.IS,BRISA.IS,BRKO.IS,BRMEN.IS,BROVA.IS,BRSAN.IS,BRYAT.IS,BSHEV.IS,BSKYO.IS,BSOKE.IS,BTCIM.IS,BUCIM.IS,BUMYO.IS,BURCE.IS,BURVA.IS,CARFA.IS,CARFB.IS,CCOLA.IS,CEYLN.IS,COMDO.IS,CRDFA.IS,CEMAS.IS,CBSBO.IS,CLEBI.IS,CELHA.IS,CEMTS.IS,CMBTN.IS,CMENT.IS,CIMSA.IS,DARDL.IS,DAGHl.IS,DARDL.IS,DGATE.IS,DMSAS.IS,DNZYO.IS,DENIZ.IS,DENCM.IS,DENTA.IS,DERIM.IS,DESA.IS,DESPEC.IS,DEVA.IS,DIRIT.IS,DITAS.IS,DOCO.IS,DOBUR.IS,DGZTE.IS,DOHOL.IS,DYHOL.IS,DOGUB.IS,DGGYO.IS,DOAS.IS,DJIST.IS,DURDO.IS,DYOBY.IS,ECILC.IS,ECYAP.IS,ECBYOe.IS,ECZYT.IS,EDIP.IS,EGEEN.IS,EGGUB.IS,EGPRO.IS,EGESER.IS,EGLYO.IS,EPLAS.IS,EGYO.IS,EMKEL.IS,EMNIS.IS,ENKAI.IS,ERBOS.IS,EREGL.IS,ERSU.IS,ESEM.IS,ESCOM.IS,EMBYO.IS,ENVYO.IS,FENER.IS,FENIS.IS,FFKRL.IS,FINBN.IS,FMIZP.IS,FNSYO.IS,FONFK.IS,FORTS.IS,FRIGO.IS,FROTO.IS,FVORI.IS,GARAN.IS,GARFA.IS,GDKYO.IS,GENTS.IS,GEREL.IS,GLYHO.IS,GOLDS.IS,GOLTS.IS,GOODY.IS,GOZFN.IS,GRNYO.IS,GSDHO.IS,GSRAY.IS,GUBRF.IS,GUSGR.IS,HALKB.IS,HALKS.IS,HATEK.IS,HDFYO.IS,HEKTS.IS,HLGYO.IS,HURGZ.IS,HZNDR.IS,IBTYO.IS,IDAS.IS,IDGYO.IS,IHEVA.IS,IHGZT.IS,IHLAS.IS,IHYAY.IS,INDES.IS,INFYO.IS,INTEM.IS,IPMAT.IS,ISAMB.IS,ISATR.IS,ISBTR.IS,ISCTR.IS,ISFIN.IS,ISGSY.IS,ISGYO.IS,ISKUR.IS,ISMEN.IS,ISYAT.IS,ITTFH.IS,IZMDC.IS,IZOCM.IS,KAPLM.IS,KRDMD.IS,KAREL.IS,KARSN.IS,KRTEK.IS,KARTN.IS,DGKLB.IS,KENT.IS,KERVT.IS,KLMNS.IS,KCHOL.IS,KNFRT.IS,KONYA.IS,KORDS.IS,KOZAA.IS,KRSTL.IS,KUTPO.IS,LATEK.IS,LINK.IS,LOGO.IS,LUKSK.IS,MAKTK.IS,MRDIN.IS,MAALT.IS,MRSHL.IS,MZHLD.IS,MNDRS.IS,MEMSA.IS,MERKO.IS,MRTGG.IS,METUR.IS,METRO.IS,MGROS.IS,MIPAZ.IS,MUTLU.IS,NETAS.IS,NTHOL.IS,NTTUR.IS,NUGYO.IS,NUHCM.IS,OKANT.IS,OLMKS.IS,OTKAR.IS,OYAYO.IS,OZGYO.IS,PRKME.IS,PARSN.IS,PENGD.IS,PEGYO.IS,PGSUS.IS,PETKM.IS,PKENT.IS,PTOFS.IS,PETUN.IS,PINSU.IS,PNSUT.IS,PIMAS.IS,PKART.IS,RANLO.IS,RAYSG.IS,RYSAS.IS,SAHOL.IS,SANKO.IS,SARKY.IS,SELEC.IS,SELGD.IS,SERVE.IS,SILVR.IS,SNGYO.IS,SODA.IS,SKTAS.IS,SONME.IS,SNPAM.IS,SEKFK.IS,SKPLC.IS,SKBNK.IS,SISE.IS,HALKB.IS,TCHOL.IS,TACTR.IS,TATGD.IS,TAVHL.IS,TARAF.IS,TKFEN.IS,TEKTU.IS,TEBNK.IS,TEKST.IS,KIPA.IS,TOASO.IS,TSPOR.IS,TRKCM.IS,TRNSK.IS,TSKB.IS,TSGYO.IS,TBORG.IS,TUKAS.IS,TRCAS.IS,TCELL.IS,TUPRS.IS,THYAO.IS,PRKAB.IS,TTRAK.IS,ULAS.IS,UCAK.IS,USAK.IS,UTPYA.IS,UYUM.IS,UZERB.IS,VKBYO.IS,VAKFN.IS,VKFRS.IS,VKGYO.IS,VAKBN.IS,VAKKO.IS,VANGD.IS,VARYO.IS,VESTL.IS,VESBE.IS,VKING.IS,YATAS.IS,YAPRK.IS,YAZIC.IS,YBTAS.IS,YESİL.IS,YKBNK.IS,YKFIN.IS,YKBYO.IS,YKGYO.IS,YKRYO.IS,YKSGR.IS,YONGA.IS,YUNSA.IS,YGYO.IS,ZOREN.IS";
      vm.loading = true;

      var kullaniciId = 2;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.adet = result.adet;
        vm.liste = result.liste;
        vm.zaman = new Date();
      }

      function error() {
        vm.items = [];
        vm.zaman = new Date();
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });

        $scope.$broadcast('scroll.refreshComplete');
      }

      izleAlSatService.yahooAll(hisseListesi, kullaniciId).then(success).catch(error).finally(finished);
    }

    function searchYahoo() {
      vm.loading = true;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.count = result.adet;
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

      izleAlSatService.yahoo(vm.hisseKodu.toUpperCase() + ".IS").then(success).catch(error).finally(finished);
    }

    function takipListesineEkleCikar(i, hisseKodu) {
      vm.loading = true;

      var kullaniciId = localStorage.getItem('kullaniciId');

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {

      }

      function error() {

      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      if (vm.liste[i].izle) {
        HisseTakipService.takipListesineEkle(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
      } else {
        HisseTakipService.takipListesindenCikar(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
      }
    }

    function takipListesineEkle(hisseKodu) {
      vm.loading = true;

      var kullanniciId = 2;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.liste = result;
      }

      function error() {
        vm.liste = [];
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      HisseTakipService.takipListesineEkle(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
    }

    function takipListesindenCikar(hisseKodu) {
      vm.loading = true;

      var kullanniciId = 2;

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      function success(result) {
        vm.liste = result;
      }

      function error() {
        vm.liste = [];
      }

      function finished() {
        vm.loading = false;

        $ionicLoading.hide().then(function () {
          console.log("The loading indicator is now hidden");
        });
      }

      HisseTakipService.takipListesindenCikar(hisseKodu, kullaniciId).then(success).catch(error).finally(finished);
    }

    function viewEntered(event, data){
      vm.getirListe();
    }

    function init() {
      vm = {
        name: "Yasin",
        items: [],
        loading: false,
        searchYahoo: searchYahoo,
        getirListe: getirListe,
        hisseKodu: "",
        hisse: null,
        getHisse: getHisse,
        liste: null,
        renk: null,
        symbol: $stateParams.symbol,
        takipListesineEkle: takipListesineEkle,
        takipListesindenCikar: takipListesindenCikar,
        takipListesineEkleCikar: takipListesineEkleCikar
      };

      $scope.$on("$ionicView.enter", viewEntered);

      return vm;
    }

    return init();
  }

  IzleAlSatController.$inject = ["IzleAlSatService", "HisseTakipService", "$ionicLoading", "$timeout", "$stateParams", "$scope"];

  module.controller("IzleAlSatController", IzleAlSatController);
}());
