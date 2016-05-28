(function () {
    "use strict";

    angular.module("EmployeeDirectoryApp")
        .factory("popupHandler", ["$timeout", popupHandler]);

    function popupHandler($timeout) {

        var el 			= document.getElementById("popup")
        ,	cont 		= document.getElementById("popupCont")
        ,	visible 	= false
        ,	animating 	= false;

        var transform = function (setVisible)
        {
        	if(setVisible)
        	{
        		cont.style.display = "none";
        		//$timeout(function () { cont.style.display = "none"; }, 50)
        	}
        	else
            {cont.style.display = "block";}
        	
            visible = !setVisible;
        }

        var show = function (popupTempleteName) {
        	if(popupTempleteName != undefined || popupTempleteName != null)
    		{
    			popupName = popupTempleteName;
    		}else
    		{
    			popupName = "commonPopup";//default popup Name 
    		}
        	
            transform(false);
        }

        var hide = function ()
        {
        	transform(true);
        	
        	title 		= undefined;
        	description	= undefined;
        	confirm 	= undefined;
        	cancel		= undefined;
        	employerName = undefined;
            jobPosition  = undefined;
            address      = undefined;
            callOffice   = undefined;
            callCell     = undefined;
            SMS          = undefined;
            email        = undefined;
        }

        var toggle = function (e) {
            if (e && visible)
            {
                if (e.srcElement.id !== "popupCont")
                {
                    return;
                }
            }
            !visible ? show() : hide();
        }

        var isVisible = function()
        {
            return visible;
        }


        cont.onclick = toggle;
        
        var templates =
        { 
    		commonPopup 		: 	{
    								name: 'commonPopup'		
    							, 	url	: 'popups/commonPopup.html'
    								}
    	,	commonOneBtnPopup	: 	{ 
    								name: 'commonOneBtnPopup'	
    							, 	url	: 'popups/commonOneBtnPopup.html'
    								}
    	,	addEmployeePopup	: 	{ 
									name: 'addEmployeePopup'	
								, 	url	: 'popups/addEmployeePopup.html'
									}
    	};
        
        var popupName = "commonPopup";
        
        
        var getPopupURL = function()
        {
        	return templates[popupName].url;
        }
        
        var title;
        var description;
        var confirm;
        var cancel;
        
        var titleAndDescription = function(_title, _description)
        {
        	title 		= _title;
        	description = _description;
        }
        
        var getTitle = function()
        {
        	return title;
        }
        
        var getDescription = function()
        {
        	return description;
        }
        
        var getConfirm = function()
        {
        	return confirm;
        }
        
        var getCancel = function()
        {
        	return cancel;
        }
        
        var function1CallBack;
        var popupBtn1 = function(_confirm, _function1CallBack)
        {
        	confirm = _confirm;
        	if(_function1CallBack != undefined || _function1CallBack != null)
    		{
        		function1CallBack = _function1CallBack;
    		}
        	else
    		{
        		function1CallBack = null;
    		}
        }
        
        var popupBtn1Run = function()
        {
        	if(function1CallBack != undefined || function1CallBack != null)
    		{
        		function1CallBack();
        		function1CallBack = null;
    		}
        }
        
        var function2CallBack;
        var popupBtn2 = function(_cancel, _function2CallBack)
        {
        	cancel = _cancel;
        	if(_function2CallBack != undefined || _function2CallBack != null)
    		{
        		function2CallBack = _function2CallBack;
    		}
        	else
    		{
        		function2CallBack = null;
    		}
        }
        
        var popupBtn2Run = function()
        {
        	if(function2CallBack != undefined || function2CallBack != null)
    		{
        		function2CallBack();
        		function2CallBack = null;
    		}
        }
        
        var employerName;
        
        var setEmployerName = function(_employerName)
        {
        	employerName = _employerName;
        }
        
        var getEmployerName = function()
        {
        	return employerName;
        }

        var jobPosition;
        
        var setJobPosition = function(_jobPosition)
        {
            jobPosition = _jobPosition;
        }
        
        var getJobPosition = function()
        {
            return jobPosition;
        }

        var address;
        
        var setAddress = function(_address)
        {
            address = _address;
        }
        
        var getAddress = function()
        {
            return address;
        }


        var callOffice;
        
        var setCallOffice = function(_callOffice)
        {
            callOffice = _callOffice;
        }
        
        var getCallOffice = function()
        {
            return callOffice;
        }


        var callCell;
        
        var setCallCell = function(_callCell)
        {
            callCell = _callCell;
        }
        
        var getCallCell = function()
        {
            return callCell;
        }


        var SMS;
        
        var setSMS = function(_SMS)
        {
            SMS = _SMS;
        }
        
        var getSMS = function()
        {
            return SMS;
        }


        var email;
        
        var setEmail = function(_email)
        {
            email = _email;
        }
        
        var getEmail = function()
        {
            return email;
        }




        return {
        		getPopupURL			: getPopupURL
        	, 	titleAndDescription	: titleAndDescription
        	, 	getTitle			: getTitle
        	,	getDescription		: getDescription
        	,	getConfirm			: getConfirm
        	,	getCancel			: getCancel
        	, 	popupBtn1			: popupBtn1
        	,	popupBtn1Run		: popupBtn1Run
        	,	popupBtn2			: popupBtn2
        	,	popupBtn2Run		: popupBtn2Run
        	,	isVisible			: isVisible
        	,	hide				: hide
        	,	show				: show
            ,	toggle				: toggle
            ,   setEmployerName     : setEmployerName
            ,   getEmployerName     : getEmployerName
            ,   setJobPosition      : setJobPosition
            ,   getJobPosition      : getJobPosition
            ,   setAddress          : setAddress
            ,   getAddress          : getAddress
            ,   setCallOffice       : setCallOffice
            ,   getCallOffice       : getCallOffice
            ,   setCallCell         : setCallCell
            ,   getCallCell         : getCallCell
            ,   setSMS              : setSMS
            ,   getSMS              : getSMS
            ,   setEmail            : setEmail
            ,   getEmail            : getEmail
        }
    }
})();