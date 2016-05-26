(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("mapsCtrl", ["$scope", "$location", "deviceInfoHandler", "mapMarkersHandler", mapsCtrl]);

    function mapsCtrl($scope, $location, deviceInfoHandler, mapMarkersHandler) {
        var vm	 = this;
        var tabs = new Tabs();
        vm.OS	 = deviceInfoHandler.getOS;
        
        //====================initialization marker filter S=====================
        vm.all 			= 0;
        vm.mall 		= 1;
        vm.clinc 		= 2;
        vm.club 		= 3;
        vm.resturant 	= 4;
        vm.school 		= 5;
        vm.cafee 		= 6;
        vm.market 		= 7;
        
        vm.filterMarker = function(filterID)
        {
        	vm.markers = mapMarkersHandler.createAndGetAllMarkers(filterID);
        }
        //====================initialization marker filter E=====================
        //====================initialization maps S=====================
        mapMarkersHandler.callGetCurrentLocation();
        
        vm.map = { 
        		center	: mapMarkersHandler.getLocation,
        		zoom	: mapMarkersHandler.getZoom
        };
        
        vm.mapOptions = {//options
				scrollwheel: false//,
//	        	draggable: true,
//	        	clickable: true,
//	        	visible: true
				};
        
        //====================initialization maps E=====================
        //====================initialization marker S===================
        vm.markerOptions = {//options
				        	draggable: true,
				        	clickable: true,
				        	visible: true
							};
        var oldLat;
		var oldLon;
        vm.markerEvents = {//events
        dragstart:function (marker, eventName, model) {
        		marker.dragging = false;
        		oldLat = marker.getPosition().lat();
        		oldLon = marker.getPosition().lng();
	        },
        dragend: function (marker, eventName, model) {
        		model.latitude 	= oldLat;
        		model.longitude = oldLon;
        	},
		click: function (marker, eventName, model){
          //var lat = marker.getPosition().lat();
          //var lon = marker.getPosition().lng();
        	}
  		};
        
        vm.markers = mapMarkersHandler.createAndGetAllMarkers(vm.all);
      //====================initialization marker E===================
      //====================initialization pop-up window S============ 
        vm.windowOptions = 	{
                				visible: false
            				};
        
        var tempMarkerIndex = -1;
        vm.onClick = function(marker, eventName, model) {
        	if(tempMarkerIndex == -1)
        	{
        		tempMarkerIndex = model.index;
        	}else
        	{
	    		if(tempMarkerIndex != model.index)
	    		{
	    		mapMarkersHandler.getAllMarkers()[tempMarkerIndex].show = false;
	    		tempMarkerIndex = model.index;
	    		}
        	}
        	vm.windowOptions.visible = ! vm.windowOptions.visible;
        };
      //====================initialization pop-up window E============
      //====================initialization Windows Phone map S==============
        vm.passParam = function () {
            mapMarkersHandler.callGetCurrentLocation()
				 .then(function (postion) {
				     var currentLocationMarker =
                         {
				            latitude: postion.latitude, // Double Latitude
				            longitude: postion.longitude,// Double Longitude
				            zoom: mapMarkersHandler.getZoom()
                         };

				     var msg = {
				         command: 'currentLocationMarker',
				         dataObject: currentLocationMarker
				     };
				     vm.sendMessage(msg);

				     var msg = {
				         command: 'createMarker',
				         dataObject: mapMarkersHandler.createAndGetAllMarkers(vm.all)
				     };
				     vm.sendMessage(msg);

				 }, function (postion)
				 {
				     var currentLocationMarker =
                         {
                             latitude: postion.latitude, // Double Latitude
                             longitude: postion.longitude,// Double Longitude
                             zoom: mapMarkersHandler.getZoom()
                         };

				     var msg = {
				         command: 'currentLocationMarker',
				         dataObject: currentLocationMarker
				     };
				     
				     vm.sendMessage(msg);

				     var msg = {
				         command: 'createMarker',
				         dataObject: mapMarkersHandler.createAndGetAllMarkers(vm.all)
				     };
				     vm.sendMessage(msg);

				 });
          
        };
        
        //****Windows Phone Send and receive data from windowsphoneMap.js E*******
        vm.sendMessage = function (msg) {
        	// Construct a message to send
            var msgS = JSON.stringify(msg);
            // Convert message object to string and send to the map control.
            document.frames['mapIframe'].postMessage(msgS, "ms-appx-web://" + document.location.host);
        }
        //=========================
        // Receive message from map and displays to status output
        window.addEventListener("message", receiveMessage, false);
        function receiveMessage(event) {
              if (event.origin === "ms-wwa-web://" + document.location.host) {
                id("status").innerText = "Hello from " + event.data;
            }
        }
        //****Windows Phone Send and receive data from windowsphoneMap.js E*******
      //====================initialization Windows Phone map E==============
    }
})();