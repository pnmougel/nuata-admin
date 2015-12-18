
App.factory('Dimensions', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    index: {
      method: 'POST',
      url: ServerUrl + '/dimension/index'
    },
    search: {
      method: 'POST',
      url: ServerUrl + '/dimension/search',
      isArray: true
    },
    match: {
      method: 'POST',
      url: ServerUrl + '/dimension/match',
      isArray: true
    },
    find: {
      method: 'GET',
      url: ServerUrl + '/dimension/search'
    }
  });
});


