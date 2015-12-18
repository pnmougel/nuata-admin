
App.factory('Categories', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/category/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/category/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/category/match',
      isArray: true
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/category/:id'
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/category/search'
    }
  });
});


