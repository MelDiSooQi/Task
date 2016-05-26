(function () {
    "use strict";
    angular.module("WIFIApp").controller("verificationCtrl"
    		, ["$scope", "$location", "profileService"
    		   	, "pushNotificationsHandler", "PushAppRealmChallengeHandler", verificationCtrl]);
    function verificationCtrl($scope, $location, profileService
    			, pushNotificationsHandler, PushAppRealmChallengeHandler) {
        var vm = this;
        
        $scope.submitVerifyForm = function() {
			// check to make sure the form is completely valid
			if (vm.userForm.$valid)
			{
	        	var activationCode	= vm.verificationCode;
	        	var options = 	{
									path : "/home"
								}
	        	profileService.verifyActivationCode(activationCode, options).then(function(result)
					{
						if(result)
						{
							if(pushNotificationsHandler.isPushSupported())
					    	{
								if(!pushNotificationsHandler.isPushSubscribed())
									{
										initPushNotifications();
									}
					    	}
							
				            $location.path("/home");
						}
					});
			}

		};
        
        var initPushNotifications = function()
        {
			if(pushNotificationsHandler.getIsReadyToSubscribe())
			{
				PushAppRealmChallengeHandler.onSubmit(vm.mobileNumber);
				pushNotificationsHandler.doSubscribe().then(function(result){});
				//pushNotificationsHandler.doSubscribe().then(function(result){});
			}
        }
    }
})();