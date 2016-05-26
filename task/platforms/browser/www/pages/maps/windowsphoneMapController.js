var map;
var latitude;
var longitude;
var zoom;
var markers;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: zoom
    });
    currentMarker(markers);
}

var currentMarker = function (markers) {
    for (var i = 0 ; i < markers.length ; i++) {
        AddMarker(markers[i]);
    }
}



var oldinfowindow;
var isInfowindowOpened = false;

function AddMarker(marker) {

    var contentString = '<div id="content">' +
  '<div id="sitenotice">' +
  '</div>' +
  '<h1 id="firstheading" class="firstheading">' + marker.title + '</h1>' +
  '<div id="bodycontent">' +
  '<p>' +
  '<b>' + marker.title + '</b>, is a large ' +
  '</p>' +
  '<p>' + marker.description + '</p>' +
  '</div>' +
  '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    //Add a couple of pushpins with event handlers
    var markerPosition = new google.maps.LatLng(marker.latitude, marker.longitude);
    var marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        markerObj: marker
    });
    marker.setIcon('../../images/map/green-dot.png');

    google.maps.event.addListener(marker, 'click', function () {
        var markerID = marker.markerObj.id;
        var markerTitle = marker.markerObj.title;
        sendMessageBack(markerTitle);
    });

    marker.addListener('click', function () {

        if (isInfowindowOpened) {
            if (oldinfowindow != undefined) {
                oldinfowindow.close();
            }
            isInfowindowOpened = false;
        }
        infowindow.open(map, marker);
        oldinfowindow = infowindow;
        isInfowindowOpened = true;
    });

    map.addListener('click', function (e) {
        infowindow.close();
    });
}




//This function sends a message back to the parent window.
function sendMessageBack(city) {
    window.parent.postMessage(city, "ms-appx://" + document.location.host);
}

(function () {
    "use strict";

    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
        if (event.origin === "ms-appx://" + document.location.host) {

            //Return the message string to an object
            var messageObject = JSON.parse(event.data);

            //If message is to zoom, change the location and zoom level
            if (messageObject.command == 'currentLocationMarker') {
                var currentLocationMarker = messageObject.dataObject;
                latitude = currentLocationMarker.latitude
                longitude = currentLocationMarker.longitude
                zoom = currentLocationMarker.zoom;
            }
            else if (messageObject.command == 'createMarker') {
                markers = messageObject.dataObject;

            }
        }
    }

})();