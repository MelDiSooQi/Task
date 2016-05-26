(function () {
    "use strict";

    angular.module("WIFIApp")
        .directive('card', [card]);

    function card() {
        var opened = false;

        function toggleTile(e) {
            var el = e.currentTarget.getElementsByClassName("tile")[0];
            if (opened) {
                el.style.transform !== undefined ?
                    el.style.transform = "translate3d(0, 100%, 0)" :
                    el.style.webkitTransform = "translate3d(0, 100%, 0)";
            } else {
                el.style.transform !== undefined ?
                    el.style.transform = "translate3d(0, 0, 0)" :
                    el.style.webkitTransform = "translate3d(0, 0, 0)";
            }
            opened = !opened;
        }


        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem[0].onclick = toggleTile;
            }
        };
    }


})();