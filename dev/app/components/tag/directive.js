App.directive('tag', function() {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      category: '=',
      label: '=',
      icon: '=',
      onDelete: '='
    },
    templateUrl: 'app/components/tag/view.html'
  };
});
