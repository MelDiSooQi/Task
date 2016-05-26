(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("page1Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , page1Ctrl]);

    function page1Ctrl($scope, $location, store, employeeDirectory)
    {
      var vm = this;
      //employeeDirectory.createitems();
      vm.items  = employeeDirectory.getitems;

      var onClick = function($event, $index, id)
    {
      store.set("indexOpened", id);
      $location.path('/page2');
    }
    employeeDirectory.setOnClickCallBack(onClick);

    }
})();