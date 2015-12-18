function BaseItem(allStatuses) {
  this.allStatuses = allStatuses;
  this.statuses = [];
  this.statusesSet = {};
}
BaseItem.prototype.constructor = BaseItem;

BaseItem.prototype.addStatus = function (status) {
  if (!(status in this.statusesSet)) {
    this.statusesSet[status] = true;
    this.statuses.push(status);
  }
};

BaseItem.prototype.removeStatus = function (status) {
  if (status in this.statusesSet) {
    delete this.statusesSet[status];
    var idx = this.statuses.indexOf(status);
    if (idx > -1) {
      this.statuses.splice(idx, 1);
    }
  }
};

BaseItem.prototype.resolveDependencies = function () {
  var hasMissingDependency = false;
  var that = this;
  this.dependencies.forEach(function (dependency) {
    that[dependency.resolvedAs] = that[dependency.mapTo].map(function (item) {
      if(!item._id) { hasMissingDependency = true; }
      return item._id;
    });
  });
  if(hasMissingDependency) {
    this.addStatus(this.allStatuses.missingDependency)
  }
  return !hasMissingDependency;
};

BaseItem.prototype.resolveReferences = function (references) {
  var that = this;
  this.dependencies.forEach(function (dependency) {
    if(that[dependency.field]) {
      that[dependency.mapTo] = that[dependency.field].map(function (itemRef) {
        var resolvedItem = itemRef;
        var refs = dependency.mapTo === 'parents' ? references['dimensions'] : references[dependency.mapTo];
        if (!itemRef in refs) {
          that.addStatus(that.allStatuses.missingReference);
        } else {
          resolvedItem = refs[itemRef];
        }
        return resolvedItem;
      })
    }
  });
};

BaseItem.prototype.getLang = function () {
  if(this.names) {
    return Object.keys(this.names);
  } else { return []; }

};

BaseItem.prototype.isVisible = function (statuses) {
  return true;
  if('All' in statuses) {
    return true;
  } else if('None' in statuses) {
    return false;
  } else {
    var found = false;
    Object.keys(this.statuses).forEach( function(status) {
      found = found || status.name in statuses.selectedStatuses;
    });
    return found;
  }
};

//BaseItem.prototype.search = function () {
//  var that = this;
//  return new Promise( function(resolve, reject) {
//    if(that.resolveDependencies()) {
//      that.resource.search(that).$promise.then(function (res) {
//        if (res.length === 1) {
//          that._id = res[0]._id;
//          that.addStatus(that.allStatuses.found);
//        } else {
//          that.resource.match(that).$promise.then(function (res) {
//            if(res.length === 0) {
//              that.addStatus(that.allStatuses.notFound);
//            } else {
//              that.addStatus(that.allStatuses.noExactMatch);
//            }
//            that.hits = res;
//          });
//        }
//        resolve();
//      })
//    } else {
//      resolve();
//    }
//  });
//
//};

//BaseItem.prototype.index = function () {
//  var that = this;
//  return new Promise( function(resolve, reject) {
//    if(that.resolveDependencies()) {
//      that.resource.index(that).$promise.then(function (res) {
//        that.addStatus(that.allStatuses.created);
//        that._id = res._id;
//        resolve();
//      })
//    } else {
//      resolve();
//    }
//  });
//};
