App.directive('textField', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      updated: '=',
      onUpdate: '=',
      fieldName: '=',
      placeholder: '='
    },
    link: function (scope) {
      scope.sourceValue = angular.copy(scope.value);

      scope.update = function () {
        scope.updated = scope.sourceValue !== scope.value;
        $timeout(function() {
          scope.onUpdate(scope.fieldName, scope.value).then(function (errorMessage) {
            scope.errorMessage = errorMessage;
            scope.hasError = scope.errorMessage.length !== 0;
            scope.$apply();
          });
        }, 100);
      }
    },
    templateUrl: 'app/components/textfield/view.html'
  };
});
