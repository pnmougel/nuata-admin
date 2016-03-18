App.controller('ViewersCtrl', function ($scope, $stateParams, Viewers, $timeout) {
  
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
  };

  $scope.$on('created', function (event, item) {
    $scope.items.push(item);
  });

  $scope.$on('deleted', function (event, deletedItem) {
    $scope.items = $scope.items.filter(function (item) {
      return item._id !== deletedItem._id;
    });
  });

  $scope.getItems = function () {
    resource.get($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      console.log($scope.nbItems);
      $scope.items = res.items;
    })
  };

  $scope.getItems();
});
