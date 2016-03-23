/**=========================================================
 * Module: config.js
 * App routes configuration
 =========================================================*/

App.config(function ($stateProvider, $locationProvider, $urlRouterProvider, Html5Mode) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(Html5Mode);

  // default route
  $urlRouterProvider.otherwise('app/tasks');

  $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/view.html',
        controller: 'LoginCtrl'
      })
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'app/app/view.html',
        controller: 'AppCtrl'
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/view.html',
        controller: 'DashboardCtrl'
      })
      .state('app.attributes', {
        url: '/attributes',
        templateUrl: 'app/attributes/view.html',
        controller: 'AttributesCtrl'
      })
      .state('app.viewers', {
        url: '/viewers',
        templateUrl: 'app/viewers/view.html',
        controller: 'ViewersCtrl'
      })
      .state('app.tasks', {
        url: '/tasks',
        templateUrl: 'app/tasks/view.html',
        controller: 'TasksCtrl',
        params: {status: null}
      });
});