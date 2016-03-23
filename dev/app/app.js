var App = angular.module('nuata', [
    'ngAnimate',
    'ui.router',
    'ngResource',
    'angularMoment',
    'ngMaterial',
    'ui.bootstrap',
    'satellizer'
]);

App.run(function ($rootScope) {
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };

    Array.prototype.maxBy = function (f) {
        var curValue = Number.MIN_VALUE;
        var curItem = null;
        this.forEach(function (item) {
            var v = f(item);
            if(v > curValue) {
                curItem = item;
                curValue = v;
            }
        });
        return { item: curItem, max: curValue };
    };

    Array.prototype.minBy = function (f) {
        var curValue = Number.MAX_VALUE;
        var curItem = null;
        this.forEach(function (item) {
            var v = f(item);
            if(v < curValue) {
                curItem = item;
                curValue = v;
            }
        });
        return { item: curItem, min: curValue };
    };

    Array.prototype.remove = function (item) {
        var idx = this.indexOf(item);
        if(idx != -1) {
            this.splice(idx, 1);
        }
    };
});

App.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = false;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
