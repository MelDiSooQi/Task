(function () {
    "use strict";

    angular.module('WIFIApp')
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
        	vm.purchaseQuotaCode = undefined;
        }
        
        vm.confirmPopup = function ()
        {
        	if(popupHandler.popupBtn1 != undefined || popupHandler.popupBtn1 != null)
    		{
    			popupHandler.popupBtn1Run();
    		}
        	popupHandler.hide();
        	vm.purchaseQuotaCode = undefined;
        }
        
        //--------------------purchaseQuota----
        vm.purchaseQuotaCodeChanged = function(purchaseQuotaCode)
        {
        	popupHandler.setPurchaseQuotaCode(purchaseQuotaCode);
        }
        //--------------------purchaseQuota----
        
        
      //--------------------language----
        vm.getClass = function()
        {
        	if(settingHandler.getLanguage() == "en")
        	{
        		return "englishPopup";
        	}else
        	{
        		return "arabicPopup";
        	}
        };
        
        vm.languageSettings = function()
        {
        	
        		return "ARABIC";
        	
        };
        
        vm.cancelLanguagePopup 	= function ()
        {
        	popupHandler.hide();
        	vm.purchaseQuotaCode = undefined;
        }
        //--------------------language----
        
    }
})();