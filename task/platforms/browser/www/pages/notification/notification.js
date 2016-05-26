(function() {
	"use strict";

	angular.module('WIFIApp').factory("testFact",
			[ "$q", "$timeout", function($q, $timeout) {

				return {
					callSvc : function() {
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve();
						}, 0);
						return deferred.promise;
					}
				}
			} ]);

	angular.module('WIFIApp')
			.controller(
					"notificationCtrl",
					[ "$scope", "$location", "$timeout", "testFact", "notificationService", "store"
					  , "tabHandler", "notificationHandler", "campaignHandler"
					  ,notificationCtrl ]);

	function notificationCtrl($scope, $location, $timeout, testFact, notificationService, store
			, tabHandler, notificationHandler, campaignHandler)
	{
		var vm = this;
		var isRegistered = store.get('isRegistered');
		//-------------------------------------------------------------
		var tabs = new Tabs();
		
		vm.onTabChanged = function()
		{
			tabHandler.getActiveTab("notification");
		}
		tabHandler.setActiveTab("notification");
		//-------------------------------------------------------------
		var onClick = function($event, $index)
		{
			vm.goNotificationMoreDetails();
			
			notificationHandler.setNotificationsReadedByIndex($index);
		}
		notificationHandler.setOnClickCallBack(onClick);
		
		if(isRegistered)
		{
			vm.showNotifications = true;
        	notificationHandler.createNotifications();
        	
        	var notificationsNumber = notificationHandler.getNotificationsNumber();
        	
        	if(notificationsNumber == -1)
        	{
        		vm.showNotifications = false;
        	}else if(notificationsNumber == 0)
        	{
        		vm.showNotifications = false;
        	}else
        	{
        		vm.showNotifications = true;
        	}
        	
		}else
		{
			vm.showNotifications = false;
		}
		
		

		
		vm.notifications	= notificationHandler.getNotifications;
		//-------------------------------------------------------------
		campaignHandler.setOnClickCallBack(
		function($event, $index)
		{
			vm.goDetails()
		});
		
		campaignHandler.createCampaigns();
		vm.campaigns	= campaignHandler.getCampaigns;
		//-------------------------------------------------------------
		
		
		vm.goNotificationMoreDetails = function()
		{
			var isRegistered = store.get('isRegistered');
			
			if(isRegistered)
			{
				$location.path('/notificationMoreDetails');
			}
			else if( !isRegistered
					|| isRegistered == null
					|| isRegistered == undefined )
			{
				$location.path("/register");
			}
		}

		vm.goDetails = function()
		{
			var isRegistered = store.get('isRegistered');
			
			if(isRegistered)
			{
//				var mobileNumber = "+201";
//				notificationService.getTopNotifications(mobileNumber).then(function(result){});
				
				$location.path('/moreDetails');
			}
			else if( !isRegistered
					|| isRegistered == null
					|| isRegistered == undefined )
			{
				$location.path("/register");
			}
		}
		
		testFact.callSvc().then(function()
		{
			var x = 0;
		});
	}
})();