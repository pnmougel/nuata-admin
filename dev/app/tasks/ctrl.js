App.controller('TasksCtrl', function ($scope, Tasks, $stateParams) {

  console.log($stateParams);

  if($stateParams.status) {
    $scope.hasStatus = true;
  }

  $scope.filter = {
    name: null,
    page: 1,
    limit: 5,
    status: $stateParams.status
  };

  $scope.pageChanged = function () {
    $scope.getItems()
  };

  Tasks.statuses().$promise.then(function(dataTypes) {
    $scope.statuses = dataTypes;
  });

  Tasks.list().$promise.then(function(tasks) {
    console.log(tasks);
    $scope.tasks = tasks;
  });

  $scope.getItems = function () {
    Tasks.get($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    })
  };

  $scope.getItems();
});
