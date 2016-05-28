(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("popupCtrl", ["popupHandler", popupCtrl]);

    function popupCtrl(popupHandler, settingHandler) {
        var vm = this;
        
        vm.template 	= popupHandler.getPopupURL;
        
        vm.title 		= popupHandler.getTitle;
        
        vm.description 	= popupHandler.getDescription;
        
        vm.confirm 		= popupHandler.getConfirm;
        
        vm.cancel 		= popupHandler.getCancel;
        
        vm.cancelPopup 	= function ()
        {
        	if(popupHandler.popupBtn2 != undefined || popupHandler.popupBtn2 != null)
    		{
    			popupHandler.popupBtn2Run();
    		}
        	popupHandler.hide();
        	vm.employerName = undefined;
            vm.jobPosition  = undefined;
            vm.address      = undefined;
            vm.callOffice   = undefined;
            vm.callCell     = undefined;
            vm.SMS          = undefined;
            vm.email        = undefined;
        }
        
        vm.confirmPopup = function ()
        {
        	if(popupHandler.popupBtn1 != undefined || popupHandler.popupBtn1 != null)
    		{
    			popupHandler.popupBtn1Run();
    		}
        	popupHandler.hide();
        	vm.employerName = undefined;
            vm.jobPosition  = undefined;
            vm.address      = undefined;
            vm.callOffice   = undefined;
            vm.callCell     = undefined;
            vm.SMS          = undefined;
            vm.email        = undefined;
        }
        
        //--------------------add user----
        vm.employerNameChanged = function(employerName)
        {
        	popupHandler.setEmployerName(employerName);
        }

        vm.jobPositionChanged = function(jobPosition)
        {
            popupHandler.setJobPosition(jobPosition);
        }

        vm.addressChanged = function(address)
        {
            popupHandler.setAddress(address);
        }

        vm.callOfficeChanged = function(callOffice)
        {
            popupHandler.setCallOffice(callOffice);
        }

        vm.callCellChanged = function(callCell)
        {
            popupHandler.setCallCell(callCell);
        }

        vm.SMSChanged = function(SMS)
        {
            popupHandler.setSMS(SMS);
        }

        vm.emailChanged = function(email)
        {
            popupHandler.setEmail(email);
        }
        //--------------------add user----
        
      
        
    }
})();