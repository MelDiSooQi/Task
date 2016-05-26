(function () {
    "use strict";

    angular.module("WIFIApp")
        .directive('ngButton', [ngButton]);

    function ngButton() {
        function touchStart(e) {
            e.currentTarget.style.boxShadow = "0px 0px 2px 2px rgba(0,0,0,0.1)";
        }

        function touchEnd(e) {
            var buttons = document.getElementsByClassName('ngButton');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.boxShadow = "";
            }
        }

        document.body.onmspointerup = touchEnd;

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem[0].className += " ngButton";
                elem[0].onmspointerdown !== undefined ?
                    elem[0].onmspointerdown = touchStart :
                    elem[0].ontouchstart = touchStart;

                elem[0].onmspointerup !== undefined ?
                    elem[0].onmspointerup = touchEnd :
                    elem[0].ontouchend = touchEnd;
            }
        };
    }


})();