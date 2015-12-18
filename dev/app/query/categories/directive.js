App.directive('category', function(Status) {
    return {
        restrict: 'E',
        scope: {
            item: '=',
            options: '=',
            references: '='
        },
        templateUrl: './app/query/categories/view.html',
        link: function (scope, element, attr) {
            // Remove empty names
            scope.curLang = 'en';
            scope.setLang = function (lang) {
                scope.curLang = lang;
            };
            scope.showDetails = false;
            scope.warnings = [];
            scope.nameError = false;
        }
    };
}).directive('itemHeader', function() {
    return {
        restrict: 'E',
        scope: {
            name: '@',
            options: '=',
            items: '='
        },
        templateUrl: './app/query/categories/view-header.html',
        link: function (scope, element, attr) {
        }
    };
});