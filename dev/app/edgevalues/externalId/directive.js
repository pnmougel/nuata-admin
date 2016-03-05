/**
 * Created by nico on 05/03/16.
 */
App.directive('externalId', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'app/edgevalues/externalId/view.html'
    };
});
