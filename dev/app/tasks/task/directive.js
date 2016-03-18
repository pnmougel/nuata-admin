App.directive('task', function (Tasks, $interval, moment) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      update: '='
    },
    link: function (scope) {
      scope.item.percentage = 0;
      var startedAt = moment(scope.item.createdAt).unix()
      moment.locale('en')
      if(scope.item.status === "Running") {
        $interval(function () {
          Tasks.state({id: scope.item._id}).$promise.then(function (item) {
            var now = moment().unix()
            var secondToFinish = (now - startedAt) / item.percentage;
            var ending = moment().add(secondToFinish, 's');
            scope.item.percentage = item.percentage;
            scope.item.doing = item.doing;
            scope.item.status = item.status;
            scope.item.remaining = ending.fromNow();
            if(item.status !== "Running") {
              scope.update();
            }
          });
        }, 2000);
      }
      scope.stop = function () {
        Tasks.stop({id: scope.item._id}, {id: scope.item._id}).$promise.then(function () {
          scope.update();
        })
      };
      scope.remove = function () {
        Tasks.delete({id: scope.item._id}, {id: scope.item._id}).$promise.then(function () {
          scope.update();
        })
      };
    },
    templateUrl: 'app/tasks/task/view.html'
  };
});
