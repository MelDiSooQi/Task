(function() {
	"use strict";
	/**
	 * This is the default values of the PagesConfigs object , The available
	 * values is written beside each property
	 * 
	 * 
	 * backRouteDefault = "", page path to go back to instead of the default
	 * action pageNameVisible = true, check if the title of the header is
	 * visible or not true|false headerVisible = true, check if the header is
	 * visible or not true|false backBtnVisible = true, check if back button is
	 * visible or not true|false settingsVisible = false, check if settings
	 * visible or not true|false settingsMenu = null, array contains the keys of
	 * the items in the settings menu ex:["key1","key2",....] enterDir ="left",
	 * page entrance transition direction up|down|left|right exitDir = "right"
	 * page exit transition direction up|down|left|right headerColor = "#679d01"
	 * Header color for each page
	 * 
	 */

	angular.module("EmployeeDirectoryApp").value('pagesConfigs', {
		defaults : { // defaults properties for all pages.
			pageNameKey 			: "Etisalat HotSpot",
			back					: "/404",
			pageNameVisible 		: true,
			headerVisible 			: true,
			headerColor 			: "#d3d5d4",
			headTextColor 			: "#fff",
			statusBarColor 			: "#000",
			backBtnVisible 			: true,
			settingsVisible 		: false,
			settingsMenu 			: null,
			enterDir 				: "left",
			exitDir 				: "right",
			sideBarIndex 			: null,
			backBtnForBackVisible	: false
		},
		pages : {
			page1 : 
			{
				pageNameKey 			: "Employee Directory",
				enterDir 				: "up",
				exitDir 				: "down",
				headerColor 			: "#e5e9e8",
				statusBarColor 			: "#e5e9e8",
				back 					: "exitApp",
				backBtnVisible 			: false,
				backBtnForBackVisible	: false
			}
			,
			page2 : {
				pageNameKey 			: "Employee",
				enterDir 				: "up",
				exitDir 				: "down",
				headerColor 			: "#e5e9e8",
				statusBarColor 			: "#e5e9e8",
				back 					: "/page1",
				backBtnVisible 			: false,
				backBtnForBackVisible	: true
			}
			,
			page3 : {
				pageNameKey 			: "Directory Report",
				enterDir 				: "up",
				exitDir 				: "down",
				headerColor 			: "#e5e9e8",
				statusBarColor 			: "#e5e9e8",
				back 					: "goBack",
				backBtnVisible 			: false,
				backBtnForBackVisible	: true
			}
		}
	});
})();