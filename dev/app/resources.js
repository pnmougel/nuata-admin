App.factory('Nuata', function($resource, ServerUrl) {
    return $resource(ServerUrl + '/', {}, {
        search: {
            method: 'POST',
            url: ServerUrl + '/data'
        }
    });
});
