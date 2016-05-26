(function() {
	"use strict";

	angular.module('WIFIApp').controller(
			"connectCtrl",
			[ "$scope", "settingHandler", "pagesHandler", "$timeout"
			  , "connectionBusinessHandler", "wifiHandler", "popupHandler", "store"
			  , "$location", "deviceInfoHandler", "$route", "profileService", "localNotificationHandler"
			  , connectCtrl ]);

	function connectCtrl($scope, settingHandler, pagesHandler, $timeout
						, connectionBusinessHandler, wifiHandler, popupHandler, store
						, $location, deviceInfoHandler, $route, profileService, localNotificationHandler)
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
		var getConnectedBtnClickable = false;
		vm.getClass = function()
		{
			if(vm.activeColor == "green")
			{
				getConnectedBtnClickable = true;
				return "";
			}else
			{
				getConnectedBtnClickable = false;
				return "disable";
			}
		}
		
		vm.getConnected = function ()
		 { 
			if(getConnectedBtnClickable)
			{
				 // No Action here
				
				var URL = "";
				
				if(settingHandler.getLanguage() == "en")
	        	{
					URL = "http://hotspot.etisalat.com.eg/etisalat/wifi/dashboard.html";
	        	}else
	        	{
	        		URL = "http://hotspot.etisalat.com.eg/etisalat/wifi/dashboard_ar.html";
	        	}
				
				var ref = window.open(URL, '_blank', 'location=yes');
	
	//			ref.addEventListener('loadstart', iabLoadStart);
	//			ref.addEventListener('loadstop'	, iabLoadStop);
	//			ref.addEventListener('loaderror', iabLoadError);
	//			ref.addEventListener('exit'		, iabClose);
				
	//			var myCallback = function() { alert(event.url); }
	//			ref.addEventListener('loadstart', myCallback);
	//			ref.removeEventListener('loadstart', myCallback);
	//			ref.show();
	//			ref.close();
				
				//navigator.app.loadUrl('https://google.com/', { openExternal:true });
				
				//window.open("http://google.com", '_system');
			}
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
					 
					 var ID 		= 1; 
					 var title		= "Etisalat Hotspot"; 
					 var text		= "You are connected on Etisalat Hotspot.";
					 var dataObj 	=   {
							 				testData : "Hello Etisalat Hotspot"
					 					};
					 var badge		= null;
					 localNotificationHandler.notificationImmediately(ID, title, text, dataObj, badge)
					 localNotificationHandler.callBackOnClickOnNotification().then(
					 function(notification)
					 {
					 if (notification.id == 1)
			            {
						 	var data  = JSON.parse(notification.data);
						 	
			                alert(data.testData);
			            }
					 });
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
		//==================================================For Yahia test only
		/*vm.clickPurchaseQuota = function()
		{
			var key = "key103";
			var options = 	{
								openBusyIndicator : true
							};
        	profileService.getConfiguration(key, options).then(function(result)
					{
						if(result)
						{
							popupHandler.titleAndDescription( "For Backend test", JSON.stringify(result));
							
							popupHandler.popupBtn1("errorDialogButton2_Okay",function(){});
							
							popupHandler.show("commonOneBtnPopup");
						}
					});
		}*/
		//==================================================For Yahia test only
		vm.clickPurchaseQuota = function()
		{
			var isRegistered = store.get('isRegistered');
			
			if(isRegistered)
			{
				popupHandler.titleAndDescription( "getConnectedPurchaseQuotaTitle", "getConnectedPurchaseQuotaDescription");
				
				popupHandler.popupBtn1("errorDialogButton2_Purchase",
				function()
				{
					var purchaseQuotaCode =  popupHandler.getPurchaseQuotaCode();
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