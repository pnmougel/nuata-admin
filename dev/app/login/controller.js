/**
 * Created by pnmougel on 06/08/15.
 */
/**
 * Created by nico on 03/08/15.
 */
'use strict';

App.controller('LoginCtrl', function ($scope, $state, Authentication, $auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.loginError = false;

  $scope.signIn = function () {
    Authentication.get($scope.user).$promise.then(function (data) {
      if (data.error) {
        $scope.loginError = true;
      } else {
        $scope.loginError = false;
        $auth.setToken(data.token);
        $state.go('app.dashboard');
      }
    })
  }
});
