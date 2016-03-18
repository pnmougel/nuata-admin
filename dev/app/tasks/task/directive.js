App.directive('task', function (Tasks, $interval) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        link: function (scope) {
            $interval(function() {
                console.log('test');
            }, 1000);
            scope.stop = function() {
                Tasks.stop({id: scope.item._id}, {id: scope.item._id}).$promise.then(function() {
                })
            }
        },
        templateUrl: 'app/tasks/task/view.html'
    };
});
