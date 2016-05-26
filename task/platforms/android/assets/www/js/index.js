var winJS = WinJS !== undefined ? WinJS : null;
(function () {
    "use strict";

    var app = angular
        .module("WIFIApp",
        [
            "ngTouch",
            "ngRoute",
            "angular-storage",
            "pascalprecht.translate",
            "ngMaterial",
            "n3-pie-chart",
            "ngCordova",
            "ngOpenFB",
            'uiGmapgoogle-maps',
            'ngTwitter'
        ]);

    app.config([
        "$routeProvider",
        "$translateProvider",
        "$controllerProvider",
        "$provide",
        '$compileProvider',
        "uiGmapGoogleMapApiProvider",
        "appRoutes",
        "appConfigs",
        function ($routeProvider,
        		$translateProvider,
        		$controllerProvider,
        		$provide,
        		$compileProvider,
        		uiGmapGoogleMapApiProvider,
        		appRoutes,
        		appConfigs) {
        	
        	
            if (appConfigs.logExceptions) {
                $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
                    return function (exception, cause) {
                        console.log("exception: " + exception + " \n cause: "
                            + cause);
                    };
                });
            }

            uiGmapGoogleMapApiProvider.configure({
                //    key: 'your api key',
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization'
            });
            
            $compileProvider.imgSrcSanitizationWhitelist('images/');

            /*
            * configurations of $translateProvider - setting locale source
            * and mechanism - setting default language
            */

            // load locale files Async
            $translateProvider.useStaticFilesLoader({
                prefix: "locales/locale-",
                suffix: ".json"
            });

            // configuring prefered language
            var lang = navigator.language;
            if (navigator.userAgent.match(/Windows Phone/i)) {
                lang = navigator.browserLanguage;
            }
            // var lang =
            // navigator.language?navigator.language:navigator.browserLanguage;
            var prefLang = lang.split("-")[0];
            if (localStorage.getItem("lang"))
                prefLang = localStorage.getItem("lang");
            Tabs.lang = prefLang;
            $translateProvider.preferredLanguage(prefLang);
            $translateProvider.fallbackLanguage("en");
            // ==============================================================================

            /*
				 * Creating a more synthesized form of service of
				 * $controllerProvider.register overriding .controller for
				 * easier use
				 */
            app.controller = $controllerProvider.register;
            app.factory = $provide.factory;
            app.value = $provide.value;
            // ==============================================================================
            appRoutes.parserMethods.initRouting($routeProvider,appRoutes,appConfigs);
        }
    ]);

    app.run(["languageHandler", "pagesHandler", "initializationHandler",
        function (languageHandler, pagesHandler, initializationHandler) {
    		//initializationHandler.init();    		
    		pagesHandler.resolvePagesConfigs();
//            FastClick.attach(document.body);
            /*if (winJS) {
                var s = Windows.UI.ViewManagement.StatusBar.getForCurrentView();
                s.showAsync();
            }*/
        }
    ]);
})();