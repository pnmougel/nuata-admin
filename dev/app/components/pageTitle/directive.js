App.directive('pageTitle', function() {
  return {
    restrict: 'E',
    scope: {
      label: '='
    },
    templateUrl: 'app/components/pageTitle/view.html'
  };
});
