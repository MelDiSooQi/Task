(function() {
	"use strict";

	angular.module('WIFIApp').controller(
			"connectCtrl",
			[ "$scope", "settingHandler", "pagesHandler", "$timeout"
			  , "connectionBusinessHandler", "wifiHandler", "popupHandler", "store"
			  , "$location", "deviceInfoHandler", "$route"
			  , connectCtrl ]);

	function connectCtrl($scope, settingHandler, pagesHandler, $timeout
						, connectionBusinessHandler, wifiHandler, popupHandler, store
						, $location, deviceInfoHandler, $route)
	{
		var vm 	= this;
		vm.OS	= deviceInfoHandler.getOS;
		vm.show = false;
		
		$timeout(function()
		{
			vm.options =
			{
				thickness : 6
			};
			vm.percent1 = "83%";
			vm.data1 = [{
							label : "One"
						,	value : 83
						,	color : "#006b6c"
	            		},
			            {
	            			label : "Two"
	            		,	value : 17
	            		,	color : "#01cfcf"
			            }];
			
			vm.percent2 = "75%";
			vm.data2 = [{
							label : "Two"
						,	value : 75
						,	color : "#006b6c"
						},
						{
							label : "One"
						,	value : 25
						,	color : "#01cfcf"
						}];
			vm.show = true;
		}, 1000);
		
//===========================================================================
		vm.getConnected = function ()
		 { 
			 // No Action here
		 }
//===========================================================================
		vm.activeState = "getConnectedLoading";
		vm.activeColor = "#04C2D6";
		
		wifiHandler.getWifiName()
		.then(function(result)
        {
		if(result != null)
			{
				if(result.SSID == "Etisalat_Hotspot")
				{
					 vm.activeState = "getConnectedActive";
					 vm.activeColor = "green";
				}else
				{
					vm.activeState = "getConnectedNotActive";
					vm.activeColor = "red";
				}
			}else
			{
				vm.activeState = "getConnectedNotActive";
				vm.activeColor = "red";
			}
				
        }, function(result)
        {
        	vm.activeState = "getConnectedNotActive";
			vm.activeColor = "red";
        });
//===========================================================================
		var isChanged = false;
		var tempConnectionSettings = settingHandler.getConnectionSettings(); //temp Connection Settings before scroll
		vm.changeConnected = function (connectionSettings)
		 {
		 	isChanged = true;
			tempConnectionSettings 	= connectionSettings;
			vm.connectionSettings 	= settingHandler.getConnectionSettings();
		 }
//===========================================================================
		vm.connectionSettings 	 = settingHandler.getConnectionSettings();
		vm.setConnectionSettings = function (connectionSettings)
		 {
			var isRegistered = store.get('isRegistered');
			
			if(isRegistered)
			{
				if(isChanged)
				{
				vm.connectionSettings 	= tempConnectionSettings;
				settingHandler.setConnectionSettings(tempConnectionSettings);
				connectionBusinessHandler.handleConncetionBusiness();
				}
				else
				{
					//Nothing Changed
				}
			}else if( !isRegistered
					|| isRegistered == null
					|| isRegistered == undefined )
			{
				$location.path("/register");
			}
			
			
		 }
//===========================================================================
		vm.clickPurchaseQuota = function()
		{
			var isRegistered = store.get('isRegistered');
			
			if(isRegistered)
			{
				popupHandler.titleAndDescription( "getConnectedPurchaseQuotaTitle", "getConnectedPurchaseQuotaDescription");
				
				popupHandler.popupBtn1("errorDialogButton2_Purchase",
				function()
				{
					setTimeout(function(){openNewPopup();}, 0);
				});
				
				popupHandler.popupBtn2("errorDialogButton2_cancel",function(){});
				
				popupHandler.show("purchaseQuotaPopup");
				
			}else if( !isRegistered
					|| isRegistered == null
					|| isRegistered == undefined )
			{
				$location.path("/register");
			}
		}
		
		var openNewPopup = function()
		{
			$route.reload();
			popupHandler.titleAndDescription( "getConnectedPurchaseQuotaTitle", "getConnectedPurchaseQuotaSuccessMessage");
			
			popupHandler.popupBtn1("errorDialogButton2_Okay",function(){});
			
			popupHandler.show("commonOneBtnPopup");
		}
	}
})();