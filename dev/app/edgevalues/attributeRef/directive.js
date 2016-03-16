/**
 * Created by nico on 05/03/16.
 */
App.directive('attributeRef', function (Names) {
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    templateUrl: 'app/edgevalues/attributeRef/view.html',
    link: function (scope) {
      if (scope.value) {
        Names.getAttributeNames([scope.value.id], 'en').then(function (label) {
          scope.label = label[scope.value.id];
          scope.$apply()
        })
      }
    }
  };
});
