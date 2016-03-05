/**=========================================================
 * Module: config.js
 * App routes configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        //$locationProvider.html5Mode(true);

        // default route
        // $urlRouterProvider.otherwise('app/dashboard');
        $urlRouterProvider.otherwise('app/attributes');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'app/menu/view.html',
                controller: 'MenuCtrl'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/view.html',
                controller: 'DashboardCtrl'
            })
            .state('app.items', {
                url: '/items',
                templateUrl: 'app/items/view.html',
                controller: 'ItemsCtrl',
                params: { type: null }
            })
            .state('app.item', {
                url: '/item',
                templateUrl: 'app/item/view.html',
                controller: 'ItemCtrl',
                params: { id: null, type: null }
            })
            .state('app.attributes', {
                url: '/attributes',
                templateUrl: 'app/attributes/view.html',
                controller: 'AttributesCtrl',
                params: { type: null }
            })
            .state('app.updates', {
                url: '/updates',
                templateUrl: 'app/updates/view.html',
                controller: 'UpdateCtrl',
                params: { name: null }
            });
    }]);