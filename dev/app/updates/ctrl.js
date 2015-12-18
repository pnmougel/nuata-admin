/**
 * Created by nico on 03/08/15.
 */
'use strict';


App.controller('UpdateCtrl', function ($scope, $location, Nuata, Status,
                                    Categories, Units, Dimensions, Oois, Facts,
                                    Category, Dimension, Unit, Ooi, Fact,
                                    Init) {
  $scope.showJson = false;
  $scope.toggleShowJson = function () {
    $scope.showJson = !$scope.showJson;
  };

  $scope.aceOptions = {
    useWrapMode: true,
    showGutter: true,
    mode: 'json'
  };

  $scope.references = {};
  $scope.queryOptions = {};

  var kinds = ['categories', 'dimensions', 'units', 'oois', 'facts'];

  var autoPromise = new Promise( function(resolve) { resolve() });

  var indexItems = function (items, resource) {
    var resolvedItems = items.filter(function (item) {
      return item.resolveDependencies();
    });

    if(resolvedItems.length === 0) { return autoPromise; }
    return resource.index(resolvedItems).$promise.then(function (responses) {
      resolvedItems.forEach(function (item, idx) {
        item.addStatus(Status.created);
        item._id = responses._id[idx];
      })
    });
  };

  $scope.index = function () {
    indexItems($scope.data.categories, Categories)
        .then(function () { return indexItems($scope.data.units, Units) })
        .then(function () { return indexItems($scope.data.dimensions, Dimensions) })
        .then(function () { return indexItems($scope.data.oois, Oois) })
        .then(function () { return indexItems($scope.data.facts, Facts) })
  };

  var searchExactMatch = function (item, matchingItemsObj) {
    var matchingItems = Object.keys(matchingItemsObj).map(function (key) {
      return matchingItemsObj[key];
    });
    var exactMatches = matchingItems.filter(function (matchingItem) {
      if(item.categoryIds.equals(matchingItem.categoryIds)) {
        return true;
      }
    });
    if(exactMatches.length === 1) {
      item._id = exactMatches[0]._id;
      item.addStatus(Status.found);
    }
    return exactMatches.length !== 1
  };

  var searchItems = function (items, resource) {
    var resolvedItems = items.filter(function (item) {
      return item.resolveDependencies();
    });
    if(resolvedItems.length === 0) { return autoPromise; }
    return resource.search(resolvedItems).$promise.then(function (responses) {
      return new Promise( function(resolve, reject) {
        var notFoundItems = resolvedItems.filter(function (item, idx) {
          var res = responses[idx];
          var nbItems = Object.keys(res).length;
          if (nbItems === 1) {
            item._id = res[0]._id;
            item.addStatus(Status.found);
            return false;
          }
          return searchExactMatch(item, res);
        });
        resolve(notFoundItems)
      });
    }).then(function (notFoundItems) {
      return new Promise( function(resolve, reject) {
          if(notFoundItems.length === 0) {
            resolve();
          } else {
            resource.match(notFoundItems).$promise.then(function (responses) {
              notFoundItems.forEach(function (item, idx) {
                var res = responses[idx];
                var nbItems = Object.keys(res).length;
                if (nbItems === 0) {
                  item.addStatus(Status.notFound);
                } else {
                  item.addStatus(Status.noExactMatch);
                }
                item.hits = res;
              });
              resolve();
            });
          }
      });
    });
  };

  var buildJson = function () {
    $scope.data = {
      categories: Category.buildFromQuery($scope.query.categories),
      dimensions: Dimension.buildFromQuery($scope.query.dimensions),
      units: Unit.buildFromQuery($scope.query.units),
      oois: Ooi.buildFromQuery($scope.query.oois),
      facts: Fact.buildFromQuery($scope.query.facts)
    };

    // Build the references dependencies
    kinds.forEach(function (kind) {
      $scope.references[kind] = {};
      $scope.data[kind].forEach(function (item) {
        $scope.references[kind][item.ref] = item;
      });
    });

    // Resolve the references
    kinds.forEach(function (kind) {
      $scope.data[kind].forEach(function (item) {
        item.resolveReferences($scope.references)
      });
    });

    searchItems($scope.data.categories, Categories)
        .then(function () { return searchItems($scope.data.units, Units) })
        .then(function () { return searchItems($scope.data.dimensions, Dimensions) })
        .then(function () { return searchItems($scope.data.oois, Oois) });

    $scope.queryOptions = {
      categories: {
        visible: true,
        filter: "",
        selectedStatuses: {'All': true}
      }
    }
  };

  $scope.initDb = function () {
    Init.init();
  };

  $scope.filterByStatus = function (status, folder) {
    var curSelectedStatuses = $scope.queryOptions[folder].selectedStatuses;
    if (status.name === 'All' || status.name === 'None' || 'All' in curSelectedStatuses || 'None' in curSelectedStatuses) {
      $scope.queryOptions[folder].selectedStatuses = {};
    }
    if (status.name in curSelectedStatuses) {
      delete $scope.queryOptions[folder].selectedStatuses[status.name];
      if (!Object.keys($scope.queryOptions[folder].selectedStatuses).length) {
        $scope.queryOptions[folder].selectedStatuses['None'] = true;
      }
    } else {
      $scope.queryOptions[folder].selectedStatuses[status.name] = true;
    }
  };

  $scope.statuses = [{
    name: 'All',
    kind: 'primary',
    description: 'Show all items'
  }, {
    name: 'None',
    kind: 'primary',
    description: 'Hide all items'
  }, Status.valid, Status.found, Status.created, Status.updated,
    Status.noExactMatch, Status.warning,
    Status.notFound, Status.error, Status.missingDependency];

  $scope.jsonUpdated = function () {
    $scope.query = JSON.parse($scope.rawJson);
    if ($scope.rawJson) {
      localStorage.setItem("jsonQuery", $scope.rawJson)
    }
    buildJson();
    //try {
    //  $scope.query = JSON.parse($scope.rawJson);
    //  if ($scope.rawJson) {
    //    localStorage.setItem("jsonQuery", $scope.rawJson)
    //  }
    //  buildJson();
    //} catch (e) {
    //  console.error("Invalid json", e);
    //}
  };
  $scope.rawJson = localStorage.getItem("jsonQuery");
  $scope.jsonUpdated();
});
