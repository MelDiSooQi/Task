var winJS = WinJS !== undefined ? WinJS : null;
(function () {
    "use strict";

    var app = angular
        .module("EmployeeDirectoryApp",
        [
            "ngTouch",
            "ngRoute",
            "angular-storage",
            "pascalprecht.translate",
            "ngMaterial",
            "ngCordova"
        ]);

    app.config([
        "$routeProvider",
        "$translateProvider",
        "$controllerProvider",
        "$provide",
        '$compileProvider',
        "appRoutes",
        "appConfigs",
        function ($routeProvider,
        		$translateProvider,
        		$controllerProvider,
        		$provide,
        		$compileProvider,
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
            var lang = "en-US";
            
            var prefLang = lang.split("-")[0];
            if (localStorage.getItem("lang"))
                prefLang = localStorage.getItem("lang");
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

    app.run(["languageHandler", "pagesHandler",
        function (languageHandler, pagesHandler)
         {
    		pagesHandler.resolvePagesConfigs();
            FastClick.attach(document.body);
        }
    ]);
})();