'use strict';

/* Controllers */
// signin controller
app.controller('WorktipFormController',['$scope','worktipservice','treeservice','worktipservice2',function($scope, worktipservice,treeservice,worktipservice2) {
	var  tree, treedata_avm;
	$scope.my_tree_handler = function(branch) {
		var _ref;
		$scope.output = branch.label;
		if ((_ref = branch.data) != null ? _ref.description : void 0) {
			return $scope.output += '(' + branch.data.description + ')';
		}
		console.log($scope.output);
		if($scope.output=="市委班子"){
			worktipservice2.getData().then(
				function (res) {
					$scope.tipinfo = res.data.info
				},
				function (rej) {
					console.log(rej);
				}
			);
		}else{
			worktipservice.getData().then(
				function (res) {
					$scope.tipinfo = res.data.info
				},
				function (rej) {
					console.log(rej);
				}
			);
		}

		//TODO
	};
	$scope.my_data = [];
	$scope.doing_async = true;
	treeservice.getData().then(
		function (res) {
			$scope.my_data = res.data.info
			$scope.doing_async = false;
			//tree.expand_all();
		},
		function (rej) {
			console.log(rej);
		}
	);
	//$scope.my_data=treedata_avm;
	$scope.my_tree = tree = {};


	//treedata_avm = [
	//	{
	//		label: '市委班子',
	//		data:1,
	//		children: [
	//			{
	//				label: '市委',
	//				data: 11,
	//				children:[]
	//			}, {
	//				label: '市人大',
	//				data: 12
	//			}, {
	//				label: '市政协',
	//				data: 13
	//			}, {
	//				label: '市政府',
	//				data: 14,
	//				children: ['市政府市委', '市政府党委', '市政府政协']
	//			}
	//		]
	//	}, {
	//		label: '党务口',
	//		data: 2,
	//		children: [
	//			{
	//				label: '党务办公室',
	//				data: 21
	//			}, {
	//				label: '党务委员会',
	//				data: 22
	//			}
	//		]
	//	}, {
	//		label: '政务口',
	//		data:3,
	//		children: [
	//			{
	//				label: '政务办公室',
	//				data:31,
	//				children: ['政务委员会']
	//			}, {
	//				label: '政务室',
	//				data:32
	//			}, {
	//				label: '政务',
	//				data:33
	//			}
	//		]
	//	}, {
	//		label: '企事业口',
	//		data:4
	//	}, {
	//		label: '县市区',
	//		data:5,
	//		children: [
	//			{
	//				label: '福清',
	//				data:51,
	//				children: ['福清区委', '福清党委']
	//			}, {
	//				label: '长乐',
	//				data:52,
	//				children: ['长乐党委']
	//			}, {
	//				label: '闽侯',
	//				data:53
	//			}
	//		]
	//	}
	//];
    //
	//$scope.my_data = treedata_avm;
	//$scope.my_tree = tree = {};

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