App.directive('attribute', function (Names) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        link: function (scope) {
            scope.curLang = 'en';
            scope.langs = [];
            scope.expanded = false;
            scope.filterByInstance = function (instanceId) {
                console.log(instanceId);
            };

            for (var lang in scope.item.labels) {
                scope.langs.push(lang.trim());
            }
            scope.setLang = function (lang) {
                scope.curLang = lang;
            };
            Names.getAttributeNames(scope.item.attributeIds, scope.curLang).then(function (names) {
            });
            Names.getItemNames(scope.item.instancesOf, scope.curLang).then(function (labels) {
                scope.instancesOfNames = labels;
            });
            Names.getItemNames(scope.item.subclassesOf, scope.curLang).then(function (labels) {
                scope.subclassesOfNames = labels;
            });
        },
        templateUrl: 'app/attributes/attribute.html'
    };
});
