'use strict';

/* Controllers */
// signin controller
//app.controller('WorktipFormController',
//	['$scope','$localStorage','worktiplistservice2','worktiplistservice','UIworktipservice',function($scope,$localStorage, worktiplistservice2,worktiplistservice,UIworktipservice) {
//		$scope.isedit=false;
//		$scope.treeselected=$localStorage.treeselect;
//		console.log("工作提示左树："+$scope.treeselected);
//		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
//			$scope.treeselected=$localStorage.treeselect;
//			console.log("工作提示左树变换："+$scope.treeselected);
//		});
//		//worktipservice.getData().then(
//		//	function (res) {
//		//		$scope.tipinfo1 = res.data.info
//		//	},
//		//	function (rej) {
//		//		console.log(rej);
//		//	}
//		//);
//
//
//		$scope.updatetip=function(tip){
//			console.log(tip);
//			$scope.name=tip.name;
//		}
//		$scope.deletetip=function(idx){
//			$scope.tipinfo.splice(idx,1);
//		}
//	} ]);
app.controller('WorktipListCtrl', ['$scope','$localStorage', 'UIworktipservice', '$stateParams',  function($scope, $localStorage,UIworktipservice,$stateParams) {
	$scope.currentname='全部';
	$scope.selectcategory=function(id,name){
		$scope.pid=id;
		$scope.currentname=name;
		
	}
	//切换单位树 请求新的数据
	var postData = $.param({
		access_token:$localStorage.token
	});
	UIworktipservice.getworkcategory(postData).then(
		function (res) {
			$scope.tipinfo = res.data.info.list;
		},
		function (rej) {
			console.log(rej);
		}
	)
	$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			var postData = $.param({
				tree_id:$localStorage.tree_uuid,
				category:'',
				access_token:$localStorage.token
			});
			UIworktipservice.getworktipList(postData).then(
				function (res) {
					if(res.data.code==200){
						$scope.worktiptable = res.data.info;
					}else{
						//alert(res.data.msg);
					}
				},
				function (rej) {
					console.log(rej);
				}
			)
	});
}]);