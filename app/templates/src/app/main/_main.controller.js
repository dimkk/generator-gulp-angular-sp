'use strict';

angular.module('<%= appName %>')
  .controller('MainCtrl', function ($scope, options) {
    $scope.awesomeThings = <%= technologies %>;
      $scope.options = options;
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
