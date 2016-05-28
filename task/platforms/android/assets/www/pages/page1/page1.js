(function () {
    "use strict";

    angular.module('EmployeeDirectoryApp')
        .controller("page1Ctrl", ["$scope", "$location", "store", "employeeDirectory"
                                  , "popupHandler", "$route"
                                  , page1Ctrl]);

    function page1Ctrl($scope, $location, store, employeeDirectory
      , popupHandler, $route)
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

    vm.add = function()
    {
      popupHandler.titleAndDescription( "Employee Directory", "Add Employee");
        
        popupHandler.popupBtn1("Add",
        function()
        {

          var name        =  popupHandler.getEmployerName();
          var jobPosition =  popupHandler.getJobPosition();
          var address     =  popupHandler.getAddress();
          var callOffice  =  popupHandler.getCallOffice();
          var callCell    =  popupHandler.getCallCell();
          var SMS         =  popupHandler.getSMS();
          var email       =  popupHandler.getEmail();
          
          if ( name         != undefined
            || jobPosition  != undefined
            || address      != undefined
            || callOffice   != undefined
            || callCell     != undefined
            || SMS          != undefined
            || email        != undefined)
            {
              employeeDirectory.addEmpolyee(name, jobPosition, address, callOffice, callCell, SMS, email);    
            }

          

          setTimeout(function(){openNewPopup();}, 0);
        });
        
        popupHandler.popupBtn2("Cancel",function(){
        
        setTimeout(function(){$route.reload();}, 100);
        });
        
        popupHandler.show("addEmployeePopup");
    }

    var openNewPopup = function()
    {
      $route.reload();
      popupHandler.titleAndDescription( "Employee Directory", "Success");
      
      popupHandler.popupBtn1("Okay",function(){$route.reload();});
      
      popupHandler.show("commonOneBtnPopup");
    }


    }
})();