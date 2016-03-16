
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
        if(id in typeCache && lang in typeCache[id]) {
          idToLabel[id] = typeCache[id][lang]
        } else {
          idsToSearch.push(id)
        }
      });

      return new Promise( function(resolve) {
        if(idsToSearch.length === 0) {
          resolve(idToLabel)
        } else {
          repository.names({id: idsToSearch}).$promise.then(function(labels) {
            labels.forEach(function(label, i) {
              var id = idsToSearch[i];
              if(!(id in typeCache)) {
                typeCache[id] = {};
              }
              typeCache[id][lang] = {
                name: label.name,
                description: label.description
              };
              idToLabel[id] = typeCache[id][lang]
            });
            resolve(idToLabel);
          });
        }
      });
    }
  }
});