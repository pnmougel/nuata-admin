/**
 * Created by nico on 05/03/16.
 */
App.directive('attributeRef', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'app/edgevalues/attributeRef/view.html'
    };
});
