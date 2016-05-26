(function() {
	"use strict";

	angular.module("WIFIApp").factory("busyIndicator",
			[ "$rootScope", busyIndicator ]);

	function busyIndicator($rootScope) {
		var visible = false;

		$rootScope.showBusyIndicator = function(){
			return visible;
		}
		
		function show() {
			visible = true;
		}

		function hide() {
			visible = false;
		}

		function toggle() {
			visible = !visible;
		}

		function isVisible() {
			return visible;
		}

		return {
			show : show,
			hide : hide,
			toggle : toggle,
			isVisible : isVisible
		}
	}

})();
