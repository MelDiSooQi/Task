(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("rewardsCtrl", ["$scope", "$timeout", "ngFB", "instagramHandler"
                                  , "$location", "store", "facebookHandler", "twitterHandler"
                                  , "tabHandler"
                                  , rewardsCtrl]);

    function rewardsCtrl($scope, $timeout, ngFB, instagramHandler
    		, $location, store, facebookHandler, twitterHandler, tabHandler) {
        var vm = this;
		var tabs = new window.Tabs();
		
		vm.onTabChanged = function()
		{
			tabHandler.getActiveTab("rewards");
		}
		tabHandler.setActiveTab("rewards");
		
		var isLoggedIn = twitterHandler.isTwitterLoggedIn();
		if(isLoggedIn == "true")
		{
			vm.isTwitterLoggedIn = true;
		}
		else
		{
			vm.isTwitterLoggedIn = false;
		}
		
		facebookHandler.facebookInit();
		
		var isRegistered 			= store.get('isRegistered');
		vm.isFaceBookRegistered 	= function()
		{
			var isFacebookRegistered = facebookHandler.isFacebookRegistered();
			if(isFacebookRegistered == null)
			{
				return false;
			}else if(isFacebookRegistered == true)
			{
				return true;
			}
		}
        
        vm.fbLoginBtn = function()
        {
        	var options = 	{
        						path : "/register"
        					};
        	facebookHandler.facebookLogin(options);
        };
        
        vm.fbShareBtn = function()
        {
			var shareMessage = 'Etisalat Hotspot';
			facebookHandler.facebookShare(shareMessage);
		}
        
        vm.auth = function () {
            instagramHandler.Auth();
        }
        
        vm.goDetails = function()
        {
			if(isRegistered)
			{
				$location.path('/rewardsMoreDetails');
			}
			else if( !isRegistered
					|| isRegistered == null
					|| isRegistered == undefined )
			{
				$location.path("/register");
			}
		}
        
        vm.openTwitter = function() {
        	
        	var options = 	{
				path : "/register"
			};
        	twitterHandler.twitterLogin(options);
		};
		
		vm.tweet = function()
		{
			twitterHandler.postStatusUpdate("test from app");
		};
    }
})();