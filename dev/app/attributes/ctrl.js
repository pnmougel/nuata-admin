App.controller('AttributesCtrl', function ($scope, $stateParams, Attributes, DataTypes) {
  
  var resource = Attributes;
  
  $scope.languages = ['en', 'fr'];
  $scope.curLang = 'en';

  $scope.filter = {
    name: '',
    page: 1,
    limit: 5,
    valueType: '',
    instanceOf: ''
  };

  $scope.pageChanged = function () {
    $scope.getItems()
  };

  DataTypes.query().$promise.then(function(dataTypes) {
    $scope.dataTypes = dataTypes;
  });

  $scope.getItems = function () {
    resource.search($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    })
  };

  $scope.clipboard = new Clipboard('.itemId');

  $scope.getItems();
});
