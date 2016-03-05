App.directive('attribute', function (Names) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        link: function (scope) {
            scope.curLang = 'en';
            scope.langs = [];
            for (var lang in scope.item.labels) {
                scope.langs.push(lang.trim());
            }
            scope.setLang = function (lang) {
                scope.curLang = lang;
            };
            Names.getAttributeNames(scope.item.attributeIds, scope.curLang).then(function (names) {
                //scope.attributeNames = names;
            })
        },
        templateUrl: 'app/attributes/attribute.html'
    };
});
