var PullToRefresh = function (id) {
    this.el = document.getElementById(id);
    this.refresher = document.getElementById('refresher');
}

PullToRefresh.prototype = function () {
    var diff = 0, doRefresh, el;
    var os = UATOOLS.GetOperatingSystem();

    var touchStartHandler = function (e) {
        switch (os) {
            case 'Windows Phone':
                diff = e.clientY + 50;
                break;
            case 'Android':
                diff = e.touches[0].clientY + 50;
                break;
        }
    }
    var touchMoveHandler = function (e) {
        var top;
        switch (os) {
            case 'Windows Phone':
                top = (e.clientY - diff) / 2;
                break;
            case 'Android':
                top = (e.touches[0].clientY - diff) / 2;
                break;
        }

        if (top >= 75) {
            top = 75;
        }
        if (os == 'Windows Phone') {
            refresher.style.transform = 'translate3d(0,' + top + 'px,0) rotateZ(' + top * 5 + 'deg)';
        } else {
            refresher.style.webkitTransform = 'translate3d(0,' + top + 'px,0) rotateZ(' + top * 5 + 'deg)';
        }
        e.preventDefault();
    }
    var touchEndHandler = function (e) {
        if (refresher.getBoundingClientRect().top >= 20) {
            switch (os) {
                case 'Windows Phone':
                    this.onmspointerdown = null;
                    this.onmspointermove = null;
                    this.onmspointerup = null;
                    break;
                case 'Android':
                    this.ontouchstart = null;
                    this.ontouchmove = null;
                    this.ontouchend = null;
                    break;
            }
            doRefresh(refreshFinished);
        } else {
            refresher.style.transition = 'all 300ms ease';
            if (os == 'Windows Phone') {
                refresher.style.transform = 'translate3d(0,0,0)';//.webkitTransform 
            } else {
                refresher.style.webkitTransform = 'translate3d(0,0,0)';
            }
            setTimeout(function () {
                refresher.style.transition = "";
            }, 300);
        }
    }
    var init = function (_doRefresh) {
        doRefresh = _doRefresh;
        el = this.el;
        this.el.style.msTouchAction = 'none';
        switch (os) {
            case 'Windows Phone':
                this.el.onmspointerdown = touchStartHandler;
                this.el.onmspointermove = touchMoveHandler;
                this.el.onmspointerup = touchEndHandler;
                break;
            case 'Android':
                this.el.ontouchstart = touchStartHandler;
                this.el.ontouchmove = touchMoveHandler;
                this.el.ontouchend = touchEndHandler;
                break;
        }
    }


    var refreshFinished = function () {
        this.refresher.style.transition = 'all 300ms ease';

        switch (os) {
            case 'Windows Phone':
                this.refresher.style.transform = 'translate3d(0,0,0)';

                break;
            case 'Android':
                this.refresher.style.webkitTransform = 'translate3d(0,0,0)';

                break;
        }
        setTimeout(function () {
            this.refresher.style.transition = "";
            switch (os) {
                case 'Windows Phone':
                    el.onmspointerdown = touchStartHandler;
                    el.onmspointermove = touchMoveHandler;
                    el.onmspointerup = touchEndHandler;
                    break;
                case 'Android':
                    el.ontouchstart = touchStartHandler;
                    el.ontouchmove = touchMoveHandler;
                    el.ontouchend = touchEndHandler;
                    break;
            }
        }, 300);
    }
    return {
        init: init
    }
}();