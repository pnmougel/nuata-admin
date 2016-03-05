/**
 * Created by nico on 05/03/16.
 */
App.directive('url', function() {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'app/edgevalues/url/view.html'
    };
});
