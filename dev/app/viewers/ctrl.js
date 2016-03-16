App.controller('ViewersCtrl', function ($scope, $stateParams, Viewers) {
  
  var resource = Viewers;

  $scope.filter = {
    name: '',
    page: 1,
    limit: 5,
  };

  $scope.pageChanged = function () {
    $scope.getItems()
  };

  $scope.newItem = {
    name: '',
    description: ''
  }

  $scope.getItems = function () {
    resource.get($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    })
  };

  $scope.getItems();
});
