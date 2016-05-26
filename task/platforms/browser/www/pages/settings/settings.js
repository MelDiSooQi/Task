(function() {
	"use strict";

	angular.module('WIFIApp').controller(
			"settingsCtrl",
			[ "settingHandler", "$scope", "$location", "languageHandler", "tabHandler"
			  , "popupHandler"
			, settingsCtrl ]);

	function settingsCtrl(settingHandler, $scope, $location, languageHandler, tabHandler
			, popupHandler)
	{
		var vm = this;

		// =======================================================================
		//vm.language = settingHandler.getLanguage() == "en" ? true : false;

		vm.setLanguage = function(language) {
			
			popupHandler.titleAndDescription( "getConnectedPurchaseQuotaTitle", "getConnectedPurchaseQuotaDescription");
			
			popupHandler.popupBtn1("errorDialogButton2_cancel",
			function()
			{
				if(settingHandler.getLanguage() != "en")
				{
					tabHandler.resetTabs();
					languageHandler.set("en");
					settingHandler.setLanguage("en");
					
					if(WL.Client.getEnvironment() == WL.Env.WINDOWSPHONEUNIVERSAL)
					{
					    //WL.Client.reloadApp();
					    //location.reload(true);
					    location.reload();
					}
				}
			});
			
			popupHandler.popupBtn2("errorDialogButton2_cancel",
			function()
			{
				if(settingHandler.getLanguage() != "ar")
				{
					tabHandler.resetTabs();
					languageHandler.set("ar");
					settingHandler.setLanguage("ar");
					
					if (WL.Client.getEnvironment() == WL.Env.WINDOWSPHONEUNIVERSAL)
					{
					    //WL.Client.reloadApp();
					    //location.reload(true);
					    location.reload();
					}
				}
			});
			
			popupHandler.show("languagePopup");
			
			/*if (!language) {
				languageHandler.set("ar");
				settingHandler.setLanguage("ar");
			} else {
				languageHandler.set("en");
				settingHandler.setLanguage("en");
			}
			if (WL.Client.getEnvironment() == WL.Env.WINDOWSPHONEUNIVERSAL)
			{
			    //WL.Client.reloadApp();
			    //location.reload(true);
			    location.reload();
			}
			store.set('activeTab',null);*/
		}
		//		
		// languageHandler.get() == "en" ? vm.english = true : vm.english =
		// false;
//
//		vm.toggleLang = function(english) {
//			if (!english) {
//				languageHandler.set("ar");
//			} else {
//				languageHandler.set("en");
//			}
//		}
		// =======================================================================
		vm.isConnectedAutomatic = settingHandler.getIsConnectedAutomatic();

		vm.setIsConnectedAutomatic = function(isConnectedAutomatic) {
			settingHandler.setIsConnectedAutomatic(isConnectedAutomatic);
		}
		// =======================================================================
		vm.isSocialPermission = settingHandler.getIsSocialPermission();

		vm.setIsSocialPermission = function(isSocialPermission) {
			settingHandler.setIsSocialPermission(isSocialPermission);
		}
		// =======================================================================
		vm.isAutoUpdate = settingHandler.getIsAutoUpdate();

		vm.setIsAutoUpdate = function(isAutoUpdate) {
			settingHandler.setIsAutoUpdate(isAutoUpdate);
		}
		// =======================================================================
		vm.isNotifyUponAccess = settingHandler.getIsNotifyUponAccess();

		vm.setIsNotifyUponAccess = function(isNotifyUponAccess) {
			settingHandler.setIsNotifyUponAccess(isNotifyUponAccess);
		}
		// =======================================================================
		vm.openTutorial = function(isNotifyUponAccess)
		{
			$location.path('/tutorial');
		}
		// =======================================================================
		vm.openAbout = function(isNotifyUponAccess)
		{
			$location.path('/about');
		}
		// =======================================================================
	}
})();