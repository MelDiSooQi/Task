(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("headerCtrl", ["pagesHandler","$location","$mdMenu",
                                   "$timeout","popupHandler","busyIndicator"
                                   , headerCtrl]);

    function headerCtrl(pagesHandler, $location, $mdMenu
    					, $timeout, popupHandler,busyIndicator)
    {
        var vm = this;
        
        busyIndicator.show();
        
        $timeout(function(){
        	busyIndicator.hide();
        },1000);
        
        vm.title = function(){
        	return pagesHandler.getPageProperty("pageNameKey");
        }

        vm.background = function(){
        	return pagesHandler.getPageProperty("headerColor");
        }
        vm.color = function(){
        	return pagesHandler.getPageProperty("headTextColor");
        }

        vm.backBtnVisible = function(){
        	return pagesHandler.getPageProperty("backBtnVisible");
        }
        
        vm.backBtnForBackVisible = function(){
        	return pagesHandler.getPageProperty("backBtnForBackVisible");
        }
        
        vm.goBack = pagesHandler.goBack;
        
        vm.moreBtnVisible = function(){
        	return pagesHandler.getPageProperty("settingsVisible");
        }
        vm.pageNameVisible = function(){
        	return pagesHandler.getPageProperty("pageNameKey");
        }
        vm.togglePopup = function(){
        	$location.path("/tutorial");
        }
    }
})();