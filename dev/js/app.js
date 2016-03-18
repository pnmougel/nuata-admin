"use strict";
var App = angular.module('nuata', ['ngAnimate', 'ui.router', 'ngResource', 'angularMoment', 'ui.ace', 'ngMaterial', 'ui.bootstrap']);
App.run(function($rootScope) {
  Array.prototype.equals = function(array) {
    if (!array)
      return false;
    if (this.length != array.length)
      return false;
    for (var i = 0,
        l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i]))
          return false;
      } else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  };
  Array.prototype.maxBy = function(f) {
    var curValue = Number.MIN_VALUE;
    var curItem = null;
    this.forEach(function(item) {
      var v = f(item);
      if (v > curValue) {
        curItem = item;
        curValue = v;
      }
    });
    return {
      item: curItem,
      max: curValue
    };
  };
  Array.prototype.minBy = function(f) {
    var curValue = Number.MAX_VALUE;
    var curItem = null;
    this.forEach(function(item) {
      var v = f(item);
      if (v < curValue) {
        curItem = item;
        curValue = v;
      }
    });
    return {
      item: curItem,
      min: curValue
    };
  };
  Array.prototype.remove = function(item) {
    var idx = this.indexOf(item);
    if (idx != -1) {
      this.splice(idx, 1);
    }
  };
});
App.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = false;
});

"use strict";
App.factory('Nuata', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {search: {
      method: 'POST',
      url: ServerUrl + '/data'
    }});
});

"use strict";
App.controller('AttributesCtrl', function($scope, $stateParams, Attributes, DataTypes) {
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
  $scope.pageChanged = function() {
    $scope.getItems();
  };
  DataTypes.query().$promise.then(function(dataTypes) {
    $scope.dataTypes = dataTypes;
  });
  $scope.getItems = function() {
    resource.search($scope.filter).$promise.then(function(res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    });
  };
  $scope.clipboard = new Clipboard('.itemId');
  $scope.getItems();
});

"use strict";
App.directive('attribute', function(Names) {
  return {
    restrict: 'E',
    scope: {item: '='},
    link: function(scope) {
      scope.curLang = 'en';
      scope.langs = [];
      scope.expanded = false;
      scope.filterByInstance = function(instanceId) {
        console.log(instanceId);
      };
      for (var lang in scope.item.labels) {
        scope.langs.push(lang.trim());
      }
      scope.setLang = function(lang) {
        scope.curLang = lang;
      };
      Names.getAttributeNames(scope.item.attributeIds, scope.curLang).then(function(names) {});
      Names.getItemNames(scope.item.instancesOf, scope.curLang).then(function(labels) {
        scope.instancesOfNames = labels;
      });
      Names.getItemNames(scope.item.subclassesOf, scope.curLang).then(function(labels) {
        scope.subclassesOfNames = labels;
      });
    },
    templateUrl: 'app/attributes/attribute.html'
  };
});

"use strict";
App.constant('ServerUrl', 'http://localhost:9000');

"use strict";
App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
  'use strict';
  $urlRouterProvider.otherwise('app/items');
  $stateProvider.state('app', {
    abstract: true,
    url: '/app',
    templateUrl: 'app/menu/view.html',
    controller: 'MenuCtrl'
  }).state('app.dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/view.html',
    controller: 'DashboardCtrl'
  }).state('app.items', {
    url: '/items',
    templateUrl: 'app/items/view.html',
    controller: 'ItemsCtrl',
    params: {type: null}
  }).state('app.item', {
    url: '/item',
    templateUrl: 'app/item/view.html',
    controller: 'ItemCtrl',
    params: {
      id: null,
      type: null
    }
  }).state('app.attributes', {
    url: '/attributes',
    templateUrl: 'app/attributes/view.html',
    controller: 'AttributesCtrl'
  }).state('app.viewers', {
    url: '/viewers',
    templateUrl: 'app/viewers/view.html',
    controller: 'ViewersCtrl'
  }).state('app.tasks', {
    url: '/tasks',
    templateUrl: 'app/tasks/view.html',
    controller: 'TasksCtrl',
    params: {status: null}
  }).state('app.updates', {
    url: '/updates',
    templateUrl: 'app/updates/view.html',
    controller: 'UpdateCtrl',
    params: {name: null}
  });
}]);

"use strict";
App.controller('DashboardCtrl', function($scope, $state) {
  $state.go('app.items', {name: 'Dimensions'});
});

"use strict";
App.directive('selectOnClick', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function() {
        if (!$window.getSelection().toString()) {
          this.setSelectionRange(0, this.value.length);
        }
      });
    }
  };
}]);

"use strict";
App.directive('edgeValue', function(Names) {
  return {
    restrict: 'E',
    scope: {
      edge: '=',
      valueType: '='
    },
    link: function(scope) {
      Names.getAttributeNames([scope.edge.attributeId], 'en').then(function(names) {
        scope.attributeName = names[scope.edge.attributeId];
      });
    },
    templateUrl: 'app/edgevalues/view.html'
  };
});

"use strict";
App.controller('MenuCtrl', function($scope, $state) {
  $scope.menu = [{
    label: 'Dashboard',
    icon: 'fa fa-bar-chart',
    state: 'app.dashboard',
    params: {},
    children: []
  }, {
    label: 'Attributes',
    icon: 'fa fa-tags',
    state: 'app.attributes'
  }, {
    label: 'Viewers',
    icon: 'fa fa-bullseye',
    state: 'app.viewers',
    children: [{
      label: 'Add new',
      icon: 'fa fa-bullseye',
      state: 'app.viewers'
    }]
  }, {
    label: 'Tasks',
    icon: 'fa fa-tags',
    state: 'app.tasks',
    params: {status: ''},
    children: [{
      label: 'Running',
      state: 'app.tasks',
      params: {status: 'running'}
    }, {
      label: 'Completed',
      state: 'app.tasks',
      params: {status: 'complete'}
    }, {
      label: 'Error',
      state: 'app.tasks',
      params: {status: 'error'}
    }, {
      label: 'Stopped',
      state: 'app.tasks',
      params: {status: 'stop'}
    }]
  }];
  $scope.selectItem = function(item, childItem) {
    $scope.menu.forEach(function(i) {
      i.class = 'menu-item';
    });
    item.class = 'menu-item menu-item-selected';
    $scope.curMenuItem = item;
    if (childItem) {
      $state.go(childItem.state, childItem.params);
    } else {
      $state.go(item.state, item.params);
    }
  };
  $scope.selectItem($scope.menu[2]);
  $scope.backgroundImageStyle = 'background: #233646';
});

"use strict";
function BaseItem(allStatuses) {
  this.allStatuses = allStatuses;
  this.statuses = [];
  this.statusesSet = {};
}
BaseItem.prototype.constructor = BaseItem;
BaseItem.prototype.addStatus = function(status) {
  if (!(status in this.statusesSet)) {
    this.statusesSet[status] = true;
    this.statuses.push(status);
  }
};
BaseItem.prototype.removeStatus = function(status) {
  if (status in this.statusesSet) {
    delete this.statusesSet[status];
    var idx = this.statuses.indexOf(status);
    if (idx > -1) {
      this.statuses.splice(idx, 1);
    }
  }
};
BaseItem.prototype.resolveDependencies = function() {
  var hasMissingDependency = false;
  var that = this;
  this.dependencies.forEach(function(dependency) {
    that[dependency.resolvedAs] = that[dependency.mapTo].map(function(item) {
      if (!item._id) {
        hasMissingDependency = true;
      }
      return item._id;
    });
  });
  if (hasMissingDependency) {
    this.addStatus(this.allStatuses.missingDependency);
  }
  return !hasMissingDependency;
};
BaseItem.prototype.resolveReferences = function(references) {
  var that = this;
  this.dependencies.forEach(function(dependency) {
    if (that[dependency.field]) {
      that[dependency.mapTo] = that[dependency.field].map(function(itemRef) {
        var resolvedItem = itemRef;
        var refs = dependency.mapTo === 'parents' ? references['dimensions'] : references[dependency.mapTo];
        if (!itemRef in refs) {
          that.addStatus(that.allStatuses.missingReference);
        } else {
          resolvedItem = refs[itemRef];
        }
        return resolvedItem;
      });
    }
  });
};
BaseItem.prototype.getLang = function() {
  if (this.names) {
    return Object.keys(this.names);
  } else {
    return [];
  }
};
BaseItem.prototype.isVisible = function(statuses) {
  return true;
  if ('All' in statuses) {
    return true;
  } else if ('None' in statuses) {
    return false;
  } else {
    var found = false;
    Object.keys(this.statuses).forEach(function(status) {
      found = found || status.name in statuses.selectedStatuses;
    });
    return found;
  }
};

"use strict";
App.factory('Category', function(Status) {
  function Category(item) {
    BaseItem.call(this, Status);
    this.names = item.names;
    this.descriptions = item.descriptions;
    this.ref = item.ref;
    this.dependencies = [];
  }
  Category.prototype = Object.create(BaseItem.prototype);
  Category.prototype.constructor = Category;
  Category.buildFromQuery = function(data) {
    if (data) {
      return data.map(function(item) {
        return new Category(item);
      });
    } else {
      return [];
    }
  };
  Category.build = function(data) {
    return new Category(data);
  };
  return Category;
});

"use strict";
App.factory('Dimension', function(Status) {
  function Dimension(item) {
    BaseItem.call(this, Status);
    this.names = item.names;
    this.descriptions = item.descriptions;
    this.ref = item.ref;
    this.categoryRefs = item.categories;
    this.parentRefs = item.parents;
    this.parents = [];
    this.categories = [];
    this.dependencies = [{
      field: 'categoryRefs',
      mapTo: 'categories',
      resolvedAs: 'categoryIds'
    }, {
      field: 'parentRefs',
      mapTo: 'parents',
      resolvedAs: 'parentIds'
    }];
  }
  Dimension.prototype = Object.create(BaseItem.prototype);
  Dimension.prototype.constructor = Dimension;
  Dimension.buildFromQuery = function(data) {
    if (data) {
      return data.map(function(item) {
        return new Dimension(item);
      });
    } else {
      return [];
    }
  };
  Dimension.build = function(data) {
    return new Dimension(data);
  };
  return Dimension;
});

"use strict";
App.factory('Fact', function(Status) {
  function Fact(item) {
    BaseItem.call(this, Status);
    this.dependencies = [{
      field: 'dimensionRefs',
      mapTo: 'dimensions',
      resolvedAs: 'dimensionIds'
    }, {
      field: 'ooiRefs',
      mapTo: 'oois',
      resolvedAs: 'ooiIds'
    }];
    this.value = item.value;
    this.valueInt = item.valueInt;
    this.at = item.at;
    this.dimensionRefs = item.dimensions;
    this.ooiRefs = [item.ooi];
  }
  Fact.prototype = Object.create(BaseItem.prototype);
  Fact.prototype.constructor = Fact;
  Fact.buildFromQuery = function(data) {
    if (data) {
      return data.map(function(item) {
        return new Fact(item);
      });
    } else {
      return [];
    }
  };
  Fact.build = function(data) {
    return new Fact(data);
  };
  return Fact;
});

"use strict";
App.factory('Ooi', function(Status) {
  function Ooi(item) {
    BaseItem.call(this, Status);
    this.names = item.names;
    this.descriptions = item.descriptions;
    this.unitRefs = item.units;
    this.ref = item.ref;
    this.dependencies = [{
      field: 'unitRefs',
      mapTo: 'units',
      resolvedAs: 'unitIds'
    }];
  }
  Ooi.prototype = Object.create(BaseItem.prototype);
  Ooi.prototype.constructor = Ooi;
  Ooi.buildFromQuery = function(data) {
    if (data) {
      return data.map(function(item) {
        return new Ooi(item);
      });
    } else {
      return [];
    }
  };
  Ooi.build = function(data) {
    return new Ooi(data);
  };
  return Ooi;
});

"use strict";
App.factory('Unit', function(Status) {
  function Unit(item) {
    BaseItem.call(this, Status);
    this.names = item.names;
    this.descriptions = item.descriptions;
    this.ref = item.ref;
    this.dependencies = [];
  }
  Unit.prototype = Object.create(BaseItem.prototype);
  Unit.prototype.constructor = Unit;
  Unit.buildFromQuery = function(data) {
    if (data) {
      return data.map(function(item) {
        return new Unit(item);
      });
    } else {
      return [];
    }
  };
  Unit.build = function(data) {
    return new Unit(data);
  };
  return Unit;
});

"use strict";
App.factory('Attributes', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/attribute/index'
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/attribute/list',
      isArray: true
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/attribute/:id'
    },
    search: {
      method: 'GET',
      url: ServerUrl + '/attribute/search'
    },
    names: {
      method: 'GET',
      url: ServerUrl + '/attribute/name',
      isArray: true
    }
  });
});

"use strict";
App.factory('Categories', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/category/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/category/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/category/match',
      isArray: true
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/category/:id'
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/category/search'
    }
  });
});

"use strict";
App.factory('DataTypes', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/datatypes');
});

"use strict";
App.factory('Dimensions', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/dimension/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/dimension/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/dimension/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});

"use strict";
App.factory('Facts', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {index: {
      method: 'POST',
      url: ServerUrl + '/fact/index'
    }});
});

"use strict";
App.factory('Init', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {init: {
      method: 'POST',
      url: ServerUrl + '/init'
    }});
});

"use strict";
App.factory('Items', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/item/index'
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/item/list',
      isArray: true
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/item/:id'
    },
    search: {
      method: 'GET',
      url: ServerUrl + '/item/search'
    },
    names: {
      method: 'GET',
      url: ServerUrl + '/item/name',
      isArray: true
    }
  });
});

"use strict";
App.factory('Oois', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/ooi/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/ooi/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/ooi/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});

"use strict";
App.factory('Tasks', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/task', {}, {
    statuses: {
      method: 'GET',
      url: ServerUrl + '/task/statuses',
      isArray: true
    },
    list: {
      method: 'GET',
      url: ServerUrl + '/task/names',
      isArray: true
    },
    run: {
      method: 'POST',
      url: ServerUrl + '/task/run/:taskName'
    },
    stop: {
      method: 'POST',
      url: ServerUrl + '/task/stop/:id'
    },
    state: {
      method: 'GET',
      url: ServerUrl + '/task/state'
    }
  });
});

"use strict";
App.factory('Units', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/unit/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/unit/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/unit/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});

"use strict";
App.factory('Viewers', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/viewer', {}, {
    update: {
      method: 'PUT',
      url: ServerUrl + '/viewer/:id'
    },
    delete: {
      method: 'DELETE',
      url: ServerUrl + '/viewer/:id'
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/viewer/',
      cache: false
    }
  });
});

"use strict";
App.factory('ItemConfig', function(Dimensions, Categories, Units, Oois) {
  return {
    dimension: {
      resource: Dimensions,
      singular: 'Dimension',
      plural: 'Dimensions',
      dependencies: [{
        type: 'category',
        field: 'categoryIds',
        label: 'Category'
      }, {
        type: 'dimension',
        field: 'parentIds',
        label: 'Parent'
      }]
    },
    category: {
      resource: Categories,
      singular: 'Category',
      plural: 'Categories',
      mappings: {
        field: 'categoryIds',
        mapTo: 'categories'
      }
    },
    unit: {
      resource: Units,
      singular: 'Unit',
      plural: 'Units',
      mappings: {
        field: 'unitIds',
        mapTo: 'units'
      }
    },
    ooi: {
      resource: Oois,
      singular: 'Object of interest',
      plural: 'Objects of interest',
      mappings: {}
    }
  };
});

"use strict";
App.factory('Names', function(Attributes, Items) {
  return {
    cache: {
      attribute: {},
      item: {}
    },
    getAttributeNames: function(ids, lang) {
      return this.getNames(ids, 'attribute', lang);
    },
    getItemNames: function(ids, lang) {
      return this.getNames(ids, 'item', lang);
    },
    getNames: function(ids, type, lang) {
      var that = this;
      var typeCache = that.cache[type];
      var repository = type == 'attribute' ? Attributes : Items;
      var idsToSearch = [];
      var idToLabel = {};
      ids.forEach(function(id) {
        if (id in typeCache && lang in typeCache[id]) {
          idToLabel[id] = typeCache[id][lang];
        } else {
          idsToSearch.push(id);
        }
      });
      return new Promise(function(resolve) {
        if (idsToSearch.length === 0) {
          resolve(idToLabel);
        } else {
          repository.names({id: idsToSearch}).$promise.then(function(labels) {
            labels.forEach(function(label, i) {
              var id = idsToSearch[i];
              if (!(id in typeCache)) {
                typeCache[id] = {};
              }
              typeCache[id][lang] = {
                name: label.name,
                description: label.description
              };
              idToLabel[id] = typeCache[id][lang];
            });
            resolve(idToLabel);
          });
        }
      });
    }
  };
});

"use strict";
App.factory('Status', [function() {
  return {
    valid: {
      name: 'Valid',
      kind: 'success',
      description: 'The item is valid'
    },
    found: {
      name: 'Found',
      kind: 'success',
      description: 'An item matching the name has been found'
    },
    created: {
      name: 'Created',
      kind: 'success',
      description: 'The item has been successfully created on the server'
    },
    updated: {
      name: 'Updated',
      kind: 'success',
      description: 'The item has been successfully updated on the server'
    },
    noExactMatch: {
      name: 'No exact match',
      kind: 'warning',
      description: 'One or more existing items match the names'
    },
    warning: {
      name: 'Warning',
      kind: 'warning',
      description: 'The item should be improved'
    },
    notFound: {
      name: 'Not found',
      kind: 'alert',
      description: 'The item does not exists on the server'
    },
    error: {
      name: 'Error',
      kind: 'alert',
      description: 'The item is invalid'
    },
    missingReference: {
      name: 'Missing reference',
      kind: 'alert',
      description: 'The item reference a non existing item'
    },
    missingDependency: {
      name: 'Missing dependency',
      kind: 'alert',
      description: 'The item requires a dependency that is missing'
    }
  };
}]);

"use strict";
App.controller('TasksCtrl', function($scope, Tasks, $stateParams) {
  if ($stateParams.status) {
    $scope.hasStatus = true;
  }
  $scope.filter = {
    name: null,
    page: 1,
    limit: 5,
    status: $stateParams.status
  };
  $scope.pageChanged = function() {
    $scope.getItems();
  };
  Tasks.statuses().$promise.then(function(dataTypes) {
    $scope.statuses = dataTypes;
  });
  Tasks.list().$promise.then(function(tasks) {
    $scope.tasks = tasks;
  });
  $scope.getItems = function() {
    Tasks.get($scope.filter).$promise.then(function(res) {
      $scope.nbItems = res.nbItems;
      $scope.items = res.items;
    });
  };
  $scope.getItems();
});

"use strict";
App.controller('ViewersCtrl', function($scope, $stateParams, Viewers, $timeout) {
  var resource = Viewers;
  $scope.filter = {
    name: '',
    page: 1,
    limit: 5
  };
  $scope.pageChanged = function() {
    $scope.getItems();
  };
  $scope.newItem = {
    name: '',
    description: ''
  };
  $scope.$on('created', function(event, item) {
    $scope.items.push(item);
  });
  $scope.$on('deleted', function(event, deletedItem) {
    $scope.items = $scope.items.filter(function(item) {
      return item._id !== deletedItem._id;
    });
  });
  $scope.getItems = function() {
    resource.get($scope.filter).$promise.then(function(res) {
      $scope.nbItems = res.nbItems;
      console.log($scope.nbItems);
      $scope.items = res.items;
    });
  };
  $scope.getItems();
});

"use strict";
App.directive('block', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '=',
      width: '=',
      color: '=',
      borderColor: '=',
      collapsible: '=',
      collapsed: '='
    },
    link: function(scope) {
      scope.toggle = function() {
        scope.collapsed = !scope.collapsed;
      };
    },
    templateUrl: 'app/components/block/view.html'
  };
});

"use strict";
App.directive('item', function(ItemConfig) {
  return {
    restrict: 'E',
    scope: {item: '='},
    link: function(scope) {
      scope.languages = ['en', 'fr'];
      scope.names = [];
      scope.languages.forEach(function(lang) {
        if (lang in scope.item.name) {
          scope.names.push({
            lang: lang,
            content: scope.item.name[lang],
            isDefault: true
          });
        }
      });
      scope.languages.forEach(function(lang) {
        if (lang in scope.item.otherNames) {
          scope.item.otherNames[lang].forEach(function(name) {
            if (scope.item.name[lang] !== name) {
              scope.names.push({
                lang: lang,
                content: name,
                isDefault: false
              });
            }
          });
        }
      });
      scope.categories = [];
      scope.item.categories.forEach(function(category) {
        scope.categories.push({
          item: category,
          searchText: category.name.en
        });
      });
      scope.parents = [];
      scope.item.parents.forEach(function(parent) {
        scope.parents.push({
          item: parent,
          searchText: parent.name.en
        });
      });
      scope.descriptions = [];
      scope.languages.forEach(function(lang) {
        if (lang in scope.item.description) {
          scope.descriptions.push({
            lang: lang,
            content: scope.item.description[lang]
          });
        }
      });
      scope.addName = function() {
        scope.names.push({
          lang: '',
          content: '',
          isDefault: false
        });
      };
      scope.addDescription = function() {
        scope.descriptions.push({
          lang: '',
          content: ''
        });
      };
      scope.addCategory = function() {
        scope.categories.push({hasFocus: true});
      };
      scope.removeItem = function(item, kind) {
        scope[kind].remove(item);
      };
      scope.autoComplete = function(item, kind) {
        return ItemConfig[kind].resource.find({name: item.searchText}).$promise.then(function(items) {
          return items.items.map(function(item) {
            return {
              item: item,
              searchText: item.name.en
            };
          });
        });
      };
      scope.onItemSelect = function(item, model, label, category) {
        category.item = item.item;
        category.searchText = item.searchText;
      };
      scope.onTextClick = function($event) {
        $event.target.select();
      };
      scope.toggleDefaultName = function(name, isToggled) {
        scope.names.forEach(function(otherName) {
          if (otherName.lang === name.lang) {
            otherName.isDefault = false;
          }
        });
        name.isDefault = isToggled;
      };
      scope.printItem = function() {
        console.log(scope.item);
      };
    },
    templateUrl: 'app/components/item/view.html'
  };
});

"use strict";
App.directive('pageTitle', function() {
  return {
    restrict: 'E',
    scope: {label: '='},
    templateUrl: 'app/components/pageTitle/view.html'
  };
});

"use strict";
App.directive('textField', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      updated: '=',
      onUpdate: '=',
      fieldName: '=',
      placeholder: '='
    },
    link: function(scope) {
      scope.sourceValue = angular.copy(scope.value);
      scope.update = function() {
        scope.updated = scope.sourceValue !== scope.value;
        $timeout(function() {
          scope.onUpdate(scope.fieldName, scope.value).then(function(errorMessage) {
            scope.errorMessage = errorMessage;
            scope.hasError = scope.errorMessage.length !== 0;
            scope.$apply();
          });
        }, 100);
      };
    },
    templateUrl: 'app/components/textfield/view.html'
  };
});

"use strict";
App.directive('attributeRef', function(Names) {
  return {
    restrict: 'E',
    scope: {value: '='},
    templateUrl: 'app/edgevalues/attributeRef/view.html',
    link: function(scope) {
      if (scope.value) {
        Names.getAttributeNames([scope.value.id], 'en').then(function(label) {
          scope.label = label[scope.value.id];
          scope.$apply();
        });
      }
    }
  };
});

"use strict";
App.directive('externalId', function() {
  return {
    restrict: 'E',
    scope: {value: '='},
    templateUrl: 'app/edgevalues/externalId/view.html'
  };
});

"use strict";
App.directive('itemRef', function(Names) {
  return {
    restrict: 'E',
    scope: {value: '='},
    templateUrl: 'app/edgevalues/itemRef/view.html',
    link: function(scope) {
      if (scope.value) {
        Names.getItemNames([scope.value.id], 'en').then(function(label) {
          scope.label = label[scope.value.id];
          scope.$apply();
        });
      }
    }
  };
});

"use strict";
App.directive('text', function() {
  return {
    restrict: 'E',
    scope: {value: '='},
    templateUrl: 'app/edgevalues/text/view.html'
  };
});

"use strict";
App.directive('url', function() {
  return {
    restrict: 'E',
    scope: {value: '='},
    templateUrl: 'app/edgevalues/url/view.html'
  };
});

"use strict";
App.directive('category', function(Status) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      options: '=',
      references: '='
    },
    templateUrl: './app/query/categories/view.html',
    link: function(scope, element, attr) {
      scope.curLang = 'en';
      scope.setLang = function(lang) {
        scope.curLang = lang;
      };
      scope.showDetails = false;
      scope.warnings = [];
      scope.nameError = false;
    }
  };
}).directive('itemHeader', function() {
  return {
    restrict: 'E',
    scope: {
      name: '@',
      options: '=',
      items: '='
    },
    templateUrl: './app/query/categories/view-header.html',
    link: function(scope, element, attr) {}
  };
});

"use strict";
App.filter('categoryFilter', function() {
  return function(input) {
    input.names;
  };
});

"use strict";
App.directive('match', function() {
  return {
    restrict: 'E',
    scope: {item: '='},
    templateUrl: './app/query/categories/match.html',
    link: function(scope, element, attr) {}
  };
});

"use strict";
App.directive('task', function(Tasks, $interval, moment) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      update: '='
    },
    link: function(scope) {
      scope.item.percentage = 0;
      var startedAt = moment(scope.item.createdAt).unix();
      moment.locale('en');
      if (scope.item.status === "Running") {
        $interval(function() {
          Tasks.state({id: scope.item._id}).$promise.then(function(item) {
            var now = moment().unix();
            var secondToFinish = (now - startedAt) / item.percentage;
            var ending = moment().add(secondToFinish, 's');
            scope.item.percentage = item.percentage;
            scope.item.doing = item.doing;
            scope.item.status = item.status;
            scope.item.remaining = ending.fromNow();
            if (item.status !== "Running") {
              scope.update();
            }
          });
        }, 2000);
      }
      scope.stop = function() {
        Tasks.stop({id: scope.item._id}, {id: scope.item._id}).$promise.then(function() {
          scope.update();
        });
      };
      scope.remove = function() {
        Tasks.delete({id: scope.item._id}, {id: scope.item._id}).$promise.then(function() {
          scope.update();
        });
      };
    },
    templateUrl: 'app/tasks/task/view.html'
  };
});

"use strict";
App.directive('taskItem', function(Tasks) {
  return {
    restrict: 'E',
    scope: {item: '='},
    link: function(scope) {
      scope.run = function() {
        Tasks.run({taskName: scope.item.name}, {});
      };
    },
    templateUrl: 'app/tasks/task-item/view.html'
  };
});

"use strict";
App.directive('viewer', function(Viewers) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      autoUpdate: '='
    },
    link: function(scope) {
      scope.exists = '_id' in scope.item;
      scope.nExists = !scope.exists;
      scope.deleteItem = function() {
        Viewers.delete({id: scope.item._id}).$promise.then(function(res) {
          scope.$emit('deleted', scope.item);
        });
      };
      scope.createItem = function() {
        Viewers.save(scope.item).$promise.then(function(res) {
          scope.item = angular.copy(scope.newItem);
          scope.$emit('created', res);
        });
      };
      if (scope.exists) {
        scope.action = scope.deleteItem;
        scope.actionName = 'Delete';
        scope.title = '';
      } else {
        scope.action = scope.createItem;
        scope.actionName = 'Create';
        scope.title = 'Create new viewer';
        scope.newItem = angular.copy(scope.item);
      }
      scope.onUpdate = function(field, newValue) {
        return new Promise(function(resolve, reject) {
          if (newValue.trim().length === 0) {
            resolve("Field must not be empty");
          } else {
            if (scope.exists) {
              Viewers.update({id: scope.item._id}, scope.item).$promise.then(function(res) {
                if (!res.updated) {
                  resolve("Server error");
                } else {
                  resolve("");
                }
              });
            }
          }
        });
      };
    },
    templateUrl: 'app/viewers/item/view.html'
  };
});

//# sourceMappingURL=app.js.map
