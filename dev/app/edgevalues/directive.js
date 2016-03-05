/**
 * Created by nico on 05/03/16.
 */
App.directive('edgeValue', function(Names) {
    return {
        restrict: 'E',
        scope: {
            edge: '=',
            valueType: '='
        },
        link: function(scope) {
            Names.getAttributeNames([scope.edge.attributeId], 'en').then(function (names) {
                scope.attributeName = names[scope.edge.attributeId];
                //scope.attributeNames = names;
            })
        },
        templateUrl: 'app/edgevalues/view.html'
    };
});
