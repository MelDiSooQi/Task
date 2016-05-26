(function () {
    "use strict";

    angular.module('WIFIApp')
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

    }
})();