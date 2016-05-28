(function(){
	"use strict";
	
	angular.module("EmployeeDirectoryApp")
		.factory("initializationHandler" ,[ initializationHandler]);
	
	function initializationHandler(profileService, locationService, store, $route){
		
		
		
		var addDeviceType = function()
		{
			var mainBody	= document.getElementById("mainBody");
			//add class by JS
			//mainBody.className += " "+WL.Client.getEnvironment();
		}

		var loadFunction = function(){
			addDeviceType();
    		setTimeout(function()
			{
				
			}, 5000);
		};
		
		var init = function () {

		    //loadFunction();
		};
		
		return{
			init:init
		}
	}
})();