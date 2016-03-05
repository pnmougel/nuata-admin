App.controller('AttributesCtrl', function ($scope, $stateParams, Attributes, DataTypes) {
  
  var resource = Attributes;
  
  $scope.languages = ['en', 'fr'];
  $scope.curLang = 'en';

  $scope.currentPage = 1;
  $scope.filter = {
    name: '',
    page: 1,
    limit: 5,
    valueType: ''
  };

  $scope.pageChanged = function () {
    $scope.filter.start = ($scope.filter.page - 1) * ($scope.filter.limit);
    $scope.getItems()
  };

  DataTypes.query().$promise.then(function(dataTypes) {
    $scope.dataTypes = dataTypes;
  });

  //$scope.autoCompleteTextChange = function (field) {
  //  if(!field.searchText) {
  //    delete $scope.filter[field.field];
  //    $scope.getItems();
  //  }
  //};

  //$scope.updateFilter = function (mapping) {
  //  if(mapping.selectedItem) {
  //    $scope.filter[mapping.field] = mapping.selectedItem._id;
  //    $scope.getItems();
  //  }
  //};

  //$scope.autoComplete = function (field) {
  //  var resource = ItemConfig[field.type].resource;
  //  return resource.find({ name: field.searchText }).$promise.then(function (items) {
  //    return items.items;
  //  });
  //};

  //$scope.updateItem = function (item) {
  //  console.log(item);
  //};

  $scope.getItems = function () {
    resource.search($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    })
  };

  $scope.clipboard = new Clipboard('.itemId');

  $scope.getItems();
});
