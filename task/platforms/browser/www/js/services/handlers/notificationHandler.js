(function() {
	"use strict";

	angular.module("WIFIApp")
			.factory(
					"notificationHandler",
					[ "store",
					  notificationHandler ]);

	function notificationHandler(store)
	{
		var notifications = [];
		
		var getNotifications = function()
		{
			return notifications;
		}
		
		var setNotifications = function(_notifications)
		{
			notifications = _notifications;
		}
		
		var onClickCallBack;
		
		var setOnClickCallBack = function(_onClickCallBack)
		{
			onClickCallBack = _onClickCallBack;
		}
		var getOnClickCallBack = function($event, $index)
		{
			return onClickCallBack($event, $index);
		}

		
		var itemClass = function()
		{
			/*return $translate.use() == "en" ? "" : "ar";*/
		}
		
		var notification 	= function(id, title, description, src, isReaded, callBack, itemClass, date, time)
		{
			return this.init(id, title, description, src, isReaded, callBack, itemClass, date, time);
		}
		
		notification.prototype = function()
		{
			function init(id, title, description, src, isReaded, callBack, itemClass, date, time)
			{
				return 	{
							  id			: id
							, title 		: title
							, description 	: description
							, src 			: src
							, isReaded		: isReaded
							, click 		: callBack
							, itemClass		: itemClass
							, date			: date
							, time			: time
						};
			};
	
			return 	{
						init : init
					};
		}();
		
		var createNotifications = function()
		{
			notifications = [];
			var notificationsTemp = store.get("notifications");
			if(notificationsTemp != null)
			{
				for(var i=0 ; i < notificationsTemp.length ; i++)
				{
					notifications.push(new notification(  notificationsTemp[i].id
														, notificationsTemp[i].title
														, notificationsTemp[i].description
														, notificationsTemp[i].src
														, notificationsTemp[i].isReaded//true
														, getOnClickCallBack
														, itemClass
														, notificationsTemp[i].date
														, notificationsTemp[i].time));
				}
				notifications.push(new notification(notificationsTemp.length,"getNotificationNot", "getNotificationTouch", "images/campaigns/1.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			}
			else
			{
				notifications.push(new notification(0,"getNotificationNot", "getNotificationTouch", "images/campaigns/1.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			}
			
			/*
			notifications.push(new notification("notification_0","getNotificationNot", "getNotificationTouch", "images/campaigns/1.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_1","title 2", "description 2", "images/campaigns/3.jpg"	,false, onClickCallBack, itemClass, "03/19/2015", "03:35pm"));
			notifications.push(new notification("notification_2","title 3", "description 3", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "03/19/2016", "03:35pm"));
			notifications.push(new notification("notification_3","title 4", "description 4", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_4","title 5", "description 5", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_5","title 6", "description 6", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_6","title 6", "description 6", "images/campaigns/1.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_7","title 6", "description 6", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_8","title 6", "description 6", "images/campaigns/3.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_9","title 6", "description 6", "images/campaigns/4.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_10","title 6", "description 6", "images/campaigns/5.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			notifications.push(new notification("notification_11","title 6", "description 6", "images/campaigns/6.jpg"	,true , onClickCallBack, itemClass, "02/10/2015", "03:35pm"));
			*/
			setNotifications(notifications);
			
			store.set("notifications", notifications);
		};
		
		var getNotificationsNumber = function()
		{
			createNotifications();
			var notifications = [];
			
			//notifications = getNotifications();
			
			if(notifications.length == 0)
			{
				notifications = store.get("notifications");
			}
			var notificationsCounter = 0;
			if(notifications != null)
			{
				
				for(var i=0 ; i < notifications.length ; i++)
				{
					if(notifications[i].isReaded)
					{
						notificationsCounter++;
					}
				}
			}else
			{
				notificationsCounter = -1;
			}
			return notificationsCounter;
		};
		
		var setNotificationsReadedByIndex = function(index)
		{
			var notifications = store.get("notifications");
			if(notifications != null)
			{
				if(notifications[index].isReaded)
				{
					notifications[index].isReaded = false;
					store.set("notifications", notifications);
				}
			}
		};
		
		return 	{	
					createNotifications  			: createNotifications
				,	getNotifications 	 			: getNotifications
				, 	setOnClickCallBack	 			: setOnClickCallBack
				, 	getOnClickCallBack				: getOnClickCallBack
				, 	getNotificationsNumber 			: getNotificationsNumber
				, 	setNotificationsReadedByIndex 	: setNotificationsReadedByIndex
				};
	}
})();