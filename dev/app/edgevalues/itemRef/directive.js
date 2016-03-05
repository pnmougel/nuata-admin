/**
 * Created by nico on 05/03/16.
 */
App.directive('itemRef', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'app/edgevalues/itemRef/view.html'
    };
});
