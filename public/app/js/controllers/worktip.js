'use strict';

/* Controllers */
// signin controller
app.controller('WorktipFormController',['$scope','worktipservice',function($scope, worktipservice) {
		worktipservice.getData().then(
			  function (res) {
			    $scope.tipinfo = res.data.info
			  }, 
			  function (rej) {
			  	console.log(rej);
			  }
		);

} ]);
app.controller('WorktipListCtrl', ['$scope', 'worktiplistservice', '$stateParams',  function($scope, worktiplistservice,$stateParams) {
	$scope.pid = $stateParams.pid;
  	worktiplistservice.getData().then(
			  function (res) {
			  	console.log(res);
			    $scope.worktiptable = res.data.info;
			  }, 
			  function (rej) {
			  	console.log(rej);
			  }
		);
  	$scope.itemsByPage=10;
}]);
app.controller('WorktipEditCtrl', ['$scope', 'worktipservice',  function($scope, worktipservice) {
  	worktipservice.getData().then(
			  function (res) {
			    $scope.tipinfo = res.data.info
			  }, 
			  function (rej) {
			  	console.log(rej);
			  }
		);
  	// $scope.itemsByPage=10;
}]);