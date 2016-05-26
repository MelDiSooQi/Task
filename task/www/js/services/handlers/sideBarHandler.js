(function() {
	"use strict";

	angular.module("WIFIApp").factory("sideBarHandler",
			[ "$timeout", "$translate", sideBarHandler ]);

	function sideBarHandler($timeout, $translate) {
		var el, cont, opened, black, animating, itemsCont;

		function transform(el, tsX, sc, open)
		{
		if (animating)
			return;
		animating = true;

var x = $translate.use() == "en" ? "-110%" : "110%";

el.style.transform !== undefined ? 
   el.style.transform 		= "translate3d(" + tsX + ", 0, 0) scale3d(" + sc + ", " + sc + ", 1)"
 : el.style.webkitTransform = "translate3d(" + tsX + ", 0, 0) scale3d(" + sc + ", " + sc + ", 1)";
			
open ? itemsAnimate("0") : itemsAnimate(x);
			
			$timeout(function()
			{
				if (open)
				{
					black.style.display = "block";
				}
				else
				{
					black.style.display = "none";
				}
				animating 	= false;
				$timeout(function()
				{
					opened 		= open;
				}, 500);
			}, 0);
		}

		function itemsAnimate(val)
		{
			$timeout(function()
			{
				itemsCont.style.transform !== undefined ?
					itemsCont.style.transform 		= "translate3d(" + val + ", 0, 0)"
			      : itemsCont.style.webkitTransform = "translate3d(" + val + ", 0, 0)";
			}, 0);
		}

		function forceClose()
		{
			var x = $translate.use() == "en" ? "-110%" : "110%";
			el.style.transitionDuration 		= "none";
			itemsCont.style.transitionDuration 	= "none";

			el.style.transform !== undefined ? 
					el.style.transform 			= "translate3d(0,0,0)"
				  : el.style.webkitTransform 	= "translate3d(0,0,0)";
			
			itemsCont.style.transform !== undefined ? 
				  itemsCont.style.transform 		= "translate3d(-110%, 0, 0)"
				: itemsCont.style.webkitTransform 	= "translate3d(" + x + ", 0, 0)";
			$timeout(function()
			{
				black.style.display 				= "none";
				el.style.transitionDuration 		= "400ms";
				itemsCont.style.transitionDuration 	= "400ms";
			}, 0);

			opened = false;
		}

		var open = function()
		{
			var x = $translate.use() == "en" ? "50%" : "-50%";
			transform(el, x, "0.7", true);
		}

		var close = function()
		{
			transform(el, "0", "1", false);
		}

		var toggle = function()
		{
			opened ? close() : open();
		}

		var isOpen = function()
		{
			return opened;
		}

		var init = function()
		{
			el 					= document.getElementById('PagesViewContainer');
			itemsCont 			= document.getElementById('sideBarCont');// .getElementsByClassName('item');
			// itemsCont 		= cont.getElementsByClassName('itemsCont')[0];
			black 				= document.getElementById('sideBarBlack');
			/*if(WL.Env.WINDOWSPHONEUNIVERSAL != WL.Client.getEnvironment())
			{
				black.ontouchstart 	= toggle;
			}
			else
			{*/
				black.onclick 		= toggle;
			/*}*/
			opened 				= false;
			animating 			= false;
		}();

		return 	{
					open 		: open,
					close 		: close,
					forceClose 	: forceClose,
					toggle 		: toggle,
					isOpen 		: isOpen,
					init 		: init
				};
	}

	window.SideBar = sideBarHandler;
})();