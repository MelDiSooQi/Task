(function() {
	"use strict";

	var tabs = function(index) {
		var me = this;
		setTimeout(function() {
			me.init();
		}, 500);
	}
	tabs.prototype.options = {
		lang : "en"
	}
	tabs.prototype = function() {
		var bar, headers, container, contWidth, count, tabsContent, contents, lastX, lastY, startTime, startY, index = 0, animating = false, goingLeft = false, goingDown = false, swiping = false, scrolling = false, touching = false, touchCount = 0;

		function headerClick(e) {
			var indx = e.currentTarget.indx;
			changeIndex(indx);
		}

		function headChange(indx) {
			var lv = (contWidth / count) * index;
			Tabs.lang == "en" ? lv*=1 :lv = (contWidth-(contWidth / count)) - lv;
			bar.style.transform !== undefined ? bar.style.transform = "translate3d("
					+ Math.round(lv) + "px, 0, 0)"
					: bar.style.webkitTransform = "translate3d(" + Math.round(lv)
							+ "px, 0, 0)";
		}

		function changeIndex(_index) {
			if (!animating) {
				index = _index;
				animating = true;
				var step = contWidth * index;
				Tabs.lang == "en" ? step *= -1 : step *= 1;
				tabsContent.style.transform !== undefined ? tabsContent.style.transform = "translate3d("
						+ step + "px, 0, 0)"
						: tabsContent.style.webkitTransform = "translate3d("
								+ step + "px, 0, 0)";
				headChange(index);
				setTimeout(function() {
					animating = false;
				}, 200);
				for (var i = 0; i < count; i++) {
					headers[i].className = headers[i].className.replace(
							/(?:^|\s)active(?!\S)/g, '');
				}
				headers[index].className += " active";
				
				//localStorage.setItem("rewardsActiveTab", _index);
			}
		}

		function init(_index) {
			if (!document.getElementsByClassName("tabs")
					|| !document.getElementsByClassName("tabs")[0]) {
				return;
			}
			
			//_index = localStorage.getItem("rewardsActiveTab");
			
			if (_index === undefined || _index === null) {
				index = 0;
			} else {
				index = _index;
			}

			var tabs = document.getElementsByClassName("tabs")[0];
			bar = tabs.getElementsByClassName("bar")[0];
			headers = tabs.getElementsByClassName("head");
			container = tabs.getElementsByClassName('tabsHead')[0];
			contWidth = window.innerWidth;
			count = headers.length;
			tabsContent = tabs.getElementsByClassName('tabsContent')[0];
			contents = tabs.getElementsByClassName('tabContent');
			for (var i = 0; i < count; i++) {
				headers[i].indx = i;
				headers[i].onclick = headerClick;
				headers[i].ontouchend = headerClick;
				headers[i].onmspointerup = headerClick;
			}
			var step = contWidth * index;
			Tabs.lang == "en" ? step *= -1 : step *= 1;
			tabsContent.style.transform !== undefined ? tabsContent.style.transform = "translate3d("
					+ step + "px, 0, 0)"
					: tabsContent.style.webkitTransform = "translate3d(" + step
							+ "px, 0, 0)";

			var lv = (contWidth / count) * index;
			Tabs.lang == "en" ? lv*=1 :lv = (contWidth-(contWidth / count)) - lv;
			bar.style.transform !== undefined ? bar.style.transform = "translate3d("
					+ lv + "px, 0, 0)"
					: bar.style.webkitTransform = "translate3d(" + lv
							+ "px, 0, 0)";
			window.onorientationchange !== undefined ? window.onorientationchange = function() {
				setTimeout(function() {
					init(index);
				});
			}
					: window.onresize = function() {
						setTimeout(function() {
							init(index);
						});
					}
		}

		return {
			init : init,
			changeIndex : changeIndex,
			index : function() {
				return index;
			}
		}
	}();

	window.Tabs = tabs;

})();