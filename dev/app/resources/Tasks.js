
App.factory('Tasks', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/task', {}, {
    statuses: {
      method: 'GET',
      url: ServerUrl + '/task/statuses',
      isArray: true
    },
    list: {
      method: 'GET',
      url: ServerUrl + '/task/names',
      isArray: true
    },
    run: {
      method: 'POST',
      url: ServerUrl + '/task/run/:taskName'
    },
    stop: {
      method: 'POST',
      url: ServerUrl + '/task/stop/:id'
    }
  });
});


