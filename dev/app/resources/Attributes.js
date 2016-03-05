
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


