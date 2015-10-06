App.factory('Nuata', function($resource, ServerUrl) {
    return $resource(ServerUrl + '/questions', {}, {
        search: {
            method: 'GET',
            url: ServerUrl + '/:query',
            params: { query: '@query' },
            isArray: true
        }
    });
});




