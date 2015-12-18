
App.factory('Fact', function(Status) {
  function Fact(item) {
    BaseItem.call(this, Status);
    this.dependencies = [{
      field: 'dimensionRefs',
      mapTo: 'dimensions',
      resolvedAs: 'dimensionIds'
    },{
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

  Fact.buildFromQuery = function (data) {
    if(data) {
      return data.map(function (item) {
        return new Fact(item);
      })
    } else {
      return [];
    }
  };

  Fact.build = function (data) {
    return new Fact(data);
  };

  return Fact;
});
