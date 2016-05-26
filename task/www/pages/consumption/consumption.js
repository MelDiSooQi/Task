(function () {
    "use strict";

    angular.module('WIFIApp')
        .controller("consumptionCtrl", ["$scope", "$location", "$timeout", "$mdDialog", consumptionCtrl]);

    function consumptionCtrl($scope, $location, $timeout, $mdDialog) {
        var vm = this;

        vm.showAlert = function (ev) {
            $mdDialog.show(
                $mdDialog.alert({
                    title: 'This is an alert title',
                    content: 'You can specify some description text in here.',
                    ariaLabel:'Alert Dialog Demo',
                    ok: 'Nice'
                }));
        };

        $timeout(function () {
            vm.options = { thickness: 6 };
            vm.percent1 = "17%";
            vm.data1 = [
                { label: "One", value: 83, color: "#333333" },
                { label: "Two", value: 17, color: "#66a043" }
            ];
            vm.percent2 = "75%";
            vm.data2 = [
                { label: "Two", value: 75, color: "#66a043" },
            { label: "One", value: 25, color: "#333333" }

            ];
            vm.percent3 = "50%";
            vm.data3 = [
                { label: "One", value: 50, color: "#333333" },
                { label: "Two", value: 50, color: "#66a043" }
            ];
        }, 1000);
    }
})();