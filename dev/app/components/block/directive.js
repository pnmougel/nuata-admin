App.directive('block', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '=',
      width: '=',
      color: '=',
      borderColor: '=',
      collapsible: '='
    },
    link: function (scope) {
      //if(!scope.width) {
      //  scope.width = 12
      //}
      //if(!scope.borderColor) {
      //  scope.borderColor = '\"rgb(255, 255, 255)\"'
      //}
      scope.isExpanded = true;
      scope.toggle = function() {
        scope.isExpanded = !scope.isExpanded;
      }
    },
    templateUrl: 'app/components/block/view.html'
    //compile: function(element, attrs){
    //  if (!attrs.width) { attrs.width = 12; }
    //  if (!attrs.borderColor) { attrs.borderColor = '\"rgb(255, 255, 255)\"'; }
    //}
  };
});