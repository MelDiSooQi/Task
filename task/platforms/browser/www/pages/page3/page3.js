(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("page3Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , page3Ctrl]);

    function page3Ctrl($scope, $location, store, employeeDirectory)
    {
      var vm = this;

      // get id from local storage
      var indexOpened = store.get("indexOpened");

      // get Empolyee Followrs with specific id
      vm.items  = function(){
        return employeeDirectory.getEmpolyeeFollowrs(indexOpened)
      };

      // initialize click on element
      var onClick = function($event, $index, id)
      {
        //add to local storage  user id to use in next screen
        store.set("indexOpened", id);
        //to go to next screen
        $location.path('/page2');
      }
      //add onClick() to callback function
      employeeDirectory.setOnClickCallBack(onClick);

    }
})();