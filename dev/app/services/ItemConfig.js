
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
  }
});