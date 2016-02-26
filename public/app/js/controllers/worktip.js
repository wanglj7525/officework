'use strict';

/* Controllers */
// signin controller
app.controller('WorktipFormController',
	['$scope','worktiplistservice2','treeservice','worktiplistservice','worktipservice',function($scope, worktiplistservice2,treeservice,worktiplistservice,worktipservice) {
		$scope.isedit=false;
		var  tree, treedata_avm;
		$scope.my_tree_handler = function(branch) {
			var _ref;
			$scope.output = branch.label;
			if ((_ref = branch.data) != null ? _ref.description : void 0) {
				return $scope.output += '(' + branch.data.description + ')';
			}
			console.log($scope.output);
			if($scope.output=="市委班子"){
				//worktipservice2.getData().then(
				//	function (res) {
				//		$scope.tipinfo = res.data.info
				//	},
				//	function (rej) {
				//		console.log(rej);
				//	}
				//);
				$scope.pid = 0;
				worktiplistservice2.getData().then(
					function (res) {
						$scope.worktiptable = res.data.info;
					},
					function (rej) {
						console.log(rej);
					}
				);
				$scope.itemsByPage=10;
			}else{
				//worktipservice.getData().then(
				//	function (res) {
				//		$scope.tipinfo = res.data.info
				//	},
				//	function (rej) {
				//		console.log(rej);
				//	}
				//);
				$scope.pid = 0;
				worktiplistservice.getData().then(
					function (res) {
						$scope.worktiptable = res.data.info;
					},
					function (rej) {
						console.log(rej);
					}
				);
				$scope.itemsByPage=10;
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
		worktipservice.getData().then(
			function (res) {
				$scope.tipinfo = res.data.info
			},
			function (rej) {
				console.log(rej);
			}
		);

		//添加标签
		$scope.addtip=function(){
			console.log($scope.name);
			$scope.tipinfo.push({"id":"22","name":$scope.name});
			//$scope.tipinfo=[];
		}
		$scope.clickleft=function(){
			$scope.isedit=false;
		}
		$scope.updatetip=function(tip){
			console.log(tip);
			$scope.name=tip.name;
		}
		$scope.deletetip=function(idx){
			$scope.tipinfo.splice(idx,1);
		}
	} ]);
app.controller('WorktipListCtrl', ['$scope', 'worktiplistservice', '$stateParams',  function($scope, worktiplistservice,$stateParams) {
	$scope.pid = $stateParams.pid;
	worktiplistservice.getData().then(
		function (res) {
			$scope.worktiptable = res.data.info;
		},
		function (rej) {
			console.log(rej);
		}
	);
	$scope.itemsByPage=10;
}]);
app.controller('WorktipEditCtrl', ['$scope', 'worktipservice',  function($scope, worktipservice) {
	//worktipservice.getData().then(
	//	function (res) {
	//		$scope.tipinfo = res.data.info
	//	},
	//	function (rej) {
	//		console.log(rej);
	//	}
	//);
	$scope.addtip=function(){
		$scope.tipinfo=[];
	}
	// $scope.itemsByPage=10;
}]);