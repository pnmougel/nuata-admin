/**
 * Created by nico on 05/03/16.
 */
App.directive('text', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'app/edgevalues/text/view.html'
    };
});
