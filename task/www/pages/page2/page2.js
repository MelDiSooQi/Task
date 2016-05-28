(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("page2Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , page2Ctrl]);

    function page2Ctrl($scope, $location, store, employeeDirectory)
    {
      var vm = this;

      var indexOpened = store.get("indexOpened");

      vm.employee  = function(){
        return employeeDirectory.getEmpolyee(indexOpened)
      };

      var onClick = function($event, $index, id)
    {
      $location.path('/page3');
      
      //employeeDirectory.setNotificationsReadedByIndex($index);
    }
    employeeDirectory.setOnClickCallBack(onClick);

    vm.call = function(phoneNumber)
    {
    var call = window.open("tel:" + phoneNumber, '_system');
    call.focus();
    }

    vm.SMS = function(phoneNumber)
    {
      var sendSMS = window.open("sms:" + phoneNumber, '_system');
      sendSMS.focus();
    }

    vm.email = function(email)
    {
      var mailto = window.open("mailto:" + email, '_system');
      mailto.focus();
    }

    }
})();