App.controller('ItemsCtrl', function ($scope, $stateParams, ItemConfig) {
  
  $stateParams.type = $stateParams.type ? $stateParams.type : 'dimension';

  $scope.type = $stateParams.type;

  $scope.curConfig = ItemConfig[$scope.type];
  $scope.dependencies = ItemConfig[$scope.type].dependencies;

  var resource = ItemConfig[$scope.type].resource;
  
  $scope.languages = ['en', 'fr'];
  $scope.curLang = 'en';

  $scope.currentPage = 1;
  $scope.filter = {
    name: '',
    page: 1,
    limit: 5,
    expand: true
  };

  $scope.pageChanged = function () {
    $scope.filter.start = ($scope.filter.page - 1) * ($scope.filter.limit);
    $scope.getItems()
  };

  $scope.autoCompleteTextChange = function (field) {
    if(!field.searchText) {
      delete $scope.filter[field.field];
      $scope.getItems();
    }
  };

  $scope.updateFilter = function (mapping) {
    if(mapping.selectedItem) {
      $scope.filter[mapping.field] = mapping.selectedItem._id;
      $scope.getItems();
    }
  };

  $scope.autoComplete = function (field) {
    var resource = ItemConfig[field.type].resource;
    return resource.find({ name: field.searchText }).$promise.then(function (items) {
      return items.items;
    });
  };

  $scope.updateItem = function (item) {
    console.log(item);
  };

  $scope.getItems = function () {
    resource.find($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items
    })
  };

  $scope.deleteCategory = function (item, category) {
    console.log("Delete Category");
    console.log(item);
    console.log(category);
  };

  $scope.clipboard = new Clipboard('.itemId');

  $scope.getItems();
});
