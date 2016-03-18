
App.factory('Viewers', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/viewer', {}, {
    update: {
      method: 'PUT',
      url: ServerUrl + '/viewer/:id'
    },
    delete: {
      method: 'DELETE',
      url: ServerUrl + '/viewer/:id'
    },
    get: {
      method: 'GET',
      url: ServerUrl + '/viewer/',
      cache: false
    }
  })
});


