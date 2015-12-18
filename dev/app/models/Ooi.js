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

  Ooi.buildFromQuery = function (data) {
    if(data) {
      return data.map(function (item) {
        return new Ooi(item);
      })
    } else {
      return [];
    }
  };

  Ooi.build = function (data) {
    return new Ooi(data);
  };

  return Ooi
});
