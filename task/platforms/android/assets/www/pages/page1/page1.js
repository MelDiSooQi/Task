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

      //get Data from employeeDirectory.js
      vm.items  = employeeDirectory.getitems;

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

    // add function for adding employee to recordes with opening pop-up to get data
    vm.add = function()
    {
        //create popup
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
              // add employee data to local storage
              employeeDirectory.addEmpolyee(name, jobPosition, address, callOffice, callCell, SMS, email);    
            }

          
          // open sucess popup
          setTimeout(function(){openNewPopup();}, 0);
        });
        
        popupHandler.popupBtn2("Cancel",function(){
        
        setTimeout(function(){$route.reload();}, 100);
        });
        
        popupHandler.show("addEmployeePopup");
    }

    // success popup
    var openNewPopup = function()
    {
      $route.reload();
      popupHandler.titleAndDescription( "Employee Directory", "Success");
      
      popupHandler.popupBtn1("Okay",function(){$route.reload();});
      
      popupHandler.show("commonOneBtnPopup");
    }


    }
})();