App.directive('match', function() {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        templateUrl: './app/query/categories/match.html',
        link: function (scope, element, attr) {
            // Remove empty names

        }
    };
})