(function()
{
	"use strict";

	angular.module('WIFIApp').controller(
			"sideBarCtrl",
			[ "$scope", "$timeout", "$translate", "pagesConfigs", "sideBarHandler",
			  "$location", "tabHandler", sideBarCtrl ]);

	function sideBarCtrl($scope, $timeout, $translate, pagesConfigs, sideBarHandler,
			$location, tabHandler)
	{
		var vm = this;

		var items = [];
		items.push(new Item("#4a4a4a", "images/home.png",
				"sidePanelHome", onClick, itemClass));
		items.push(new Item("#679d01", "images/location_icon.png",
				"sidePanelLocation", onClick, itemClass));
		items.push(new Item("#009899", "images/connected_icon.png",
				"sidePanelConnected", onClick, itemClass));
		items.push(new Item("#8a42a8", "images/notifiedIcon.png",
				"sidePanelNotified", onClick, itemClass));
		items.push(new Item("#4a4a4a", "images/rewarded_menu.png",
				"sidePanelRewarded", onClick, itemClass));
		items.push(new Item("#666", "images/settings.png", "sidePanelSettings",
				onClick,itemClass));
		
		vm.items 	= items;
		vm.getDir 	= function()
		{
			return $translate.use() == "en" ? "ltr" : "rtl";
		}
		
		vm.getClass = function()
		{
			return $translate.use() == "en" ? "" : "arabic";
		}
		
		function itemClass()
		{
			return $translate.use() == "en" ? "" : "ar";
		}
		
		function onClick($event, $index)
		{
			var time = 0;
			// winJS !== null ? time = 600 : time = 400;
			sideBarHandler.toggle();
			switch ($index)
			{
				case 0:
					tabHandler.resetTabs();
					$location.path("/home");
					break;
				case 1:
					tabHandler.resetTabs();
					$location.path("/maps");
					break;
				case 2:
					tabHandler.resetTabs();
					$location.path("/connect");
					break;
				case 3:
					tabHandler.resetTabs("notification");
					$location.path("/notification");
					break;
				case 4:
					tabHandler.resetTabs("rewards");
					$location.path("/rewards");
					break;
				case 5:
					tabHandler.resetTabs();
					$location.path("/settings");
					break;
			}
		}
		
	}

	var Item = function(color, src, text, callBack,itemClass)
	{
		return this.init(color, src, text, callBack,itemClass);
	}

	Item.prototype = function()
	{
		function init(color, src, text, callBack,itemClass)
		{
			return 	{
						color 		: color,
						src 		: src,
						text 		: text,
						click 		: callBack,
						className	: itemClass
					};
		}
		// ms-appx://2c8779f0-90a9-4d3e-80b3-0eb14824afc9/www/default/

		return 	{
					init : init
				};
	}();
})();