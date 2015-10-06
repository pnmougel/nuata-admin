var App = angular.module('votcast-lp', [
    'ngAnimate',
    'ui.router',
    'ngResource',
    'angularMoment',
    'angular-google-analytics',
]);

App.run(function ($rootScope) {
});

App.config(function ($httpProvider, AnalyticsProvider) {
    /*
    // Track all routes (or not)
    AnalyticsProvider.trackPages(true);

    // Track all URL query params (default is false)
    AnalyticsProvider.trackUrlParams(true);

    // Optional set domain (Use 'none' for testing on localhost)
    AnalyticsProvider.setDomainName('votcast.com');

    AnalyticsProvider.useAnalytics(true);

    // Use display features plugin
    AnalyticsProvider.useDisplayFeatures(true);

    $httpProvider.interceptors.push(function($q, $injector) {
        return {
            request: function(request) {
                request.headers['Authorization'] = 'Bearer ' + localStorage.token;
                return request;
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $injector.get('$state').go('signIn');
                }
                return $q.reject(rejection);
            }
        };
    });
    */

    $httpProvider.defaults.useXDomain = false;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
