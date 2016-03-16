/**
 * Created by nico on 17/11/15.
 */
App.controller('MenuCtrl', function ($scope, $state) {
  
  $scope.menu = [{
    label: 'Dashboard',
    icon: 'fa fa-bar-chart',
    state: 'app.dashboard',
    params: {},
    children: []
  },{
    label: 'Items',
    icon: 'fa fa-cube',
    state: 'app.items',
    params: {
      type: 'dimension'
    },
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
    label: 'Units',
    icon: 'fa fa-balance-scale',
    state: 'app.items',
    params: {
      type: 'unit'
    },
    children: []
  },{
    label: 'Facts',
    icon: 'fa fa-flask',
    state: 'app.facts',
    params: {},
    children: []
  }];

  $scope.selectItem = function (item) {

    $scope.menu.forEach(function (i) {
      i.class = 'menu-item';
    });
    item.class = 'menu-item menu-item-selected';
    $scope.curMenuItem = item;
    $state.go(item.state, item.params)
  };

  $scope.selectItem($scope.menu[3]);

  $scope.backgroundImageStyle = 'background: #233646';
});