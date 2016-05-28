(function() {
	"use strict";

	angular.module("EmployeeDirectoryApp")
			.factory(
					"employeeDirectory",
					[ "store",
					  employeeDirectory ]);

	function employeeDirectory(store)
	{
		var items = [];
		
		var getitems = function()
		{
			return items;
		}
		
		var setitems = function(_items)
		{
			items = _items;
		}
		
		var onClickCallBack;
		
		var setOnClickCallBack = function(_onClickCallBack)
		{
			onClickCallBack = _onClickCallBack;
		}
		var getOnClickCallBack = function($event, $index, id)
		{
			return onClickCallBack($event, $index, id);
		}

		
		
		var cell 	= function(id, title, description, src, followers, callBack, data)
		{
			return this.init(id, title, description, src, followers, callBack, data);
		}
		
		cell.prototype = function()
		{
			function init(id, title, description, src, followers, callBack, data)
			{
				return 	{
							  id			: id
							, title 		: title
							, description 	: description
							, src 			: src
							, followers		: followers
							, click 		: callBack
							, data 			: data
						};
			};
	
			return 	{
						init : init
					};
		}();
		
		var createitems = function()
		{
			items = [];
			/*var itemsTemp = store.get("items");
			if(itemsTemp != null)
			{
				for(var i=0 ; i < itemsTemp.length ; i++)
				{
					items.push(new cell(  itemsTemp[i].id
														, itemsTemp[i].title
														, itemsTemp[i].description
														, itemsTemp[i].src
														, itemsTemp[i].followers//true
														, getOnClickCallBack
														, itemsTemp[i].date
														, itemsTemp[i].time));
				}
				items.push(new cell(itemsTemp.length,"getcellNot", "getcellTouch", "images/faces/"+i+".jpg"	,true , onClickCallBack, "02/10/2015", "03:35pm"));
			}
			else
			{
				items.push(new cell(0,"getcellNot", "getcellTouch", "images/faces/1.jpg"	,true , onClickCallBack, "02/10/2015", "03:35pm"));
			}*/
			
			items = [];
			if(store.get("items") != null)
			{
				var tempItems = store.get("items");

				for(var i=0 ; i < tempItems.length ; i++)
				{
				items.push(new cell(  tempItems[i].id
									, tempItems[i].title
									, tempItems[i].description
									, tempItems[i].src
									, tempItems[i].followers//true
									, getOnClickCallBack
									, tempItems[i].data));
				}
			}
			else
			{
			items.push(new cell(0,"James King"		, "Perisedent and CEO"	, "images/faces/1.jpg"	,[1 ,2 ,4 ,6] 			, getOnClickCallBack, {address : "Boston, Ma" , callOffice : "781-000-0001", callCell : "617-000-0001", SMS : "617-000-0001", email : "jking@fakemail.com"} ));
			items.push(new cell(1,"Juily Talyor"	, "VP of marketing"		, "images/faces/2.jpg"	,[2 ,4]					, getOnClickCallBack, {address : "Boston, Ma1", callOffice : "781-000-0002", callCell : "617-000-0002", SMS : "617-000-0002", email : "jking1@fakemail.com"}));
			items.push(new cell(2,"Eugene Lee"		, "CFO"					, "images/faces/3.jpg"	,[5] 					, getOnClickCallBack, {address : "Boston, Ma2", callOffice : "781-000-0003", callCell : "617-000-0003", SMS : "617-000-0003", email : "jking2@fakemail.com"}));
			items.push(new cell(3,"Tom Talyor"		, "Developer"			, "images/faces/4.jpg"	,[1 ,3 ,5 ,6] 			, getOnClickCallBack, {address : "Boston, Ma3", callOffice : "781-000-0004", callCell : "617-000-0004", SMS : "617-000-0004", email : "jking3@fakemail.com"}));
			items.push(new cell(4,"Johne Williams"	, "VP of Engineering"	, "images/faces/5.jpg"	,[1 ,2 ,4 ,6] 			, getOnClickCallBack, {address : "Boston, Ma4", callOffice : "781-000-0005", callCell : "617-000-0005", SMS : "617-000-0005", email : "jking4@fakemail.com"}));
			items.push(new cell(5,"Raay Moore"		, "VP of sales"			, "images/faces/6.jpg"	,[4 ,6] 				, getOnClickCallBack, {address : "Boston, Ma5", callOffice : "781-000-0006", callCell : "617-000-0006", SMS : "617-000-0006", email : "jking5@fakemail.com"}));
			items.push(new cell(6,"Peul Jones"		, "QM Manger"			, "images/faces/7.jpg"	,[0] 					, getOnClickCallBack, {address : "Boston, Ma6", callOffice : "781-000-0007", callCell : "617-000-0007", SMS : "617-000-0007", email : "jking6@fakemail.com"}));
			items.push(new cell(7,"James Ramon"		, "PM"					, "images/faces/8.jpg"	,[1 ,2, 3 ,4, 5] 		, getOnClickCallBack, {address : "Boston, Ma7", callOffice : "781-000-0008", callCell : "617-000-0008", SMS : "617-000-0008", email : "jking7@fakemail.com"}));
			items.push(new cell(8,"Willam Smith"	, "PM"					, "images/faces/9.jpg"	,[1 ,2, 3 ,4, 5, 6, 7] 	, getOnClickCallBack, {address : "Boston, Ma8", callOffice : "781-000-0009", callCell : "617-000-0009", SMS : "617-000-0009", email : "jking8@fakemail.com"}));
			}
			setitems(items);
			
			store.set("items", items);
		}();
		
		var getItemsNumber = function()
		{
			createitems();
			var items = [];
			
			//items = getitems();
			
			if(items.length == 0)
			{
				items = store.get("items");
			}
			var itemsCounter = 0;
			if(items != null)
			{
				
				for(var i=0 ; i < items.length ; i++)
				{
					if(items[i].followers)
					{
						itemsCounter++;
					}
				}
			}else
			{
				itemsCounter = -1;
			}
			return itemsCounter;
		};

		var getEmpolyee = function(index)
		{
			return items[index];
		};

		var getEmpolyeeFollowrs = function(index)
		{
			var employers = [];


			for(var i=0 ; i < items[index].followers.length ; i++)
				{
						var emp = items[items[index].followers[i]];
						employers.push(emp);
				}
			
			return employers;
		};
		
		var addEmpolyee = function(name, jobPosition, _address, _callOffice, _callCell, _SMS, _email)
		{
			items.push(new cell(  items.length
								, name
								, jobPosition
								, "images/faces/contact.jpg"
								, [1]
								, getOnClickCallBack
								, {
										address 	: _address 
									, 	callOffice 	: _callOffice
									, 	callCell 	: _callCell
									, 	SMS 		: _SMS
									, 	email 		: _email
									}));
			setitems(items);
			
			store.set("items", items);
		}
		
		return 	{	
					createitems  			: createitems
				,	getitems 	 			: getitems
				, 	setOnClickCallBack	 	: setOnClickCallBack
				, 	getOnClickCallBack		: getOnClickCallBack
				, 	getItemsNumber 			: getItemsNumber
				,	getEmpolyee				: getEmpolyee
				,	getEmpolyeeFollowrs		: getEmpolyeeFollowrs
				,	addEmpolyee				: addEmpolyee
				};
	}
})();