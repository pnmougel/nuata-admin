
App.factory('Items', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/item/index'
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/item/list',
      isArray: true
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/item/:id'
    },
    search: {
      method: 'GET',
      url: ServerUrl + '/item/search'
    },
    names: {
      method: 'GET',
      url: ServerUrl + '/item/name',
      isArray: true
    }
  });
});


