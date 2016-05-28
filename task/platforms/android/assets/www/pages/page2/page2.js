(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("page2Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , page2Ctrl]);

    function page2Ctrl($scope, $location, store, employeeDirectory)
    {
      var vm = this;

      // get id from local storage
      var indexOpened = store.get("indexOpened");

      // get user with specific id
      vm.employee  = function(){
        return employeeDirectory.getEmpolyee(indexOpened)
      };

      // initialize click on element
      var onClick = function($event, $index, id)
      {
        //to go to next screen
      $location.path('/page3');
      }
      //add onClick() to callback function
      employeeDirectory.setOnClickCallBack(onClick);

    // add function for calling with specific phone number for employee
    vm.call = function(phoneNumber)
    {
    var call = window.open("tel:" + phoneNumber, '_system');
    call.focus();
    }

    // add function for sending SMS with specific phone number for employee
    vm.SMS = function(phoneNumber)
    {
      var sendSMS = window.open("sms:" + phoneNumber, '_system');
      sendSMS.focus();
    }

    // add function for sending email with specific Email for employee
    vm.email = function(email)
    {
      var mailto = window.open("mailto:" + email, '_system');
      mailto.focus();
    }

    }
})();