/**
 * Created by nico on 17/11/15.
 */
App.controller('AppCtrl', function ($scope, $state, $auth) {
  if(!$auth.isAuthenticated()) {
    $state.go('login');
  }
  
  $scope.menu = [{
    label: 'Dashboard',
    icon: 'fa fa-bar-chart',
    state: 'app.dashboard',
    params: {},
    children: []
  },{
    label: 'Attributes',
    icon: 'fa fa-tags',
    state: 'app.attributes'
  },{
    label: 'Viewers',
    icon: 'fa fa-bullseye',
    state: 'app.viewers',
    children: [{
      label: 'Add new',
      icon: 'fa fa-bullseye',
      state: 'app.viewers'
    }]
  },{
    label: 'Tasks',
    icon: 'fa fa-tags',
    state: 'app.tasks',
    params: {status: ''},
    children: [{
      label: 'Running',
      state: 'app.tasks',
      params: {status: 'running'}
    },
    {
      label: 'Completed',
      state: 'app.tasks',
      params: {status: 'complete'}
    },
    {
      label: 'Error',
      state: 'app.tasks',
      params: {status: 'error'}
    },
    {
      label: 'Stopped',
      state: 'app.tasks',
      params: {status: 'stop'}
    }]
  }];

  $scope.logout = function () {
    $auth.logout();
    $state.go('login');
  };

  $scope.selectItem = function (item, childItem) {

    $scope.menu.forEach(function (i) {
      i.class = 'menu-item';
    });
    item.class = 'menu-item menu-item-selected';
    $scope.curMenuItem = item;
    if(childItem) {
      $state.go(childItem.state, childItem.params)
    } else {
      $state.go(item.state, item.params)
    }
  };

  $scope.selectItem($scope.menu[2]);

  $scope.backgroundImageStyle = 'background: #233646';
});