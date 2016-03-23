App.directive('task', function (Tasks, $interval, moment) {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      update: '='
    },
    link: function (scope) {
      var updateTasks = function () {
        Tasks.state({id: scope.item._id}).$promise.then(function (item) {
          var now = moment().unix();
          var secondToFinish = (now - startedAt) / item.percentage;
          var ending = moment().add(secondToFinish, 's');
          scope.percentage = item.percentage;
          scope.doing = item.doing;
          scope.status = item.status;
          scope.remaining = ending.fromNow();
          if(item.status !== "Running") {
            scope.update();
          }
        });
      };
      updateTasks();

      var startedAt = moment(scope.item.createdAt).unix();
      moment.locale('en');

      if(scope.item.status === "Running") {
        $interval(updateTasks, 2000);
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
