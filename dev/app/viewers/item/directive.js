App.directive('viewer', function (Viewers) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      autoUpdate: '='
    },
    link: function (scope) {
      scope.exists = '_id' in scope.item;
      scope.nExists = !scope.exists
      
      scope.deleteItem = function () {
        Viewers.delete({id: scope.item._id}).$promise.then(function (res) {
          scope.$emit('deleted', scope.item);
        });
      };

      scope.createItem = function () {
        Viewers.save(scope.item).$promise.then(function (res) {
          scope.item = angular.copy(scope.newItem);
          scope.$emit('created', res);
        });
      };

      if(scope.exists) {
        scope.action = scope.deleteItem;
        scope.actionName = 'Delete';
        scope.title = ''
      } else {
        scope.action = scope.createItem;
        scope.actionName = 'Create';
        scope.title = 'Create new viewer'
        scope.newItem = angular.copy(scope.item);
      }

      scope.onUpdate = function (field, newValue) {
        return new Promise( function(resolve, reject) {
          if(newValue.trim().length === 0) {
            resolve("Field must not be empty")
          } else {
            if(scope.exists) {
              Viewers.update({id: scope.item._id}, scope.item).$promise.then(function (res) {
                if(!res.updated) {
                  resolve("Server error")
                } else {
                  resolve("")
                }
              });
            }
          }
        });
      };
    },
    templateUrl: 'app/viewers/item/view.html'
  };
});
