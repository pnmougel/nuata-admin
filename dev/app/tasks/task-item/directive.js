App.directive('taskItem', function (Tasks) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        link: function (scope) {
            scope.run = function() {
                Tasks.run({taskName: scope.item.name}, {});
            }
        },
        templateUrl: 'app/tasks/task-item/view.html'
    };
});
