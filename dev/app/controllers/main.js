/**
 * Created by nico on 03/08/15.
 */
'use strict';

App.controller('AppCtrl', function ($scope, $location, Analytics, Nuata) {
    $scope.query = "Population of france";
    $scope.value = {
        isDisplayed: true,
        isFound: false,
        message: '',
        value: 64000256
    };

    $scope.doSearch = function () {
        Nuata.search({query: $scope.query}).$promise.then(function (data) {
            $scope.value.isDisplayed = true;
            if(data.length === 0) {
                $scope.value.isDisplayed = false;
                $scope.message = "Sorry, no value found for this query"
            } else {
                $scope.value.isFound = true;
                $scope.value.value = data[0].value;
                $scope.value.unit = data[0].ooi.unit;
            }
        });
    };
    
    $scope.keyPress = function ($event) {
        if($event.keyCode === 13) {
            $scope.doSearch();
        }
    }
});
