(function() {
	"use strict";

	angular.module("WIFIApp").constant("appRoutes", {
		parserMethods:{
			getTemplateUrl:function(pageName){
				return "pages/" + pageName + "/" + pageName + ".html";
			},
			getControllerName:function(pageName){
				return pageName + "Ctrl as vm";
			},
			injectController:function(pageName){
				return {
		            data: [
		                "$q", function ($q) {
		                    var controllerDeferred = $q.defer();
		                    angular.element(document.querySelector("#dynamicScripts")).empty();
		                    var jsName = pageName + ".js";
		                    var path = "pages/" + pageName + "/" + jsName;
		                    var script = document.createElement("script");
		                    script.id = pageName;
		                    script.src = path;
		                    script.onload = function () {
		                        controllerDeferred.resolve();
		                    }
		                    document.getElementById("dynamicScripts").appendChild(script);
		                    return controllerDeferred.promise;
		                }
		            ]
		        }
			},
			initRouting: function($routeProvider,appRoutes,appConfigs) {
				var parser = this;
		    	for(var route in appRoutes.routes){
		    		var options = appRoutes.routes[route];
		    		$routeProvider
			            .when("/" + route,
			            {
			                templateUrl: options.templateUrl?
			                		options.templateUrl:
			                		parser.getTemplateUrl(route),
			                controller: options.controller?
			    	                options.controller:
			    	                parser.getControllerName(route),			
			    	        resolve: options.resolve?
			    	    	        options.resolve:
			    	    	        parser.injectController(route)
			            });
		    	}
		        $routeProvider.otherwise({
		            redirectTo: appConfigs.defaultRoute//default route
		        });
		    }
		},
		routes:{
			page1 	: {
							//templateUrl:"pages/home/homeHtml"
							//controller:"homeCtrl as vm"
							//resolve:function(){return promise}
							},
			page2 	: {},
			page3 	: {}
		}
	} );
})();