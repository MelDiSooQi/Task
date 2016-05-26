(function () {
    "use strict";

    var LiveConsole = function () {
        var x = 0;
        //this.elem = document.getElementById("console");
    }

    LiveConsole.prototype = function () {
        var elem = document.getElementById("console");
        var diffX = 0;
        var diffY = 0;
        var touching = false;
        function touchStart(e) {
            setTimeout(function() {
                touching = true;
                var x = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
                var y = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

                diffX = Math.abs(elem.getBoundingClientRect().left - x);
                diffY = Math.abs(elem.getBoundingClientRect().top - y);
            });
        }

        function touchEnd(e) {
            touching = false;
        }

        function touchMove(e) {
            if (!touching)
                return;
            var currentX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
            var currentY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
            var valX = currentX - diffX;
            var valY = currentY - diffY;
            //if (valX < 0) {
            //    valX = 0;
            //}
            //if (valY < 0) {
            //    valY = 0;
            //}
            if (elem.style.transform !== undefined) {
                elem.style.transform = "translate3d(" + valX + "px," + valY + "px,0)";
            } else {
                elem.style.transform = "translate3d(" + valX + "px," + valY + "px,0)";
            }
            e.preventDefault();
        }

        elem.getElementsByClassName('moveBtn')[0].style.msTouchAction = 'none';
        elem.getElementsByClassName('moveBtn')[0].onmspointermove = touchMove;
        elem.getElementsByClassName('moveBtn')[0].onmspointerdown = touchStart;
        elem.getElementsByClassName('clearBtn')[0].onclick = function() {
            elem.style.display = "none";
        }
        document.body.onmspointermove = touchMove;
        document.body.onmspointerdown = function() {
            touching = false;
        };
        function log(text) {
            elem.getElementsByClassName('consoleCont')[0].innerText += String.fromCharCode(13) + text;
            elem.getElementsByClassName('consoleCont')[0].scrollTop = elem.scrollHeight;
        }

        function clear() {
            elem.getElementsByClassName('consoleCont')[0].innerText = "";
        }

        return {
            log: log
        }
    }();
    window.LiveConsole = new LiveConsole();
})();