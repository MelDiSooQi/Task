var map;
function initMap() {

    requestPosition();
    /*
    var options = { enableHighAccuracy: true, timeout: 5 * 1000 };//5 seconds
    navigator.geolocation.getCurrentPosition(function (position) {

    }, function (error) {

    }, options);*/

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

var nav;
function requestPosition() {

    if (nav == null) {
        nav = window.navigator;
    }
    if (nav != null) {
        var geoloc = nav.geolocation;
        if (geoloc != null) {
            geoloc.getCurrentPosition(successCallback, errorCallback);
        }
        else {
            alert("Geolocation not supported");
        }
    }
    else {
        alert("Navigator not found");
    }
}



function successCallback(position)
{
    setText(position.coords.latitude, "latitude");
    setText(position.coords.longitude, "longitude");
}

 
function errorCallback(error) {
    var message = "";  

    // Check for known errors
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "This website does not have permission to use " + 
                      "the Geolocation API";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "The current position could not be determined.";
            break;
        case error.TIMEOUT:
            message = "The current position could not be determined " + 
                      "within the specified timeout period.";            
            break;
    }

    // If it is an unknown error, build a message that includes 
    // information that helps identify the situation so that 
    // the error handler can be updated.
    if (message == "") {
        var strErrorCode = error.code.toString();
        message = "The position could not be determined due to " +
                  "an unknown error (Code: " + strErrorCode + ").";
    }
    alert(message);

}