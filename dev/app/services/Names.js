
App.factory('Names', function(Attributes) {
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
      var repository = type == 'attribute' ? Attributes : Attributes;
      var idsToSearch = [];
      var idToLabel = {};

      ids.forEach(function(id) {
        if(id in typeCache && lang in typeCache[id]) {
          idToLabel = typeCache[id][lang]
        } else {
          idsToSearch.push(id)
        }
      });

      return repository.names({id: idsToSearch}).$promise.then(function(labels) {
        labels.forEach(function(label) {
          if(!(label.id in typeCache)) {
            typeCache[label.id] = {};
          }
          typeCache[label.id][lang] = {
            name: label.name,
            description: label.description
          };
          idToLabel[label.id] = typeCache[label.id][lang]
        });
        return idToLabel;
      });
    }
  }
});