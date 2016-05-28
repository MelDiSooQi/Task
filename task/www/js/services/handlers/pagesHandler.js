(function () {
    "use strict";

    angular.module("EmployeeDirectoryApp").factory("pagesHandler",
				["$rootScope", "pagesConfigs", "$location", "$window",
				 "$timeout", "popupHandler", "$route"
			     ,pagesHandler]);

    function pagesHandler($rootScope, pagesConfigs, $location, $window
        , $timeout, popupHandler, $route)
    {
        //private properties S/////////////////
        var currentPage = null,
        	back = false,
        	animationDirection = "left",
        	backActions = 	{
				        	    goBack: goBack,
				        	    exitApp: exitApp,
        					}
        //////////////////End////////////////

        //initial assignments S/////////////////
        if (winJS) {
            winJS.Application.onbackclick = onBackButton;
        }
        document.addEventListener("backbutton", onBackButton, false);
        $rootScope.$on("$routeChangeSuccess", onRouteChangeSuccess);
        $rootScope.ngViewLoaded = onNgViewLoaded;
        $rootScope.$on("$routeChangeStart", onRouteChangeStart);
        //////////////////End////////////////


        //private methods S/////////////////

        function onBackButton() {
        	if(popupHandler.isVisible())
        	{
        		popupHandler.hide();
                $route.reload();
        	}
        	else
        	{
	            back = true;
	           
                if (currentPage.back.indexOf("/") !== -1) {
                	$timeout(function() {
						$location.path(currentPage.back);
					});
                } else {
                    backActions[currentPage.back]();
                }
	            
	            return true;
        	}
        }

        function setCurrentPage(currentPageArg) {
            currentPage = currentPageArg;
        }

        function goBack() {
            back = true;
            $timeout(function() {
            	$window.history.back();
            });
        }

        function exitApp() {
            navigator.app.exitApp();
        }

        function onRouteChangeSuccess(event, current, previous) {
            if (current.originalPath !== undefined) {
                var name = current.originalPath.replace("/", "");
                setCurrentPage(pagesConfigs.pages[name]);
            }
        }

        function onNgViewLoaded() {
            excuteNativeTransition();
            back = false;
        }

        function excuteNativeTransition() {
            if (winJS) {
                excuteWindowsTransition();
            } else {
                $timeout(
                    function () {
                        if (window.plugins) {
                            window.plugins.nativepagetransitions
                                .executePendingTransition(null, null);
                        }
                    }, 100);
            }
        }

        function excuteWindowsTransition() {
                if (back) {
                    WinJS.UI.Animation.slideRightIn(document
                        .getElementById(currentPage.folder), null);
                } else {
                    WinJS.UI.Animation.slideLeftIn(document
                        .getElementById(currentPage.folder), null);
                }
        }

        function onRouteChangeStart(event, current, previous) {
            var direction = "left";
            if (current.originalPath == undefined) return;
            var nextPageName = current.originalPath.replace("/", "");
            var direction = back ? currentPage.exitDir : pagesConfigs.pages[nextPageName].enterDir;
            if (!winJS) {
                if (window.plugins) {
                    window.plugins.nativepagetransitions.slide(
                        getAnimationOptions(direction), null, null);
                }
            }
        }

        function getAnimationOptions(direction) {
            return {
                "direction": direction,
                "duration": 300,
                "slowdownfactor": 3,
                "iosdelay": -1,
                "androiddelay": -1,
                "winphonedelay": -1,
                "fixedPixelsTop": 0,
                "fixedPixelsBottom": 0
            }
        }
        //////////////////End////////////////



        //puplic methods S/////////////////
        var getCurrentPage = function () {
            return currentPage;
        }

        var resolvePagesConfigs = function () {
            for (var page in pagesConfigs.pages) {
                //var page = {};
                for (var prop in pagesConfigs.defaults) {
                    if (!pagesConfigs.pages[page].hasOwnProperty(prop)) {
                        pagesConfigs.pages[page][prop] = pagesConfigs.defaults[prop];
                    }
                }
            }
        }

        var getPageProperty = function (pagePropertyName) {
            if (!currentPage) return;
            return currentPage.hasOwnProperty(pagePropertyName) ? currentPage[pagePropertyName] : "";
        }
        //////////////////End////////////////
        //Puplish Puplic methods
        return {
            resolvePagesConfigs	: resolvePagesConfigs,
            getCurrentPage		: getCurrentPage,
            getPageProperty		: getPageProperty,
            goBack				: onBackButton
        }
    }

})();