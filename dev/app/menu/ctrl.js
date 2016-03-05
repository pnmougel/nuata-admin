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
    state: 'app.attributes',
    params: {
      type: 'attributes'
    },
    children: []
  },{
    label: 'Objects of interest',
    icon: 'fa fa-bullseye',
    state: 'app.items',
    params: {
      type: 'ooi'
    },
    children: []
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

  $scope.selectItem($scope.menu[2]);

  //$scope.backgroundImageStyle = 'background-image: url(' + Trianglify({
  //  cell_size: 160,
  //  variance: 0.4,
  //  seed: '22g1b',
  //  x_colors: ['#666666', '#233646', '#283C4C']}).png() + ');'
  $scope.backgroundImageStyle = 'background: #233646';
});