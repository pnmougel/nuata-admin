/**=========================================================
 * Module: config.js
 * App routes configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // default route
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'app/views/main.html',
                controller: 'AppCtrl'
            })
    }]);