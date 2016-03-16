App.directive('viewer', function (Viewers) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    link: function (scope) {
      scope.exists = '_id' in scope.item;
      scope.title = scope.exists ? '' : 'New viewer';

      scope.delete = function () {
        console.log("delete");
        Viewers.delete({id: scope.item._id}).$promise.then(function (res) {
          console.log(res);
        })
      };

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
            } else {
              console.log(scope.item);
              Viewers.save(scope.item).$promise.then(function (res) {
                scope.exists = true;
                scope.item = res;
              });
            }

          }
        });
      };
    },
    templateUrl: 'app/viewers/item/view.html'
  };
});
