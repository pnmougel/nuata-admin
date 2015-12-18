
App.factory('Oois', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/ooi/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/ooi/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/ooi/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});


