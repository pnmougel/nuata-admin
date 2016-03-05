
App.factory('DataTypes', function($resource, ServerUrl) {
  return $resource(ServerUrl + '/datatypes');
});


