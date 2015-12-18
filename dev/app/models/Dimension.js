
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
    },{
      field: 'parentRefs',
      mapTo: 'parents',
      resolvedAs: 'parentIds'
    }];
  }

  Dimension.prototype = Object.create(BaseItem.prototype);

  Dimension.prototype.constructor = Dimension;

  Dimension.buildFromQuery = function (data) {
    if(data) {
      return data.map(function (item) {
        return new Dimension(item);
      })
    } else {
      return [];
    }
  };

  Dimension.build = function (data) {
    return new Dimension(data);
  };

  return Dimension
});

