App.controller('ItemCtrl', function ($scope, $stateParams, Dimensions, Oois, Units, Categories) {
  $stateParams.name = $stateParams.name ? $stateParams.name : 'Dimensions';

  $scope.name = $stateParams.name;



  var resources = {
    Dimensions: Dimensions,
    'Objects of interest': Oois,
    Units: Units,
    Categories: Categories
  };

  var resource = resources[$stateParams.name];
  
  $scope.item = {
    names: {},
    descriptions: {}
  };

  $scope.languages = ['en', 'fr'];
  $scope.curLang = 'en';

  $scope.form = {
    name: 'franc',
    lang: 'en'
  };

  $scope.mappings = [{
    field: 'categoryIds',
    mapTo: 'categories',
    label: 'Category',
    resource: Categories
  },{
    field: 'parentIds',
    mapTo: 'parents',
    label: 'Parent',
    resource: Dimensions
  },{
    field: 'unitIds',
    mapTo: 'units',
    label: 'Unit',
    resource: Units
  }];

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

  $scope.autoCompleteTextChange = function (field, newText) {
    if(!newText) {
      delete $scope.filter[field];
      $scope.getItems();
    }
  };

  $scope.updateFilter = function (mapping) {
    if(mapping.selectedItem) {
      $scope.filter[mapping.field] = mapping.selectedItem._id;
      $scope.getItems();
    }
  };

  $scope.autoComplete = function (field, newText, resource) {
    return resource.find({
      name: newText
    }).$promise.then(function (items) {
      return items.items;
    });

  };

  $scope.getItems = function () {
    resource.find($scope.filter).$promise.then(function (res) {
      $scope.nbItems = res.nbItems;

      var matchingItems = res.items;

      var col1 = [26, 160, 75];
      var col2 = [255, 154, 56];

      var maxScore = matchingItems.maxBy(function (item) { return item._score; }).max;
      //var minScore = matchingItems.minBy(function (item) { return item._score; }).min;

      matchingItems.forEach(function (item) {
        var ratio = 1 - (item._score / maxScore);
        var color = [0, 1, 2].map(function (i) {
          return Math.ceil(col1[i] - (col1[i] - col2[i]) * ratio);
        });
        item.color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
      });
      $scope.items = matchingItems
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
