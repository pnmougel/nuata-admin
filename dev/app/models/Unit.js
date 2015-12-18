
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

  Unit.buildFromQuery = function (data) {
    if(data) {
      return data.map(function (item) {
        return new Unit(item);
      })
    } else {
      return [];
    }
  };

  Unit.build = function (data) {
    return new Unit(data);
  };

  return Unit;
});
