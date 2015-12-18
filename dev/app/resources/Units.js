
App.factory('Units', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/unit/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/unit/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/unit/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});


