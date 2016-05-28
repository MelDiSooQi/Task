(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("headerCtrl", ["pagesHandler","$location","$mdMenu",
                                   "$timeout","popupHandler","busyIndicator"
                                   , headerCtrl]);

    function headerCtrl(pagesHandler, $location, $mdMenu
    					, $timeout, popupHandler,busyIndicator)
    {
        var vm = this;
        
        //add title to header
        vm.title = function(){
        	return pagesHandler.getPageProperty("pageNameKey");
        }

        //add background to header
        vm.background = function(){
        	return pagesHandler.getPageProperty("headerColor");
        }

        //add color to title header
        vm.color = function(){
        	return pagesHandler.getPageProperty("headTextColor");
        }

        //add menu btn to header
        vm.backBtnVisible = function(){
        	return pagesHandler.getPageProperty("backBtnVisible");
        }
        
        //add back btn to header
        vm.backBtnForBackVisible = function(){
        	return pagesHandler.getPageProperty("backBtnForBackVisible");
        }
        
        //add action on-click back btn to header
        vm.goBack = pagesHandler.goBack;
        
        //add action on-click settings btn to header
        vm.moreBtnVisible = function(){
        	return pagesHandler.getPageProperty("settingsVisible");
        }

        //add title to header
        vm.pageNameVisible = function(){
        	return pagesHandler.getPageProperty("pageNameKey");
        }

        //add action on-click more btn to header
        vm.togglePopup = function(){}

        //open busy Indicator (Splach Screen to load)
        busyIndicator.show();
        
        //close busy Indicator (Splach Screen to load)
        $timeout(function(){
            busyIndicator.hide();
        },1000);
    }
})();