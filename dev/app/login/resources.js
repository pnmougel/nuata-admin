App.factory('Authentication', function($resource, ServerUrl) {
    return $resource(ServerUrl + '/user/admin');
});
