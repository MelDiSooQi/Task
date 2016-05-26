(function () {
    'use strict';

    var map;

    //Process messages from main script
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
        if (event.origin === "ms-appx://" + document.location.host) {

            //Return the message string to an object
            var messageObject = JSON.parse(event.data);

            //If message is to zoom, change the location and zoom level
            if (messageObject.command == "zoomTo") {
                var newCenter = new google.maps.LatLng(messageObject.latitude, messageObject.longitude);
                var newOptions = {
                    zoom: messageObject.zoom,
                    center: newCenter,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map.setOptions(newOptions);
            }
        }
    }

    //This function sends a message back to the parent window.
    function sendMessageBack(city) {
        window.parent.postMessage(city, "ms-appx://" + document.location.host);
    }

    function initialize() {
        //initialize the map
        var latlng = new google.maps.LatLng(38.96, -96.78);
        var myOptions = {
            zoom: 4,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"),
        myOptions);

        //Add a couple of pushpins with event handlers
        var parisLocation = new google.maps.LatLng(48.863811, 2.351761);
        var marker1 = new google.maps.Marker({
            position: parisLocation,
            map: map,
            title: "This is Paris"
        });
        google.maps.event.addListener(marker1, 'click', function () {
            sendMessageBack("Paris");
        });

        var rouenLocation = new google.maps.LatLng(49.4467, 1.085889);
        var marker2 = new google.maps.Marker({
            position: rouenLocation,
            map: map,
            title: "This is Rouen"
        });
        google.maps.event.addListener(marker2, 'click', function () {
            sendMessageBack("Rouen");
        });
    }

    document.addEventListener("DOMContentLoaded", initialize, false);
})();