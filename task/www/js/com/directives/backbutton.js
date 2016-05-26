(function () {
    "use strict";

    angular.module("WIFIApp")
        .directive('backButton', ['$window', 'pagesHandler', backButton]);

    function backButton($window, pagesHandler) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem[0].onclick = function () {
                    pagesHandler.setIsBack(true);
                    $window.history.back();
                };
            }
        };
    }

})();