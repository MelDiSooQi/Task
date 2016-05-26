(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("page3Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , page3Ctrl]);

    function page3Ctrl($scope, $location, store, employeeDirectory)
    {
      var vm = this;

      var indexOpened = store.get("indexOpened");

      vm.items  = function(){
        return employeeDirectory.getEmpolyeeFollowrs(indexOpened)
      };
      //vm.items  = employeeDirectory.getitems;

      var onClick = function($event, $index, id)
    {
      store.set("indexOpened", id);
      $location.path('/page2');
    }
    employeeDirectory.setOnClickCallBack(onClick);

    }
})();