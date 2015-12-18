
App.factory('Init', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/', {}, {
    init: {
      method: 'POST',
      url: ServerUrl + '/init'
    }
  });
});


