(function() {
	'use strict';

	angular.module('WIFIApp').factory('languageHandler',
			[ '$translate', '$rootScope', '$q', '$timeout', languageHandler ]);

	function languageHandler($translate, $rootScope, $q, $timeout) {

		var saveToLocalStorage = function(lang) {
			localStorage.setItem('lang', lang);
		};

		var useLang = function(lang) {
			var deferred = $q.defer();
			$translate.use(lang).then(function(l) {
				saveToLocalStorage(l);
				deferred.resolve($translate, l);
			});
			return deferred.promise;
		};

		$rootScope.langClassName = function() {

			if ($translate.use() == "en") {
				return "";
			} else {
				return "arabic";
			}
		}

		var switchUI = function(lang) {
			if (!winJS) {
				if (window.plugins) {
					var dir, x;
					if (lang == "en") {
						dir = "left";
						x = "-110%";
						Tabs.lang = "en";
					} else {
						dir = "right";
						x = "110%";
						Tabs.lang = "ar";
					}

					window.plugins.nativepagetransitions.flip(
							getAnimationOptions(dir), function(msg) {
							}, // called when the animation has finished
							function(msg) {
							} // called in case you pass in weird values
					);
				}
			}
			useLang(lang)
					.then(
							function() {
								var sideCont = document
										.getElementById("sideBarCont");
								sideCont.style.transform !== undefined ? sideCont.style.transform = "translate3d("
										+ x + ", 0px, 0px)"
										: sideCont.style.webkitTransform = "translate3d("
												+ x + ", 0px, 0px)";
								$timeout(function() {
									window.plugins.nativepagetransitions
											.executePendingTransition(null,
													null);
								});
							});
		}

		function getAnimationOptions(direction) {
			return {
				"direction" : direction, // 'left|right|up|down', default
				// 'right' (Android currently only
				// supports left and right)
				"duration" : 400, // in milliseconds (ms), default 400
				"iosdelay" : -1, // ms to wait for the iOS webview to update
				// before animation kicks in, default 60
				"androiddelay" : -1, // same as above but for Android,
				// default 70
				"winphonedelay" : -1
			// same as above but for Windows Phone, default 200
			};
		}

		var getLang = function() {
			return $translate.use();
		}

		return {
			set : switchUI,
			get : getLang
		};

	}

})();