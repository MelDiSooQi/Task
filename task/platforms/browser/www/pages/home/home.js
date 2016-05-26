(function () {
    "use strict";

    angular.module('WIFIApp').controller(
        "homeCtrl",
        [
            "$scope", "$location", "$route", "languageHandler",
            "sideBarHandler", "popupHandler", "store"
            
            , homeCtrl
        ]);

    function homeCtrl($scope, $location, $route, languageHandler
    		, sideBarHandler, popupHandler, store
    		 )
    {
        var vm 		= this;
        var lang 	= "en";
        var isRegistered = store.get('isRegistered');
        


        vm.className = function ()
        {
            if (lang == "ar") {
                return "contentAr";
            } else {
                return "content";
            }
        }

        vm.togglePopup = popupHandler.toggle;

        vm.toggleLang = function ()
        {
            if (lang == "en") {
            	languageHandler.set("ar");
                lang = "ar";
            } else {
            	languageHandler.set("en");
                lang = "en";
            }
        }

        vm.toggleSide = sideBarHandler.toggle;
        
        vm.goLocation = function ()
        {
        	$location.path('/maps');
//        	var openBusyIndicator = true;
//        	locationService.getAllHotspotsUpdates(openBusyIndicator).then(function(result){
//        				
//        			});
//        	

//        	locationService.getHotspotCategories().then(function(result){});
//        	var governorateId = 101;
//        	locationService.getHotspotDistricts(governorateId).then(function(result){});
//        	locationService.getHotspotGovernorate().then(function(result){});
        	
            
//            //-------------------------------Location Options S-------------------------------
//            var mapOptionsConverted = JSON.stringify([
//                {
//                    "currentLocationIcon": true, // open current location icon
//                    "openCameraOnPostion": true, // if true open on Latitude, Longitude if false open on current Location
//                    "Latitude": "30.034912", // if openCameraOnPostion true
//                    "Longitude": "31.351624", // if openCameraOnPostion true
//                    "zoomLevel": 14 // int zoom level from 1 to 20 max
//                }
//            ]);
        }

        function backFromNativePage(data) {
            alert(data.param1);
        }

        vm.goConnect = function ()
        {
            $route.reload();
            $location.path('/connect');
	
            if(WL.Env.ANDROID == WL.Client.getEnvironment())
            {
            	if(isRegistered)
    			{
            		connectionBusinessHandler.handleConncetionBusiness();
    			}else
    			{
    				// Do Nothing
    			}
        	}
        }

        vm.goConsumption = function()
        {
            $route.reload();
            $location.path('/consumption');
        }

        vm.goRewards = function ()
        {
            $route.reload();
            $location.path('/rewards');
        }
        // -------------------------register------------------------------
        var registerSuccess = function (res) {
            alert(res.username + "\n" + res.password);
        }

        var registerFailed = function (e) {
            alert(e);
        }
        // -------------------------register------------------------------
        vm.goNotification = function () {
            $route.reload();
            $location.path('/notification');
        }
    }
})();