
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

  Category.buildFromQuery = function (data) {
    if(data) {
      return data.map(function (item) {
        return new Category(item);
      })
    } else {
      return [];
    }
  };

  Category.build = function (data) {
    return new Category(data);
  };

  return Category
});