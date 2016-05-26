(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("registerCtrl", ["$scope", "$location", "popupHandler"
                                  , "profileService", "logService", "$translate", registerCtrl]);

    function registerCtrl($scope, $location, popupHandler
    		, profileService, logService, $translate) {
    	
        var vm = this;
        vm.mobileNumber = "";
        
        $scope.submitRegisterForm = function() {
			// check to make sure the form is completely valid
			if (vm.userForm.$valid)
			{
				var mobileNumber 	= "201"+vm.mobileNumber;//"010000000004";
				var msg = $translate.instant("errorDialogDescriptionConfirmNumber", { mobileNumber: mobileNumber});
				popupHandler.titleAndDescription( "errorDialogButton2_confirm", msg);
				
				popupHandler.popupBtn1("errorDialogButton2_confirm",
				function()
				{
					var options = 	{
										path : "/verification"
									,	openBusyIndicator	: true
									};
					profileService.getActivationCode(mobileNumber, options)
					.then(function(result)
						{
						if(result)
							{
								var action 		= "Login";
								var actionType 	= "2";
								logService.addLog(action, actionType);
			
			    	            $location.path("/verification");
							}
						});
				});
				popupHandler.popupBtn2("errorDialogButton2_edit",function(){});
				
				popupHandler.show("commonPopup");
				
				
				 //$location.path("/home");
			}

		};
        
        vm.registerBtnClick = function (e) {
        }
        

        vm.togglePopup = popupHandler.toggle;  
    }
})();